import { Zap, Building2, Globe } from "lucide-react";

const IndustrialApplications = () => {
  const applications = [
    {
      icon: Zap,
      title: "Power & Transformers",
      description: "High-performance conductors for power transformers, reactors, and electrical equipment where reliability is non-negotiable."
    },
    {
      icon: Building2,
      title: "Infrastructure & Grid",
      description: "Copper solutions built for India's growing power infrastructure and grid modernization projects."
    },
    {
      icon: Globe,
      title: "Export & Compliance-Heavy Projects",
      description: "Certified products meeting international standards for global OEMs and compliance-critical applications."
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
            {applications.map((app, index) => (
              <div 
                key={index} 
                className="bg-background p-8 rounded-lg border border-border hover:border-foreground/20 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-6">
                  <app.icon className="w-7 h-7 text-foreground" />
                </div>
                <h4 className="text-xl font-medium mb-4 text-foreground">
                  {app.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {app.description}
                </p>
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
