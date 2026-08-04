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
    "Alfanar"
  ];

  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-minimal text-rational-red mb-4 tracking-[0.3em]">
              TRUSTED BY INDUSTRY LEADERS
            </h2>
            <div className="w-12 h-0.5 bg-rational-red mx-auto" />
          </div>

          {/* Client Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border mb-14">
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-background py-8 text-xl md:text-2xl font-display font-bold tracking-tight text-muted-foreground/50 hover:bg-muted hover:text-rational-red transition-all duration-500"
              >
                {client}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
