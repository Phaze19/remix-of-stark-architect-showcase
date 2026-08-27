import { Leaf, Zap, Droplets, Recycle, ClipboardCheck } from "lucide-react";
import sprout from "@/assets/sustainability-sprout.jpg";

const initiatives = [
  { icon: Leaf, label: "Environment Management" },
  { icon: Zap, label: "Energy Efficiency" },
  { icon: Droplets, label: "Water Management" },
  { icon: Recycle, label: "Recycling & Resource Efficiency" },
  { icon: ClipboardCheck, label: "Compliance with Environmental Norms" },
];

const SustainabilityGroup = () => {
  return (
    <section id="responsible" className="border-b border-border bg-background py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-0 overflow-hidden border border-border lg:grid-cols-[1.15fr_1fr]">
            <div className="bg-card p-8 md:p-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                Responsible Manufacturing
              </p>
              <div className="mt-4 h-0.5 w-12 bg-primary" />
              <h2 className="mt-6 text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl">
                Responsible today.
                <br />
                <span className="text-primary">Sustainable tomorrow.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                Copper and aluminium are infinitely recyclable — and how they are processed
                matters. Our operations are managed around resource efficiency, environmental
                compliance and continuous reduction of energy and water intensity.
              </p>

              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-3">
                {initiatives.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-start gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary">
                      <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                    </span>
                    <p className="text-[12px] font-medium leading-snug text-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[280px]">
              <img
                src={sprout}
                alt="Young green plant sprouting from soil, representing sustainable manufacturing"
                loading="lazy"
                width={1000}
                height={800}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityGroup;
