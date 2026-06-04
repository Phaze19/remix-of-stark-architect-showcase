import { Shield, Award, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const TrustSignals = () => {
  const clients = ["ABB", "SIEMENS", "TOSHIBA", "TBEA", "CROMPTON", "BHEL"];

  const certifications = [
    { icon: Shield, label: "ISO 9001:2015" },
    { icon: Award, label: "ISO 14001:2015" },
    { icon: Shield, label: "OHSAS 18001" },
  ];

  return (
    <section className="py-24 bg-graphite border-y border-copper/10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center font-display text-[10px] uppercase tracking-[0.5em] text-silver/40 font-bold mb-14">
          Trusted by Global Tier-1 Leaders
        </p>

        {/* Metallic logo wall */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-copper/5 border border-copper/10">
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex items-center justify-center py-10 bg-charcoal overflow-hidden"
            >
              {/* glass reflection sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-copper/15 to-transparent" />
              <span className="font-display text-xl md:text-2xl font-bold italic tracking-tighter text-silver/35 group-hover:bg-gradient-copper-text group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                {client}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 pt-12 mt-2">
          {certifications.map((cert) => (
            <div
              key={cert.label}
              className="flex items-center gap-2 text-silver/50 hover:text-copper transition-colors duration-300"
            >
              <cert.icon className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-widest">{cert.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 text-silver/50">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-widest">Since 1989</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
