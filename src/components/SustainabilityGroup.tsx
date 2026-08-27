import { Leaf, Zap, Droplets, Recycle, ClipboardCheck, ArrowRight } from "lucide-react";
import SmartLink from "@/components/SmartLink";
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
    <section className="bg-background pb-20 md:pb-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {/* Sustainability panel */}
          <div className="flex flex-col overflow-hidden border border-border bg-card">
            <div className="p-8 md:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                Sustainability &amp; Environmental Responsibility
              </p>
              <h3 className="mt-4 text-3xl font-light leading-tight tracking-tight text-foreground md:text-4xl">
                Responsible Today.
                <span className="block font-normal">Sustainable Tomorrow.</span>
              </h3>

              <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
                {initiatives.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-start gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary">
                      <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                    </span>
                    <p className="text-[12px] font-medium leading-snug text-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-auto">
              <img
                src={sprout}
                alt="Young green plant sprouting from soil, representing sustainable manufacturing"
                loading="lazy"
                width={1000}
                height={600}
                className="h-48 w-full object-cover md:h-56"
              />
            </div>
          </div>

          {/* Group company / REL Metals highlight panel */}
          <div className="flex flex-col overflow-hidden border border-border bg-card">
            <div className="flex flex-1 flex-col p-8 md:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                Our Group / Associated Companies
              </p>
              <h3 className="mt-4 text-3xl font-light leading-tight tracking-tight text-foreground md:text-4xl">
                Stronger Together.
                <span className="block font-normal">Expanding Capabilities.</span>
              </h3>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                Discover our global trade and distribution capabilities through REL METALS
                TRADING LLC, UAE — our international arm serving the Middle East, Africa and
                emerging markets worldwide.
              </p>

              <div className="mt-10 flex flex-col gap-8 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                <SmartLink
                  href="/contact"
                  className="group inline-flex w-fit items-center gap-3 border-2 border-foreground px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Visit REL Metals Trading
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </SmartLink>

                {/* REL Metals brand mark */}
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center bg-primary">
                    <span className="text-xl font-black tracking-tighter text-primary-foreground">R</span>
                  </span>
                  <div className="leading-tight">
                    <p className="text-lg font-black uppercase tracking-tight text-foreground">
                      REL Metals
                    </p>
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
                      Trading LLC
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityGroup;
