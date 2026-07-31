import { TowerControl, Zap, Cog, TrainFront, Sun, ShieldCheck, Link2, CheckCircle2, Flame, Star } from "lucide-react";
import appPower from "@/assets/app-power-transmission.jpg";
import appTransformers from "@/assets/app-transformers.jpg";
import appMotors from "@/assets/app-motors.jpg";
import appRailways from "@/assets/app-railways.jpg";
import appRenewable from "@/assets/app-renewable.jpg";

const applications = [
  {
    icon: TowerControl,
    image: appPower,
    alt: "High voltage transmission towers at sunset",
    title: ["POWER TRANSMISSION", "& DISTRIBUTION"],
    products: ["CTC Conductors", "Bare Copper Cables", "Covered Copper Cables", "PICC Conductors"],
    description: "Reliable power flow for grids, substations, and distribution networks.",
  },
  {
    icon: Zap,
    image: appTransformers,
    alt: "Industrial power transformers in a substation",
    title: ["TRANSFORMERS", "& REACTORS"],
    products: ["CTC Conductors", "PICC Conductors", "Bare Copper Cables"],
    description: "Efficient winding solutions that ensure low losses, high efficiency, and long equipment life.",
  },
  {
    icon: Cog,
    image: appMotors,
    alt: "Row of industrial electric motors inside a factory",
    title: ["MOTORS", "& GENERATORS"],
    products: ["CTC Conductors", "PICC Conductors", "Covered Copper Cables"],
    description: "High conductivity conductors for superior performance in rotating electrical machines.",
  },
  {
    icon: TrainFront,
    image: appRailways,
    alt: "Modern metro train on elevated track with city skyline",
    title: ["RAILWAYS", "& METRO SYSTEMS"],
    products: ["Covered Copper Cables", "PICC Conductors", "Bare Copper Cables"],
    description: "Durable and flame-retardant cables for traction, signaling, and on-board applications.",
  },
  {
    icon: Sun,
    image: appRenewable,
    alt: "Wind turbines and solar panels at sunset",
    title: ["RENEWABLE ENERGY", "& SOLAR"],
    products: ["Bare Copper Cables", "Covered Copper Cables", "PICC Conductors"],
    description: "High-performance solutions for solar plants, wind farms, and energy storage systems.",
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

      {/* Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-border">
        {applications.map((app, i) => (
          <div
            key={i}
            className="group relative flex flex-col border-b lg:border-b-0 border-r-0 sm:border-r border-border last:border-r-0"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={app.image}
                alt={app.alt}
                width={800}
                height={700}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-background shadow-lg flex items-center justify-center z-10">
                <app.icon className="w-7 h-7 text-rational-red" strokeWidth={1.5} />
              </div>
            </div>

            <div className="px-6 pt-14 pb-10 text-center flex flex-col flex-1">
              <h3 className="text-base font-semibold tracking-wide text-foreground leading-snug">
                {app.title[0]}
                <span className="block">{app.title[1]}</span>
              </h3>

              <p className="mt-4 text-sm text-rational-red font-medium">Products Used:</p>
              <ul className="mt-3 space-y-1.5 text-left inline-block mx-auto">
                {app.products.map((p, pi) => (
                  <li key={pi} className="text-sm text-foreground/80 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rational-red flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">{app.description}</p>
            </div>
          </div>
        ))}
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
