import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Stat = {
  /** Numeric portion animated on scroll. Omit for non-numeric values. */
  count?: number;
  prefix?: string;
  suffix?: string;
  display?: string;
  label: string;
  note: string;
};

const stats: Stat[] = [
  { display: "1989", label: "Manufacturing since", note: "Over three decades of continuous production" },
  { count: 33000, suffix: " MT", label: "Annual capacity", note: "Copper & aluminium winding conductors" },
  { count: 3, label: "Manufacturing locations", note: "Wada, Daman & Vadodara" },
  { count: 25, suffix: "+", label: "Countries served", note: "Across six continents" },
  { count: 400, suffix: "+", label: "Customers", note: "Transformer, motor & infrastructure OEMs" },
  { display: "ISO 9001:2015", label: "Quality certified", note: "ISO 14001:2015 in progress" },
];

const formatValue = (stat: Stat, value: number) =>
  `${stat.prefix ?? ""}${value.toLocaleString("en-US")}${stat.suffix ?? ""}`;

const StatValue = ({ stat, active }: { stat: Stat; active: boolean }) => {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (stat.count === undefined) return;
    if (!active || reduceMotion) {
      setValue(stat.count);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutQuart — fast start, precise settle
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(stat.count! * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion, stat.count]);

  return (
    <span className="font-display text-4xl font-bold leading-none tracking-tight text-foreground md:text-5xl">
      {stat.display ?? formatValue(stat, value)}
    </span>
  );
};

const CompanyAtAGlance = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="glance" className="border-b border-border bg-background py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-rational-red">
              Company at a Glance
            </p>
            <div className="mt-4 h-0.5 w-12 bg-rational-red" />
            <h2 className="mt-6 text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl">
              Scale, capability and
              <br />
              <span className="text-rational-red">supply reliability.</span>
            </h2>
          </div>

          <div
            ref={ref}
            className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group bg-background p-8 transition-colors duration-500 hover:bg-muted/50 md:p-10"
              >
                <StatValue stat={stat} active={inView} />
                <div className="mt-5 h-px w-8 bg-rational-red transition-all duration-500 group-hover:w-16" />
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyAtAGlance;
