import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { milestones } from "@/data/milestones";

const HistoryTimeline = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="history" className="border-b border-border bg-background py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
              Our History
            </p>
            <div className="mt-4 h-0.5 w-12 bg-primary" />
            <h2 className="mt-6 text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl">
              How the capability
              <br />
              <span className="text-primary">was built.</span>
            </h2>
          </div>

          <div ref={ref} className="relative mt-16">
            {/* Spine */}
            <div className="absolute left-[9px] top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-10 md:space-y-0">
              {milestones.map((item, index) => {
                const alignRight = index % 2 === 1;
                return (
                  <motion.div
                    key={item.year + item.title}
                    initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative pl-10 md:grid md:grid-cols-2 md:gap-16 md:pl-0"
                  >
                    {/* Node */}
                    <span className="absolute left-0 top-1.5 flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1/2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>

                    <div
                      className={`group md:py-10 ${
                        alignRight ? "md:col-start-2 md:pl-4" : "md:col-start-1 md:pr-4 md:text-right"
                      }`}
                    >
                      <span className="font-display text-3xl font-bold tracking-tight text-primary md:text-4xl">
                        {item.year}
                      </span>
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                        {item.phase}
                      </p>
                      <h3 className="mt-4 text-lg font-medium leading-snug text-foreground">
                        {item.title}
                      </h3>
                      <div
                        className={`mt-4 h-px w-8 bg-primary transition-all duration-500 group-hover:w-16 ${
                          alignRight ? "" : "md:ml-auto"
                        }`}
                      />
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:inline-block">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
