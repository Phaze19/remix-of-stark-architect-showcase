import { CheckCircle } from "lucide-react";

const Differentiation = () => {
  const differentiators = [
    {
      title: "Controlled Copper Sourcing",
      description: "Direct procurement from verified suppliers ensuring consistent purity and conductivity standards."
    },
    {
      title: "In-House Insulation & Coating",
      description: "Complete control over insulation processes—paper covering, enameling, and specialized coatings done under one roof."
    },
    {
      title: "Multi-Stage Quality Checks",
      description: "Rigorous testing at every production stage: incoming material, in-process, and final inspection."
    },
    {
      title: "Application-Specific Customization",
      description: "Products engineered to your exact specifications—dimensions, insulation class, and performance requirements."
    }
  ];

  return (
    <section className="py-32 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-minimal text-rational-red mb-4 tracking-[0.3em]">
                OUR PROCESS
              </h2>
              <div className="w-12 h-0.5 bg-rational-red mb-6" />
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-architectural mb-8">
                Why Our Products Perform Differently
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The difference isn't just in what we make—it's in how we make it. 
                Our integrated manufacturing process ensures every conductor meets 
                the exacting standards your applications demand.
              </p>
            </div>
            
            <div className="space-y-5">
              {differentiators.map((item, index) => (
                <div 
                  key={index} 
                  className="card-premium flex gap-5 p-7 rounded-sm hover:-translate-y-0.5 hover:border-rational-red/40 transition-all duration-500"
                >
                  <CheckCircle className="w-6 h-6 text-rational-red flex-shrink-0 mt-1" />
                  <div>

                    <h4 className="text-lg font-medium mb-2 text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentiation;
