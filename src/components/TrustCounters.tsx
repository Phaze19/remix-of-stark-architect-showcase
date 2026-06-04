import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  sub: string;
};

const stats: Stat[] = [
  { value: 3000, suffix: "+", label: "Customers Served", sub: "Across the globe" },
  { value: 50, suffix: "M+", label: "Meters Manufactured", sub: "Of precision conductor" },
  { value: 12, suffix: "+", label: "Industries Served", sub: "Power · Mobility · Energy" },
  { value: 35, suffix: "+", label: "Years of Excellence", sub: "Engineering since 1989" },
];

const Counter = ({ stat }: { stat: Stat }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(stat.value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-copper-text bg-clip-text text-transparent">
        {display.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="mt-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
        {stat.label}
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-silver/40">{stat.sub}</div>
    </div>
  );
};

const TrustCounters = () => {
  return (
    <section className="py-28 md:py-32 bg-charcoal border-y border-copper/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-copper" />
            <span className="font-display uppercase tracking-[0.4em] text-xs text-copper font-bold">
              Proven At Scale
            </span>
            <span className="h-px w-12 bg-copper" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-white">
            Trusted By The Industry.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Counter stat={s} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustCounters;
