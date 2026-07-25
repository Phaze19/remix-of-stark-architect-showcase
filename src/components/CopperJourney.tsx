import { useRef, RefObject } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { FlaskConical, Snowflake, Layers, PackageCheck } from "lucide-react";

/**
 * CopperJourney — MOLTEN POUR EDITION
 * Scroll-driven cinematic sequence:
 *   1. Molten copper pours from a crucible (bright yellow-orange liquid)
 *   2. Stream lands and solidifies into a rectangular billet, cooling to copper
 *   3. Billet splits into multiple flat strands (like the CTC reference photo)
 *   4. Strands bundle together into finished CTC → catalogue reveal
 */

const stages = [
  {
    id: "pour",
    icon: FlaskConical,
    label: "Molten Pour",
    copy: "1085°C molten copper cascades from the crucible — the raw energy that becomes every winding, every busbar, every conductor we ship.",
  },
  {
    id: "solidify",
    icon: Snowflake,
    label: "Casting & Cooling",
    copy: "The stream settles into precision molds and solidifies into a dense copper billet, its grain structure locked for maximum conductivity.",
  },
  {
    id: "strands",
    icon: Layers,
    label: "Rolling into Strands",
    copy: "The billet is rolled and slit into flat rectangular strands — the individual conductors that will be transposed into CTC cable.",
  },
  {
    id: "bundle",
    icon: PackageCheck,
    label: "Bundling & Catalogue",
    copy: "Strands are paper-wrapped, transposed, and bundled — delivered as the CTC conductors trusted by ABB, Siemens and India's grid leaders.",
  },
];

const CopperJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

  // ---------- STAGE 1: MOLTEN POUR (0.00 → 0.25) ----------
  const crucibleTilt = useTransform(progress, [0, 0.05, 0.22, 0.28], [-10, -70, -70, -10]);
  const crucibleOpacity = useTransform(progress, [0, 0.02, 0.25, 0.3], [0, 1, 1, 0]);
  const streamOpacity = useTransform(progress, [0.04, 0.08, 0.24, 0.3], [0, 1, 1, 0]);
  const streamHeight = useTransform(progress, [0.04, 0.12, 0.25], ["0%", "70%", "70%"]);

  // ---------- STAGE 2: BILLET SOLIDIFY (0.25 → 0.5) ----------
  const billetOpacity = useTransform(progress, [0.22, 0.3, 0.55, 0.62], [0, 1, 1, 0]);
  const billetScaleY = useTransform(progress, [0.22, 0.34], [0.1, 1]);
  const billetWidth = useTransform(progress, [0.3, 0.5], [180, 320]);
  // color: bright molten yellow → orange → cooled copper
  const billetColor = useTransform(
    progress,
    [0.25, 0.35, 0.5],
    ["#fff2a8", "#ff8a3d", "#b87333"]
  );
  const billetGlow = useTransform(progress, [0.25, 0.35, 0.5, 0.6], [40, 30, 8, 0]);

  // ---------- STAGE 3: STRANDS SPLIT (0.5 → 0.78) ----------
  const strandsOpacity = useTransform(progress, [0.5, 0.58, 0.78, 0.85], [0, 1, 1, 0]);
  const strandsSpread = useTransform(progress, [0.5, 0.7], [0, 1]); // 0 = stacked, 1 = fanned
  const strandsColor = useTransform(progress, [0.5, 0.65], ["#c68343", "#b87333"]);

  // ---------- STAGE 4: BUNDLE + CATALOGUE (0.78 → 1.0) ----------
  const bundleOpacity = useTransform(progress, [0.75, 0.82, 0.9], [0, 1, 1]);
  const bundleScale = useTransform(progress, [0.78, 0.88], [0.7, 1]);
  const strandsBundleX = useTransform(progress, [0.78, 0.88], [1, 0]); // spread collapses

  // Catalogue reveal
  const catalogueOpacity = useTransform(progress, [0.9, 0.97], [0, 1]);
  const catalogueScale = useTransform(progress, [0.88, 0.98], [0.6, 1]);
  const catalogueY = useTransform(progress, [0.88, 0.98], [30, 0]);
  const bundleFadeOut = useTransform(progress, [0.9, 0.97], [1, 0]);
  const underlineScale = useTransform(progress, [0.93, 0.99], [0, 1]);
  const labelOpacity = useTransform(progress, [0.9, 0.94], [1, 0]);
  const ctaOpacity = useTransform(progress, [0.94, 0.99], [0, 1]);
  const ctaY = useTransform(progress, [0.94, 0.99], [10, 0]);

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: "500vh" }}
      aria-label="Copper manufacturing journey"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Heading */}
        <div className="pt-20 pb-6 text-center px-6 relative z-20">
          <h2 className="text-minimal text-rational-red mb-3 tracking-widest">THE JOURNEY</h2>
          <h3 className="text-3xl md:text-5xl font-light text-architectural text-foreground">
            From <span className="font-medium">Molten Copper</span> to Finished Conductor
          </h3>
          <div className="w-12 h-0.5 bg-rational-red mx-auto mt-4" />
        </div>

        <StageRow progress={progress} containerRef={containerRef} />

        {/* Main stage */}
        <div className="flex-1 relative flex items-center justify-center">
          {/* ambient floor line */}
          <div className="absolute left-0 right-0 top-[65%] h-px bg-border" />

          {/* ============ STAGE 1: CRUCIBLE + MOLTEN STREAM ============ */}
          <motion.div
            style={{ opacity: crucibleOpacity }}
            className="absolute left-1/2 top-[18%] -translate-x-1/2 pointer-events-none"
          >
            <motion.div
              style={{ rotate: crucibleTilt, transformOrigin: "80% 90%" }}
              className="relative"
            >
              {/* Crucible body */}
              <div
                className="w-40 h-24 rounded-b-[40%] relative"
                style={{
                  background:
                    "linear-gradient(to bottom, #2a2a2a 0%, #444 40%, #1a1a1a 100%)",
                  boxShadow:
                    "inset 0 -6px 12px rgba(0,0,0,0.6), inset 0 2px 3px rgba(255,255,255,0.15), 0 8px 20px rgba(0,0,0,0.5)",
                }}
              >
                {/* Molten surface glow inside */}
                <div
                  className="absolute inset-x-2 top-1 h-4 rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, #fff0a8 0%, #ff8a3d 45%, #b83a10 100%)",
                    boxShadow: "0 0 20px 6px rgba(255,140,40,0.7)",
                  }}
                />
                {/* Rim */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-white/30 to-transparent" />
              </div>
              {/* Pour spout */}
              <div className="absolute -right-3 top-2 w-6 h-4 bg-neutral-800 rounded-r-full" />
            </motion.div>
          </motion.div>

          {/* Molten stream */}
          <motion.div
            style={{ opacity: streamOpacity }}
            className="absolute left-1/2 top-[24%] -translate-x-1/2 pointer-events-none flex justify-center"
          >
            <motion.div
              style={{
                height: streamHeight,
                background:
                  "linear-gradient(to bottom, #fff2a8 0%, #ffb040 30%, #ff6a1a 70%, #d43a0a 100%)",
                boxShadow:
                  "0 0 24px 6px rgba(255,150,50,0.7), 0 0 60px 12px rgba(255,90,20,0.4)",
                filter: "blur(0.3px)",
              }}
              className="w-3 rounded-full origin-top"
            />
            {/* Splash sparks at base */}
            <MoltenSparks progress={progress} />
          </motion.div>

          {/* ============ STAGE 2: SOLIDIFYING BILLET ============ */}
          <motion.div
            style={{ opacity: billetOpacity }}
            className="absolute left-1/2 top-[52%] -translate-x-1/2 pointer-events-none"
          >
            <motion.div
              style={{
                width: billetWidth,
                scaleY: billetScaleY,
                backgroundImage: useTransform(
                  billetColor,
                  (c) =>
                    `linear-gradient(to bottom, ${lighten(c, 40)} 0%, ${c} 40%, ${darken(c, 30)} 100%)`
                ),
                boxShadow: useTransform(
                  billetGlow,
                  (g) =>
                    `0 0 ${g * 2}px ${g}px rgba(255,140,40,${g / 60}), inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.5)`
                ),
                transformOrigin: "center top",
              }}
              className="h-16 rounded-md relative overflow-hidden"
            >
              {/* Cooling shimmer */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                }}
              />
              <div className="absolute inset-x-0 top-0 h-px bg-white/50" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-black/50" />
            </motion.div>
          </motion.div>

          {/* ============ STAGE 3: FANNED STRANDS ============ */}
          <motion.div
            style={{ opacity: strandsOpacity }}
            className="absolute left-1/2 top-[52%] -translate-x-1/2 pointer-events-none"
          >
            <div className="relative w-96 h-16 flex items-center justify-center">
              {[...Array(7)].map((_, i) => (
                <Strand
                  key={i}
                  index={i}
                  total={7}
                  spread={strandsSpread}
                  color={strandsColor}
                />
              ))}
            </div>
          </motion.div>

          {/* ============ STAGE 4: BUNDLE (strands collapsed + paper wrap) ============ */}
          <motion.div
            style={{ opacity: bundleOpacity, scale: bundleScale }}
            className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <motion.div style={{ opacity: bundleFadeOut }} className="relative">
              {/* Stacked copper strips (edge view, like the reference photo) */}
              <div className="relative w-72 h-24 flex flex-col items-center justify-center gap-[2px]">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-1.5 rounded-sm relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(90deg, #7a3f18 0%, #d97428 20%, #ff9a4d 45%, #ffb066 55%, #d97428 80%, #7a3f18 100%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,220,180,0.5), inset 0 -1px 0 rgba(0,0,0,0.4)",
                    }}
                  />
                ))}
                {/* Kraft paper wrap at bottom */}
                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-10 rounded-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, #d4a878 0%, #b8895a 60%, #8a6640 100%)",
                    boxShadow:
                      "inset 0 2px 4px rgba(0,0,0,0.2), 0 6px 12px rgba(0,0,0,0.35)",
                  }}
                />
                {/* Highlight sheen across the strips */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-screen"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,240,200,0.35) 0%, transparent 40%, transparent 60%, rgba(255,180,100,0.25) 100%)",
                  }}
                />
              </div>
              {/* Warm rim glow */}
              <div
                className="absolute inset-0 -z-10 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,150,80,0.55) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Final catalogue reveal */}
          <motion.div
            style={{ opacity: catalogueOpacity, y: catalogueY, scale: catalogueScale }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="pointer-events-auto bg-card border border-rational-red/40 shadow-elegant rounded-lg px-10 py-7 text-center max-w-md relative overflow-hidden">
              <div className="text-minimal text-rational-red mb-2">PRODUCT CATALOGUE</div>
              <div className="text-xl font-medium text-foreground mb-4">
                Engineered. Certified. Delivered.
              </div>
              <motion.div
                style={{ scaleX: underlineScale }}
                className="w-24 h-0.5 bg-rational-red mx-auto mb-4 origin-left"
              />
              <div className="relative h-12 flex items-center justify-center">
                <motion.div
                  style={{ opacity: labelOpacity }}
                  className="absolute text-xs tracking-widest text-muted-foreground uppercase"
                >
                  Journey Complete
                </motion.div>
                <motion.a
                  href="#products"
                  style={{ opacity: ctaOpacity, y: ctaY }}
                  className="absolute inline-flex items-center gap-2 bg-rational-red text-white px-8 py-3 text-sm font-medium tracking-wider uppercase shadow-[0_8px_24px_-8px_hsl(var(--rational-red)/0.6)] hover:bg-rational-red/90 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_hsl(var(--rational-red)/0.7)] transition-all duration-300"
                >
                  Explore Products
                  <span aria-hidden>→</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
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
  const y = useTransform(spread, (s) => offset * s * 14);
  const rotate = useTransform(spread, (s) => offset * s * 2);
  const bg = useTransform(
    color,
    (c) =>
      `linear-gradient(180deg, ${lighten(c, 25)} 0%, ${c} 45%, ${darken(c, 35)} 100%)`
  );
  return (
    <motion.div
      style={{
        y,
        rotate,
        backgroundImage: bg,
        boxShadow:
          "inset 0 1px 0 rgba(255,220,180,0.5), inset 0 -1px 0 rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)",
      }}
      className="absolute w-80 h-2 rounded-sm"
    />
  );
};

const MoltenSparks = ({ progress }: { progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [0.06, 0.12, 0.24, 0.3], [0, 1, 1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 pointer-events-none"
    >
      {[...Array(14)].map((_, i) => {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
        const speed = 30 + Math.random() * 70;
        const dx = Math.cos(angle) * speed;
        const rise = Math.sin(angle) * speed;
        const fall = 40 + Math.random() * 50;
        return (
          <motion.span
            key={i}
            className="absolute bottom-0 left-1/2 rounded-full"
            style={{
              width: 2 + Math.random() * 2,
              height: 2 + Math.random() * 2,
              background:
                "radial-gradient(circle, #fff2a8 0%, #ff9a3d 50%, #d43a0a 100%)",
              boxShadow: "0 0 6px 2px rgba(255,150,60,0.8)",
            }}
            animate={{
              x: [0, dx, dx * 1.15],
              y: [0, rise, rise + fall],
              opacity: [0, 1, 0],
              scale: [1, 1, 0.3],
            }}
            transition={{
              duration: 0.7 + Math.random() * 0.6,
              repeat: Infinity,
              delay: (i % 8) * 0.08 + Math.random() * 0.3,
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
}: {
  progress: MotionValue<number>;
  containerRef: RefObject<HTMLDivElement>;
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
    <div className="grid grid-cols-4 gap-2 md:gap-6 px-6 md:px-16 py-4 relative z-10">
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
  const opacity = useTransform(progress, [start - 0.05, start, end, end + 0.05], [0.3, 1, 1, 0.3]);
  const scale = useTransform(progress, [start - 0.05, start, end, end + 0.05], [0.95, 1.05, 1.05, 0.95]);
  const Icon = stage.icon;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={{ opacity, scale }}
      aria-label={`Jump to ${stage.label} stage`}
      className="flex flex-col items-center text-center gap-2 group cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rational-red rounded-md"
    >
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-rational-red/50 group-hover:border-rational-red group-hover:bg-rational-red/10 flex items-center justify-center bg-background transition-colors duration-300">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-rational-red" />
      </div>
      <div className="text-[10px] md:text-xs tracking-widest uppercase text-foreground group-hover:text-rational-red font-medium transition-colors duration-300">
        {stage.label}
      </div>
    </motion.button>
  );
};

const StageCopy = ({ progress }: { progress: MotionValue<number> }) => {
  return (
    <div className="relative h-28 md:h-24 px-6 pb-8 pt-4">
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
      className="absolute inset-x-6 md:inset-x-24 text-center text-sm md:text-base text-muted-foreground font-light max-w-2xl mx-auto"
    >
      {copy}
    </motion.p>
  );
};

export default CopperJourney;
