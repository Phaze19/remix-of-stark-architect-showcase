import { useState } from "react";
import { MapPin, Globe, Factory, Warehouse, Building2, Users } from "lucide-react";
import WorldMap from "@/components/footprint/WorldMap";

const locations = [
  {
    num: "01",
    pin: "india",
    title: "Thane HQ, Maharashtra",
    label: "Headquarters & Manufacturing Hub",
    desc: "Central command for engineering, quality systems and customer partnerships.",
  },
  {
    num: "02",
    pin: "india",
    title: "Wada, Daman & Vadodara",
    label: "Domestic Manufacturing Plants",
    desc: "Three plants delivering CTC, PICC and specialty winding conductors at scale.",
  },
  {
    num: "03",
    pin: "dubai",
    title: "REL Metal Trading Co, Dubai",
    label: "Global Trade & Distribution Hub",
    desc: "International trade arm driving distribution across the Middle East, Africa and emerging markets worldwide.",
  },
  {
    num: "04",
    pin: "germany",
    title: "Germany — Warehousing",
    label: "European Warehousing Hub",
    desc: "Dedicated European warehouse enabling rapid fulfillment and streamlined supply across the continent.",
  },
];


const glance = [
  { icon: Globe, value: "16+", label: "Countries Served" },
  { icon: MapPin, value: "6", label: "Continents" },
  { icon: Factory, value: "3", label: "Manufacturing Locations" },
  { icon: Warehouse, value: "4", label: "Operational Hubs" },
  { icon: Building2, value: "100+", label: "Customers" },
  { icon: Users, value: "3+", label: "Strategic Regions" },
];

const GlobalFootprint = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="footprint" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            Manufacturing &amp; Global Footprints
          </p>
          <h2 className="mt-5 text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl">
            Our Manufacturing
            <br />&amp; <span className="text-primary">Global Footprints</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Serving customers in 50+ countries across 6 continents with a robust global
            network of plants, trading hubs and warehousing.
          </p>
        </div>

        {/* Map + locations */}
        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <WorldMap activeId={activeId} onHover={setActiveId} />

          <div className="grid gap-px overflow-hidden border border-border bg-border">
            {locations.map((l) => (
              <div
                key={l.num}
                onMouseEnter={() => setActiveId(l.pin)}
                onMouseLeave={() => setActiveId(null)}
                className={`group flex gap-5 p-7 transition-colors md:p-8 ${
                  activeId === l.pin ? "bg-muted/60" : "bg-background hover:bg-muted/40"
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {l.num}
                </span>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-foreground">
                    {l.title}
                  </h3>
                  <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                    {l.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* At a glance */}
        <div className="mt-12 bg-muted/60 px-6 py-10 md:px-10">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Our Global Footprint at a Glance
          </p>
          <div className="mt-8 grid grid-cols-2 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
            {glance.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center"
              >
                <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                <span className="mt-3 text-2xl font-light text-foreground md:text-3xl">
                  {value}
                </span>
                <span className="mt-1 max-w-[10rem] text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalFootprint;
