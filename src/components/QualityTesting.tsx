import { ClipboardCheck, Layers, ShieldCheck, Settings2, Shield, FlaskConical } from "lucide-react";
import labImage from "@/assets/cat-lab.jpg";

const controls = [
  {
    icon: ClipboardCheck,
    title: "Controlled Copper Sourcing",
    description:
      "Direct procurement from verified suppliers ensuring consistent purity and conductivity standards.",
  },
  {
    icon: Layers,
    title: "In-House Insulation & Coating",
    description:
      "Complete control over insulation processes — paper covering, enamelling and specialised coatings under one roof.",
  },
  {
    icon: ShieldCheck,
    title: "Multi-Stage Quality Checks",
    description:
      "Rigorous inspection at every production stage: incoming material, in-process and final inspection.",
  },
  {
    icon: Settings2,
    title: "Application-Specific Customisation",
    description:
      "Products engineered to exact specifications — dimensions, insulation class and performance requirements.",
  },
];

const certifications = [
  {
    icon: Shield,
    title: "ISO 9001:2015",
    scope: "Manufacturing & Quality Control",
    status: "CERTIFIED",
  },
  {
    icon: FlaskConical,
    title: "ISO 14001:2015",
    scope: "Environmental Compliance",
    status: "IN PROGRESS",
  },
];

const QualityTesting = () => {
  return (
    <section id="quality" className="border-b border-border bg-muted/40 py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-20">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-rational-red">
                Quality &amp; Testing
              </p>
              <div className="mt-4 h-0.5 w-12 bg-rational-red" />
              <h2 className="mt-6 text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl">
                Consistency is
                <br />
                <span className="text-rational-red">engineered in.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                The difference is not only in what we make ;  is in how we control it. Integrated manufacturing and inspection at every stage means every conductor leaves our lines to the same specification your application was designed around.
              </p>

              <div className="mt-10 overflow-hidden border border-border">
                <img
                  src={labImage}
                  alt="Inspection and testing of copper conductors at Rational Engineers"
                  loading="lazy"
                  decoding="async"
                  className="h-56 w-full object-cover md:h-72"
                />
              </div>
            </div>

            <div>
              <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
                {controls.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="group bg-background p-8 transition-colors duration-500 hover:bg-muted/60"
                  >
                    <Icon className="h-6 w-6 text-rational-red" strokeWidth={1.5} />
                    <h3 className="mt-6 text-[13px] font-bold uppercase tracking-[0.14em] text-foreground">
                      {title}
                    </h3>
                    <div className="mt-4 h-px w-8 bg-rational-red transition-all duration-500 group-hover:w-16" />
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-12 text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Standards &amp; Certifications
              </p>
              <div className="mt-5 grid gap-px border border-border bg-border sm:grid-cols-2">
                {certifications.map(({ icon: Icon, title, scope, status }) => (
                  <div key={title} className="bg-background p-8">
                    <div className="flex items-start justify-between gap-4">
                      <Icon className="h-6 w-6 text-foreground/60" strokeWidth={1.5} />
                      <span className="border border-rational-red/25 bg-rational-red/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-rational-red">
                        {status}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-foreground">
                      {title}
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {scope}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityTesting;
