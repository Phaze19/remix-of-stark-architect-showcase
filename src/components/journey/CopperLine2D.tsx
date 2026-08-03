import { motion, MotionValue, useTransform, useReducedMotion } from "framer-motion";

/**
 * CopperLine2D — flat, technical 2D production line.
 * Scroll-driven pan down the line: rod stock → hot rolling mill →
 * annealing furnace → finished coil. Same 25% stage bands as the rail.
 *
 * Note: every rotating part lives inside a <g transform="translate(...)">
 * and spins about its own 0,0 origin, so SVG transform-origin is never guessed.
 */

const SEG = 0.25;
/** map a sub-range of a stage band to a [from,to] scroll window */
const band = (i: number, from = 0, to = 1) => [i * SEG + SEG * from, i * SEG + SEG * to] as [number, number];

const Roller = ({ x, y, r, spin }: { x: number; y: number; r: number; spin: MotionValue<number> }) => (
  <g transform={`translate(${x},${y})`}>
    <motion.g style={{ rotate: spin, transformOrigin: "0px 0px" }}>
      <circle cx="0" cy="0" r={r} fill="url(#steel)" />
      <rect x={-1.5} y={-r} width="3" height={r * 2} fill="rgba(0,0,0,0.4)" />
      <rect x={-r} y={-1.5} width={r * 2} height="3" fill="rgba(0,0,0,0.25)" />
      <circle cx="0" cy="0" r={r * 0.22} fill="#0d1013" />
    </motion.g>
    <circle cx="0" cy="0" r={r} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
  </g>
);

const CopperLine2D = ({ progress }: { progress: MotionValue<number> }) => {
  /**
   * Reduced motion: keep the scroll-driven story (camera pan, growing strand,
   * heat glow) but drop the purely decorative spinning, sparks and heat haze.
   */
  const reduce = useReducedMotion();
  const off = reduce ? 0 : 1;

  /* camera pans down the line — one station per 25% band */
  const camX = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [0, -110, -580, -890, -960]);

  /* 01 — rod feeding in */
  const rodX = useTransform(progress, band(0, 0.05, 1), [-300, 40]);
  const spin = useTransform(progress, [0, 1], [0, 2600 * off]);

  /* 02 — rolling mill */
  const millSpin = useTransform(progress, band(1, 0, 1.4), [0, 900 * off]);
  const rolledLen = useTransform(progress, band(1, 0.1, 1), [0, 430]);
  const millGlow = useTransform(progress, band(1, 0.08, 0.4), [0, 1]);
  const sparks = useTransform(progress, band(1, 0.1, 0.35), [0, off]);

  /* 03 — annealing furnace */
  const furnaceHeat = useTransform(progress, band(2, 0, 0.35), [0, 1]);
  const coreHeat = useTransform(progress, band(2, 0.05, 0.5), [0, 1]);
  const bloom = useTransform(progress, band(2, 0.1, 0.55), [0, 0.85]);
  const annealedLen = useTransform(progress, band(2, 0.05, 1), [0, 420]);
  const haze = useTransform(progress, band(2, 0.1, 0.5), [0, 0.6 * off]);
  /* smooth hot → soft-temper colour crossfade on the strand */
  const hotWire = useTransform(progress, band(2, 0.35, 0.95), [1, 0]);
  const mouthGlow = useTransform(progress, band(2, 0.02, 0.3), [0, 1]);


  /* 04 — finished coil */
  const coilSpin = useTransform(progress, band(3, 0, 1.2), [0, 1100 * off]);
  const feedLen = useTransform(progress, band(3, 0, 0.55), [0, 320]);
  const layer = (i: number) =>
    useTransform(progress, band(3, 0.05 + i * 0.11, 0.2 + i * 0.11), [0, 1]);
  const l0 = layer(0);
  const l1 = layer(1);
  const l2 = layer(2);
  const l3 = layer(3);
  const l4 = layer(4);
  const l5 = layer(5);
  const layers = [l0, l1, l2, l3, l4, l5];

  return (
    <div className="absolute inset-0">
      <motion.svg viewBox="0 0 900 620" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="cu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b3316" />
            <stop offset="18%" stopColor="#b5642c" />
            <stop offset="40%" stopColor="#f0a765" />
            <stop offset="50%" stopColor="#ffdcb4" />
            <stop offset="64%" stopColor="#e08f4a" />
            <stop offset="86%" stopColor="#8a4318" />
            <stop offset="100%" stopColor="#4a2210" />
          </linearGradient>
          <linearGradient id="cuHot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a3390d" />
            <stop offset="22%" stopColor="#e8631a" />
            <stop offset="46%" stopColor="#ffb84d" />
            <stop offset="53%" stopColor="#fff3d0" />
            <stop offset="72%" stopColor="#ff8a2b" />
            <stop offset="100%" stopColor="#8f2f0a" />
          </linearGradient>
          <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a4048" />
            <stop offset="35%" stopColor="#8d959f" />
            <stop offset="52%" stopColor="#c7ced6" />
            <stop offset="70%" stopColor="#6c747d" />
            <stop offset="100%" stopColor="#23282e" />
          </linearGradient>
          <linearGradient id="machine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2b3138" />
            <stop offset="100%" stopColor="#14181d" />
          </linearGradient>
          <radialGradient id="heat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffca7a" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ff6b1a" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff4d00" stopOpacity="0" />
          </radialGradient>
          <filter id="soft" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        <motion.g style={{ x: camX }}>
          {/* floor lines */}
          <rect x="-200" y="392" width="2200" height="3" fill="rgba(255,255,255,0.10)" />
          <rect x="-200" y="466" width="2200" height="1.5" fill="rgba(255,255,255,0.05)" />

          {/* ============ 01 — ROD STOCK ON DRIVEN ROLLERS ============ */}
          <g>
            {[120, 220, 320, 420].map((x) => (
              <g key={x}>
                <rect x={x - 5} y={324} width="10" height="70" fill="url(#machine)" />
                <Roller x={x} y={324} r={20} spin={spin} />
              </g>
            ))}
            <motion.g style={{ x: rodX }}>
              <rect x="0" y="286" width="460" height="26" rx="13" fill="url(#cu)" />
              <rect x="10" y="292" width="440" height="2.5" fill="rgba(255,255,255,0.4)" />
              <ellipse cx="460" cy="299" rx="6" ry="13" fill="#cd7f42" />
            </motion.g>
            <text x="120" y="530" fill="rgba(255,255,255,0.35)" fontSize="13" letterSpacing="3.5">
              ROD STOCK · 8 mm ETP COPPER
            </text>
          </g>

          {/* ============ 02 — HOT ROLLING MILL ============ */}
          <g transform="translate(560,0)">
            <rect x="-56" y="150" width="34" height="244" fill="url(#machine)" />
            <rect x="66" y="150" width="34" height="244" fill="url(#machine)" />
            <rect x="-56" y="140" width="156" height="12" fill="#d81f26" />
            {/* paired rolls */}
            <Roller x={22} y={262} r={42} spin={millSpin} />
            <Roller x={22} y={338} r={42} spin={millSpin} />
            {/* reduced section leaving the mill */}
            <motion.rect x="60" y="293" height="13" rx="6.5" fill="url(#cuHot)" style={{ width: rolledLen }} />
            <motion.ellipse cx="66" cy="299" rx="62" ry="30" fill="url(#heat)" filter="url(#soft)" style={{ opacity: millGlow }} />
            <motion.g style={{ opacity: sparks }}>
              {[...Array(14)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={70}
                  cy={299}
                  r={1.6}
                  fill="#ffd08a"
                  animate={{ x: [0, 40 + i * 8], y: [0, (i % 2 ? 1 : -1) * (26 + i * 4)], opacity: [1, 0] }}
                  transition={{ duration: 0.7 + i * 0.05, repeat: Infinity, delay: i * 0.07, ease: "easeOut" }}
                />
              ))}
            </motion.g>
            <text x="-56" y="530" fill="rgba(255,255,255,0.35)" fontSize="13" letterSpacing="3.5">
              ROLLING MILL · GAUGE REDUCTION
            </text>
          </g>

          {/* ============ 03 — ANNEALING FURNACE ============ */}
          <g transform="translate(940,0)">
            <rect x="0" y="196" width="300" height="76" fill="url(#machine)" />
            <rect x="0" y="188" width="300" height="10" fill="#d81f26" opacity="0.85" />
            <rect x="0" y="330" width="300" height="64" fill="url(#machine)" />
            <rect x="46" y="148" width="20" height="48" fill="#20252b" />
            <rect x="234" y="148" width="20" height="48" fill="#20252b" />
            {/* inner heat */}
            <motion.rect x="0" y="272" width="300" height="58" fill="url(#heat)" style={{ opacity: furnaceHeat }} />
            <motion.ellipse cx="150" cy="299" rx="160" ry="40" fill="url(#heat)" filter="url(#soft)" style={{ opacity: furnaceHeat }} />
            {/* annealed wire crossing the tunnel */}
            <motion.rect x="-20" y="294" height="11" rx="5.5" fill="url(#cuHot)" style={{ width: annealedLen }} />
            {/* rising haze */}
            <motion.g style={{ opacity: haze }}>
              {[70, 150, 230].map((x, i) => (
                <motion.ellipse
                  key={x}
                  cx={x}
                  cy={276}
                  rx="24"
                  ry="11"
                  fill="rgba(255,180,110,0.3)"
                  filter="url(#soft)"
                  animate={{ y: [0, -74], opacity: [0.55, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
                />
              ))}
            </motion.g>
            <text x="0" y="530" fill="rgba(255,255,255,0.35)" fontSize="13" letterSpacing="3.5">
              ANNEALING · SOFT TEMPER
            </text>
          </g>

          {/* ============ 04 — FINISHED COIL ============ */}
          <g transform="translate(1320,0)">
            <motion.rect x="-90" y="294" height="10" rx="5" fill="url(#cu)" style={{ width: feedLen }} />
            <rect x="86" y="300" width="18" height="94" fill="url(#machine)" />
            <rect x="36" y="384" width="118" height="10" fill="#20252b" />
            <g transform="translate(95,290)">
              <motion.g style={{ rotate: coilSpin, transformOrigin: "0px 0px" }}>
                <circle cx="0" cy="0" r="94" fill="#181c21" />
                <circle cx="0" cy="0" r="94" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                {[86, 76, 66, 56, 46, 36].map((r, i) => (
                  <motion.circle
                    key={r}
                    cx="0"
                    cy="0"
                    r={r}
                    fill="none"
                    stroke={i % 2 ? "#c9793c" : "#efa464"}
                    strokeWidth="8.5"
                    style={{ opacity: layers[i] }}
                  />
                ))}
                <circle cx="0" cy="0" r="24" fill="url(#steel)" />
                <rect x="-2" y="-90" width="4" height="180" fill="rgba(255,255,255,0.07)" />
              </motion.g>
            </g>
            <text x="0" y="530" fill="rgba(255,255,255,0.35)" fontSize="13" letterSpacing="3.5">
              FINISHED COIL · READY TO SHIP
            </text>
          </g>
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default CopperLine2D;
