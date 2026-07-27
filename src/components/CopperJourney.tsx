import { useRef, RefObject } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Cylinder, Waves, Layers, PackageCheck } from "lucide-react";

/**
 * CopperJourney — ROD → CONDUCTOR EDITION
 * Scroll-driven cinematic sequence, staged inside a dark studio panel:
 *   1. A solid copper rod appears (billet stock)
 *   2. Rod is drawn / elongated into a thin copper wire
 *   3. Wire multiplies into parallel flat strands
 *   4. Strands transpose and bundle into finished CTC copper conductor → catalogue
 */

const stages = [
  {
    id: "rod",
    num: "01",
    icon: Cylinder,
    label: "Copper Rod",
    copy: "It starts with a solid, high-purity copper rod — the raw stock that feeds every winding, busbar and conductor we ship.",
  },
  {
    id: "draw",
    num: "02",
    icon: Waves,
    label: "Drawing & Rolling",
    copy: "The rod is drawn and rolled — stretched thinner, longer, precise — the moment copper becomes conductor-grade wire.",
  },
  {
    id: "strands",
    num: "03",
    icon: Layers,
    label: "Flat Strands",
    copy: "The wire is flattened and multiplied into parallel rectangular strands, ready to be transposed into CTC cable.",
  },
  {
    id: "bundle",
    num: "04",
    icon: PackageCheck,
    label: "Finished Conductor",
    copy: "Strands are transposed and paper-wrapped — delivered as the CTC copper conductors trusted by ABB, Siemens and India's grid leaders.",
  },
];

const CopperJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

  // ---------- STAGE 1: COPPER ROD (0.00 → 0.28) ----------
  const rodOpacity = useTransform(progress, [0, 0.02, 0.32, 0.4], [0, 1, 1, 0]);
  const rodY = useTransform(progress, [0, 0.06], [-60, 0]);
  const rodRotate = useTransform(progress, [0, 0.06, 0.28], [-10, 0, 0]);
  // rod stretches into wire between 0.18 → 0.4
  const rodWidth = useTransform(progress, [0.05, 0.28, 0.42], [260, 520, 620]);
  const rodHeight = useTransform(progress, [0.05, 0.28, 0.42], [46, 14, 6]);
  const rodCapWidth = useTransform(rodHeight, (h) => Math.max(4, (h as number) * 0.35));
  const rodSheenX = useTransform(progress, [0, 0.4], ["-60%", "140%"]);

  // ---------- STAGE 2: DRAWING (0.28 → 0.5) — draw die pinch ----------
  const dieOpacity = useTransform(progress, [0.16, 0.24, 0.44, 0.52], [0, 1, 1, 0]);
  const dieGlow = useTransform(progress, [0.2, 0.32, 0.44], [0, 1, 0]);

  // ---------- STAGE 3: STRANDS (0.5 → 0.78) ----------
  const strandsOpacity = useTransform(progress, [0.44, 0.54, 0.78, 0.85], [0, 1, 1, 0]);
  const strandsSpread = useTransform(progress, [0.5, 0.7], [0, 1]);
  const strandsColor = useTransform(progress, [0.5, 0.65], ["#c68343", "#b87333"]);
  // rod fades out as strands appear
  const rodFinalOpacity = useTransform(progress, [0.42, 0.5], [1, 0]);

  // ---------- STAGE 4: BUNDLE + CATALOGUE (0.78 → 1.0) ----------
  const bundleOpacity = useTransform(progress, [0.75, 0.82, 0.92], [0, 1, 1]);
  const bundleScale = useTransform(progress, [0.78, 0.88], [0.72, 1]);
  const paperWrapX = useTransform(progress, [0.82, 0.9], ["-120%", "0%"]);

  // Catalogue reveal
  const catalogueOpacity = useTransform(progress, [0.9, 0.97], [0, 1]);
  const catalogueScale = useTransform(progress, [0.88, 0.98], [0.82, 1]);
  const catalogueY = useTransform(progress, [0.88, 0.98], [24, 0]);
  const bundleFadeOut = useTransform(progress, [0.9, 0.97], [1, 0]);
  const underlineScale = useTransform(progress, [0.93, 0.99], [0, 1]);
  const labelOpacity = useTransform(progress, [0.9, 0.94], [1, 0]);
  const ctaOpacity = useTransform(progress, [0.94, 0.99], [0, 1]);
  const ctaY = useTransform(progress, [0.94, 0.99], [10, 0]);

  const railScale = useTransform(progress, [0, 1], [0.02, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: "420vh" }}
      aria-label="Copper manufacturing journey"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Heading */}
        <header className="pt-36 md:pt-32 pb-5 text-center px-6 relative z-20">
          <p className="text-minimal text-rational-red mb-2 tracking-[0.35em] text-[10px] md:text-xs">
            THE PROCESS
          </p>
          <h3 className="text-2xl md:text-4xl font-light text-architectural text-foreground">
            From <span className="font-medium">Copper Rod</span> to Finished Conductor
          </h3>
        </header>

        <StageRow progress={progress} containerRef={containerRef} railScale={railScale} />

        {/* ============ STUDIO STAGE ============ */}
        <div className="flex-1 min-h-0 px-4 md:px-10 pb-4">
          <div className="relative h-full w-full max-w-6xl mx-auto rounded-lg border border-border/70 overflow-hidden bg-[hsl(220_14%_8%)]">
            {/* studio backdrop: soft top light + floor gradient + vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.09) 0%, transparent 55%), linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 70% at 50% 45%, transparent 40%, rgba(0,0,0,0.6) 100%)",
              }}
            />
            {/* technical grid */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
            {/* horizon line */}
            <div className="absolute left-8 right-8 top-[64%] h-px bg-white/10" />

            {/* ============ STAGE 1+2: COPPER ROD → WIRE ============ */}
            <motion.div
              style={{ opacity: rodOpacity, y: rodY, rotate: rodRotate }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.div style={{ opacity: rodFinalOpacity }} className="relative">
                <motion.div
                  style={{
                    width: rodWidth,
                    height: rodHeight,
                    background:
                      "linear-gradient(180deg,#3a1d0c 0%,#7a3f18 8%,#b87333 22%,#e39a52 40%,#ffc98a 50%,#e39a52 60%,#b87333 78%,#7a3f18 92%,#2a1408 100%)",
                    boxShadow:
                      "0 18px 40px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,220,180,0.6), inset 0 -2px 4px rgba(0,0,0,0.5)",
                    borderRadius: 999,
                  }}
                  className="relative overflow-hidden"
                >
                  {/* axial brushed streaks */}
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, rgba(255,240,210,0.18) 0 1px, transparent 1px 4px)",
                    }}
                  />
                  {/* moving specular sheen */}
                  <motion.div style={{ x: rodSheenX }} className="absolute inset-y-0 w-1/3">
                    <div
                      className="w-full h-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(255,245,220,0.55) 50%, transparent 100%)",
                        mixBlendMode: "screen",
                      }}
                    />
                  </motion.div>
                  {/* top/bottom micro highlights */}
                  <div className="absolute inset-x-0 top-0 h-px bg-white/60" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-black/50" />
                </motion.div>

                {/* End caps for cylindrical realism */}
                <motion.div
                  style={{
                    height: rodHeight,
                    width: rodCapWidth,
                    background:
                      "radial-gradient(ellipse at 40% 40%, #ffd89a 0%, #c98548 50%, #4a2410 100%)",
                    boxShadow: "inset 0 0 4px rgba(0,0,0,0.5)",
                    borderRadius: "50%",
                  }}
                  className="absolute left-0 top-0 -translate-x-1/2"
                />
                <motion.div
                  style={{
                    height: rodHeight,
                    width: rodCapWidth,
                    background:
                      "radial-gradient(ellipse at 40% 40%, #ffd89a 0%, #c98548 50%, #4a2410 100%)",
                    boxShadow: "inset 0 0 4px rgba(0,0,0,0.5)",
                    borderRadius: "50%",
                  }}
                  className="absolute right-0 top-0 translate-x-1/2"
                />
              </motion.div>
            </motion.div>

            {/* ============ Drawing die pinch ============ */}
            <motion.div
              style={{ opacity: dieOpacity }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* die body */}
                <div
                  className="absolute inset-0 rounded-md"
                  style={{
                    background: "linear-gradient(180deg, #1f1f1f 0%, #3a3a3a 50%, #141414 100%)",
                    boxShadow:
                      "inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -3px 6px rgba(0,0,0,0.6), 0 8px 18px rgba(0,0,0,0.5)",
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 40%, 55% 50%, 100% 60%, 100% 100%, 0 100%, 0 60%, 45% 50%, 0 40%)",
                  }}
                />
                {/* hot friction glow at pinch point */}
                <motion.div
                  style={{ opacity: dieGlow }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-4 rounded-full"
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, #fff4c8 0%, #ff9a3d 50%, transparent 100%)",
                      boxShadow: "0 0 20px 6px rgba(255,150,60,0.7)",
                    }}
                  />
                </motion.div>
                <DrawSparks progress={progress} />
              </div>
            </motion.div>

            {/* ============ STAGE 3: FLAT STRANDS ============ */}
            <motion.div
              style={{ opacity: strandsOpacity }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-[26rem] md:w-[30rem] h-24 flex items-center justify-center">
                {[...Array(9)].map((_, i) => (
                  <Strand key={i} index={i} total={9} spread={strandsSpread} color={strandsColor} />
                ))}
              </div>
            </motion.div>

            {/* ============ STAGE 4: BUNDLE (strands stacked + paper wrap) ============ */}
            <motion.div
              style={{ opacity: bundleOpacity, scale: bundleScale }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.div style={{ opacity: bundleFadeOut }} className="relative">
                {/* Stacked copper strips (edge view, CTC reference) */}
                <div className="relative w-72 h-28 flex flex-col items-center justify-center gap-[2px]">
                  {[...Array(11)].map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-1.5 rounded-sm relative overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(90deg, #5a2e12 0%, #a15726 15%, #d97428 35%, #ffb066 50%, #d97428 65%, #a15726 85%, #5a2e12 100%)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,220,180,0.5), inset 0 -1px 0 rgba(0,0,0,0.45)",
                      }}
                    />
                  ))}
                  {/* Kraft paper wrap sliding in */}
                  <motion.div
                    style={{ x: paperWrapX }}
                    className="absolute left-1/2 -translate-x-1/2 w-52 h-16 rounded-sm"
                  >
                    <div
                      className="w-full h-full rounded-sm"
                      style={{
                        background: "linear-gradient(180deg, #dcb280 0%, #b8895a 55%, #7d5a35 100%)",
                        boxShadow:
                          "inset 0 2px 4px rgba(255,220,180,0.35), inset 0 -3px 6px rgba(0,0,0,0.35), 0 8px 16px rgba(0,0,0,0.4)",
                      }}
                    />
                    {/* paper grain */}
                    <div
                      className="absolute inset-0 opacity-30 mix-blend-multiply rounded-sm"
                      style={{
                        background:
                          "repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0 1px, transparent 1px 3px)",
                      }}
                    />
                  </motion.div>
                  {/* sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-screen"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,240,200,0.3) 0%, transparent 40%, transparent 60%, rgba(255,180,100,0.22) 100%)",
                    }}
                  />
                </div>
                {/* warm rim glow */}
                <div
                  className="absolute inset-0 -z-10 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(255,150,80,0.45) 0%, transparent 70%)",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Final catalogue reveal */}
            <motion.div
              style={{ opacity: catalogueOpacity, y: catalogueY, scale: catalogueScale }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
            >
              <div className="pointer-events-auto bg-card/95 backdrop-blur-sm border border-border shadow-elegant rounded-lg px-8 md:px-10 py-7 text-center max-w-md relative overflow-hidden">
                <div className="text-minimal text-rational-red mb-2 tracking-[0.3em] text-[10px]">
                  PRODUCT CATALOGUE
                </div>
                <div className="text-lg md:text-xl font-medium text-foreground mb-4">
                  Engineered. Certified. Delivered.
                </div>
                <motion.div
                  style={{ scaleX: underlineScale }}
                  className="w-20 h-0.5 bg-rational-red mx-auto mb-5 origin-left"
                />
                <div className="relative h-12 flex items-center justify-center">
                  <motion.div
                    style={{ opacity: labelOpacity }}
                    className="absolute text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
                  >
                    Journey Complete
                  </motion.div>
                  <motion.a
                    href="#products"
                    style={{ opacity: ctaOpacity, y: ctaY }}
                    className="absolute inline-flex items-center gap-2 bg-rational-red text-primary-foreground px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase shadow-[0_8px_24px_-8px_hsl(var(--rational-red)/0.6)] hover:bg-rational-red/90 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_hsl(var(--rational-red)/0.7)] transition-all duration-300"
                  >
                    Explore Products
                    <span aria-hidden>→</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <StageCopy progress={progress} />
      </div>
    </section>
  );
};

// ---------- helpers ----------
const clamp = (v: number) => Math.max(0, Math.min(255, v));
const parseHex = (hex: string) => {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
};
const toHex = (r: number, g: number, b: number) =>
  `#${[r, g, b].map((v) => clamp(v).toString(16).padStart(2, "0")).join("")}`;
const lighten = (hex: string, amt: number) => {
  const [r, g, b] = parseHex(hex);
  return toHex(r + (255 - r) * (amt / 100), g + (255 - g) * (amt / 100), b + (255 - b) * (amt / 100));
};
const darken = (hex: string, amt: number) => {
  const [r, g, b] = parseHex(hex);
  return toHex(r * (1 - amt / 100), g * (1 - amt / 100), b * (1 - amt / 100));
};

const Strand = ({
  index,
  total,
  spread,
  color,
}: {
  index: number;
  total: number;
  spread: MotionValue<number>;
  color: MotionValue<string>;
}) => {
  const offset = index - (total - 1) / 2;
  const y = useTransform(spread, (s) => offset * s * 10);
  const rotate = useTransform(spread, (s) => offset * s * 1.5);
  const bg = useTransform(
    color,
    (c) => `linear-gradient(180deg, ${lighten(c, 25)} 0%, ${c} 45%, ${darken(c, 35)} 100%)`
  );
  return (
    <motion.div
      style={{
        y,
        rotate,
        backgroundImage: bg,
        boxShadow:
          "inset 0 1px 0 rgba(255,220,180,0.5), inset 0 -1px 0 rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.45)",
      }}
      className="absolute w-full h-2 rounded-sm"
    />
  );
};

const DrawSparks = ({ progress }: { progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [0.22, 0.3, 0.42, 0.48], [0, 1, 1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-16 pointer-events-none"
    >
      {[...Array(16)].map((_, i) => {
        const angle = (Math.random() - 0.5) * 1.6;
        const speed = 40 + Math.random() * 60;
        const dx = Math.cos(angle) * speed * (i % 2 === 0 ? 1 : -1);
        const dy = Math.sin(angle) * speed * 0.4;
        return (
          <motion.span
            key={i}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: 2 + Math.random() * 2,
              height: 2 + Math.random() * 2,
              background: "radial-gradient(circle, #fff2a8 0%, #ff9a3d 55%, #d43a0a 100%)",
              boxShadow: "0 0 6px 2px rgba(255,150,60,0.8)",
            }}
            animate={{
              x: [0, dx],
              y: [0, dy, dy + 30],
              opacity: [0, 1, 0],
              scale: [1, 1, 0.3],
            }}
            transition={{
              duration: 0.6 + Math.random() * 0.5,
              repeat: Infinity,
              delay: (i % 8) * 0.06 + Math.random() * 0.25,
              ease: "easeOut",
            }}
          />
        );
      })}
    </motion.div>
  );
};

const StageRow = ({
  progress,
  containerRef,
  railScale,
}: {
  progress: MotionValue<number>;
  containerRef: RefObject<HTMLDivElement>;
  railScale: MotionValue<number>;
}) => {
  const jumpTo = (target: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: sectionTop + scrollable * target, behavior: "smooth" });
  };

  return (
    <div className="relative z-10 px-6 md:px-16 pb-4">
      <div className="relative max-w-6xl mx-auto">
        {/* progress rail */}
        <div className="absolute left-0 right-0 top-5 h-px bg-border" aria-hidden>
          <motion.div
            style={{ scaleX: railScale }}
            className="h-px w-full bg-rational-red origin-left"
          />
        </div>
        <div className="relative grid grid-cols-4 gap-2 md:gap-6">
          {stages.map((s, i) => {
            const start = i * 0.25;
            const end = start + 0.25;
            const mid = (start + end) / 2;
            return (
              <StageChip
                key={s.id}
                stage={s}
                start={start}
                end={end}
                progress={progress}
                onClick={() => jumpTo(mid)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const StageChip = ({
  stage,
  start,
  end,
  progress,
  onClick,
}: {
  stage: (typeof stages)[number];
  start: number;
  end: number;
  progress: MotionValue<number>;
  onClick: () => void;
}) => {
  const opacity = useTransform(progress, [start - 0.06, start, end, end + 0.06], [0.45, 1, 1, 0.45]);
  const dotScale = useTransform(progress, [start - 0.06, start, end, end + 0.06], [1, 1.25, 1.25, 1]);
  const Icon = stage.icon;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={{ opacity }}
      aria-label={`Jump to ${stage.label} stage`}
      className="flex flex-col items-center text-center gap-2 group cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rational-red rounded-md"
    >
      <motion.span
        style={{ scale: dotScale }}
        className="w-10 h-10 rounded-full border border-rational-red/40 group-hover:border-rational-red group-hover:bg-rational-red/10 flex items-center justify-center bg-background transition-colors duration-300"
      >
        <Icon className="w-4 h-4 text-rational-red" />
      </motion.span>
      <span className="text-[10px] tracking-[0.25em] text-muted-foreground">{stage.num}</span>
      <span className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-foreground group-hover:text-rational-red font-medium transition-colors duration-300">
        {stage.label}
      </span>
    </motion.button>
  );
};

const StageCopy = ({ progress }: { progress: MotionValue<number> }) => {
  return (
    <div className="relative h-24 md:h-20 px-6 pb-6 pt-2">
      {stages.map((s, i) => {
        const start = i * 0.25;
        const end = start + 0.25;
        return <StageCopyItem key={s.id} copy={s.copy} start={start} end={end} progress={progress} />;
      })}
    </div>
  );
};

const StageCopyItem = ({
  copy,
  start,
  end,
  progress,
}: {
  copy: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, [start - 0.03, start + 0.03, end - 0.03, end + 0.03], [0, 1, 1, 0]);
  const y = useTransform(progress, [start - 0.03, start + 0.03], [12, 0]);
  return (
    <motion.p
      style={{ opacity, y }}
      className="absolute inset-x-6 md:inset-x-24 text-center text-sm md:text-[15px] leading-relaxed text-muted-foreground font-light max-w-2xl mx-auto"
    >
      {copy}
    </motion.p>
  );
};

export default CopperJourney;
