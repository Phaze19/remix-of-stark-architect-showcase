import { motion } from "framer-motion";
import appRenewables from "@/assets/app-renewables.jpg";
import appTraction from "@/assets/app-traction.jpg";
import appPower from "@/assets/app-power.jpg";

const IndustrialApplications = () => {
  const sectors = [
    {
      tag: "Power Systems",
      title: "Distribution & Grid",
      image: appPower,
      applications: [
        "Power & distribution transformers",
        "HVDC converter transformers",
        "High-voltage switchgear & busbars",
        "Substation & generator step-up units",
      ],
      products: "CTC · Paper Covered · Busbars",
    },
    {
      tag: "Renewables",
      title: "Wind & Hydro Generation",
      image: appRenewables,
      applications: [
        "Wind turbine generator windings",
        "Hydro & shunt reactor windings",
        "Solar inverter & storage systems",
        "Grid-scale interconnection busbars",
      ],
      products: "Bare CTC · Winding Wire · Strips",
    },
    {
      tag: "Mobility",
      title: "Traction & Heavy Duty",
      image: appTraction,
      applications: [
        "Railway & metro traction motors",
        "Locomotive transformers",
        "High-efficiency industrial motors",
        "EV charging infrastructure",
      ],
      products: "Enameled Wire · Fiberglass · Bare Copper",
    },
  ];

  return (
    <section className="py-28 md:py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20 items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="h-[2px] w-12 bg-rational-red" />
              <span className="font-display uppercase tracking-[0.4em] text-xs text-rational-red font-bold">
                Applications
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[0.95] mb-6">
              APPLIED
              <br />
              <span className="text-rational-red">INFRASTRUCTURE.</span>
            </h2>
            <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
              Our conductors power high-stress environments where failure is not an
              option — from renewable grids to mass-transit propulsion and continental
              power distribution.
            </p>
          </div>
          <div className="lg:col-span-4 text-right hidden lg:block">
            <div className="font-display text-[120px] font-bold leading-none text-white/5">
              03
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]"
            >
              <img
                src={sector.image}
                alt={sector.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 p-8 lg:p-10">
                <p className="font-display text-rational-red font-bold text-xs tracking-widest uppercase mb-3">
                  {sector.tag}
                </p>
                <h3 className="font-display text-2xl lg:text-3xl font-bold mb-6 tracking-tight leading-tight text-white">
                  {sector.title}
                </h3>
                <ul className="space-y-3 text-sm text-white/60 max-h-0 opacity-0 overflow-hidden group-hover:max-h-60 group-hover:opacity-100 transition-all duration-500">
                  {sector.applications.map((app) => (
                    <li key={app} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-rational-red flex-shrink-0" />
                      {app}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-display text-[10px] uppercase tracking-[0.25em] text-white/40">
                  {sector.products}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrialApplications;
