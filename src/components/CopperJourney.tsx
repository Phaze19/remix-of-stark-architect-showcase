import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Flame, Droplets, Disc3, PackageCheck } from "lucide-react";

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
                // Realistic copper: dark edge -> bright highlight -> mid -> dark edge
                // Tinted by rodColor via filter hue/lightness handled in wrapper's overlay
                backgroundImage: useTransform(
                  rodColor,
                  (c) =>
                    `linear-gradient(to bottom, ${shade(c, -45)} 0%, ${shade(c, -20)} 15%, ${shade(c, 35)} 45%, ${shade(c, 15)} 55%, ${shade(c, -25)} 85%, ${shade(c, -50)} 100%)`
                ),
                boxShadow: useTransform(
                  glow,
                  (g) =>
                    `0 0 ${g * 2}px ${g}px rgba(239, 68, 68, 0.55), inset 0 0 8px rgba(0,0,0,0.35)`
                ),
              }}
              className="w-64 md:w-96 rounded-full origin-center relative overflow-hidden"
            >
              {/* Specular highlight streak */}
              <div
                className="absolute left-0 right-0 top-[30%] h-[8%] rounded-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0))",
                  filter: "blur(1px)",
                }}
              />
              {/* Soft end caps for cylinder illusion */}
              <div
                className="absolute inset-y-0 left-0 w-6 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0))",
                }}
              />
              <div
                className="absolute inset-y-0 right-0 w-6 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to left, rgba(0,0,0,0.4), rgba(0,0,0,0))",
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

              {/* Swapping footer: label -> CTA */}
              <div className="relative h-6">
                <motion.div
                  style={{ opacity: labelOpacity }}
                  className="absolute inset-0 text-xs tracking-widest text-muted-foreground uppercase"
                >
                  Journey Complete
                </motion.div>
                <motion.a
                  href="#products"
                  style={{ opacity: ctaOpacity, y: ctaY }}
                  className="absolute inset-0 text-sm font-medium tracking-wider text-foreground hover:text-rational-red transition-colors"
                >
                  EXPLORE PRODUCTS →
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

const StageRow = ({ progress }: { progress: MotionValue<number> }) => {
  return (
    <div className="grid grid-cols-4 gap-2 md:gap-6 px-6 md:px-16 py-4 relative z-10">
      {stages.map((s, i) => {
        const start = 0.08 + i * 0.22;
        const end = start + 0.22;
        return <StageChip key={s.id} stage={s} start={start} end={end} progress={progress} />;
      })}
    </div>
  );
};

const StageChip = ({
  stage,
  start,
  end,
  progress,
}: {
  stage: (typeof stages)[number];
  start: number;
  end: number;
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, [start - 0.05, start, end, end + 0.05], [0.3, 1, 1, 0.3]);
  const scale = useTransform(progress, [start - 0.05, start, end, end + 0.05], [0.95, 1.05, 1.05, 0.95]);
  const Icon = stage.icon;
  return (
    <motion.div
      style={{ opacity, scale }}
      className="flex flex-col items-center text-center gap-2"
    >
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-rational-red/50 flex items-center justify-center bg-background">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-rational-red" />
      </div>
      <div className="text-[10px] md:text-xs tracking-widest uppercase text-foreground font-medium">
        {stage.label}
      </div>
    </motion.div>
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
