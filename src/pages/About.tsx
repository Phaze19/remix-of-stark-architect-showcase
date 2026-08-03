import Navigation from "@/components/Navigation";
import AboutSubNav from "@/components/AboutSubNav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import aboutFacility from "@/assets/rational-facility-exterior.png.asset.json";
import aboutLeadershipAsset from "@/assets/leadership-mj-jj.png.asset.json";
import founderPortrait from "@/assets/founder-mahendra-jain.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-32 md:pt-40">
        <AboutSubNav />
      </div>

      {/* Hero Banner */}
      <section className="relative pt-14 pb-20 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-minimal text-muted-foreground mb-4 tracking-widest">ABOUT US</h1>
              <h2 className="text-4xl md:text-6xl font-light text-architectural mb-6">
                A Legacy Built on Copper
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                50+ years of excellence in copper conductor manufacturing — a family enterprise transforming an industry.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facility Image */}
      <section className="bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="rounded-xl overflow-hidden"
            >
              <img
                src={aboutFacility.url}
                alt="Rational Engineers copper manufacturing facility"
                className="w-full h-[300px] md:h-[450px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-minimal text-muted-foreground mb-4 tracking-widest">OUR STORY</h3>
                <h4 className="text-3xl md:text-4xl font-light text-architectural mb-10">
                  From Vision to Industry Leadership
                </h4>

                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Rational Engineers Limited was established in <span className="text-foreground font-semibold">1989</span> and 
                    was later taken over by{" "}
                    <span className="text-foreground font-semibold">Mr. Mahendra Jain (B.E Mech)</span>{" "}
                    in 2006 with a vision of transforming the production and distribution landscape of copper.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    His son{" "}
                    <span className="text-foreground font-semibold">Mr. Jubin Jain (B.E Electrical)</span>{" "}
                    became a part of this vision in 2018 — bringing fresh energy and technical expertise to propel the company forward.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    As a family enterprise, we have been a part of the copper business for over 
                    50 years, and have successfully managed, enhanced and transformed it since.
                  </p>
                </div>
              </motion.div>

              {/* Leadership Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="rounded-xl overflow-hidden shadow-elegant">
                  <img
                    src={aboutLeadershipAsset.url}
                    alt="Mr. Mahendra Jain and Mr. Jubin Jain - Leadership at Rational Engineers"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="w-2 h-12 bg-foreground/80 rounded-full" />
                    <div>
                      <p className="font-semibold text-foreground text-lg">Mr. Mahendra Jain</p>
                      <p className="text-muted-foreground text-sm">B.E Mechanical · Managing Director · Since 2006</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="w-2 h-12 bg-foreground/80 rounded-full" />
                    <div>
                      <p className="font-semibold text-foreground text-lg">Mr. Jubin Jain</p>
                      <p className="text-muted-foreground text-sm">B.E Electrical · Director · Since 2018</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h3 className="text-minimal text-muted-foreground mb-4 tracking-widest">WHY REL</h3>
              <h4 className="text-3xl md:text-4xl font-light text-architectural max-w-2xl mx-auto">
                Excellence Through Commitment
              </h4>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <p className="text-lg text-muted-foreground leading-relaxed">
                  REL's futuristic and modern manufacturing facilities combined with 
                  uncompromising machinery and latest equipment makes it a{" "}
                  <span className="text-foreground font-medium">pioneer for stakeholders everywhere</span>.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Maintaining high standards of ethics and professionalism in every aspect 
                  of our business, we provide a complete range of copper products with one 
                  objective in mind — <span className="text-foreground font-medium">exceeding customer expectations</span>.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="space-y-6">
                  {[
                    { title: "Ubiquitous Presence", desc: "Endeavoring to cover the complete array of copper conductors across industries" },
                    { title: "Certified Resilience", desc: "Certifications that indicate resilience to survive business cycles" },
                    { title: "Global Growth", desc: "Leveraging growth in India and abroad through ethics and professionalism" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * i }}
                      className="border-l-2 border-foreground/30 pl-6 hover:border-foreground transition-colors duration-300"
                    >
                      <h5 className="text-lg font-medium mb-1 text-foreground">{item.title}</h5>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-20 pt-12 border-t border-border"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { label: "ESTABLISHED", value: "1989" },
                  { label: "IN COPPER", value: "50+ Yrs" },
                  { label: "LEADERSHIP SINCE", value: "2006" },
                  { label: "NEXT GEN SINCE", value: "2018" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl md:text-4xl font-light text-foreground mb-2">{stat.value}</p>
                    <p className="text-minimal text-muted-foreground tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h3 className="text-minimal text-muted-foreground mb-4 tracking-widest">OUR JOURNEY</h3>
              <h4 className="text-3xl md:text-4xl font-light text-architectural">
                Milestones That Define Us
              </h4>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

              {[
                { year: "1989", title: "The Beginning", desc: "Rational Engineers Limited is founded, entering the copper conductor industry with a commitment to quality." },
                { year: "1990s", title: "Building Foundations", desc: "Established core manufacturing capabilities and built early relationships with transformer OEMs across India." },
                { year: "2006", title: "New Leadership", desc: "Mr. Mahendra Jain (B.E Mech) takes over as Managing Director, bringing a bold vision to modernise and scale operations." },
                { year: "2010s", title: "Facility Modernisation", desc: "Major upgrades to manufacturing facilities with state-of-the-art machinery, achieving ISO certifications and expanding product range." },
                { year: "2018", title: "Next Generation Joins", desc: "Mr. Jubin Jain (B.E Electrical) joins the leadership, driving innovation in CTC conductors and digital transformation." },
                { year: "2020s", title: "Global Expansion", desc: "Expanded presence in international markets while strengthening domestic operations — now serving clients across India and abroad." },
                { year: "Today", title: "Industry Pioneer", desc: "50+ years in copper, a complete product range, and a reputation for exceeding customer expectations at every turn." },
              ].map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex items-start gap-6 md:gap-0 mb-12 last:mb-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground border-2 border-background z-10 mt-1.5" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-sm font-semibold text-foreground tracking-widest">{milestone.year}</span>
                    <h5 className="text-xl font-medium text-foreground mt-1 mb-2">{milestone.title}</h5>
                    <p className="text-muted-foreground leading-relaxed">{milestone.desc}</p>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Journey */}
      <section className="border-t border-border bg-muted/30 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto w-full max-w-sm"
            >
              <div className="absolute -left-4 -top-4 h-2/3 w-2/3 bg-rational-red/10" />
              <img
                src={founderPortrait}
                alt="Shri. Mahendra K. Jain, Chairman & Managing Director of Rational Engineers Limited"
                className="relative w-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-rational-red" />
                <span className="text-minimal tracking-[0.3em] text-muted-foreground">
                  FOUNDER'S JOURNEY
                </span>
              </div>
              <h3 className="text-3xl font-light text-architectural md:text-5xl">
                Shri. Mahendra K. Jain
              </h3>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-rational-red">
                Chairman &amp; Managing Director
              </p>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Building businesses. Creating value. Transforming lives — three decades of
                entrepreneurship across engineering, metals, infrastructure, finance and
                aviation, from Business Management in 1992 to the greenfield factory at
                Vadodara in 2025.
              </p>

              <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
                {[
                  { v: "₹1,600+ Cr", l: "Group Revenue FY 25-26" },
                  { v: "800+", l: "Strong Workforce" },
                  { v: "5", l: "Manufacturing Facilities" },
                ].map((s) => (
                  <div key={s.l} className="bg-background px-5 py-6">
                    <p className="text-2xl font-light text-foreground">{s.v}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/founder"
                  className="bg-rational-red px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground hover:bg-foreground transition-colors duration-300"
                >
                  Explore the full journey
                </a>
                <a
                  href="/leadership"
                  className="border border-foreground/20 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground hover:border-rational-red hover:text-rational-red transition-colors duration-300"
                >
                  Meet the leadership
                </a>
                <a
                  href="/csr"
                  className="border border-foreground/20 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-foreground hover:border-rational-red hover:text-rational-red transition-colors duration-300"
                >
                  CSR activities
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
