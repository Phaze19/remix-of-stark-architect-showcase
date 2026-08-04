import Navigation from "@/components/Navigation";
import AboutSubNav from "@/components/AboutSubNav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import founderPortrait from "@/assets/founder-mahendra-jain.jpg";

type Milestone = {
  year: string;
  title: string;
  desc: string;
};

const milestones: Milestone[] = [
  {
    year: "1992",
    title: "Academic Excellence",
    desc: "Completed Business Management, laying the foundation for a lifetime of enterprise building.",
  },
  {
    year: "Early Years",
    title: "Family Trading Business",
    desc: "Joined and independently managed the family trading business.",
  },
  {
    year: "1995–2012",
    title: "Aditya Vidut Appliances Limited",
    desc: "Played a pivotal role in the growth and expansion of the company.",
  },
  {
    year: "2006",
    title: "Acquired -\u00a0Rational Engineers Limited",
    desc: "Founded with a vision to deliver engineering solutions of excellence in copper and aluminium windings.",
  },
  {
    year: "2008",
    title: "Kajol Leasing & Finance Pvt. Ltd.",
    desc: "Ventured into financial services, driving growth and opportunities.",
  },
  {
    year: "2010",
    title: "Acquired - Gemini Instratech Limited",
    desc: "Strengthened presence in technology and infrastructure solutions.",
  },
  {
    year: "2016",
    title: "Kiaara Banquets",
    desc: "Diversified into hospitality, creating memorable experiences.",
  },
  {
    year: "2018",
    title: "Leadership & Community Impact",
    desc: "Taking leadership roles and supporting social initiatives.",
  },
  {
    year: "2019",
    title: "Healthcare Contribution",
    desc: "Committed towards improving healthcare and community well-being.",
  },
  {
    year: "2020",
    title: "Acquired - K Patel Copper & Aluminium",
    desc: "Stepped into the metal industry, strengthening core capabilities.",
  },
  {
    year: "2021",
    title: "Acquired - Skylink Aero",
    desc: "Entered the aviation sector, soaring towards new horizons.",
  },
  {
    year: "2022",
    title: "Acquired - GIC Insuflex Conductor Private Limited (",
    desc: "Ventured into global opportunities, expanding the international footprint.",
  },
  {
    year: "2024",
    title: "Acquired - HMTD Engineering Private Limited\u00a0",
    desc: "Expanding engineering excellence and driving industrial progress.",
  },
  {
    year: "2025",
    title: "Greenfield Factory\u00a0 -\u00a0 Vadodara",
    desc: "Building for the future with innovation, sustainability and growth.",
  },
];

const groupCompanies = [
  "Rational Engineers Limited",
  "Gemini Instratech Limited",
  "HMTD Engineering Private Limited",
  "Skylink Aero",
  "K Patel Copper & Aluminium",
  "Kajol Leasing & Finance",
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
