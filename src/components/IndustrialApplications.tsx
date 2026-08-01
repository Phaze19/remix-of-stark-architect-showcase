import { TowerControl, Zap, Cog, Sun, ShieldCheck, Link2, CheckCircle2, Flame, Star } from "lucide-react";
import appsBackdrop from "@/assets/applications-cinematic.jpg";

const applications = [
  {
    num: "01.",
    icon: TowerControl,
    title: "Power Transmission",
    products: ["Bare Cable", "Insulated Cable", "Copper Busbar & Flat Strips"],
    description: "Reliable power flow for grids, substations and distribution networks.",
  },
  {
    num: "02.",
    icon: Zap,
    title: "Transformers & Reactors",
    products: ["Continuously Transposed Conductor (CTC)", "Paper Insulated Copper Conductor (PICC)", "Copper Busbar & Flat Strips"],
    description: "Low-loss winding solutions that ensure high efficiency and long equipment life.",
  },
  {
    num: "03.",
    icon: Cog,
    title: "Motors & Generators",
    products: ["Enamelled Copper — Round & Rectangle", "Enamelled Aluminium — Round & Rectangle", "Fiber Glass Insulated Copper & Aluminium"],
    description: "High-conductivity conductors for superior performance in rotating machines.",
  },
  {
    num: "04.",
    icon: Sun,
    title: "Renewables & High Frequency",
    products: ["High Frequency Copper Litz Wires", "High Frequency Aluminium Litz Wires", "Mica & Polyimide Insulated Copper"],
    description: "Engineered for solar plants, wind farms, EV and energy-storage systems.",
  },
];

const benefits = [
  { icon: ShieldCheck, lines: ["High Conductivity", "for Maximum Efficiency"] },
  { icon: Link2, lines: ["Durability in Harsh &", "Demanding Environments"] },
  { icon: CheckCircle2, lines: ["Reliable Performance", "with Long Service Life"] },
  { icon: Flame, lines: ["Flame-Retardant &", "Environment-Friendly Options"] },
  { icon: Star, lines: ["Custom Solutions", "for Every Application"] },
];

const IndustrialApplications = () => {
  return (
    <section className="bg-background">
      {/* Header */}
      <div className="container mx-auto px-6 pt-20 pb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-light text-foreground leading-tight">
          Applications That Power
          <span className="block text-rational-red">Performance &amp; Reliability</span>
        </h2>
        <p className="mt-5 text-muted-foreground text-lg max-w-2xl mx-auto">
          Our conductors and cables are engineered for critical applications across industries where
          uninterrupted power and efficiency matter most.
        </p>
      </div>

      {/* Cinematic overlay grid */}
      <div className="relative isolate overflow-hidden">
        <img
          src={appsBackdrop}
          alt="Substation transformers, transmission towers, wind turbines and solar panels at dusk"
          width={1920}
          height={1088}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[hsl(0_0%_5%/0.72)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_5%/0.9)] via-transparent to-[hsl(0_0%_5%/0.55)]" />

        <div className="relative container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            {applications.map((app) => (
              <div key={app.num} className="group px-6 py-14 lg:py-24 flex flex-col">
                <app.icon className="w-8 h-8 text-rational-red mb-6" strokeWidth={1.5} />
                <span className="text-4xl md:text-5xl font-semibold text-primary-foreground/95 leading-none">
                  {app.num}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-primary-foreground">{app.title}</h3>
                <span className="mt-4 block h-px w-10 bg-rational-red transition-all duration-500 group-hover:w-20" />
                <p className="mt-5 text-sm text-primary-foreground/70 leading-relaxed">
                  {app.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {app.products.map((p) => (
                    <li key={p} className="text-sm text-primary-foreground/85 flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rational-red flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits strip */}
      <div className="border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-7 justify-center">
                <b.icon className="w-7 h-7 text-foreground flex-shrink-0" strokeWidth={1.25} />
                <p className="text-sm text-foreground/85 leading-snug">
                  {b.lines[0]}
                  <span className="block">{b.lines[1]}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrialApplications;
