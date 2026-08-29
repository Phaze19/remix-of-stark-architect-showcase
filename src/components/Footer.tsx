import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import SmartLink from "@/components/SmartLink";
import brandLogo from "@/assets/rational-logo-master.png.asset.json";
import { assetUrl } from "@/lib/assetUrl";

const LINKEDIN_URL = "https://www.linkedin.com/company/5681546";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Our History", href: "/#history" },
      { label: "Leadership", href: "/leadership" },
      { label: "CSR Activities", href: "/csr" },
      { label: "Blog & Insights", href: "/blog" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Copper CTC Conductors", href: "/#products" },
      { label: "Paper Covered Conductors", href: "/#products" },
      { label: "Enamelled Copper & Aluminium", href: "/#products" },
      { label: "Bare / Tin Coated Busbar", href: "/#products" },
      { label: "Litz & Specialty Conductors", href: "/#products" },
    ],
  },
  {
    title: "Global",
    links: [
      { label: "Global Footprint", href: "/#footprint" },
      { label: "Manufacturing Locations", href: "/#footprint" },
      { label: "Quality & Testing", href: "/#quality" },
      { label: "Certifications", href: "/certifications" },
      { label: "Group Companies", href: "/#group" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-foreground py-16 text-background md:py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
            {/* Brand + contact */}
            <div>
              <img
                src={assetUrl(brandLogo)}
                alt="Rational Engineers"
                width={1507}
                height={603}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto max-w-full rounded-md bg-white object-contain px-3 py-2"
              />
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/70">
                Rational Engineers Limited manufactures copper and aluminium winding conductors
                with consistent quality, process control and long-term supply reliability for
                critical industrial applications.
              </p>

              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-start gap-3 text-background/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rational-red" />
                  <span>
                    103, Dhanlaxmi Residency, Naupada,
                    <br />
                    L.B.S. Marg, Thane West, MH 400604, India
                  </span>
                </div>
                <a
                  href="tel:+919168643114"
                  className="flex items-center gap-3 text-background/70 transition-colors hover:text-background"
                >
                  <Phone className="h-4 w-4 shrink-0 text-rational-red" />
                  +91 91686 43114
                </a>
                <a
                  href="mailto:info@rationalengineers.com"
                  className="flex items-center gap-3 text-background/70 transition-colors hover:text-background"
                >
                  <Mail className="h-4 w-4 shrink-0 text-rational-red" />
                  info@rationalengineers.com
                </a>
              </div>
            </div>

            {/* Link columns */}
            {columns.map((column) => (
              <div key={column.title}>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.24em] text-rational-red">
                  {column.title}
                </h4>
                <ul className="mt-6 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label + link.href}>
                      <SmartLink
                        href={link.href}
                        className="text-sm text-background/70 transition-colors hover:text-background"
                      >
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Connect row */}
          <div className="mt-14 flex flex-col gap-6 border-t border-rational-red/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <SmartLink
                href="/#enquire"
                className="border-2 border-background px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-background transition-colors duration-300 hover:border-rational-red hover:bg-rational-red"
              >
                Enquire Now
              </SmartLink>
              <SmartLink
                href="/contact"
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-background/60 transition-colors hover:text-background"
              >
                Contact
              </SmartLink>
            </div>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rational Engineers on LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rational-red/40 text-background/70 transition-colors duration-300 hover:border-rational-red hover:bg-rational-red hover:text-background"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-background/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-background/50">
              © {new Date().getFullYear()} Rational Engineers Limited. All rights reserved.
            </p>
            <p className="text-sm text-background/40">
              Registered office: Thane West, Maharashtra, India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
