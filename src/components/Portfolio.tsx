import productCtc from "@/assets/product-ctc-conductor.jpg";
import productPaperCovered from "@/assets/product-paper-covered.jpg";
import productEnameled from "@/assets/product-enameled-wire.jpg";
import productBareCopper from "@/assets/product-bare-copper.jpg";
import productBusbar from "@/assets/product-busbar.jpg";
import productWindingWire from "@/assets/product-winding-wire.jpg";

const Portfolio = () => {
  const products = [
    {
      image: productCtc,
      title: "CTC CONDUCTORS",
      category: "TRANSFORMER WINDINGS",
      description: "Continuously Transposed Conductors (CTC) designed for power transformer windings. Superior current-carrying capacity with reduced eddy current losses."
    },
    {
      image: productPaperCovered,
      title: "PAPER COVERED WIRE",
      category: "INSULATED CONDUCTORS",
      description: "High-quality kraft paper insulated copper conductors for transformer applications. Excellent dielectric properties and thermal stability."
    },
    {
      image: productEnameled,
      title: "ENAMELED WIRE",
      category: "MAGNET WIRE",
      description: "Premium enameled copper magnet wire with various coating options. Ideal for motors, generators, and electromagnetic applications."
    },
    {
      image: productBareCopper,
      title: "BARE COPPER WIRE",
      category: "RAW CONDUCTORS",
      description: "High-purity bare copper wire and rods in various gauges. Perfect for grounding, electrical connections, and further processing."
    },
    {
      image: productBusbar,
      title: "COPPER BUSBARS",
      category: "FLAT CONDUCTORS",
      description: "Precision copper busbars and flat strips for power distribution. Available in standard and custom dimensions."
    },
    {
      image: productWindingWire,
      title: "WINDING WIRE",
      category: "TRANSFORMER COMPONENTS",
      description: "Specialized copper winding wire for transformer manufacturing. Consistent quality for reliable electrical performance."
    }
  ];

  return (
    <section id="products" className="py-32 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
             <h2 className="text-minimal text-rational-red mb-4">OUR PRODUCTS</h2>
            <div className="w-12 h-0.5 bg-rational-red mb-6" />
            <h3 className="text-4xl md:text-6xl font-light text-architectural">
              Premium Copper Solutions
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="group bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:ring-1 hover:ring-rational-red/20">
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="p-6">
                  <p className="text-minimal text-muted-foreground mb-2">
                    {product.category}
                  </p>
                  <h4 className="text-xl font-medium text-foreground mb-3">
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
