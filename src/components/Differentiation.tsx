import qualityLab from "@/assets/quality-lab.jpg";

const Differentiation = () => {
  const steps = [
    {
      no: "01",
      title: "ETP Grade Purity",
      description:
        "99.9%+ pure ETP copper ensures peak electrical conductivity and thermal performance in every conductor we produce.",
    },
    {
      no: "02",
      title: "In-House Insulation",
      description:
        "Complete control over paper covering, enameling, and specialized coatings — all done under one roof for total consistency.",
    },
    {
      no: "03",
      title: "Multi-Stage Quality Checks",
      description:
        "Rigorous testing at incoming, in-process, and final inspection stages, with 100% electrical testing on every batch.",
    },
    {
      no: "04",
      title: "Full Traceability",
      description:
        "Batch-level tracking from raw material melt to the final precision-wound reel delivered to your facility.",
    },
  ];

  return (
    <section className="py-28 md:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -top-8 -left-8 w-32 h-32 border-l border-t border-rational-red/40 hidden md:block" />
          <div className="bg-white/5 p-1">
            <img
              src={qualityLab}
              alt="Copper conductor quality testing laboratory"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="h-[2px] w-12 bg-rational-red" />
            <span className="font-display uppercase tracking-[0.4em] text-xs text-rational-red font-bold">
              Quality Systems
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-12 tracking-tighter leading-[1.05] text-white">
            ZERO-TOLERANCE
            <br />
            ENGINEERING.
          </h2>

          <div className="space-y-10">
            {steps.map((step) => (
              <div key={step.no} className="flex gap-6">
                <div className="font-display text-2xl md:text-3xl font-bold text-rational-red shrink-0">
                  {step.no}.
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold mb-2 tracking-wide uppercase text-white">
                    {step.title}
                  </h4>
                  <p className="text-white/50 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentiation;
