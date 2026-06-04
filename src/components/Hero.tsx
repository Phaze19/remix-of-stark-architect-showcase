import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-copper-wires.jpg";
import rationalLogo from "@/assets/rational-logo-original.jpeg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Copper manufacturing facility"
        className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="inline-flex items-center gap-4 mb-8 animate-fade-in">
          <span className="h-[2px] w-12 bg-rational-red" />
          <span className="font-display uppercase tracking-[0.4em] text-xs text-rational-red font-bold">
            Established 1989
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.92] mb-8 text-white animate-fade-in">
          COPPER BUILT FOR
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 italic">
            SCALE &amp; PRECISION.
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-white/60 mb-12 leading-relaxed animate-fade-in">
          Supplying high-performance copper conductors to India's leading transformer
          and infrastructure manufacturers. Engineering the backbone of electrification since 1989.
        </p>

        <div className="flex flex-wrap gap-5 animate-fade-in">
          <a
            href="#trust"
            className="group px-8 md:px-10 py-5 bg-rational-red hover:bg-rational-red/85 transition-all font-bold uppercase tracking-wider text-xs text-white flex items-center gap-4"
          >
            Why Leaders Choose Us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#products"
            className="px-8 md:px-10 py-5 border border-white/20 hover:bg-white hover:text-[#0a0a0a] transition-all font-bold uppercase tracking-wider text-xs text-white"
          >
            View Portfolio
          </a>
        </div>
      </div>

      {/* Logo badge */}
      <div className="absolute top-8 right-6 z-10 hidden md:block">
        <div className="bg-white/10 backdrop-blur-md rounded-lg px-5 py-3 border border-white/15">
          <img src={rationalLogo} alt="Rational Engineers" className="h-10 w-auto" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50">
        <span className="font-display text-[10px] tracking-[0.5em] uppercase text-white/70">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/70 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
