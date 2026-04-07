import { Zap, Cog, Wind } from "lucide-react";
import productBareCopper from "@/assets/product-bare-copper.jpg";
import productBusbar from "@/assets/product-busbar.jpg";
import productCtc from "@/assets/product-ctc-conductor.jpg";

const IndustrialApplications = () => {
  const clusters = [
    {
      icon: Zap,
      label: "Power & Grid Infrastructure",
      image: productBareCopper,
      applications: [
        "Oil-filled transformers",
        "Dry-type transformers",
        "Cast resin transformers",
        "HVDC transformers",
        "Generators"
      ]
    },
    {
      icon: Cog,
      label: "Mission-Critical Electrical Machinery",
      image: productBusbar,
      applications: [
        "Alternators",
        "Transformer generators",
        "High-voltage motors",
        "Low-voltage motors",
        "Turbines"
      ]
    },
    {
      icon: Wind,
      label: "High-Stress & Continuous-Load Applications",
      image: productCtc,
      applications: [
        "Windmill & hydro systems",
        "Traction / locomotive motors",
        "Industrial generators"
      ]
    }
  ];

  return (
    <section className="py-32 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-minimal text-rational-red mb-4 tracking-widest">
              APPLICATIONS
            </h2>
            <div className="w-12 h-0.5 bg-rational-red mx-auto mb-6" />
            <h3 className="text-4xl md:text-5xl font-light text-architectural max-w-3xl mx-auto">
              Built for Industries Where Failure Is Not an Option
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {clusters.map((cluster, index) => (
              <div 
                key={index} 
                className="group bg-background rounded-lg border border-border hover:border-rational-red/40 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 ease-smooth overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={cluster.image} 
                    alt={cluster.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center">
                    <cluster.icon className="w-6 h-6 text-foreground" />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-medium mb-4 text-foreground group-hover:text-foreground/90 transition-colors duration-300">
                    {cluster.label}
                  </h4>
                  <ul className="space-y-2">
                    {cluster.applications.map((app, appIndex) => (
                      <li 
                        key={appIndex}
                        className="text-muted-foreground text-sm flex items-center gap-3 group-hover:text-foreground/70 transition-colors duration-300"
                        style={{ transitionDelay: `${appIndex * 50}ms` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 group-hover:bg-rational-red group-hover:scale-125 flex-shrink-0 transition-all duration-300" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-lg">
              Our certifications aren't paperwork—they're <span className="text-foreground font-medium">risk insurance</span> for your projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrialApplications;
