import { useState } from "react";
import { ArrowRight } from "lucide-react";
import QuoteDialog from "@/components/QuoteDialog";
import heroImage from "@/assets/hero-copper-wires.jpg";

const Hero = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-foreground">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Copper wire rod coils on the Rational Engineers manufacturing floor"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:4px_4px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto w-full px-6 pb-20 pt-48 md:pb-24 md:pt-60 lg:pt-64">
        <div className="max-w-4xl">
          <div className="reveal mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-rational-red" />
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-white/70 md:text-sm">
              Rational Engineers Limited · Established 1989
            </span>
          </div>

          <h1 className="reveal mb-8 text-5xl font-light text-white text-architectural md:text-7xl lg:text-[5rem]">
            Empowering Transformation
          </h1>

          <p className="reveal-delayed mb-10 max-w-2xl text-base font-light leading-relaxed text-white/70 md:text-xl">
            Manufacturers of copper and aluminium winding conductors — CTC, paper covered,
            enamelled, busbars and Litz — engineered in India for transformer, motor and
            infrastructure OEMs worldwide.
          </p>

          <div className="reveal-delayed flex flex-wrap gap-4">
            <a
              href="#products"
              className="group inline-flex items-center gap-3 bg-rational-red px-10 py-5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-rational-red/90"
            >
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={() => setIsQuoteOpen(true)}
              className="inline-block border border-white/25 px-10 py-5 text-xs font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-white/10"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      <QuoteDialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />
    </section>
  );
};

export default Hero;
