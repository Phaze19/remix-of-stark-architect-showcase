import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * CopperScene — real-time 3D FACTORY LINE for the CopperJourney section.
 * A continuous production line laid out along X; the camera travels down the
 * line as the section scrolls, following the same four 25% stage bands as the
 * DOM rail:
 *   01 rod stock on the conveyor
 *   02 drawing die (rod pulled down to wire)
 *   03 annealing oven (wire runs hot, then cools)
 *   04 coiler — the wire winds onto the finished copper coil
 */

const SEG = 0.25;
const band = (i: number) => ({ start: i * SEG, end: (i + 1) * SEG });
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** normalised, eased 0→1 ramp between two progress values */
const ramp = (v: number, a: number, b: number) => {
  const t = clamp01((v - a) / (b - a || 1e-6));
  return t * t * (3 - 2 * t);
};
/** 0→1→0 window with soft edges */
const window01 = (v: number, a: number, b: number, c: number, d: number) =>
  Math.min(ramp(v, a, b), 1 - ramp(v, c, d));

const lerp = THREE.MathUtils.lerp;

const COPPER = "#b87333";
const COPPER_BRIGHT = "#e39a52";

const b0 = band(0);
const b1 = band(1);
const b2 = band(2);
const b3 = band(3);
/** point where the 3D scene hands over to the product catalogue card */
const HANDOVER = b3.start + SEG * 0.5;

/* ---------------- plant layout (world X positions) ---------------- */
const LINE_START = -17;
const DIE_X = -3.2;
const OVEN_IN = 2.4;
const OVEN_OUT = 5.6;
const COIL_X = 11.2;

type MatRef = THREE.MeshPhysicalMaterial;

const setOpacity = (obj: THREE.Object3D, o: number) => {
  obj.visible = o > 0.001;
  obj.traverse((c) => {
    const m = (c as THREE.Mesh).material as MatRef | undefined;
    if (m && "opacity" in m) {
      m.transparent = true;
      m.opacity = o;
    }
  });
};

/* ------------------------------------------------------------------ */
/*  Reusable factory pieces                                            */
/* ------------------------------------------------------------------ */

/** bank of driven conveyor rollers under the stock */
const RollerBed = ({
  x,
  count = 7,
  spacing = 1.5,
  radius = 0.3,
  refs,
  mat,
}: {
  x: number;
  count?: number;
  spacing?: number;
  radius?: number;
  refs: React.MutableRefObject<THREE.Mesh[]>;
  mat: THREE.Material;
}) => (
  <group position={[x, -0.72, 0]}>
    {Array.from({ length: count }).map((_, i) => (
      <group key={i} position={[(i - (count - 1) / 2) * spacing, 0, 0]}>
        <mesh
          ref={(m) => {
            if (m) refs.current.push(m);
          }}
          rotation={[Math.PI / 2, 0, 0]}
          material={mat}
        >
          <cylinderGeometry args={[radius, radius, 1.9, 28]} />
        </mesh>
        {/* frame legs */}
        <mesh position={[0, -0.9, 0.95]} material={mat}>
          <boxGeometry args={[0.12, 1.5, 0.12]} />
        </mesh>
        <mesh position={[0, -0.9, -0.95]} material={mat}>
          <boxGeometry args={[0.12, 1.5, 0.12]} />
        </mesh>
      </group>
    ))}
    {/* side rails */}
    <mesh position={[0, 0.05, 1.05]} material={mat}>
      <boxGeometry args={[count * spacing, 0.16, 0.1]} />
    </mesh>
    <mesh position={[0, 0.05, -1.05]} material={mat}>
      <boxGeometry args={[count * spacing, 0.16, 0.1]} />
    </mesh>
  </group>
);

/* ------------------------------------------------------------------ */
/*  Rig — everything animated from one useFrame                        */
/* ------------------------------------------------------------------ */

const Rig = ({ progress, s }: { progress: MotionValue<number>; s: number }) => {
  const root = useRef<THREE.Group>(null!);

  const stock = useRef<THREE.Mesh>(null!);
  const stockMat = useRef<MatRef>(null!);
  const wirePre = useRef<THREE.Mesh>(null!);
  const wireHot = useRef<THREE.Mesh>(null!);
  const wireHotMat = useRef<MatRef>(null!);
  const wirePost = useRef<THREE.Mesh>(null!);
  const wirePostMat = useRef<MatRef>(null!);
  const wireFeed = useRef<THREE.Group>(null!);

  const dieRing = useRef<THREE.Mesh>(null!);
  const dieGlow = useRef<THREE.Mesh>(null!);
  const capstan = useRef<THREE.Mesh>(null!);

  const ovenGlow = useRef<THREE.Mesh>(null!);
  const ovenLight = useRef<THREE.PointLight>(null!);

  const spool = useRef<THREE.Group>(null!);
  const coil = useRef<THREE.Mesh>(null!);
  const marks = useRef<THREE.Mesh[]>([]);
  const rollers = useRef<THREE.Mesh[]>([]);
  const rollers2 = useRef<THREE.Mesh[]>([]);

  /** each copper part gets its own material instance so cross-fade opacity
   *  on one group can never clobber another's */
  const makeCopper = (color = COPPER) =>
    new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      metalness: 1,
      roughness: 0.26,
      clearcoat: 0.35,
      clearcoatRoughness: 0.4,
    });
  const coilMat = useMemo(() => makeCopper(), []);
  const markMat = useMemo(() => makeCopper(COPPER_BRIGHT), []);

  const steelMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#3a3f45"),
        metalness: 0.95,
        roughness: 0.38,
      }),
    []
  );
  const darkMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#22262b"),
        metalness: 0.6,
        roughness: 0.6,
      }),
    []
  );
  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#d81f26"),
        metalness: 0.3,
        roughness: 0.5,
      }),
    []
  );

  const MARKS = 26;

  useFrame((state, dt) => {
    const p = progress.get();
    const t = state.clock.elapsedTime;

    /* ---------- camera travels down the line ---------- */
    let camX = -10.5;
    camX = lerp(camX, DIE_X, ramp(p, b0.end - 0.07, b1.start + 0.07));
    camX = lerp(camX, (OVEN_IN + OVEN_OUT) / 2, ramp(p, b1.end - 0.06, b2.start + 0.08));
    camX = lerp(camX, COIL_X - 0.4, ramp(p, b2.end - 0.05, b3.start + 0.09));

    const zoom = lerp(9.6, 7.8, ramp(p, b2.end, b3.start + 0.1));
    state.camera.position.set(camX, lerp(2.2, 1.1, ramp(p, 0, 0.22)), zoom);
    state.camera.lookAt(camX + 0.5, -0.1, 0);

    if (root.current) {
      root.current.scale.setScalar(s);
      // gentle hand-off: the plant recedes as the catalogue card takes over
      const out = 1 - ramp(p, HANDOVER, b3.end - 0.04);
      setOpacity(root.current, out);
      root.current.position.y = lerp(0, 0.5, 1 - out);
    }

    /* ---------- line speed: stock is always running ---------- */
    const speed = 5.4;

    /* ---------- 01/02 : rod stock reduced at the die ---------- */
    const draw = ramp(p, b1.start - 0.03, b1.end - 0.02);
    const stockR = lerp(0.44, 0.4, draw);
    if (stock.current) {
      stock.current.scale.set(stockR / 0.44, 1, stockR / 0.44);
    }
    if (stockMat.current) {
      stockMat.current.roughness = lerp(0.34, 0.22, draw);
    }

    // drawn wire gauge shrinks as the die bites
    const wireR = lerp(0.3, 0.12, draw);
    [wirePre, wireHot, wirePost].forEach((r) => {
      if (r.current) r.current.scale.set(wireR / 0.3, 1, wireR / 0.3);
    });

    /* ---------- die + capstan ---------- */
    if (dieGlow.current) {
      const g = window01(p, b1.start - 0.04, b1.start + 0.05, b2.start - 0.02, b2.start + 0.05);
      const m = dieGlow.current.material as THREE.MeshBasicMaterial;
      m.opacity = g * (0.5 + Math.sin(t * 16) * 0.14);
      dieGlow.current.scale.setScalar(0.9 + Math.sin(t * 11) * 0.08);
    }
    if (dieRing.current) dieRing.current.rotation.x += 2.2 * dt;
    if (capstan.current) capstan.current.rotation.x -= 6.5 * dt;

    /* ---------- rollers spin ---------- */
    rollers.current.forEach((m) => (m.rotation.y += speed * dt));
    rollers2.current.forEach((m) => (m.rotation.y += speed * 1.6 * dt));

    /* ---------- 03 : annealing oven ---------- */
    const heat = window01(p, b2.start - 0.06, b2.start + 0.06, b2.end - 0.04, b2.end + 0.04);
    if (ovenGlow.current) {
      const m = ovenGlow.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.35 + heat * 0.45 + Math.sin(t * 6) * 0.05;
    }
    if (ovenLight.current) ovenLight.current.intensity = 5 + heat * 12 + Math.sin(t * 9) * 1.2;
    if (wireHotMat.current) {
      wireHotMat.current.emissive.set("#ff6a18");
      wireHotMat.current.emissiveIntensity = 0.35 + heat * 1.5;
      wireHotMat.current.color.set(COPPER).lerp(new THREE.Color("#ffb066"), heat * 0.8);
    }
    if (wirePostMat.current) {
      // cools down after the oven, then bright annealed copper
      wirePostMat.current.emissive.set("#ff7a2a");
      wirePostMat.current.emissiveIntensity = heat * 0.45;
      wirePostMat.current.color.set(COPPER).lerp(new THREE.Color(COPPER_BRIGHT), 0.35 + heat * 0.4);
    }

    /* ---------- travelling surface marks (motion cue) ---------- */
    const span = COIL_X - LINE_START;
    marks.current.forEach((m, i) => {
      const x = LINE_START + (((i / MARKS) * span + t * speed) % span);
      m.position.x = x;
      const thick = x < DIE_X - 0.35;
      const r = thick ? stockR * 1.12 : wireR * 1.25;
      m.scale.set(r, r, 1);
      m.visible = x < COIL_X - 0.6;
      const mm = m.material as THREE.MeshPhysicalMaterial;
      mm.emissive.set("#ff7a2a");
      mm.emissiveIntensity = x > OVEN_IN && x < OVEN_OUT + 1.5 ? heat * 1.2 : 0;
    });

    /* ---------- 04 : coiler builds the finished coil ---------- */
    const fill = ramp(p, b3.start - 0.06, HANDOVER + 0.03);
    if (spool.current) {
      // winder spins fast, easing as the coil fills out
      spool.current.rotation.x -= lerp(9, 3.4, fill) * dt;
    }
    if (coil.current) {
      const r = lerp(0.62, 1.55, fill);
      coil.current.scale.set(r, 1, r);
      coil.current.visible = fill > 0.02;
    }
    if (wireFeed.current) {
      // the running wire meets the spool at a tangent that rises as it fills
      wireFeed.current.position.y = lerp(-0.05, 0.18, fill);
      setOpacity(wireFeed.current, 1 - ramp(p, HANDOVER, b3.end - 0.05));
    }
  });

  return (
    <group ref={root}>
      {/* ============ plant shell ============ */}
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.35, 0]} material={darkMat}>
        <planeGeometry args={[70, 26]} />
      </mesh>
      {/* overhead gantry beams */}
      {Array.from({ length: 9 }).map((_, i) => (
        <group key={i} position={[LINE_START + i * 4, 0, 0]}>
          <mesh position={[0, 4.6, 0]} material={steelMat}>
            <boxGeometry args={[0.3, 0.3, 12]} />
          </mesh>
          <mesh position={[0, 1.6, 5.6]} material={steelMat}>
            <boxGeometry args={[0.26, 6.2, 0.26]} />
          </mesh>
          <mesh position={[0, 1.6, -5.6]} material={steelMat}>
            <boxGeometry args={[0.26, 6.2, 0.26]} />
          </mesh>
          {/* work lamps */}
          <mesh position={[0, 4.3, 0]} material={steelMat}>
            <boxGeometry args={[0.5, 0.2, 2.2]} />
          </mesh>
          <pointLight position={[0, 3.6, 0]} intensity={2.2} distance={9} color="#ffe9cf" />
        </group>
      ))}
      {/* red safety stripe along the line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.33, 3.4]} material={accentMat}>
        <planeGeometry args={[64, 0.16]} />
      </mesh>

      {/* ============ 01 conveyor / rod stock ============ */}
      <RollerBed x={-10.5} count={9} spacing={1.6} refs={rollers} mat={steelMat} />
      {/* rod stock: from the line start into the die */}
      <mesh ref={stock} position={[(LINE_START + DIE_X) / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.44, 0.44, DIE_X - LINE_START, 40]} />
        <meshPhysicalMaterial
          ref={stockMat}
          color={COPPER}
          metalness={1}
          roughness={0.32}
          clearcoat={0.4}
          clearcoatRoughness={0.35}
        />
      </mesh>

      {/* ============ 02 drawing die + capstan ============ */}
      <group position={[DIE_X, 0, 0]}>
        {/* die housing */}
        <mesh material={steelMat}>
          <boxGeometry args={[1.5, 3.1, 2.4]} />
        </mesh>
        <mesh position={[0, 1.75, 0]} material={accentMat}>
          <boxGeometry args={[1.6, 0.16, 2.5]} />
        </mesh>
        {/* die throat cone (stock enters, wire exits) */}
        <mesh rotation={[0, 0, -Math.PI / 2]} position={[-0.5, 0, 0]} material={darkMat}>
          <coneGeometry args={[0.75, 1.1, 28, 1, true]} />
        </mesh>
        <mesh ref={dieRing} rotation={[0, 0, Math.PI / 2]} position={[0.45, 0, 0]} material={steelMat}>
          <torusGeometry args={[0.42, 0.12, 14, 28]} />
        </mesh>
        {/* drawing friction glow at the die exit */}
        <mesh ref={dieGlow} position={[0.6, 0, 0]}>
          <sphereGeometry args={[0.4, 20, 20]} />
          <meshBasicMaterial color="#ff9b3d" transparent opacity={0} depthWrite={false} />
        </mesh>
        <pointLight position={[0.8, 0, 0.4]} color="#ff8a2a" intensity={5} distance={4.5} />
        {/* pulling capstan block */}
        <mesh ref={capstan} position={[1.9, -0.1, 0]} rotation={[0, 0, Math.PI / 2]} material={steelMat}>
          <cylinderGeometry args={[0.72, 0.72, 0.5, 32]} />
        </mesh>
      </group>

      <DrawSparks />

      {/* drawn wire, split so the oven section can glow on its own */}
      <mesh
        ref={wirePre}
        position={[(DIE_X + OVEN_IN) / 2 + 0.3, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={coilMat}
      >
        <cylinderGeometry args={[0.3, 0.3, OVEN_IN - DIE_X - 0.6, 24]} />
      </mesh>

      {/* ============ 03 annealing furnace (open tunnel: hood + bed) ============ */}
      <group position={[(OVEN_IN + OVEN_OUT) / 2, 0, 0]}>
        {/* hood above the wire path */}
        <mesh position={[0, 1.5, 0]} material={darkMat}>
          <boxGeometry args={[OVEN_OUT - OVEN_IN, 1.6, 2.8]} />
        </mesh>
        <mesh position={[0, 2.36, 0]} material={accentMat}>
          <boxGeometry args={[OVEN_OUT - OVEN_IN + 0.2, 0.14, 2.9]} />
        </mesh>
        {/* heated bed below the wire path */}
        <mesh position={[0, -1.05, 0]} material={darkMat}>
          <boxGeometry args={[OVEN_OUT - OVEN_IN, 1.2, 2.8]} />
        </mesh>
        {/* rear refractory wall */}
        <mesh position={[0, 0.2, -1.3]} material={darkMat}>
          <boxGeometry args={[OVEN_OUT - OVEN_IN, 1.4, 0.24]} />
        </mesh>
        {/* exhaust stacks */}
        <mesh position={[-0.8, 3.1, 0]} material={steelMat}>
          <cylinderGeometry args={[0.2, 0.24, 1.4, 18]} />
        </mesh>
        <mesh position={[0.8, 3.1, 0]} material={steelMat}>
          <cylinderGeometry args={[0.2, 0.24, 1.4, 18]} />
        </mesh>
        {/* glowing furnace throat around the wire */}
        <mesh ref={ovenGlow} position={[0, 0.05, -0.35]}>
          <boxGeometry args={[OVEN_OUT - OVEN_IN + 0.1, 1.05, 0.6]} />
          <meshBasicMaterial color="#ff7a22" transparent opacity={0.4} depthWrite={false} />
        </mesh>
        <pointLight ref={ovenLight} position={[0, 0, 0.4]} color="#ff7318" intensity={8} distance={9} />
      </group>

      <mesh
        ref={wireHot}
        position={[(OVEN_IN + OVEN_OUT) / 2, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.3, 0.3, OVEN_OUT - OVEN_IN + 1.2, 24]} />
        <meshPhysicalMaterial ref={wireHotMat} color={COPPER} metalness={1} roughness={0.24} />
      </mesh>

      {/* ============ 04 coiler ============ */}
      <mesh ref={wirePost} position={[(OVEN_OUT + COIL_X) / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, COIL_X - OVEN_OUT, 24]} />
        <meshPhysicalMaterial ref={wirePostMat} color={COPPER} metalness={1} roughness={0.2} />
      </mesh>
      <RollerBed x={8.4} count={4} spacing={1.4} radius={0.24} refs={rollers2} mat={steelMat} />

      <group position={[COIL_X, 0, 0]}>
        {/* winder stand */}
        <mesh position={[0, -1.4, 0]} material={steelMat}>
          <boxGeometry args={[2.6, 1.9, 2.2]} />
        </mesh>
        <mesh position={[0, -0.42, 0]} material={accentMat}>
          <boxGeometry args={[2.7, 0.14, 2.3]} />
        </mesh>
        <group ref={spool}>
          {/* spool flanges + core */}
          <mesh position={[-0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={steelMat}>
            <cylinderGeometry args={[1.75, 1.75, 0.16, 40]} />
          </mesh>
          <mesh position={[0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={steelMat}>
            <cylinderGeometry args={[1.75, 1.75, 0.16, 40]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={darkMat}>
            <cylinderGeometry args={[0.6, 0.6, 1.9, 28]} />
          </mesh>
          {/* wound copper building up */}
          <mesh ref={coil} rotation={[0, 0, Math.PI / 2]} material={coilMat}>
            <cylinderGeometry args={[1, 1, 1.78, 48]} />
          </mesh>
          {/* wrap ridges for a wound-wire read */}
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh
              key={i}
              position={[-0.72 + i * 0.36, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
              material={markMat}
            >
              <torusGeometry args={[1.05, 0.035, 8, 40]} />
            </mesh>
          ))}
        </group>
        {/* feed guide laying the wire onto the coil */}
        <group ref={wireFeed} position={[-2.1, 0, 0]}>
          <mesh material={steelMat} position={[0, 0.6, 0]}>
            <boxGeometry args={[0.5, 1.4, 0.5]} />
          </mesh>
          <mesh material={steelMat} rotation={[0, 0, Math.PI / 2]} position={[0.4, 0, 0]}>
            <torusGeometry args={[0.22, 0.06, 10, 20]} />
          </mesh>
        </group>
      </group>

      {/* travelling surface marks on the running stock/wire */}
      {Array.from({ length: MARKS }).map((_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            if (m) marks.current[i] = m;
          }}
          rotation={[0, 0, Math.PI / 2]}
          material={markMat.clone()}
        >
          <torusGeometry args={[1, 0.05, 8, 24]} />
        </mesh>
      ))}
    </group>
  );
};

/* ------------------------------------------------------------------ */
/*  Sparks at the drawing die                                          */
/* ------------------------------------------------------------------ */

const SPARKS = 90;

const DrawSparks = () => {
  const pts = useRef<THREE.Points>(null!);
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(SPARKS * 3);
    const seeds = Array.from({ length: SPARKS }, () => ({
      vx: 1 + Math.random() * 4,
      vy: 0.6 + Math.random() * 2.2,
      vz: (Math.random() - 0.5) * 1.4,
      life: 0.5 + Math.random() * 0.7,
      off: Math.random() * 2,
    }));
    return { positions, seeds };
  }, []);

  useFrame((state) => {
    if (!pts.current) return;
    const t = state.clock.elapsedTime;
    const arr = pts.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < SPARKS; i++) {
      const sd = seeds[i];
      const age = ((t + sd.off) % sd.life) / sd.life;
      arr[i * 3] = DIE_X + 0.6 + sd.vx * age;
      arr[i * 3 + 1] = sd.vy * age - 4.5 * age * age;
      arr[i * 3 + 2] = sd.vz * age + 0.2;
    }
    pts.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#ffcf7a"
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

/* ------------------------------------------------------------------ */
/*  Canvas wrapper                                                     */
/* ------------------------------------------------------------------ */

const CopperScene = ({ progress, scale = 1 }: { progress: MotionValue<number>; scale?: number }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [-10.5, 2, 9.6], fov: 40 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 8, 6]} intensity={1.5} color="#fff2e0" />
        <directionalLight position={[-6, 3, -4]} intensity={0.6} color="#7fb6ff" />

        {/* studio reflections generated in-engine — no external HDRI fetch */}
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={4} position={[0, 5, 3]} scale={[16, 3, 1]} color="#fff4e2" />
          <Lightformer form="rect" intensity={2} position={[-8, 1, 2]} scale={[8, 8, 1]} color="#ffd9b3" />
          <Lightformer form="rect" intensity={1.4} position={[8, 0, -3]} scale={[8, 8, 1]} color="#9dc4ff" />
          <Lightformer form="circle" intensity={2.2} position={[0, -3, 4]} scale={[6, 6, 1]} color="#ffb877" />
        </Environment>

        <Rig progress={progress} s={scale} />
      </Canvas>
    </div>
  );
};

export default CopperScene;
