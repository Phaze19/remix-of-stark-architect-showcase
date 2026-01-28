import { Zap, Cog, Wind } from "lucide-react";

const IndustrialApplications = () => {
  const clusters = [
    {
      icon: Zap,
      label: "Power & Grid Infrastructure",
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
            <h2 className="text-minimal text-muted-foreground mb-4 tracking-widest">
              APPLICATIONS
            </h2>
            <h3 className="text-4xl md:text-5xl font-light text-architectural max-w-3xl mx-auto">
              Built for Industries Where Failure Is Not an Option
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {clusters.map((cluster, index) => (
              <div 
                key={index} 
                className="bg-background p-8 rounded-lg border border-border hover:border-foreground/20 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-6">
                  <cluster.icon className="w-7 h-7 text-foreground" />
                </div>
                <h4 className="text-xl font-medium mb-6 text-foreground">
                  {cluster.label}
                </h4>
                <ul className="space-y-3">
                  {cluster.applications.map((app, appIndex) => (
                    <li 
                      key={appIndex}
                      className="text-muted-foreground flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                      {app}
                    </li>
                  ))}
                </ul>
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
