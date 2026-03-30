import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Zap, Cog, Wind, Shield, Award, Factory, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Services = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);

  const industries = [
    {
      icon: Zap,
      title: "Power & Energy",
      tagline: "Powering the grid, reliably.",
      description: "Our conductors form the backbone of transformers, generators, and grid infrastructure — engineered for decades of uninterrupted service.",
      attributes: [
        "Oil-filled & dry-type transformer windings",
        "HVDC transmission systems",
        "Generator coils & stator windings",
        "Substation busbar assemblies",
      ],
      stat: "40+",
      statLabel: "Years serving power utilities",
    },
    {
      icon: Cog,
      title: "Heavy Electrical Machinery",
      tagline: "Where precision meets endurance.",
      description: "From high-voltage motors to industrial alternators, our copper conductors deliver consistent electrical performance under extreme operating conditions.",
      attributes: [
        "High & low voltage motor windings",
        "Alternator & turbo-generator coils",
        "Traction motor conductors",
        "Custom-profile CTC conductors",
      ],
      stat: "500+",
      statLabel: "OEM partnerships globally",
    },
    {
      icon: Wind,
      title: "Renewable Energy",
      tagline: "Engineering a sustainable future.",
      description: "Wind turbines, hydro generators, and solar inverters demand conductors that perform under continuous cyclic loads — that's our specialty.",
      attributes: [
        "Windmill generator windings",
        "Hydro turbine coils",
        "Solar inverter busbars",
        "Energy storage system connections",
      ],
      stat: "30%",
      statLabel: "Of output serves renewables",
    },
  ];

  const keyStrengths = [
    {
      icon: Shield,
      title: "Process-Controlled Manufacturing",
      description: "Every conductor passes through 12+ quality checkpoints from raw material to dispatch.",
    },
    {
      icon: Award,
      title: "Certified to Global Standards",
      description: "IS, IEC, ASTM, BS, DIN compliant — our certifications are your risk insurance.",
    },
    {
      icon: Factory,
      title: "Vertically Integrated Facility",
      description: "From copper rod to finished conductor — complete in-house control for consistent quality.",
    },
  ];

  const factoryHighlights = [
    "Live demonstration of CTC conductor manufacturing",
    "Walk through our quality testing laboratory",
    "Meet our engineering team & discuss custom requirements",
    "See raw material traceability in action",
    "Review our process control documentation first-hand",
  ];

  const active = industries[activeIndustry];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-minimal text-muted-foreground mb-4 tracking-widest">SERVICES & INDUSTRIES</h1>
            <h2 className="text-4xl md:text-6xl font-light text-foreground max-w-4xl">
              From Copper Manufacturers to{" "}
              <span className="italic text-muted-foreground">Product Engineers</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              We don't just supply conductors — we engineer solutions tailored to the critical demands of your industry.
            </p>
          </div>
        </div>
      </section>

      {/* Key Strengths */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-minimal text-muted-foreground mb-10 tracking-widest">WHY RATIONAL ENGINEERS</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {keyStrengths.map((item, i) => (
                <div key={i} className="group bg-background p-8 rounded-lg border border-border hover:border-foreground/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                  <div className="w-12 h-12 rounded-full bg-muted group-hover:bg-foreground/10 flex items-center justify-center mb-5 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h4 className="text-lg font-medium text-foreground mb-3">{item.title}</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Industry Explorer */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <h3 className="text-minimal text-muted-foreground mb-4 tracking-widest">INDUSTRIES WE SERVE</h3>
              <p className="text-3xl md:text-4xl font-light text-foreground">
                Built for industries where failure is not an option
              </p>
            </div>

            {/* Industry Tabs */}
            <div className="flex flex-wrap gap-3 mb-12">
              {industries.map((ind, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndustry(i)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 border ${
                    activeIndustry === i
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  <ind.icon className="w-4 h-4" />
                  {ind.title}
                </button>
              ))}
            </div>

            {/* Active Industry Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-2 gap-12 items-start"
              >
                <div>
                  <p className="text-sm text-muted-foreground italic mb-2">{active.tagline}</p>
                  <h4 className="text-2xl md:text-3xl font-light text-foreground mb-4">{active.title}</h4>
                  <p className="text-muted-foreground leading-relaxed mb-8">{active.description}</p>

                  <div className="bg-muted rounded-lg p-6 inline-block">
                    <span className="text-4xl font-light text-foreground">{active.stat}</span>
                    <p className="text-sm text-muted-foreground mt-1">{active.statLabel}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-minimal text-muted-foreground tracking-widest mb-4">KEY APPLICATIONS</h5>
                  {active.attributes.map((attr, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.08, duration: 0.3 }}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-foreground/20 transition-colors duration-300"
                    >
                      <ChevronRight className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{attr}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Factory Visit CTA */}
      <section className="relative py-24 bg-foreground text-background overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Video Showcase */}
            <div className="mb-16">
              <h3 className="text-minimal text-background/50 mb-4 tracking-widest">SEE IT TO BELIEVE IT</h3>
              <h4 className="text-3xl md:text-4xl font-light mb-8">
                Visit Our Manufacturing Facility
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative rounded-lg overflow-hidden aspect-video">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/factory-tour-1.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="text-sm text-white/90 font-medium">Production Floor — CTC Winding Line</span>
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden aspect-video">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/factory-tour-2.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="text-sm text-white/90 font-medium">Quality Lab — Insulation Testing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-background/70 leading-relaxed mb-8">
                  Numbers and certifications tell part of the story. A factory visit tells the rest.
                  Walk our production floor, meet our engineers, and see the processes that make
                  Rational Engineers the trusted choice for critical copper conductor applications.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-lg font-medium hover:bg-background/90 transition-colors duration-300"
                >
                  Schedule a Factory Visit
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="space-y-4">
                <h5 className="text-minimal text-background/50 tracking-widest mb-6">WHAT YOU'LL EXPERIENCE</h5>
                {factoryHighlights.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-lg border border-background/10 hover:border-background/25 transition-colors duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-background/60 mt-0.5 flex-shrink-0" />
                    <span className="text-background/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
