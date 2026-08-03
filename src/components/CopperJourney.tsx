import { useRef, RefObject, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Cylinder, Waves, Layers, PackageCheck } from "lucide-react";
import CopperScene from "@/components/journey/CopperScene";
import productCtcPaper from "@/assets/product-ctc-paper.jpg";
import productCtcBare from "@/assets/product-ctc-bare.jpg";
import productEnameled from "@/assets/product-enameled-wire.jpg";
import productBusbar from "@/assets/product-busbar.jpg";

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
    label: "Product Portfolio",
    copy: "Transposed and paper-wrapped, the drawn copper becomes our product portfolio — CTC conductors, enameled wire and busbars trusted by India's grid leaders.",
  },
];

/**
 * Single source of truth for stage timing.
 * The visuals, the stage copy and the 01–04 rail all read from these bands,
 * so the animation is exactly in sync with the section the rail is pointing at.
 */
const SEG = 1 / stages.length; // 0.25
export const stageBand = (i: number) => ({ start: i * SEG, end: (i + 1) * SEG });
// blend window used for cross-fades between neighbouring stages
const FADE = SEG * 0.22;

/** Products the journey resolves into at the end of the sequence. */
const portfolio = [
  { image: productCtcPaper, title: "CTC — Paper Covered" },
  { image: productCtcBare, title: "CTC — Bare Transposed" },
  { image: productEnameled, title: "Enameled Wire" },
  { image: productBusbar, title: "Copper Busbars" },
];

/**
 * Responsive scroll timing.
 * Each breakpoint gets its own scroll length and visual scale so the four
 * 25% bands land on the same beats on mobile, tablet and desktop.
 */
type BP = "mobile" | "tablet" | "desktop";
const BREAKPOINT_CONFIG: Record<BP, { height: string; scale: number; damping: number; stiffness: number }> = {
  // shorter scroll on touch devices (momentum scrolling covers more per gesture)
  mobile: { height: "300vh", scale: 0.56, damping: 26, stiffness: 130 },
  tablet: { height: "380vh", scale: 0.78, damping: 28, stiffness: 115 },
  desktop: { height: "460vh", scale: 1, damping: 30, stiffness: 100 },
};

const useBreakpoint = (): BP => {
  const [bp, setBp] = useState<BP>("desktop");
  useEffect(() => {
    const read = () => {
      const w = window.innerWidth;
      setBp(w < 768 ? "mobile" : w < 1280 ? "tablet" : "desktop");
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);
  return bp;
};

const CopperJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bp = useBreakpoint();
  const cfg = BREAKPOINT_CONFIG[bp];
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { damping: cfg.damping, stiffness: cfg.stiffness });

  const b0 = stageBand(0); // 0.00 → 0.25  rod
  const b1 = stageBand(1); // 0.25 → 0.50  drawing
  const b2 = stageBand(2); // 0.50 → 0.75  strands
  const b3 = stageBand(3); // 0.75 → 1.00  bundle + catalogue

  // Stages 01–04 are rendered by the real-time 3D rig (CopperScene),
  // which reads the same progress value and the same 25% stage bands.


  // Catalogue / portfolio reveal — final part of stage 4
  const catRevealStart = b3.start + SEG * 0.5;
  const catalogueOpacity = useTransform(progress, [catRevealStart, b3.end - 0.06], [0, 1]);
  const catalogueScale = useTransform(progress, [catRevealStart - 0.02, b3.end - 0.05], [0.82, 1]);
  const catalogueY = useTransform(progress, [catRevealStart - 0.02, b3.end - 0.05], [24, 0]);
  const bundleFadeOut = useTransform(progress, [catRevealStart, b3.end - 0.06], [1, 0]);
  const underlineScale = useTransform(progress, [catRevealStart + 0.02, b3.end - 0.05], [0, 1]);
  // product tiles fan in one after another as the conductor becomes the portfolio
  const tilesStart = catRevealStart + SEG * 0.12;
  const tilesEnd = b3.end - 0.02;
  const labelOpacity = useTransform(progress, [tilesStart, tilesStart + 0.03], [1, 0]);
  const ctaOpacity = useTransform(progress, [tilesStart + 0.03, b3.end - 0.01], [0, 1]);
  const ctaY = useTransform(progress, [tilesStart + 0.03, b3.end - 0.01], [10, 0]);

  const railScale = useTransform(progress, [0, 1], [0.02, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: cfg.height }}
      aria-label="Copper manufacturing journey"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Heading */}
        <header className="pt-36 md:pt-32 pb-5 text-center px-6 relative z-20">
          <p className="text-minimal text-rational-red mb-2 tracking-[0.35em] text-[10px] md:text-xs">
            THE PROCESS
          </p>
          <h3 className="text-2xl md:text-4xl font-light text-architectural text-foreground">
            From <span className="font-medium">Copper Rod</span> to Our Product Portfolio
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

            {/* ============ STAGES 01–04: REAL-TIME 3D ROLLING RIG ============ */}
            <CopperScene progress={progress} scale={cfg.scale} />


            {/* Final reveal — bundle resolves into the product portfolio */}
            <motion.div
              style={{ opacity: catalogueOpacity, y: catalogueY, scale: catalogueScale }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 md:px-6"
            >
              <div className="pointer-events-auto bg-card/95 backdrop-blur-sm border border-border shadow-elegant rounded-lg px-5 sm:px-8 md:px-10 py-6 md:py-7 text-center w-full max-w-[22rem] sm:max-w-lg md:max-w-2xl relative overflow-hidden">
                <div className="text-minimal text-rational-red mb-2 tracking-[0.3em] text-[10px]">
                  PRODUCT PORTFOLIO
                </div>
                <div className="text-base md:text-xl font-medium text-foreground mb-4">
                  Engineered. Certified. Delivered.
                </div>
                <motion.div
                  style={{ scaleX: underlineScale }}
                  className="w-20 h-0.5 bg-rational-red mx-auto mb-5 origin-left"
                />

                {/* the drawn conductor resolving into finished products */}
                <div className="grid grid-cols-4 gap-2 md:gap-3 mb-5">
                  {portfolio.map((p, i) => (
                    <ProductTile
                      key={p.title}
                      product={p}
                      index={i}
                      total={portfolio.length}
                      progress={progress}
                      start={tilesStart}
                      end={tilesEnd}
                    />
                  ))}
                </div>

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
                    className="absolute inline-flex items-center gap-2 bg-rational-red text-primary-foreground px-6 md:px-8 py-3 text-[11px] md:text-xs font-medium tracking-[0.2em] uppercase shadow-[0_8px_24px_-8px_hsl(var(--rational-red)/0.6)] hover:bg-rational-red/90 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_hsl(var(--rational-red)/0.7)] transition-all duration-300"
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

/** A finished product emerging from the drawn conductor, staggered by scroll. */
const ProductTile = ({
  product,
  index,
  total,
  progress,
  start,
  end,
}: {
  product: { image: string; title: string };
  index: number;
  total: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) => {
  const span = end - start;
  const step = span / (total + 1);
  const a = start + step * index;
  const b = a + step * 1.6;
  const opacity = useTransform(progress, [a, b], [0, 1]);
  const y = useTransform(progress, [a, b], [18, 0]);
  const scale = useTransform(progress, [a, b], [0.85, 1]);
  return (
    <motion.a
      href="#products"
      style={{ opacity, y, scale }}
      className="group block rounded-md overflow-hidden border border-border/70 bg-muted"
      aria-label={product.title}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="px-1 py-1.5 text-[8px] md:text-[9px] tracking-[0.12em] uppercase text-muted-foreground truncate">
        {product.title}
      </div>
    </motion.a>
  );
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
  const b1 = stageBand(1);
  const opacity = useTransform(
    progress,
    [b1.start - FADE * 0.5, b1.start + FADE, b1.end - FADE * 1.5, b1.end - FADE * 0.4],
    [0, 1, 1, 0]
  );
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
            const { start, end } = stageBand(i);
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
  const opacity = useTransform(progress, [start - FADE, start, end - FADE * 0.3, end], [0.4, 1, 1, 0.4]);
  const dotScale = useTransform(progress, [start - FADE, start, end - FADE * 0.3, end], [1, 1.25, 1.25, 1]);
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
        const { start, end } = stageBand(i);
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
  const opacity = useTransform(progress, [start - FADE * 0.5, start + FADE * 0.5, end - FADE * 0.5, end + FADE * 0.5], [0, 1, 1, 0]);
  const y = useTransform(progress, [start - FADE * 0.5, start + FADE * 0.5], [12, 0]);
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
