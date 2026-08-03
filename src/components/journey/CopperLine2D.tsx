import { motion, MotionValue, useTransform } from "framer-motion";

/**
 * CopperLine2D — flat, technical 2D production line.
 * Scroll-driven pan down the line: rod stock → hot rolling mill →
 * annealing furnace → finished coil. Same 25% stage bands as the rail.
 */

const SEG = 0.25;
/** map a sub-range of a stage band to 0→1 */
const band = (i: number, from = 0, to = 1) => [i * SEG + SEG * from, i * SEG + SEG * to] as [number, number];

const CopperLine2D = ({ progress }: { progress: MotionValue<number> }) => {
  /* ---- camera: pan along the line, one station per stage ---- */
  const camX = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [0, -300, -640, -1000, -1120]);

  /* ---- stage 01: rod feeding in ---- */
  const rodX = useTransform(progress, band(0, 0.05, 1), [-260, 60]);
  const rollerSpin = useTransform(progress, [0, 1], [0, 2400]);

  /* ---- stage 02: rolling mill ---- */
  const millSpin = useTransform(progress, band(1, 0, 1.4), [0, 720]);
  const rolledLen = useTransform(progress, band(1, 0.1, 1), [0, 420]);
  const millSparks = useTransform(progress, band(1, 0.15, 0.5), [0, 1]);
  const millSparksOut = useTransform(progress, band(1, 0.85, 1.05), [1, 0]);
  const millGlow = useTransform(progress, band(1, 0.1, 0.4), [0, 1]);

  /* ---- stage 03: annealing furnace ---- */
  const furnaceHeat = useTransform(progress, band(2, 0, 0.45), [0, 1]);
  const annealedLen = useTransform(progress, band(2, 0.1, 1), [0, 400]);
  const hazeOpacity = useTransform(progress, band(2, 0.1, 0.5), [0, 0.55]);

  /* ---- stage 04: coiling ---- */
  const coilSpin = useTransform(progress, band(3, 0, 1.2), [0, 900]);
  const coilFill = useTransform(progress, band(3, 0.05, 0.85), [0, 1]);
  const feedLen = useTransform(progress, band(3, 0, 0.6), [0, 300]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.svg
        viewBox="0 0 1560 620"
        className="w-full h-full"
        style={{ x: camX }}
        preserveAspectRatio="xMinYMid slice"
      >
        <defs>
          {/* copper cylinder shading */}
          <linearGradient id="cu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b3316" />
            <stop offset="18%" stopColor="#b5642c" />
            <stop offset="38%" stopColor="#f0a765" />
            <stop offset="50%" stopColor="#ffd9ae" />
            <stop offset="64%" stopColor="#e08f4a" />
            <stop offset="86%" stopColor="#8a4318" />
            <stop offset="100%" stopColor="#4a2210" />
          </linearGradient>
          {/* hot copper (post-mill / in furnace) */}
          <linearGradient id="cuHot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a3390d" />
            <stop offset="20%" stopColor="#e8631a" />
            <stop offset="45%" stopColor="#ffb84d" />
            <stop offset="52%" stopColor="#fff3d0" />
            <stop offset="70%" stopColor="#ff8a2b" />
            <stop offset="100%" stopColor="#8f2f0a" />
          </linearGradient>
          {/* steel roll */}
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
            <stop offset="45%" stopColor="#ff6b1a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ff4d00" stopOpacity="0" />
          </radialGradient>
          <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* ================= FLOOR / RAILS ================= */}
        <rect x="0" y="392" width="1560" height="4" fill="rgba(255,255,255,0.09)" />
        <rect x="0" y="470" width="1560" height="2" fill="rgba(255,255,255,0.05)" />

        {/* ================= 01 — ROD STOCK ON DRIVEN ROLLERS ================= */}
        <g>
          {[60, 150, 240, 330].map((x) => (
            <g key={x}>
              <rect x={x - 5} y={330} width="10" height="62" fill="url(#machine)" />
              <motion.g style={{ rotate: rollerSpin, originX: `${x}px`, originY: "324px" }}>
                <circle cx={x} cy={324} r="18" fill="url(#steel)" />
                <rect x={x - 1.5} y={306} width="3" height="36" fill="rgba(0,0,0,0.35)" />
              </motion.g>
            </g>
          ))}
          {/* rod */}
          <motion.g style={{ x: rodX }}>
            <rect x="0" y="286" width="420" height="26" rx="13" fill="url(#cu)" />
            <rect x="0" y="292" width="420" height="3" fill="rgba(255,255,255,0.35)" />
            <ellipse cx="420" cy="299" rx="5" ry="13" fill="#c9793c" />
          </motion.g>
          <text x="60" y="520" fill="rgba(255,255,255,0.35)" fontSize="15" letterSpacing="6">
            ROD STOCK — 8 mm ETP
          </text>
        </g>

        {/* ================= 02 — HOT ROLLING MILL ================= */}
        <g transform="translate(520,0)">
          {/* housing */}
          <rect x="-70" y="120" width="40" height="272" fill="url(#machine)" />
          <rect x="90" y="120" width="40" height="272" fill="url(#machine)" />
          <rect x="-70" y="112" width="200" height="14" fill="#d81f26" />
          {/* rolls */}
          <motion.g style={{ rotate: millSpin, originX: "30px", originY: "258px" }}>
            <circle cx="30" cy="258" r="46" fill="url(#steel)" />
            <rect x="28" y="212" width="4" height="92" fill="rgba(0,0,0,0.4)" />
            <rect x="-16" y="256" width="92" height="4" fill="rgba(0,0,0,0.4)" />
          </motion.g>
          <motion.g style={{ rotate: millSpin, originX: "30px", originY: "340px" }}>
            <circle cx="30" cy="340" r="46" fill="url(#steel)" />
            <rect x="28" y="294" width="4" height="92" fill="rgba(0,0,0,0.4)" />
            <rect x="-16" y="338" width="92" height="4" fill="rgba(0,0,0,0.4)" />
          </motion.g>
          {/* reduced strip leaving the mill */}
          <motion.rect
            x="78"
            y="293"
            height="13"
            rx="6.5"
            fill="url(#cuHot)"
            style={{ width: rolledLen }}
          />
          {/* mill glow + sparks */}
          <motion.ellipse cx="80" cy="299" rx="70" ry="34" fill="url(#heat)" style={{ opacity: millGlow }} filter="url(#soft)" />
          <motion.g style={{ opacity: millSparks }}>
            <motion.g style={{ opacity: millSparksOut }}>
              {[...Array(16)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={86}
                  cy={299}
                  r={1.6}
                  fill="#ffd08a"
                  animate={{
                    x: [0, 44 + i * 9],
                    y: [0, (i % 2 ? 1 : -1) * (30 + i * 4)],
                    opacity: [1, 0],
                  }}
                  transition={{ duration: 0.7 + i * 0.05, repeat: Infinity, delay: i * 0.06, ease: "easeOut" }}
                />
              ))}

            </motion.g>
          </motion.g>
          <text x="-70" y="520" fill="rgba(255,255,255,0.35)" fontSize="15" letterSpacing="6">
            ROLLING MILL — GAUGE REDUCTION
          </text>
        </g>

        {/* ================= 03 — ANNEALING FURNACE ================= */}
        <g transform="translate(880,0)">
          {/* furnace tunnel */}
          <rect x="0" y="180" width="300" height="86" fill="url(#machine)" />
          <rect x="0" y="172" width="300" height="12" fill="#d81f26" opacity="0.85" />
          <rect x="0" y="332" width="300" height="60" fill="url(#machine)" />
          {/* stacks */}
          <rect x="40" y="130" width="22" height="46" fill="#20252b" />
          <rect x="230" y="130" width="22" height="46" fill="#20252b" />
          {/* inner heat */}
          <motion.rect x="0" y="266" width="300" height="66" fill="url(#heat)" style={{ opacity: furnaceHeat }} />
          <motion.ellipse cx="150" cy="299" rx="170" ry="46" fill="url(#heat)" filter="url(#soft)" style={{ opacity: furnaceHeat }} />
          {/* annealed wire crossing the tunnel */}
          <motion.rect x="-10" y="294" height="11" rx="5.5" fill="url(#cuHot)" style={{ width: annealedLen }} />
          {/* haze */}
          <motion.g style={{ opacity: hazeOpacity }}>
            {[70, 150, 230].map((x, i) => (
              <motion.ellipse
                key={x}
                cx={x}
                cy={250}
                rx="26"
                ry="12"
                fill="rgba(255,180,110,0.28)"
                filter="url(#soft)"
                animate={{ cy: [252, 196], opacity: [0.5, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
              />
            ))}
          </motion.g>
          <text x="0" y="520" fill="rgba(255,255,255,0.35)" fontSize="15" letterSpacing="6">
            ANNEALING — 500°C SOFT TEMPER
          </text>
        </g>

        {/* ================= 04 — FINISHED COIL ================= */}
        <g transform="translate(1240,0)">
          {/* feed wire into the winder */}
          <motion.rect x="-70" y="294" height="10" rx="5" fill="url(#cu)" style={{ width: feedLen }} />
          {/* stand */}
          <rect x="86" y="300" width="18" height="92" fill="url(#machine)" />
          <rect x="40" y="386" width="110" height="10" fill="#20252b" />
          {/* spool */}
          <motion.g style={{ rotate: coilSpin, originX: "95px", originY: "290px" }}>
            <circle cx="95" cy="290" r="96" fill="#1b1f24" />
            <circle cx="95" cy="290" r="96" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            {/* wound copper layers */}
            <motion.g style={{ opacity: coilFill }}>
              {[88, 78, 68, 58, 48, 38].map((r, i) => (
                <circle
                  key={r}
                  cx="95"
                  cy="290"
                  r={r}
                  fill="none"
                  stroke={i % 2 ? "#c9793c" : "#f0a765"}
                  strokeWidth="8"
                  opacity={0.95}
                />
              ))}
            </motion.g>
            <circle cx="95" cy="290" r="26" fill="url(#steel)" />
            <rect x="93" y="200" width="4" height="180" fill="rgba(255,255,255,0.06)" />
          </motion.g>
          <text x="-30" y="520" fill="rgba(255,255,255,0.35)" fontSize="15" letterSpacing="6">
            FINISHED COIL — READY TO SHIP
          </text>
        </g>
      </motion.svg>
    </div>
  );
};

export default CopperLine2D;
