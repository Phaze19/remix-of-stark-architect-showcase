import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Factory, Wind, Shield, CheckCircle, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ctcAsset from "@/assets/cat-ctc.jpg.asset.json";
import bareCableAsset from "@/assets/cat-bare-cable.jpg.asset.json";
import insulatedCableAsset from "@/assets/cat-insulated-cable.jpg.asset.json";
import enamCopperAsset from "@/assets/cat-enamelled-copper.jpg.asset.json";
import enamAluAsset from "@/assets/cat-enamelled-aluminium.jpg.asset.json";
import piccAsset from "@/assets/cat-picc.jpg.asset.json";
import micaAsset from "@/assets/cat-mica.jpg.asset.json";
import kaptonAsset from "@/assets/cat-kapton.jpg.asset.json";
import fiberglassAsset from "@/assets/cat-fiberglass.jpg.asset.json";
import litzCuAsset from "@/assets/cat-litz-copper.jpg.asset.json";
import litzAlAsset from "@/assets/cat-litz-aluminium.jpg.asset.json";
import busbarAsset from "@/assets/cat-busbar.jpg.asset.json";

// Brochure PDF path - will work once the user uploads the file
const brochurePdf = "/rational-engineers-brochure.pdf";

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
      image: ctcAsset.url,
      title: "CONTINUOUSLY TRANSPOSED CONDUCTOR (CTC)",
      category: "TRANSFORMER WINDINGS",
      description:
        "A group of enamelled rectangular strips — PVA or PVA-epoxy with bonding layer — connected up parallel at the ends, where each strand successively and repeatedly takes every possible position inside the conductor cross section. The strands as a whole are wrapped with pure cellulose paper tapes (diamond dotted epoxy paper, Cindus, Dennison, kraft and crepe paper) for manufacturing low-loss windings for electric machines.",
      applications: [
        "Low-loss power transformer windings",
        "Generator step-up (GSU) transformers",
        "Reactors and large distribution transformers",
        "High-efficiency windings for electric machines",
      ],
      specifications: [
        { label: "Number of strands", value: "5 - 84 Nos" },
        { label: "Inter column layer", value: "0 - 0.5 mm" },
        { label: "Height of CTC conductor", value: "5.50 - 85.00 mm" },
        { label: "Width of CTC conductor", value: "10 - 40 N/mm" },
        { label: "Transposing pitch length", value: "35 - 225 mm" },
        { label: "Single strip thickness", value: "1.10 - 3.15 mm" },
        { label: "Single strip width", value: "3.00 - 12.50 mm" },
        { label: "Width / thickness ratio", value: "3:1 - 8:1" },
        { label: "Proof stress (0.2)", value: "60 - 260 N/mm" },
        { label: "Enamel increase", value: "0.08 - 0.18 mm" },
      ],
      whyUs: [
        "Greater electrical efficiency from minimised load losses",
        "Improved cooling from efficient heat dissipation",
        "Reduced winding time for higher transformer productivity",
        "Improved mechanical strength from composite construction",
      ],
      industries: [
        { icon: Zap, name: "Power Generation" },
        { icon: Factory, name: "Transformers" },
        { icon: Shield, name: "Utilities" },
      ],
    },
    {
      id: "bare-cable",
      image: bareCableAsset.url,
      title: "BARE CABLE",
      category: "STRANDED CONDUCTORS",
      description:
        "Bare stranded copper cable drawn and bunched in-house across a wide cross-sectional range, supplied on drums for further insulation, winding or termination.",
      applications: [
        "Transformer and switchgear connections",
        "Earthing and bonding systems",
        "Flexible power leads",
        "Feedstock for insulated cable production",
      ],
      specifications: [
        { label: "Cross sectional area", value: "2.50 - 1000 mm²" },
        { label: "Diameter of single wires", value: "0.10 - 3.50 mm" },
        { label: "No. of strands", value: "Up to 91" },
        { label: "Diameter of cable", value: "2.50 - 50 mm" },
      ],
      whyUs: [
        "High-purity electrolytic copper base",
        "Consistent strand geometry and lay length",
        "Full traceability on every drum",
        "Wide size range from one supplier",
      ],
      industries: [
        { icon: Zap, name: "Power" },
        { icon: Factory, name: "Heavy Industry" },
        { icon: Shield, name: "Infrastructure" },
      ],
    },
    {
      id: "insulated-cable",
      image: insulatedCableAsset.url,
      title: "INSULATED CABLE",
      category: "INSULATED CONDUCTORS",
      description:
        "Stranded copper cable lapped with multi-layer insulation to the required radial build, engineered for transformer leads and high-current winding connections.",
      applications: [
        "Transformer lead-out cables",
        "High-current winding connections",
        "Reactor and generator leads",
        "Custom OEM assemblies",
      ],
      specifications: [
        { label: "Cross sectional area", value: "2.50 - 800 mm²" },
        { label: "Diameter of single wire", value: "0.10 - 3.50 mm" },
        { label: "Radial insulation", value: "Max 20 mm build / radial" },
        { label: "Max overall diameter", value: "50.00 mm" },
        { label: "No. of layers", value: "Max 125" },
      ],
      whyUs: [
        "Uniform lapping tension across every layer",
        "Zero moisture contamination process",
        "Insulation build to customer drawing",
        "In-house paper and tape quality testing",
      ],
      industries: [
        { icon: Zap, name: "Utilities" },
        { icon: Factory, name: "Transformers" },
        { icon: Shield, name: "Infrastructure" },
      ],
    },
    {
      id: "enamelled-copper",
      image: enamCopperAsset.url,
      title: "ENAMELLED COPPER — ROUND & RECTANGLE",
      category: "MAGNET WIRE",
      description:
        "Enamelled copper wire, also called magnet wire, is widely used across electrical applications for its superior electrical, thermal and mechanical properties. Conductors are insulated by coating with enamel of different temperature classes.",
      applications: [
        "Electric motors and generators",
        "Transformer and reactor windings",
        "Solenoids, actuators and coils",
        "Automotive and HVAC components",
      ],
      specifications: [
        { label: "Round diameter", value: "0.10 - 5.50 mm" },
        { label: "Rectangular width", value: "3.00 - 12.50 mm" },
        { label: "Rectangular thickness", value: "1.00 - 3.15 mm" },
        { label: "Enamel class", value: "PVA / Poly Vinyl Acetal, 120°C" },
        { label: "PEI-AAI", value: "Polyesterimide + Polyamideimide, 180 / 200" },
        { label: "Grade", value: "1, 2, 3" },
      ],
      whyUs: [
        "Uniform enamel thickness throughout",
        "Excellent flexibility and adherence",
        "High breakdown voltage ratings",
        "Resistance to thermal shock",
      ],
      industries: [
        { icon: Factory, name: "Motors" },
        { icon: Wind, name: "Generators" },
        { icon: Zap, name: "Electronics" },
      ],
    },
    {
      id: "enamelled-aluminium",
      image: enamAluAsset.url,
      title: "ENAMELLED ALUMINIUM — ROUND & RECTANGLE",
      category: "MAGNET WIRE",
      description:
        "Enamelled aluminium conductors covered by a thin layer of epoxy tack. The epoxy system offers uniform melting, high grade curing, B-stage stability of more than 6 months at 40°C and higher mechanical strength.",
      applications: [
        "Distribution transformer windings",
        "Cost-optimised motor windings",
        "Reactors and chokes",
        "Bonded winding assemblies",
      ],
      specifications: [
        { label: "Round diameter", value: "0.50 - 5.50 mm" },
        { label: "Rectangular width", value: "3.00 - 12.50 mm" },
        { label: "Rectangular thickness", value: "1.00 - 3.15 mm" },
        { label: "Enamel class", value: "PVA / Poly Vinyl Acetal, 120°C" },
        { label: "PVA + Epoxy", value: "Class 120, cured to tack-free B-stage" },
        { label: "Grade", value: "1, 2, 3" },
      ],
      whyUs: [
        "Uniform melting of the epoxy tack layer",
        "High grade curing with stable B-stage",
        "Higher mechanical strength of finished coils",
        "Lightweight alternative to copper windings",
      ],
      industries: [
        { icon: Zap, name: "Distribution" },
        { icon: Factory, name: "Motors" },
        { icon: Wind, name: "Renewables" },
      ],
    },
    {
      id: "picc",
      image: piccAsset.url,
      title: "PAPER INSULATED COPPER CONDUCTOR (PICC)",
      category: "INSULATED CONDUCTORS",
      description:
        "Paper insulated copper round and rectangle conductors manufactured to IEC, IS, DIN and BS specifications, with lapping patterns and paper combinations built to customer requirement after mutual discussion.",
      applications: [
        "Single paper covered copper conductor",
        "Twin and triple bunch paper covered conductor",
        "Quadra and hexa bunch paper covered conductor",
        "Oil-filled power and distribution transformers",
      ],
      specifications: [
        { label: "Specification", value: "IEC, IS, DIN, BS" },
        { label: "Width", value: "5 mm to 20 mm" },
        { label: "Thickness", value: "0.8 to 9 mm" },
        { label: "Periphery of rectangular conductor", value: "50 mm max" },
        { label: "Width to thickness ratio", value: "10:1" },
        { label: "Insulation thickness", value: "0.3 mm to 6 mm" },
        { label: "Insulation types", value: "Kraft, thermally stabilised, DDP, Nomex™, polyester, mica" },
        { label: "Type of lapping", value: "Butt lapped, 30-50% overlapped, interlocked" },
      ],
      whyUs: [
        "Kraft, crepe, Nomex and thermally upgraded paper in-house",
        "Consistent paper tension and coverage",
        "Zero moisture contamination process",
        "Lapping combinations to customer drawing",
      ],
      industries: [
        { icon: Zap, name: "Utilities" },
        { icon: Factory, name: "Transformers" },
        { icon: Shield, name: "Infrastructure" },
      ],
    },
    {
      id: "mica",
      image: micaAsset.url,
      title: "MICA INSULATED COPPER CONDUCTOR",
      category: "HIGH VOLTAGE INSULATION",
      description:
        "Mica paper made of tiny mica platelets, carried on polyester film (PET) for usability. With respect to corona and thermal resistance requirements mica is the most suitable insulating material, mainly applied in high voltage rotating machines and inverter-driven motors.",
      applications: [
        "High voltage rotating machines",
        "Inverter driven motors",
        "Traction motor windings",
        "Corona-resistant coil insulation",
      ],
      specifications: [
        { label: "Type of insulation", value: "PET Mica" },
        { label: "Temperature class", value: "200°C" },
        { label: "Min. size", value: "3.00 x 1.10 mm" },
        { label: "Max. size", value: "15.00 x 5.00 mm" },
      ],
      whyUs: [
        "Superior corona resistance",
        "Excellent thermal endurance",
        "Precision taping on fragile mica paper",
        "Consistent radial build control",
      ],
      industries: [
        { icon: Factory, name: "Rotating Machines" },
        { icon: Zap, name: "Traction" },
        { icon: Shield, name: "High Voltage" },
      ],
    },
    {
      id: "kapton",
      image: kaptonAsset.url,
      title: "POLYIMIDE / KAPTON INSULATED COPPER",
      category: "HIGH TEMPERATURE INSULATION",
      description:
        "Polyimide film (Kapton®) is wrapped on bare rectangular strip to the desired overlap in order to attain the required insulation thickness. Kapton covered wire meets corona discharge resistant requirements, providing higher resistance to voltage peaks.",
      applications: [
        "Inverter-fed motor windings",
        "Aerospace and defence coils",
        "High temperature transformers",
        "Corona-resistant windings",
      ],
      specifications: [
        { label: "Insulation tape width", value: "6 - 30 mm" },
        { label: "Insulation tape thickness", value: "0.01 - 0.06 mm" },
        { label: "Insulation application", value: "One or two layers, hot sealed overlap" },
        { label: "Thermal class", value: "240°C" },
        { label: "Standards", value: "IEC 60317-43 & 44, IEC 851-1-6" },
      ],
      whyUs: [
        "Hot sealed overlap for reliable adhesion",
        "High resistance to voltage peaks",
        "Precise insulation build control",
        "Class 240°C thermal performance",
      ],
      industries: [
        { icon: Zap, name: "Drives" },
        { icon: Factory, name: "Motors" },
        { icon: Shield, name: "Aerospace" },
      ],
    },
    {
      id: "fiberglass",
      image: fiberglassAsset.url,
      title: "FIBER GLASS INSULATED COPPER & ALUMINIUM",
      category: "HIGH TEMPERATURE INSULATION",
      description:
        "Conductors covered with single or double layers of glass fibre yarn, optionally over Nomex or polyimide tape, impregnated with class F or class H varnish for demanding thermal environments.",
      applications: [
        "Traction and mill motors",
        "Furnace transformers",
        "Generator field coils",
        "High temperature industrial windings",
      ],
      specifications: [
        { label: "Insulation", value: "Nomex / polyimide tape + single or double glass fibre yarn" },
        { label: "Impregnation", value: "Class F / Class H varnish" },
        { label: "Temperature class", value: "Up to 200°C" },
        { label: "Min. size", value: "3.00 x 1.10 mm" },
        { label: "Max. size", value: "16.00 x 6.00 mm" },
        { label: "Standards", value: "IEC-60317-32 / 33, IS-13730-31 / 32" },
      ],
      whyUs: [
        "Robust mechanical protection of the conductor",
        "High thermal endurance",
        "Uniform yarn coverage and varnish cure",
        "Copper and aluminium options",
      ],
      industries: [
        { icon: Factory, name: "Heavy Industry" },
        { icon: Zap, name: "Traction" },
        { icon: Shield, name: "Furnaces" },
      ],
    },
    {
      id: "litz-copper",
      image: litzCuAsset.url,
      title: "HIGH FREQUENCY COPPER LITZ WIRES & CABLES",
      category: "HIGH FREQUENCY CONDUCTORS",
      description:
        "High frequency copper round and pressed litz wires and cables, engineered to minimise skin and proximity effect losses in high frequency magnetics.",
      applications: [
        "Induction heating equipment",
        "High frequency transformers",
        "Inverters and converters",
        "Chokes and resonant coils",
      ],
      specifications: [
        { label: "Cross-section area", value: "0.25 - 400 mm²" },
        { label: "Diameter of single wire", value: "0.04 - 2.52 mm" },
        { label: "Diameter of cable", value: "1.5 - 20.00 mm" },
        { label: "Pressed cable width", value: "5.00 - 25.00 mm" },
        { label: "Thickness", value: "2.00 - 25.00 mm" },
      ],
      whyUs: [
        "Precise bunching and pressing control",
        "Low AC resistance at high frequency",
        "Wide range of constructions",
        "Custom serving and insulation options",
      ],
      industries: [
        { icon: Zap, name: "Power Electronics" },
        { icon: Factory, name: "Induction Heating" },
        { icon: Wind, name: "Renewables" },
      ],
    },
    {
      id: "litz-aluminium",
      image: litzAlAsset.url,
      title: "HIGH FREQUENCY ALUMINIUM LITZ WIRES & CABLES",
      category: "HIGH FREQUENCY CONDUCTORS",
      description:
        "High frequency aluminium round and pressed litz wires and cables offering a lightweight, cost-optimised alternative for high frequency magnetics.",
      applications: [
        "Lightweight high frequency magnetics",
        "Industrial induction equipment",
        "Converter and inverter coils",
        "Cost-optimised choke designs",
      ],
      specifications: [
        { label: "Cross-section area", value: "10 - 240 mm²" },
        { label: "Diameter of single wire", value: "0.5 - 2.52 mm" },
        { label: "Diameter of cable", value: "5.00 - 16.00 mm" },
        { label: "Pressed cable width", value: "5.00 - 25.00 mm" },
        { label: "Thickness", value: "5.00 - 25.00 mm" },
      ],
      whyUs: [
        "Significant weight reduction versus copper",
        "Consistent pressed profile geometry",
        "Stable high frequency performance",
        "Custom constructions on request",
      ],
      industries: [
        { icon: Zap, name: "Power Electronics" },
        { icon: Factory, name: "Industrial" },
        { icon: Wind, name: "Renewables" },
      ],
    },
    {
      id: "busbar",
      image: busbarAsset.url,
      title: "COPPER BUSBAR & COPPER FLAT STRIPS",
      category: "FLAT CONDUCTORS",
      description:
        "Precision copper busbars and flat strips for power distribution, supplied in standard and custom dimensions with machining and surface finishing options.",
      applications: [
        "Switchgear assemblies",
        "Power distribution panels",
        "Transformer connections",
        "Substation equipment",
      ],
      specifications: [
        { label: "Material", value: "High conductivity electrolytic copper" },
        { label: "Edges", value: "Square / rounded / chamfered" },
        { label: "Surface", value: "Plain / tinned / silver-plated" },
        { label: "Fabrication", value: "Cut, bent and punched to drawing" },
      ],
      whyUs: [
        "Tight dimensional accuracy",
        "Burr-free precision edges",
        "Custom lengths and bends",
        "Certified for high-current applications",
      ],
      industries: [
        { icon: Zap, name: "Switchgear" },
        { icon: Factory, name: "Panels" },
        { icon: Shield, name: "Substations" },
      ],
    },
  ];

  return (
    <section id="products" className="py-32 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-minimal text-rational-red mb-4">OUR PRODUCTS</h2>
            <div className="w-12 h-0.5 bg-rational-red mb-6" />
            <h3 className="text-4xl md:text-6xl font-light text-architectural">
              Copper &amp; Aluminium Windings
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mt-4">
              <p className="text-muted-foreground text-lg max-w-2xl">
                Click any product to explore applications, catalogue specifications, and why industry
                leaders choose us.
              </p>
              <Button asChild className="gap-2 shrink-0" size="lg">
                <a href={brochurePdf} download="Rational-Engineers-Brochure.pdf">
                  <Download className="w-4 h-4" />
                  Download Brochure
                </a>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                onClick={() => setSelectedProduct(product)}
                className="group bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-elegant cursor-pointer border border-border hover:border-rational-red/40 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden aspect-square bg-white">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-sm font-medium">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-minimal text-rational-red mb-2">{product.category}</p>
                  <h4 className="text-lg font-medium text-foreground mb-3 leading-snug">
                    {product.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
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
                  className="w-full h-64 md:h-80 object-cover bg-white"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-rational-red hover:text-white transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-minimal text-rational-red mb-2">{selectedProduct.category}</p>
                  <h2 className="text-2xl md:text-3xl font-light text-foreground">
                    {selectedProduct.title}
                  </h2>
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
                      <industry.icon className="w-4 h-4 text-rational-red" />
                      <span className="text-sm text-foreground">{industry.name}</span>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Applications */}
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-rational-red" />
                      Key Applications
                    </h3>
                    <ul className="space-y-3">
                      {selectedProduct.applications.map((app, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-rational-red mt-2 flex-shrink-0" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specifications */}
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                      <Factory className="w-5 h-5 text-rational-red" />
                      Specifications
                    </h3>
                    <div className="space-y-3">
                      {selectedProduct.specifications.map((spec, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-start gap-4 border-b border-border pb-2"
                        >
                          <span className="text-muted-foreground text-sm">{spec.label}</span>
                          <span className="text-foreground font-medium text-sm text-right">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Why Us */}
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-rational-red" />
                    Why Choose Rational Engineers
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {selectedProduct.whyUs.map((reason, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-rational-red mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-rational-red text-white px-6 py-3 rounded-sm hover:bg-foreground transition-colors duration-300"
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
