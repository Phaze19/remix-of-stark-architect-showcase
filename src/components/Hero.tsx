import heroImage from "@/assets/hero-copper-wires.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Copper manufacturing facility"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Brand Mark */}
        <div className="mb-8 reveal">
          <span className="text-sm md:text-base tracking-[0.4em] text-white/60 uppercase font-light">
            Established 1989
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-[0.15em] text-white mt-2">
            RATIONAL ENGINEERS
          </h2>
          <div className="w-16 h-px bg-white/40 mx-auto mt-4" />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white text-architectural mb-6 reveal leading-tight">
          Copper Manufacturing Built for
          <br />
          <span className="font-medium">Consistency, Scale & Zero Compromise</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 font-light tracking-wide max-w-3xl mx-auto mb-10 reveal-delayed">
          Supplying high-performance copper conductors to India's leading transformer 
          and infrastructure manufacturers since 1989.
        </p>
        <a 
          href="#trust" 
          className="inline-block bg-white text-foreground px-8 py-4 text-sm font-medium tracking-wider hover:bg-white/90 transition-colors duration-300 reveal-delayed"
        >
          WHY COMPANIES LIKE ABB & SIEMENS TRUST US
        </a>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 reveal-delayed">
        <div className="w-px h-16 bg-white/40" />
        <div className="text-minimal text-white/60 mt-4 rotate-90 origin-center">
          SCROLL
        </div>
      </div>
    </section>
  );
};

export default Hero;
