import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * CopperScene — real-time 3D rolling sequence for the CopperJourney section.
 * Driven entirely by the section's scroll progress MotionValue (0 → 1),
 * split into the same four 25% bands as the DOM stage rail:
 *   01 rod  ·  02 drawing & rolling  ·  03 flat strands  ·  04 bundle
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
const COPPER_BRIGHT = "#e0964c";

const b0 = band(0);
const b1 = band(1);
const b2 = band(2);
const b3 = band(3);
/** point where the 3D scene hands over to the product catalogue card */
const HANDOVER = b3.start + SEG * 0.5;

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
/*  Rig — everything animated from one useFrame                        */
/* ------------------------------------------------------------------ */

const Rig = ({ progress, s }: { progress: MotionValue<number>; s: number }) => {
  const rod = useRef<THREE.Group>(null!);
  const rodMesh = useRef<THREE.Mesh>(null!);
  const rodMat = useRef<MatRef>(null!);
  const rollerTop = useRef<THREE.Mesh>(null!);
  const rollerBottom = useRef<THREE.Mesh>(null!);
  const rollerGroup = useRef<THREE.Group>(null!);
  const hotSpot = useRef<THREE.Mesh>(null!);
  const strands = useRef<THREE.Group>(null!);
  const bundle = useRef<THREE.Group>(null!);
  const paper = useRef<THREE.Mesh>(null!);
  const root = useRef<THREE.Group>(null!);

  /** strands and bundle need SEPARATE materials — a shared instance would
   *  let one group's cross-fade opacity clobber the other's. */
  const makeCopper = () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(COPPER),
        metalness: 1,
        roughness: 0.26,
        clearcoat: 0.35,
        clearcoatRoughness: 0.4,
      });
  const strandMat = useMemo(makeCopper, []);
  const bundleMat = useMemo(makeCopper, []);

  const steelMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#3a3f45"),
        metalness: 0.95,
        roughness: 0.35,
      }),
    []
  );

  const paperMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#c99a68"),
        metalness: 0.05,
        roughness: 0.85,
      }),
    []
  );

  const strandCount = 9;
  const stripCount = 11;

  useFrame((state, dt) => {
    const p = progress.get();
    const t = state.clock.elapsedTime;

    /* ---------- global stage framing ---------- */
    if (root.current) {
      root.current.scale.setScalar(s * lerp(1, 0.9, ramp(p, HANDOVER, b3.end)));
      root.current.rotation.y = lerp(-0.12, 0.1, clamp01(p));
    }
    state.camera.position.z = lerp(9.2, 7.6, clamp01(p));
    state.camera.position.y = lerp(1.4, 0.5, ramp(p, 0, 0.35));
    state.camera.lookAt(0, 0, 0);

    /* ---------- 01 + 02 : rod, spinning + rolling ---------- */
    const rodVis = window01(p, b0.start, b0.start + 0.03, b2.start - 0.03, b2.start + 0.02);
    if (rod.current) {
      setOpacity(rod.current, rodVis);
      // drops in, settles, then rides through the mill
      rod.current.position.y = lerp(2.4, 0, ramp(p, b0.start, b0.start + 0.09));
      rod.current.rotation.z = Math.PI / 2 + lerp(0.22, 0, ramp(p, b0.start, b0.start + 0.1));
      // axial spin: idle in stage 1, fast under the rollers in stage 2
      const spin = lerp(0.6, 7.5, ramp(p, b1.start, b1.start + 0.06));
      rod.current.rotation.y += spin * dt;
    }
    if (rodMesh.current) {
      // elongation + reduction: volume-preserving-ish squeeze through the mill
      const draw = ramp(p, b0.end - 0.04, b1.end);
      const len = lerp(1, 3.1, draw);
      const rad = lerp(1, 0.24, draw);
      // roller pinch flattens the section slightly on the vertical axis
      const pinch = window01(p, b1.start, b1.start + 0.05, b1.end - 0.06, b1.end);
      rodMesh.current.scale.set(rad * lerp(1, 1.22, pinch), len, rad * lerp(1, 0.72, pinch));
    }
    if (rodMat.current) {
      // work-hardening heat: brightens through the mill, cools after
      const heat = window01(p, b1.start, b1.start + 0.08, b1.end - 0.08, b1.end);
      rodMat.current.color.set(COPPER).lerp(new THREE.Color(COPPER_BRIGHT), heat);
      rodMat.current.emissive.set("#ff7a2a");
      rodMat.current.emissiveIntensity = heat * 0.55;
      rodMat.current.roughness = lerp(0.34, 0.14, ramp(p, b0.start, b1.end));
    }

    /* ---------- rolling mill ---------- */
    const millVis = window01(p, b1.start - 0.06, b1.start + 0.01, b1.end - 0.05, b1.end + 0.02);
    if (rollerGroup.current) {
      setOpacity(rollerGroup.current, millVis * 0.98);
      const gap = lerp(1.1, 0.34, ramp(p, b1.start, b1.start + 0.08));
      rollerTop.current.position.y = gap;
      rollerBottom.current.position.y = -gap;
      const rpm = 9 * millVis;
      rollerTop.current.rotation.x -= rpm * dt;
      rollerBottom.current.rotation.x += rpm * dt;
    }
    if (hotSpot.current) {
      const g = window01(p, b1.start, b1.start + 0.06, b1.end - 0.07, b1.end);
      const mat = hotSpot.current.material as THREE.MeshBasicMaterial;
      mat.opacity = g * (0.55 + Math.sin(t * 14) * 0.12);
      hotSpot.current.visible = g > 0.02;
      hotSpot.current.scale.setScalar(0.9 + Math.sin(t * 9) * 0.07);
    }

    /* ---------- 03 : flat strands ---------- */
    const strandVis = window01(p, b2.start - 0.03, b2.start + 0.04, b2.end - 0.05, b2.end);
    if (strands.current) {
      setOpacity(strands.current, strandVis);
      const spread = ramp(p, b2.start, b2.end - 0.05);
      strands.current.children.forEach((c, i) => {
        const o = i - (strandCount - 1) / 2;
        c.position.y = o * spread * 0.3;
        c.position.z = o * spread * 0.12;
        c.rotation.z = o * spread * 0.035 + Math.sin(t * 1.2 + i) * 0.006;
        c.position.x = Math.sin(t * 0.8 + i * 0.4) * 0.05;
      });
      strands.current.rotation.x = lerp(0.5, 0.16, spread);
    }

    /* ---------- 04 : transposed bundle + paper wrap ---------- */
    const bundleVis = window01(p, b3.start - 0.05, b3.start + 0.05, HANDOVER, b3.end - 0.05);
    if (bundle.current) {
      setOpacity(bundle.current, bundleVis);
      const close = ramp(p, b3.start, b3.start + 0.09);
      bundle.current.children.forEach((c, i) => {
        if (c === paper.current) return;
        const o = i - (stripCount - 1) / 2;
        c.position.y = o * lerp(0.34, 0.13, close);
        c.rotation.z = lerp(o * 0.05, 0, close);
      });
      bundle.current.rotation.y = lerp(-0.5, -0.18, close) + Math.sin(t * 0.35) * 0.05;
      bundle.current.rotation.x = 0.16;
    }
    if (paper.current) {
      const wrap = ramp(p, b3.start + 0.05, b3.start + 0.14);
      paper.current.scale.set(1, wrap, 1);
      paper.current.visible = wrap > 0.02;
    }
  });

  return (
    <group ref={root}>
      {/* ---------- copper rod ---------- */}
      <group ref={rod}>
        <mesh ref={rodMesh} castShadow>
          <cylinderGeometry args={[0.42, 0.42, 3.2, 64, 1]} />
          <meshPhysicalMaterial
            ref={rodMat}
            color={COPPER}
            metalness={1}
            roughness={0.28}
            clearcoat={0.4}
            clearcoatRoughness={0.35}
          />
        </mesh>
      </group>

      {/* ---------- rolling mill ---------- */}
      <group ref={rollerGroup}>
        <mesh ref={rollerTop} rotation={[0, 0, Math.PI / 2]} material={steelMat}>
          <cylinderGeometry args={[0.9, 0.9, 1.7, 48]} />
        </mesh>
        <mesh ref={rollerBottom} rotation={[0, 0, Math.PI / 2]} material={steelMat}>
          <cylinderGeometry args={[0.9, 0.9, 1.7, 48]} />
        </mesh>
        {/* housing plates */}
        <mesh position={[0, 0, -1.15]} material={steelMat}>
          <boxGeometry args={[2.6, 3.4, 0.18]} />
        </mesh>
        {/* friction glow at the pinch point */}
        <mesh ref={hotSpot} position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.42, 24, 24]} />
          <meshBasicMaterial color="#ff9b3d" transparent opacity={0} depthWrite={false} />
        </mesh>
        <pointLight position={[0, 0, 0.6]} color="#ff8a2a" intensity={6} distance={4} />
      </group>

      <Sparks progress={progress} />

      {/* ---------- flat strands ---------- */}
      <group ref={strands}>
        {Array.from({ length: strandCount }).map((_, i) => (
          <mesh key={i} material={strandMat}>
            <boxGeometry args={[6, 0.14, 0.55]} />
          </mesh>
        ))}
      </group>

      {/* ---------- transposed bundle ---------- */}
      <group ref={bundle}>
        {Array.from({ length: stripCount }).map((_, i) => (
          <mesh key={i} material={bundleMat}>
            <boxGeometry args={[4.6, 0.1, 1.5]} />
          </mesh>
        ))}
        <mesh ref={paper} material={paperMat} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.15, 1.15, 2.6, 40, 1, true]} />
        </mesh>
      </group>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/*  Sparks at the roll gap                                             */
/* ------------------------------------------------------------------ */

const SPARKS = 90;

const Sparks = ({ progress }: { progress: MotionValue<number> }) => {
  const pts = useRef<THREE.Points>(null!);
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(SPARKS * 3);
    const seeds = Array.from({ length: SPARKS }, () => ({
      vx: (Math.random() - 0.5) * 4.5,
      vy: 0.8 + Math.random() * 2.4,
      vz: (Math.random() - 0.5) * 1.6,
      life: 0.5 + Math.random() * 0.7,
      off: Math.random() * 2,
    }));
    return { positions, seeds };
  }, []);

  useFrame((state) => {
    const p = progress.get();
    const vis = window01(p, b1.start, b1.start + 0.05, b1.end - 0.07, b1.end);
    if (!pts.current) return;
    pts.current.visible = vis > 0.02;
    (pts.current.material as THREE.PointsMaterial).opacity = vis;
    if (vis <= 0.02) return;
    const t = state.clock.elapsedTime;
    const arr = pts.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < SPARKS; i++) {
      const sd = seeds[i];
      const age = ((t + sd.off) % sd.life) / sd.life;
      arr[i * 3] = sd.vx * age;
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
        size={0.075}
        color="#ffcf7a"
        transparent
        opacity={0}
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
        camera={{ position: [0, 1.2, 9.2], fov: 38 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} color="#fff2e0" />
        <directionalLight position={[-5, 2, -3]} intensity={0.7} color="#7fb6ff" />

        {/* studio reflections generated in-engine — no external HDRI fetch */}
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={4} position={[0, 4, 2]} scale={[10, 3, 1]} color="#fff4e2" />
          <Lightformer form="rect" intensity={2} position={[-5, 1, 1]} scale={[6, 6, 1]} color="#ffd9b3" />
          <Lightformer form="rect" intensity={1.4} position={[5, 0, -2]} scale={[6, 6, 1]} color="#9dc4ff" />
          <Lightformer form="circle" intensity={2.5} position={[0, -3, 3]} scale={[5, 5, 1]} color="#ffb877" />
        </Environment>

        <Rig progress={progress} s={scale} />
      </Canvas>
    </div>
  );
};

export default CopperScene;
