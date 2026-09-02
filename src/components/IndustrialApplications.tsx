import {
  TowerControl,
  Cog,
  TrainFront,
  Cable,
  BatteryCharging,
  SlidersHorizontal,
  Gauge,
  CircuitBoard,
} from "lucide-react";
import appTransformers from "@/assets/app-transformers.jpg";
import appMotors from "@/assets/app-motors.jpg";
import appRailways from "@/assets/app-railways.jpg";
import appEarthing from "@/assets/app-earthing.jpg";
import appEvHf from "@/assets/app-ev-hf.jpg";
import appTapChanger from "@/assets/app-tap-changer.jpg";
import appCtPt from "@/assets/app-ct-pt.jpg";
import appBusbar from "@/assets/app-busbar.jpg";

const applications = [
  {
    icon: TowerControl,
    image: appTransformers,
    title: "Power Transformers",
    application: "Power generation, transmission & distribution transformers",
    products: [
      "Continuously Transposed Conductor (CTC)\u00a0",
      "PICC Paper Insulated Copper Conductor",
      "Flexible\u00a0 Braided Copper or Extra Flexible Braided Copper Conductor\u00a0",
      "Fiberglass Covered Copper Conductors\u00a0",
      "Rectangular Enamelled Conductors\u00a0",
    ],
  },
  {
    icon: Cog,
    image: appMotors,
    title: "HT / LT MOTORS",
    application: "HT & LT motors for industrial, commercial & OEM use",
    products: [
      "Fiberglass Covered Copper Conductors",
      "Round Enamelled Copper Conductor\u00a0",
      "Mica Covered Copper Conductors\n\n",
    ],
  },
  {
    icon: TrainFront,
    image: appRailways,
    title: "Locomotive & Traction",
    application: "Locomotive, traction motors, auxiliary equipment & railway systems",
    products: [
      "Kapton Covered Copper Conductors",
      "Nomex Covered Enamelled Copper Conductor\u00a0 or Nomex Covered\u00a0 Round Enamelled Copper Conductor\u00a0",
      "Continuous Transposed Conductor\u00a0 (CTC)",
    ],
  },
  {
    icon: Cable,
    image: appEarthing,
    title: "Earthing Cable",
    application: "Earthing & grounding systems for electrical installations",
    products: ["Flexible Braided Earthing Copper Cable"],
  },
  {
    icon: BatteryCharging,
    image: appEvHf,
    title: "High Frequency Components / EV Battery Charging",
    application:
      "High-frequency components, inverters, converters & EV battery charging systems",
    products: ["Litz Wire"],
  },
  {
    icon: SlidersHorizontal,
    image: appTapChanger,
    title: "On-Load Tap Changers",
    application: "On-load tap changers in power transformers for voltage regulation",
    products: ["Bare Covered or Paper Covered\u00a0 Copper Conductors", "\n"],
  },
  {
    icon: Gauge,
    image: appCtPt,
    title: "DISTRIBUTION TRANSFORMERS (CT / PT)",
    application: "Current & potential instrument transformers for metering, protection & control",
    products: [
      "Enamelled Copper Conductor\u00a0",
      "Enamelled Aluminium Conductors\u00a0",
      "Fibreglass Covered Aluminium Conductor\u00a0",
      "PIAC -Paper Covered Aluminium Conductor\u00a0",
    ],
  },
  {
    icon: CircuitBoard,
    image: appBusbar,
    title: "Switchgear & Busbar Systems",
    application: "Switchgear, switchboards, control panels, busducts & power distribution boards",
    products: [
      "Bare / Tin Coated Busbar\u00a0",
      "Copper Flat Strips\u00a0",
    ],
  },
];


const IndustrialApplications = () => {
  return (
    <section className="bg-background">
      {/* Header */}
      <div className="container mx-auto px-6 pt-20 pb-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-rational-red">
            Products &amp; Services
          </p>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <h2 className="text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Product Portfolio &amp;
              <span className="block font-normal text-rational-red">its Applications</span>
            </h2>
            <p className="border-l-2 border-rational-red pl-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Specialized copper conductor solutions engineered to deliver performance, efficiency,
              and reliability across critical applications.
            </p>
          </div>
          <span className="mt-8 block h-1 w-24 bg-rational-red" />
        </div>
      </div>

      {/* Application cards — light, high-readability layout */}
      <div className="container mx-auto px-6 pb-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {applications.map((app, i) => (
            <article
              key={app.title}
              className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-rational-red/60 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={app.image}
                  alt={app.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center bg-rational-red text-sm font-bold text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-sm bg-background/90 backdrop-blur-sm">
                  <app.icon className="h-5 w-5 text-rational-red" strokeWidth={1.75} />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[15px] font-bold uppercase leading-snug tracking-tight text-foreground">
                  {app.title}
                </h3>
                <span className="mt-3 block h-0.5 w-12 bg-rational-red transition-all duration-300 group-hover:w-20" />

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-rational-red">
                  Where it is used
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {app.application}
                </p>

                <div className="my-5 h-px w-full bg-border" />

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rational-red">
                  Products supplied
                </p>
                <ul className="mt-3 space-y-2">
                  {app.products
                    .map((p) => p.trim())
                    .filter(Boolean)
                    .map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2.5 text-[13px] leading-relaxed text-foreground"
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rational-red" />
                        {p}
                      </li>
                    ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrialApplications;
