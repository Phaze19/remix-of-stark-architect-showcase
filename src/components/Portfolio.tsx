import ctcImg from "@/assets/cat-ctc.jpg";
import bareCableImg from "@/assets/cat-bare-cable.jpg";
import insulatedCableImg from "@/assets/cat-insulated-cable.jpg";
import enamCopperImg from "@/assets/cat-enamelled-copper.jpg";
import enamAluImg from "@/assets/cat-enamelled-aluminium.jpg";
import piccImg from "@/assets/cat-picc.jpg";
import micaImg from "@/assets/cat-mica.jpg";
import kaptonImg from "@/assets/cat-kapton.jpg";
import fiberglassImg from "@/assets/cat-fiberglass.jpg";
import litzCuImg from "@/assets/cat-litz-copper.jpg";
import litzAlImg from "@/assets/cat-litz-aluminium.jpg";
import busbarImg from "@/assets/cat-busbar.jpg";

const Portfolio = () => {
  const products = [
    {
      image: ctcImg,
      title: "CONTINUOUSLY TRANSPOSED CONDUCTOR (CTC)",
      category: "TRANSFORMER WINDINGS",
      description:
        "5 - 84 enamelled rectangular strands, transposing pitch 35 - 225 mm, wrapped in pure cellulose paper tapes for low-loss windings.",
    },
    {
      image: bareCableImg,
      title: "BARE CABLE",
      category: "STRANDED CONDUCTORS",
      description:
        "Cross section 2.50 - 1000 mm², single wires 0.10 - 3.50 mm, cable diameter 2.50 - 50 mm.",
    },
    {
      image: insulatedCableImg,
      title: "INSULATED CABLE",
      category: "INSULATED CONDUCTORS",
      description:
        "Cross section 2.50 - 800 mm², radial insulation up to 20 mm build, max 125 layers, overall diameter up to 50 mm.",
    },
    {
      image: enamCopperImg,
      title: "ENAMELLED COPPER — ROUND & RECTANGLE",
      category: "MAGNET WIRE",
      description:
        "Round 0.10 - 5.50 mm, rectangular 3.00 - 12.50 mm wide, PVA and PEI-AAI enamel classes 120 - 200°C.",
    },
    {
      image: enamAluImg,
      title: "ENAMELLED ALUMINIUM — ROUND & RECTANGLE",
      category: "MAGNET WIRE",
      description:
        "Round 0.50 - 5.50 mm with epoxy tack layer, uniform melting, high grade curing and stable B-stage.",
    },
    {
      image: piccImg,
      title: "PAPER INSULATED COPPER CONDUCTOR (PICC)",
      category: "INSULATED CONDUCTORS",
      description:
        "IEC, IS, DIN, BS. Width 5 - 20 mm, thickness 0.8 - 9 mm, insulation 0.3 - 6 mm in kraft, DDP, Nomex™ and mica.",
    },
    {
      image: micaImg,
      title: "MICA INSULATED COPPER CONDUCTOR",
      category: "HIGH VOLTAGE INSULATION",
      description:
        "PET mica, class 200°C, sizes 3.00 x 1.10 mm to 15.00 x 5.00 mm for corona-resistant HV machines.",
    },
    {
      image: kaptonImg,
      title: "POLYIMIDE / KAPTON INSULATED COPPER",
      category: "HIGH TEMPERATURE INSULATION",
      description:
        "Tape 6 - 30 mm wide, 0.01 - 0.06 mm thick, hot sealed overlap, thermal class 240°C, IEC 60317-43 & 44.",
    },
    {
      image: fiberglassImg,
      title: "FIBER GLASS INSULATED COPPER & ALUMINIUM",
      category: "HIGH TEMPERATURE INSULATION",
      description:
        "Glass fibre yarn over Nomex or polyimide tape, class F/H varnish, 3.00 x 1.10 mm to 16.00 x 6.00 mm.",
    },
    {
      image: litzCuImg,
      title: "HIGH FREQUENCY COPPER LITZ WIRES & CABLES",
      category: "HIGH FREQUENCY CONDUCTORS",
      description:
        "Cross section 0.25 - 400 mm², single wire 0.04 - 2.52 mm, round and pressed constructions.",
    },
    {
      image: litzAlImg,
      title: "HIGH FREQUENCY ALUMINIUM LITZ WIRES & CABLES",
      category: "HIGH FREQUENCY CONDUCTORS",
      description:
        "Cross section 10 - 240 mm², single wire 0.5 - 2.52 mm, pressed width 5.00 - 25.00 mm.",
    },
    {
      image: busbarImg,
      title: "COPPER BUSBAR & COPPER FLAT STRIPS",
      category: "FLAT CONDUCTORS",
      description:
        "Precision busbars and flat strips for power distribution, machined and finished to customer drawing.",
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
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="group bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:ring-1 hover:ring-rational-red/20"
              >
                <div className="relative overflow-hidden aspect-square bg-white">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <p className="text-minimal text-rational-red mb-2">{product.category}</p>
                  <h4 className="text-lg font-medium text-foreground mb-3 leading-snug">
                    {product.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
