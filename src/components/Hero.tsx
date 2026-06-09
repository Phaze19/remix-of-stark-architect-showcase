import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-architecture.jpg";
import rationalLogo from "@/assets/rational-logo-original.jpeg";

// Deterministic floating copper particles
const particles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: (i * 47) % 100,
  top: (i * 29) % 100,
  size: 1 + (i % 4),
  duration: 9 + (i % 7) * 1.6,
  delay: (i % 9) * 0.7,
}));

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-graphite">
      {/* Cinematic background */}
      <motion.img
        src={heroImage}
        alt="Glowing copper cathode emerging from darkness"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/85 to-graphite/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-graphite/50" />

      {/* Floating copper particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background: "hsl(var(--copper-bright))",
              boxShadow: "0 0 8px 1px hsl(var(--copper) / 0.7)",
            }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <motion.div
          className="inline-flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="h-px w-12 bg-copper" />
          <span className="font-display uppercase tracking-[0.4em] text-xs text-copper font-bold">
            Copper Conductor Solutions · Since 1989
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-8 text-white max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Powering The World's
          <br />
          <span className="bg-gradient-copper-text bg-clip-text text-transparent">
            Energy Infrastructure.
          </span>
        </motion.h1>

        <motion.p
          className="max-w-2xl text-lg md:text-xl text-silver/70 mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
        >
          Premium copper conductor solutions engineered for reliability — supplying CTC,
          enameled, Nomex and paper-covered conductors to the transformer, power and
          energy sectors worldwide.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
        >
          <a
            href="#journey"
            className="group px-8 md:px-10 py-5 bg-gradient-copper transition-all font-bold uppercase tracking-wider text-xs text-white flex items-center gap-4 shadow-[var(--shadow-copper)] hover:-translate-y-0.5"
          >
            Explore The Journey
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#products"
            className="px-8 md:px-10 py-5 border border-silver/25 hover:bg-silver hover:text-graphite transition-all font-bold uppercase tracking-wider text-xs text-white"
          >
            View Products
          </a>
        </motion.div>
      </div>

      {/* Logo badge */}
      <div className="absolute top-8 right-6 z-10 hidden md:block">
        <div className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 border border-copper/25">
          <img src={rationalLogo} alt="Rational Engineers" className="h-10 w-auto" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50">
        <span className="font-display text-[10px] tracking-[0.5em] uppercase text-silver/70">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-copper to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
