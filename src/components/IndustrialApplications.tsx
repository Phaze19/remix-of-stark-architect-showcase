import { Zap, Cog, Wind } from "lucide-react";
import applicationsBackdrop from "@/assets/applications-backdrop.jpg";

const IndustrialApplications = () => {
  const clusters = [
    {
      icon: Zap,
      label: "Power & Grid Infrastructure",
      applications: [
        "Oil-filled transformers",
        "Dry-type transformers",
        "Cast resin transformers",
        "HVDC transformers",
        "Generators"
      ]
    },
    {
      icon: Cog,
      label: "Mission-Critical Electrical Machinery",
      applications: [
        "Alternators",
        "Transformer generators",
        "High-voltage motors",
        "Low-voltage motors",
        "Turbines"
      ]
    },
    {
      icon: Wind,
      label: "High-Stress & Continuous-Load Applications",
      applications: [
        "Windmill & hydro systems",
        "Traction / locomotive motors",
        "Industrial generators"
      ]
    }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Header band */}
      <div className="bg-background py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-minimal text-rational-red mb-4 tracking-widest">
            APPLICATIONS
          </h2>
          <div className="w-12 h-0.5 bg-rational-red mx-auto mb-6" />
          <h3 className="text-4xl md:text-5xl font-light text-architectural max-w-3xl mx-auto">
            Built for Industries Where Failure Is Not an Option
          </h3>
        </div>
      </div>

      {/* Full-bleed image with numbered columns */}
      <div className="relative">
        <img
          src={applicationsBackdrop}
          alt="Power grid substation and transformer infrastructure at dusk"
          width={1920}
          height={900}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70" />

        <div className="relative container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-foreground/15">
            {clusters.map((cluster, index) => (
              <div
                key={index}
                className="group px-6 md:px-8 py-16 md:py-24 transition-colors duration-500 hover:bg-foreground/[0.04]"
              >
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-6xl md:text-7xl font-light text-rational-red leading-none">
                    0{index + 1}
                  </span>
                  <cluster.icon className="w-6 h-6 text-foreground/60 group-hover:text-rational-red transition-colors duration-300" />
                </div>

                <h4 className="text-2xl font-medium mb-6 text-foreground">
                  {cluster.label}
                </h4>

                <ul className="space-y-3">
                  {cluster.applications.map((app, appIndex) => (
                    <li
                      key={appIndex}
                      className="text-muted-foreground flex items-center gap-3 group-hover:text-foreground/80 transition-colors duration-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rational-red/70 flex-shrink-0" />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="bg-background py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-lg">
            Our certifications aren't paperwork—they're{" "}
            <span className="text-foreground font-medium">risk insurance</span> for your projects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustrialApplications;
