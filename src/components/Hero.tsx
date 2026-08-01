import heroImage from "@/assets/hero-copper-wires.jpg";

const stats = [
  { value: "35+", label: "Years of manufacturing" },
  { value: "12,000 T", label: "Annual capacity" },
  { value: "ISO 9001", label: "Certified quality systems" },
  { value: "40+", label: "OEM partners served" },
];

const Hero = () => {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-foreground">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Copper wire rod coils on the Rational Engineers manufacturing floor"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full container mx-auto px-6 pt-40 pb-0">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8 reveal">
            <span className="h-px w-12 bg-rational-red" />
            <span className="text-xs md:text-sm tracking-[0.35em] text-white/70 uppercase font-medium">
              Established 1989
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[4.5rem] font-light text-white text-architectural mb-8 reveal">
            Empowering Transmission
            <br />
            <span className="font-bold">By Powering Transmission&nbsp;</span>
          </h1>

          <p className="text-base md:text-xl text-white/70 font-light max-w-xl mb-10 reveal-delayed leading-relaxed">
            Supplying high performance copper conductors to India&apos;s leading transformer
            and infrastructure manufacturers since 1989.
          </p>

          <div className="flex flex-wrap gap-4 reveal-delayed">
            <a
              href="#trust"
              className="inline-block bg-rational-red text-white px-10 py-5 text-xs font-bold tracking-[0.15em] uppercase hover:-translate-y-0.5 hover:bg-rational-red/90 transition-all duration-300"
            >
              Why ABB &amp; Siemens trust us
            </a>
            <a
              href="#products"
              className="inline-block border border-white/25 text-white px-10 py-5 text-xs font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-all duration-300"
            >
              Product portfolio
            </a>
          </div>
        </div>

        {/* Stat rail */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 border-t border-white/15 reveal-delayed">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="py-6 lg:py-8 px-1 lg:px-6 border-b lg:border-b-0 border-r last:border-r-0 border-white/15"
            >
              <div className="font-display text-2xl md:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-white/50 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
