import {
  TowerControl,
  Cog,
  TrainFront,
  Cable,
  BatteryCharging,
  SlidersHorizontal,
  Gauge,
  CircuitBoard,
  ShieldCheck,
  Thermometer,
  BadgeCheck,
  Settings,
} from "lucide-react";
import appTransformers from "@/assets/app-transformers.jpg";
import appMotors from "@/assets/app-motors.jpg";
import appRailways from "@/assets/app-railways.jpg";
import appEarthing from "@/assets/app-earthing.jpg";
import appEvHf from "@/assets/app-ev-hf.jpg";
import appTapChanger from "@/assets/app-tap-changer.jpg";
import appCtPt from "@/assets/app-ct-pt.jpg";
import appBusbar from "@/assets/app-busbar.jpg";
import applicationsBgAsset from "@/assets/applications-energy-bg.jpg.asset.json";
const applicationsBg = applicationsBgAsset.url;

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

const benefits = [
  { icon: ShieldCheck, lines: ["High Conductivity for", "Superior Performance"] },
  { icon: Thermometer, lines: ["High Thermal", "Resistance & Insulation"] },
  { icon: BadgeCheck, lines: ["Reliable. Durable.", "Engineered for Excellence."] },
  { icon: Settings, lines: ["Custom Solutions for", "Diverse Industrial Needs"] },
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

      {/* Cinematic application band */}
      <div className="relative isolate overflow-hidden">
        <img
          src={applicationsBg}
          alt="Renewable energy and power transmission infrastructure at dusk"
          loading="lazy"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-foreground/70" />

        <div className="relative container mx-auto px-6 py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-16">
            {applications.map((app, i) => (
              <article
                key={app.title}
                className="group relative px-0 sm:px-8 sm:[&:not(:nth-child(2n+1))]:border-l lg:[&:not(:nth-child(4n+1))]:border-l sm:border-primary-foreground/15 lg:border-primary-foreground/15 transition-colors duration-500"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-light tracking-tight text-primary-foreground md:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                    <span className="text-rational-red">.</span>
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center border border-primary-foreground/25 bg-primary-foreground/5 transition-colors duration-500 group-hover:border-rational-red group-hover:bg-rational-red">
                    <app.icon className="h-5 w-5 text-primary-foreground" strokeWidth={1.75} />
                  </span>
                </div>

                <h3 className="mt-6 text-base font-bold uppercase leading-tight tracking-tight text-primary-foreground">
                  {app.title}
                </h3>

                <span className="mt-4 block h-px w-14 bg-rational-red transition-all duration-500 group-hover:w-24" />

                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-rational-red">
                  Applications
                </p>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                  {app.application}
                </p>

                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-rational-red">
                  Products
                </p>
                <ul className="mt-3 space-y-2">
                  {app.products.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-primary-foreground/90 min-h-[1.25rem]"
                    >
                      {p !== "\n" && (
                        <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-rational-red" />
                      )}
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>


      {/* Benefits strip + tagline */}
      <div className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-[1fr_auto]">
            <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {benefits.map((b) => (
                <div key={b.lines[0]} className="flex items-center gap-3 px-5 py-7">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-rational-red">
                    <b.icon className="h-5 w-5 text-rational-red" strokeWidth={1.75} />
                  </span>
                  <p className="text-sm font-medium leading-snug text-foreground">
                    {b.lines[0]}
                    <span className="block font-normal text-muted-foreground">{b.lines[1]}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center bg-rational-red px-8 py-7">
              <p className="text-sm font-bold uppercase leading-relaxed tracking-[0.08em] text-primary-foreground">
                Powering Progress.
                <span className="block">Connecting Possibilities.</span>
                <span className="block">Delivering Performance.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrialApplications;
