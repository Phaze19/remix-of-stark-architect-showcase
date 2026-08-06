import Navigation from "@/components/Navigation";
import AboutSubNav from "@/components/AboutSubNav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import facilityExterior from "@/assets/rational-facility-exterior.png";

type Milestone = {
  year: string;
  title: string;
  desc: string;
};

const milestones: Milestone[] = [
  {
    year: "1989",
    title: "Rational Engineers Limited Founded",
    desc: "Established with a commitment to precision-engineered copper and aluminium winding solutions for the electrical industry.",
  },
  {
    year: "2006",
    title: "Acquired -\u00a0Rational Engineers Limited",
    desc: "Taken over by Mr. Mahendra Jain with a vision to transform the production and distribution landscape of copper conductors.",
  },
  {
    year: "2018",
    title: "Next-Generation Leadership",
    desc: "Mr. Jubin Jain joined the business, bringing electrical engineering expertise and a drive for modern manufacturing excellence.",
  },
  {
    year: "2020",
    title: "Acquired - K Patel Copper & Aluminium",
    desc: "Strengthened metal processing capabilities and expanded the product portfolio for transformer and motor winding applications.",
  },
  {
    year: "2022",
    title: "Acquired - GIC Insuflex Conductor Private Limited",
    desc: "Added specialised insulated conductor manufacturing, enhancing REL's ability to serve global OEMs and utilities.",
  },
  {
    year: "2024",
    title: "Acquired - HMTD Engineering Private Limited",
    desc: "Expanded engineering depth and industrial reach to support large-scale infrastructure and power projects.",
  },
  {
    year: "2025",
    title: "Greenfield Factory - Vadodara",
    desc: "Building a state-of-the-art manufacturing facility for the future — driven by innovation, sustainability and growth.",
  },
];

const groupCompanies = [
  "Rational Engineers Limited",
  "K Patel Copper & Aluminium",
  "GIC Insuflex Conductor Private Limited",
  "HMTD Engineering Private Limited",
];

const FounderJourney = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 md:pt-40">
        <AboutSubNav />
      </div>

      {/* Hero */}
      <section className="pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-rational-red" />
                <span className="text-minimal tracking-[0.3em] text-muted-foreground">
                  THE JOURNEY OF
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-light text-architectural md:text-6xl">
                Shri. Mahendra K. Jain
                <span className="mt-3 block text-lg font-medium tracking-[0.15em] text-rational-red md:text-xl">
                  FOUNDER & MANAGING DIRECTOR
                </span>
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
                Building businesses. Creating value. Transforming lives — three decades
                of entrepreneurship across engineering, metals, infrastructure, finance
                and aviation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="absolute -left-4 -top-4 h-2/3 w-2/3 bg-rational-red/10" />
              <img
                src={founderPortrait}
                alt="Shri. Mahendra K. Jain, Founder and Managing Director of Rational Engineers Limited"
                className="relative w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="relative mx-auto max-w-5xl">
            {/* Center / left rail */}
            <div className="absolute bottom-0 left-3 top-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-14 md:space-y-24">
              {milestones.map((item, i) => {
                const isRight = i % 2 === 1;
                return (
                  <motion.div
                    key={item.year + item.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative pl-12 md:grid md:grid-cols-2 md:gap-16 md:pl-0"
                  >
                    {/* Node */}
                    <span className="absolute left-3 top-3 z-10 -translate-x-1/2 md:left-1/2">
                      <span className="block h-3.5 w-3.5 rounded-full border-2 border-rational-red bg-background" />
                    </span>

                    <div
                      className={
                        isRight
                          ? "md:col-start-2 md:pl-4 md:text-left"
                          : "md:col-start-1 md:pr-4 md:text-right"
                      }
                    >
                      <p className="font-display text-4xl font-light text-rational-red md:text-5xl">
                        {item.year}
                      </p>
                      <h2 className="mt-2 text-xl font-semibold text-foreground md:text-2xl">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-muted-foreground leading-relaxed md:max-w-md md:inline-block">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Group companies */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-minimal mb-10 tracking-[0.3em] text-muted-foreground">
              OUR GROUP COMPANIES
            </h2>
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {groupCompanies.map((name) => (
                <div
                  key={name}
                  className="bg-background px-6 py-8 text-sm font-medium uppercase tracking-[0.12em] text-foreground"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FounderJourney;
