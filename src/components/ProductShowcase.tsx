import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Factory, Wind, Shield, CheckCircle, ArrowRight } from "lucide-react";
import productCtc from "@/assets/product-ctc-conductor.jpg";
import productPaperCovered from "@/assets/product-paper-covered.jpg";
import productEnameled from "@/assets/product-enameled-wire.jpg";
import productBareCopper from "@/assets/product-bare-copper.jpg";
import productBusbar from "@/assets/product-busbar.jpg";
import productWindingWire from "@/assets/product-winding-wire.jpg";

interface Product {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  applications: string[];
  specifications: { label: string; value: string }[];
  whyUs: string[];
  industries: { icon: typeof Zap; name: string }[];
}

const ProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: "ctc",
      image: productCtc,
      title: "CTC CONDUCTORS",
      category: "TRANSFORMER WINDINGS",
      description: "Continuously Transposed Conductors (CTC) designed for power transformer windings. Superior current-carrying capacity with reduced eddy current losses.",
      applications: [
        "High-power distribution transformers",
        "Generator step-up transformers",
        "HVDC converter transformers",
        "Furnace transformers",
        "Rectifier transformers"
      ],
      specifications: [
        { label: "Conductor Width", value: "5mm - 20mm" },
        { label: "Conductor Thickness", value: "1mm - 3mm" },
        { label: "Number of Strands", value: "5 - 80" },
        { label: "Insulation", value: "Paper/Enamel/Nomex" }
      ],
      whyUs: [
        "Precision transposition with zero gaps",
        "Uniform tension across all strands",
        "Custom dimensions for your transformer design",
        "100% electrical testing on every batch"
      ],
      industries: [
        { icon: Zap, name: "Power Generation" },
        { icon: Factory, name: "Heavy Industry" },
        { icon: Wind, name: "Renewable Energy" }
      ]
    },
    {
      id: "paper-covered",
      image: productPaperCovered,
      title: "PAPER COVERED WIRE",
      category: "INSULATED CONDUCTORS",
      description: "High-quality kraft paper insulated copper conductors for transformer applications. Excellent dielectric properties and thermal stability.",
      applications: [
        "Oil-filled power transformers",
        "Distribution transformers",
        "Instrument transformers",
        "Reactor windings",
        "Shunt reactors"
      ],
      specifications: [
        { label: "Copper Section", value: "Rectangular/Square/Round" },
        { label: "Paper Layers", value: "2 - 12 layers" },
        { label: "Paper Grade", value: "Kraft/DDP/Crepe" },
        { label: "Overlap", value: "50% half-lap standard" }
      ],
      whyUs: [
        "Consistent paper tension and coverage",
        "Zero moisture contamination process",
        "High-purity 99.9% copper base",
        "In-house paper quality testing"
      ],
      industries: [
        { icon: Zap, name: "Utilities" },
        { icon: Factory, name: "Transformers" },
        { icon: Shield, name: "Infrastructure" }
      ]
    },
    {
      id: "enameled",
      image: productEnameled,
      title: "ENAMELED WIRE",
      category: "MAGNET WIRE",
      description: "Premium enameled copper magnet wire with various coating options. Ideal for motors, generators, and electromagnetic applications.",
      applications: [
        "Electric motors & generators",
        "Automotive components",
        "HVAC compressors",
        "Solenoids & actuators",
        "Electromagnetic coils"
      ],
      specifications: [
        { label: "Wire Gauge", value: "SWG 8 - SWG 44" },
        { label: "Coating Types", value: "Polyester/Polyamide/Polyimide" },
        { label: "Thermal Class", value: "130°C - 220°C" },
        { label: "Build", value: "Single/Heavy/Triple" }
      ],
      whyUs: [
        "Uniform enamel thickness throughout",
        "Excellent flexibility and adherence",
        "High breakdown voltage ratings",
        "Resistance to thermal shock"
      ],
      industries: [
        { icon: Factory, name: "Motors" },
        { icon: Wind, name: "Generators" },
        { icon: Zap, name: "Electronics" }
      ]
    },
    {
      id: "bare-copper",
      image: productBareCopper,
      title: "BARE COPPER WIRE",
      category: "RAW CONDUCTORS",
      description: "High-purity bare copper wire and rods in various gauges. Perfect for grounding, electrical connections, and further processing.",
      applications: [
        "Grounding systems",
        "Electrical connections",
        "Braided conductors",
        "Flexible connectors",
        "Further wire processing"
      ],
      specifications: [
        { label: "Purity", value: "99.9%+ OFHC" },
        { label: "Diameter Range", value: "0.1mm - 12mm" },
        { label: "Temper", value: "Soft/Half-Hard/Hard" },
        { label: "Conductivity", value: "101% IACS minimum" }
      ],
      whyUs: [
        "Ultra-high purity certified copper",
        "Consistent conductivity throughout",
        "Surface finish to your specification",
        "Full material traceability"
      ],
      industries: [
        { icon: Zap, name: "Electrical" },
        { icon: Factory, name: "Manufacturing" },
        { icon: Shield, name: "Grounding" }
      ]
    },
    {
      id: "busbar",
      image: productBusbar,
      title: "COPPER BUSBARS",
      category: "FLAT CONDUCTORS",
      description: "Precision copper busbars and flat strips for power distribution. Available in standard and custom dimensions.",
      applications: [
        "Switchgear assemblies",
        "Power distribution panels",
        "Transformer connections",
        "Generator busbars",
        "Substation equipment"
      ],
      specifications: [
        { label: "Width", value: "12mm - 200mm" },
        { label: "Thickness", value: "3mm - 20mm" },
        { label: "Edges", value: "Square/Rounded/Chamfered" },
        { label: "Surface", value: "Plain/Tinned/Silver-plated" }
      ],
      whyUs: [
        "Dimensional accuracy ±0.1mm",
        "Burr-free precision edges",
        "Custom lengths up to 6 meters",
        "Certified for high-current applications"
      ],
      industries: [
        { icon: Zap, name: "Switchgear" },
        { icon: Factory, name: "Panels" },
        { icon: Shield, name: "Substations" }
      ]
    },
    {
      id: "winding-wire",
      image: productWindingWire,
      title: "WINDING WIRE",
      category: "TRANSFORMER COMPONENTS",
      description: "Specialized copper winding wire for transformer manufacturing. Consistent quality for reliable electrical performance.",
      applications: [
        "Transformer primary/secondary windings",
        "Inductor coils",
        "Choke coils",
        "Reactor windings",
        "Custom electromagnetic applications"
      ],
      specifications: [
        { label: "Shape", value: "Round/Rectangular/Square" },
        { label: "Size Range", value: "0.5mm - 15mm" },
        { label: "Corner Radius", value: "As per requirement" },
        { label: "Tolerance", value: "IS/IEC/ASTM standards" }
      ],
      whyUs: [
        "Optimized for high fill factors",
        "Consistent cross-section throughout",
        "Low surface roughness finish",
        "Designed for automated winding"
      ],
      industries: [
        { icon: Zap, name: "Transformers" },
        { icon: Factory, name: "Inductors" },
        { icon: Wind, name: "Reactors" }
      ]
    }
  ];

  return (
    <section id="products" className="py-32 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-muted-foreground mb-4">OUR PRODUCTS</h2>
            <h3 className="text-4xl md:text-6xl font-light text-architectural">
              Premium Copper Solutions
            </h3>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
              Click any product to explore applications, specifications, and why industry leaders choose us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedProduct(product)}
                className="group bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-elegant cursor-pointer border border-border hover:border-foreground/30 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-sm font-medium">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-minimal text-muted-foreground mb-2">
                    {product.category}
                  </p>
                  <h4 className="text-xl font-medium text-foreground mb-3">
                    {product.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background border border-border rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-elegant"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-minimal text-foreground/70 mb-2">{selectedProduct.category}</p>
                  <h2 className="text-3xl md:text-4xl font-light text-foreground">{selectedProduct.title}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Industries */}
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.industries.map((industry, i) => (
                    <div key={i} className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                      <industry.icon className="w-4 h-4 text-foreground" />
                      <span className="text-sm text-foreground">{industry.name}</span>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Applications */}
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Key Applications
                    </h3>
                    <ul className="space-y-3">
                      {selectedProduct.applications.map((app, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground/50 mt-2 flex-shrink-0" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specifications */}
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                      <Factory className="w-5 h-5" />
                      Specifications
                    </h3>
                    <div className="space-y-3">
                      {selectedProduct.specifications.map((spec, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-border pb-2">
                          <span className="text-muted-foreground">{spec.label}</span>
                          <span className="text-foreground font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Why Us */}
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Why Choose Rational Engineers
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {selectedProduct.whyUs.map((reason, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a 
                    href="/contact" 
                    className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-sm hover:bg-foreground/90 transition-colors duration-300"
                  >
                    Request Quote
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-sm hover:border-foreground/50 transition-colors duration-300"
                  >
                    View All Products
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductShowcase;
