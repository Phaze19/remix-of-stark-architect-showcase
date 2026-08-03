import { Shield, Award, Calendar } from "lucide-react";

const TrustSignals = () => {
  const clients = [
    "ABB",
    "Siemens",
    "Toshiba",
    "TBEA",
    "Crompton",
    "BHEL",
    "CG Power",
    "Voltamp",
    "Schneider",
    "GE",
    "Hitachi",
    "EMCO"
  ];

  const certifications = [
    { icon: Shield, label: "ISO 9001:2015" },
    { icon: Award, label: "ISO 14001:2015" },
    { icon: Shield, label: "OHSAS 18001" }
  ];

  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-minimal text-rational-red mb-4 tracking-widest">
              TRUSTED BY INDUSTRY LEADERS
            </h2>
            <div className="w-12 h-0.5 bg-rational-red mx-auto" />
          </div>
          
          {/* Client Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-12">
            {clients.map((client, index) => (
              <div 
                key={index} 
                className="text-2xl md:text-3xl font-bold text-muted-foreground/60 hover:text-rational-red transition-colors duration-300"
              >
                {client}
              </div>
            ))}
          </div>
          
          {/* Certifications & Since */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-border">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground hover:text-rational-red transition-colors duration-300">
                <cert.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{cert.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Since 1989</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
