import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, FlaskConical, Factory, FileCheck, Microscope } from "lucide-react";
import productBareCopper from "@/assets/product-bare-copper.jpg";
import productBusbar from "@/assets/product-busbar.jpg";
import productCtc from "@/assets/product-ctc-conductor.jpg";

const Work = () => {
  const certifications = [
    {
      icon: Shield,
      title: "ISO 9001:2015",
      description: "Quality Management System certified, ensuring consistent quality across all products and processes.",
      scope: "Manufacturing & Quality Control",
      status: "Inactive"
    },
    {
      icon: FlaskConical,
      title: "ISO 14001:2015",
      description: "Environmental Management System certified, demonstrating our commitment to sustainable manufacturing.",
      scope: "Environmental Compliance",
      status: "Inactive"
    }
  ];

  const capabilities = [
    {
      icon: Factory,
      title: "Advanced Manufacturing",
      image: productBareCopper,
      features: [
        "State-of-the-art wire drawing lines",
        "Precision paper/film wrapping machines",
        "Automated CTC transposition lines",
        "Temperature-controlled annealing furnaces",
        "Clean room insulation facilities"
      ]
    },
    {
      icon: FlaskConical,
      title: "In-House Testing Lab",
      image: productBusbar,
      features: [
        "Conductivity & resistivity testing",
        "Tensile strength measurement",
        "Elongation analysis",
        "Insulation breakdown voltage testing",
        "Dimensional precision verification"
      ]
    },
    {
      icon: Microscope,
      title: "Quality Assurance",
      image: productCtc,
      features: [
        "100% incoming material inspection",
        "In-process quality checks",
        "Statistical process control (SPC)",
        "Final product certification",
        "Full material traceability"
      ]
    }
  ];

  const stats = [
    { value: "25+", label: "Years of Excellence" },
    { value: "99.9%", label: "Purity Copper" },
    { value: "500+", label: "OEM Clients Served" },
    { value: "0", label: "Tolerance for Defects" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <h2 className="text-minimal text-muted-foreground mb-4 tracking-widest">
                CERTIFICATIONS & CAPABILITIES
              </h2>
              <h1 className="text-5xl md:text-7xl font-light text-architectural mb-8">
                Quality You Can<br />
                <span className="text-foreground/70">Verify & Trust</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Our certifications aren't paperwork—they're the foundation of every product we deliver. 
                Every wire, every conductor, backed by rigorous testing and international standards.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-light text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground tracking-wide uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-minimal text-muted-foreground mb-4 tracking-widest">
                INACTIVE CERTIFICATIONS
              </h2>
              <h3 className="text-4xl md:text-5xl font-light text-architectural">
                Internationally Recognized Standards
              </h3>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group bg-muted/50 p-8 rounded-lg border border-dashed border-border hover:border-muted-foreground/30 transition-all duration-500 opacity-80"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center">
                      <cert.icon className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-muted-foreground/10 text-muted-foreground border border-muted-foreground/20">
                      {cert.status}
                    </span>
                  </div>
                  <h4 className="text-xl font-medium mb-3 text-foreground">
                    {cert.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {cert.description}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {cert.scope}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-minimal text-muted-foreground mb-4 tracking-widest">
                CAPABILITIES
              </h2>
              <h3 className="text-4xl md:text-5xl font-light text-architectural">
                World-Class Manufacturing Infrastructure
              </h3>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group bg-background rounded-lg border border-border hover:border-foreground/30 hover:shadow-elegant overflow-hidden transition-all duration-500"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={capability.image} 
                      alt={capability.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center">
                      <capability.icon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-medium mb-4 text-foreground">
                      {capability.title}
                    </h4>
                    <ul className="space-y-3">
                      {capability.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex}
                          className="text-muted-foreground text-sm flex items-start gap-3"
                        >
                          <FileCheck className="w-4 h-4 text-foreground/60 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Promise Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-light text-architectural mb-8">
                Our Quality Promise
              </h2>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Every product ships with complete documentation—test certificates, material traceability, 
                and compliance reports. Because in critical applications, you need proof, not promises.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-sm hover:bg-foreground/90 transition-colors duration-300"
                >
                  Request Certification Details
                </a>
                <a 
                  href="/#products" 
                  className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 rounded-sm hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                  View Our Products
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

export default Work;
