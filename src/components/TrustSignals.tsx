import { Shield, Award, Calendar } from "lucide-react";

const TrustSignals = () => {
  const clients = ["ABB", "SIEMENS", "TOSHIBA", "TBEA", "CROMPTON", "BHEL"];

  const certifications = [
    { icon: Shield, label: "ISO 9001:2015" },
    { icon: Award, label: "ISO 14001:2015" },
    { icon: Shield, label: "OHSAS 18001" },
  ];

  return (
    <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold whitespace-nowrap">
            Trusted by Global Tier-1 Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {clients.map((client) => (
              <span
                key={client}
                className="font-display text-xl md:text-2xl font-bold italic tracking-tighter text-white/40 hover:text-rational-red transition-colors duration-300"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-end items-center gap-8 pt-10 mt-10 border-t border-white/5">
          {certifications.map((cert) => (
            <div
              key={cert.label}
              className="flex items-center gap-2 text-white/50 hover:text-rational-red transition-colors duration-300"
            >
              <cert.icon className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-widest">{cert.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 text-white/50">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-widest">Since 1989</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
