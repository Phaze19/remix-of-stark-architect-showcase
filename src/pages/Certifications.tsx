import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, FileCheck, Download, ExternalLink, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";

const certifications = [
  {
    id: "iso-9001",
    icon: Shield,
    title: "ISO 9001:2015",
    subtitle: "Quality Management System",
    description: "Internationally recognised standard ensuring consistent quality in design, development, production, and delivery of copper conductors.",
    scope: "Manufacturing of CTC conductors, paper covered copper strips/wires, enameled copper wires, bare copper wires & strips",
    status: "Inactive",
  },
  {
    id: "iso-14001",
    icon: FlaskConical,
    title: "ISO 14001:2015",
    subtitle: "Environmental Management System",
    description: "Demonstrates our commitment to minimising environmental impact across all manufacturing processes and waste management.",
    scope: "Environmental management across all production facilities and supply chain operations",
    status: "Inactive",
  },
];

const qualityHighlights = [
  { label: "Copper Purity", value: "99.99%", desc: "Electrolytic grade" },
  { label: "On-Time Delivery", value: "98%+", desc: "Across all orders" },
  { label: "Rejection Rate", value: "<0.1%", desc: "Industry-leading quality" },
  { label: "Testing Parameters", value: "50+", desc: "Per production batch" },
];

const Certifications = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-minimal text-muted-foreground mb-4 tracking-widest">CERTIFICATIONS</h1>
              <h2 className="text-4xl md:text-6xl font-light text-architectural mb-6">
                Quality You Can Verify
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Our certifications aren't paperwork — they're <span className="text-foreground font-medium">risk insurance</span> for your projects. Every certificate represents rigorous third-party audits.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Stats */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {qualityHighlights.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <p className="text-3xl md:text-4xl font-light text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-foreground mb-1">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-minimal text-muted-foreground mb-4 tracking-widest">INACTIVE CERTIFICATIONS</h3>
              <h4 className="text-3xl md:text-4xl font-light text-architectural">
                Standards We Uphold
              </h4>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-muted/30 border border-border rounded-xl p-8 hover:border-foreground/30 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 ease-smooth flex flex-col"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-full bg-muted group-hover:bg-foreground/10 flex items-center justify-center transition-colors duration-300">
                      <cert.icon className="w-7 h-7 text-foreground group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-foreground/10 text-foreground">
                      {cert.status}
                    </span>
                  </div>

                  <h5 className="text-xl font-semibold text-foreground mb-1">{cert.title}</h5>
                  <p className="text-sm text-muted-foreground mb-4">{cert.subtitle}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">{cert.description}</p>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-1 font-medium tracking-wider">SCOPE</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{cert.scope}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <FileCheck className="w-12 h-12 text-foreground mx-auto mb-6" />
              <h3 className="text-3xl md:text-4xl font-light text-architectural mb-4">
                Need Our Certificates?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Request copies of our certifications for your vendor qualification process. 
                We'll share verified certificates within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <a href="/contact">
                    <ExternalLink className="w-4 h-4" />
                    Request Certificates
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a href="/rational-engineers-brochure.pdf" download="Rational-Engineers-Brochure.pdf">
                    <Download className="w-4 h-4" />
                    Download Brochure
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Certifications;
