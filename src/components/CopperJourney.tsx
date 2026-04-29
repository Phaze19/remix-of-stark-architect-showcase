import { useRef, RefObject } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Flame, Droplets, Disc3, PackageCheck } from "lucide-react";

/**
 * shade(hex, amt)
 * Lighten (+) or darken (-) a hex color by `amt` (0-100).
 * Used to synthesize realistic metallic highlights/shadows on the rod.
 */
const shade = (hex: string, amt: number) => {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  const adj = (v: number) => {
    const k = amt >= 0 ? (255 - v) * (amt / 100) : v * (amt / 100);
    return Math.max(0, Math.min(255, Math.round(v + k)));
  };
  const to = (v: number) => v.toString(16).padStart(2, "0");
  return `#${to(adj(r))}${to(adj(g))}${to(adj(b))}`;
};

/**
 * CopperJourney
 * A sticky scroll-triggered section. As the user scrolls, a copper rod
 * swings in and travels horizontally through four manufacturing stages,
 * thinning from a rod into a fine enameled wire that finally spools
 * into the finished product catalogue preview.
 */

const stages = [
  {
    id: "drawing",
    icon: Disc3,
    label: "Rolling & Drawing",
    copy: "Cast copper billets are rolled and drawn through precision dies — reducing diameter while aligning the grain structure for maximum conductivity.",
  },
  {
    id: "annealing",
    icon: Flame,
    label: "Annealing",
    copy: "Controlled heat treatment softens the copper, relieving internal stress and delivering the flexibility demanded by transformer windings.",
  },
  {
    id: "enameling",
    icon: Droplets,
    label: "Enameling & Insulation",
    copy: "Multi-pass enamel coating builds a uniform dielectric film — the invisible barrier that separates failure from 40+ years of service life.",
  },
  {
    id: "winding",
    icon: PackageCheck,
    label: "Winding, QC & Catalogue",
    copy: "Finished wire is precision-wound, inspected, certified — and shipped as the products trusted by ABB, Siemens and India's grid leaders.",
  },
];

const CopperJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

  // Rod swings in at the very start (0 -> 0.08), then travels left->right
  const swingRotate = useTransform(progress, [0, 0.08], [-60, 0]);
  const swingY = useTransform(progress, [0, 0.08], [-200, 0]);
  const rodX = useTransform(progress, [0.08, 0.95], ["-40%", "40%"]);

  // Rod thins progressively as it passes through each stage
  const rodHeight = useTransform(
    progress,
    [0.08, 0.3, 0.55, 0.8, 0.95],
    [36, 22, 12, 6, 4]
  );

  // Color journey: bright copper -> red hot (annealing) -> dark enamel -> finished
  const rodColor = useTransform(
    progress,
    [0.08, 0.3, 0.5, 0.7, 0.9],
    ["#b87333", "#d97706", "#ef4444", "#1f2937", "#0f172a"]
  );

  // Glow intensity spikes during annealing
  const glow = useTransform(
    progress,
    [0.25, 0.4, 0.55, 0.7],
    [0, 30, 20, 0]
  );

  // Final catalogue reveal — slides up from below, fades in
  const catalogueOpacity = useTransform(progress, [0.82, 0.92], [0, 1]);
  const catalogueY = useTransform(progress, [0.82, 0.95], [60, 0]);
  // Red accent underline grows from 0 -> full width
  const underlineScale = useTransform(progress, [0.88, 0.98], [0, 1]);
  // Smooth swap: label fades out, CTA fades in
  const labelOpacity = useTransform(progress, [0.88, 0.93], [1, 0]);
  const ctaOpacity = useTransform(progress, [0.93, 0.99], [0, 1]);
  const ctaY = useTransform(progress, [0.93, 0.99], [10, 0]);
  // Rod fades out as catalogue takes over
  const rodOpacity = useTransform(progress, [0.82, 0.92], [1, 0]);

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
          <h2 className="text-minimal text-rational-red mb-3 tracking-widest">
            THE JOURNEY
          </h2>
          <h3 className="text-3xl md:text-5xl font-light text-architectural text-foreground">
            From Raw Copper to <span className="font-medium">Mission-Critical Wire</span>
          </h3>
          <div className="w-12 h-0.5 bg-rational-red mx-auto mt-4" />
        </div>

        {/* Stage grid (4 columns, active highlights by scroll progress) */}
        <StageRow progress={progress} containerRef={containerRef} />

        {/* Rod track */}
        <div className="flex-1 relative flex items-center justify-center">
          {/* Horizontal track line */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-border" />

          {/* Moving rod */}
          <motion.div
            style={{
              x: rodX,
              y: swingY,
              rotate: swingRotate,
              opacity: rodOpacity,
            }}
            className="relative"
          >
            <motion.div
              style={{
                height: rodHeight,
                // PHOTOREALISTIC copper cylinder:
                // 7-stop vertical gradient simulating Fresnel falloff on a polished metal cylinder.
                // Dark rim -> warm shadow -> mid copper -> bright specular core -> warm highlight -> mid -> dark rim
                backgroundImage: useTransform(
                  rodColor,
                  (c) =>
                    `linear-gradient(to bottom,
                      ${shade(c, -60)} 0%,
                      ${shade(c, -35)} 8%,
                      ${shade(c, -10)} 22%,
                      ${shade(c, 25)} 38%,
                      ${shade(c, 55)} 46%,
                      ${shade(c, 30)} 54%,
                      ${shade(c, 5)} 65%,
                      ${shade(c, -20)} 78%,
                      ${shade(c, -45)} 90%,
                      ${shade(c, -65)} 100%)`
                ),
                boxShadow: useTransform(
                  glow,
                  (g) =>
                    `0 ${Math.max(2, g * 0.4)}px ${Math.max(8, g * 1.5)}px rgba(0,0,0,0.45), 0 0 ${g * 2}px ${g}px rgba(239, 68, 68, 0.55), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.4)`
                ),
              }}
              className="w-64 md:w-96 rounded-full origin-center relative overflow-hidden"
            >
              {/* Anisotropic brushed-metal axial streaks (very fine) */}
              <div
                className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255,240,220,0.10) 0 0.5px, rgba(0,0,0,0.10) 0.5px 1.5px, rgba(255,255,255,0.04) 1.5px 2.5px, rgba(0,0,0,0.06) 2.5px 4px)",
                }}
              />
              {/* Subtle oxidation / patina mottling */}
              <div
                className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse 30% 80% at 18% 50%, rgba(80,40,20,0.4), transparent 70%), radial-gradient(ellipse 25% 70% at 62% 50%, rgba(60,30,15,0.35), transparent 70%), radial-gradient(ellipse 20% 60% at 88% 50%, rgba(90,50,25,0.3), transparent 70%)",
                }}
              />
              {/* Primary specular highlight — sharp, off-center */}
              <div
                className="absolute left-[3%] right-[3%] top-[40%] h-[8%] rounded-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 100%)",
                  filter: "blur(0.4px)",
                  mixBlendMode: "screen",
                }}
              />
              {/* Secondary warm highlight (copper sheen) */}
              <div
                className="absolute left-0 right-0 top-[52%] h-[5%] rounded-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255,210,160,0) 0%, rgba(255,210,160,0.6) 50%, rgba(255,210,160,0) 100%)",
                  filter: "blur(1.2px)",
                  mixBlendMode: "screen",
                }}
              />
              {/* Lower rim warm reflection (light bouncing back up) */}
              <div
                className="absolute left-0 right-0 bottom-[14%] h-[5%] rounded-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(255,170,100,0) 0%, rgba(255,170,100,0.45) 60%, rgba(255,170,100,0) 100%)",
                  filter: "blur(1px)",
                  mixBlendMode: "screen",
                }}
              />
              {/* Top micro-edge highlight */}
              <div className="absolute left-[2%] right-[2%] top-0 h-px pointer-events-none bg-white/40" />
              {/* Bottom micro-edge shadow */}
              <div className="absolute left-[2%] right-[2%] bottom-0 h-px pointer-events-none bg-black/50" />
              {/* Left end-cap: dark fresnel + elliptical face suggestion */}
              <div
                className="absolute inset-y-0 left-0 w-12 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(40,20,10,0.4) 40%, rgba(0,0,0,0) 100%)",
                }}
              />
              <motion.div
                className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none"
                style={{
                  width: useTransform(rodHeight, (h) => h * 0.45),
                  height: useTransform(rodHeight, (h) => h * 0.95),
                  borderRadius: "50%",
                  background: useTransform(
                    rodColor,
                    (c) =>
                      `radial-gradient(ellipse at 65% 40%, ${shade(c, 20)} 0%, ${shade(c, -20)} 50%, ${shade(c, -60)} 100%)`
                  ),
                  boxShadow: "inset 1px 0 2px rgba(0,0,0,0.5)",
                }}
              />
              {/* Right end-cap */}
              <div
                className="absolute inset-y-0 right-0 w-12 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(40,20,10,0.4) 40%, rgba(0,0,0,0) 100%)",
                }}
              />
              <motion.div
                className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none"
                style={{
                  width: useTransform(rodHeight, (h) => h * 0.45),
                  height: useTransform(rodHeight, (h) => h * 0.95),
                  borderRadius: "50%",
                  background: useTransform(
                    rodColor,
                    (c) =>
                      `radial-gradient(ellipse at 35% 40%, ${shade(c, 20)} 0%, ${shade(c, -20)} 50%, ${shade(c, -60)} 100%)`
                  ),
                  boxShadow: "inset -1px 0 2px rgba(0,0,0,0.5)",
                }}
              />
            </motion.div>
            {/* Sparks / particles during drawing + annealing */}
            <Particles progress={progress} />
          </motion.div>

          {/* Final catalogue reveal — slides in, animated red underline, CTA swap */}
          <motion.div
            style={{ opacity: catalogueOpacity, y: catalogueY }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="pointer-events-auto bg-card border border-rational-red/40 shadow-elegant rounded-lg px-10 py-7 text-center max-w-md relative overflow-hidden">
              <div className="text-minimal text-rational-red mb-2">PRODUCT CATALOGUE</div>
              <div className="text-xl font-medium text-foreground mb-4">
                Engineered. Certified. Delivered.
              </div>

              {/* Animated red accent underline */}
              <motion.div
                style={{ scaleX: underlineScale }}
                className="w-24 h-0.5 bg-rational-red mx-auto mb-4 origin-left"
              />

              {/* Swapping footer: label -> full CTA button */}
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

        {/* Stage description (fades between stages) */}
        <StageCopy progress={progress} />
      </div>
    </section>
  );
};

const StageRow = ({
  progress,
  containerRef,
}: {
  progress: MotionValue<number>;
  containerRef: RefObject<HTMLDivElement>;
}) => {
  // Scroll the window so the section's scrollYProgress lands at `target` (0..1).
  // The section is 500vh tall with a sticky viewport, so scroll distance = (height - vh) * target.
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
        const start = 0.08 + i * 0.22;
        const end = start + 0.22;
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
        const start = 0.08 + i * 0.22;
        const end = start + 0.22;
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

const Particles = ({ progress }: { progress: MotionValue<number> }) => {
  // Spark visibility peaks during drawing (0.1-0.3) and annealing (0.3-0.55)
  const opacity = useTransform(progress, [0.1, 0.25, 0.55, 0.65], [0, 1, 1, 0]);
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-rational-red"
          style={{
            top: `${50 + (Math.random() - 0.5) * 40}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20 - Math.random() * 20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.6,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </motion.div>
  );
};

export default CopperJourney;
