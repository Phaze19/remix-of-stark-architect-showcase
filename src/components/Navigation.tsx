import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import QuoteDialog from "@/components/QuoteDialog";
import logoDark from "@/assets/rational-logo-original.jpeg";

type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string; desc: string }[];
};

const navLinks: NavLink[] = [
  { href: "#capabilities", label: "CAPABILITIES" },
  { href: "/#products", label: "PRODUCTS" },
  {
    href: "/about",
    label: "ABOUT US",
    children: [
      { href: "/about", label: "Company Overview", desc: "Legacy, values & milestones" },
      { href: "/founder", label: "Founder's Journey", desc: "Shri. Mahendra K. Jain, 1992 – 2025" },
      { href: "/leadership", label: "Leadership", desc: "Board & director profiles" },
      { href: "/csr", label: "CSR Activities", desc: "Education, healthcare & sustainability" },
    ],
  },
  { href: "/certifications", label: "CERTIFICATIONS" },
  { href: "/contact", label: "CONTACT" },
];

const desktopLinkClass =
  "relative whitespace-nowrap text-minimal text-foreground/70 hover:text-rational-red transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-rational-red after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 bg-background backdrop-blur-md border-b-2 border-rational-red">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-2 md:px-6 lg:px-8 lg:py-3">
        <a href="/" className="flex shrink-0 items-center">
          <img
            src={logoDark}
            alt="Rational Engineers"
            className="h-16 w-auto md:h-20 xl:h-24"
          />
        </a>

        <div className="hidden items-center gap-4 lg:flex xl:gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  className={`${desktopLinkClass} flex items-center gap-1.5`}
                >
                  {link.label}
                  <ChevronDown size={13} className="mt-px" />
                </a>

                {openDropdown === link.label && (
                  <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-5">
                    <div className="w-[520px] overflow-hidden border-t-2 border-rational-red bg-[linear-gradient(135deg,#1a0f0a_0%,#3d1f10_45%,#0d0d0d_100%)] shadow-2xl">
                      <div className="grid grid-cols-2 gap-px bg-white/10">
                        {link.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className="group block bg-[#140c08]/95 px-6 py-6 transition-colors duration-300 hover:bg-[#4a2612]/80"
                          >
                            <span className="block font-display text-lg font-light text-[#f5e2d2] group-hover:text-white">
                              {child.label}
                            </span>
                            <span className="mt-2 block h-px w-full origin-left scale-x-100 bg-gradient-to-r from-[#c87b48] to-transparent transition-transform duration-300 group-hover:from-rational-red" />
                            <span className="mt-2 block text-[11px] uppercase tracking-[0.14em] text-[#c9a58c]">
                              {child.desc}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a key={link.href} href={link.href} className={desktopLinkClass}>
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="hidden shrink-0 items-center lg:flex">
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="whitespace-nowrap bg-rational-red px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground hover:bg-foreground transition-colors duration-300"
          >
            Request Quote
          </button>
        </div>

        <QuoteDialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="-mr-1 shrink-0 p-2 text-foreground hover:text-rational-red transition-colors duration-300 lg:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile / tablet menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="container mx-auto space-y-3 px-4 py-4 md:px-6">
            {navLinks.map((link) => (
              <div key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-1.5 text-minimal text-foreground/70 hover:text-rational-red transition-colors duration-300"
                >
                  {link.label}
                </a>
                {link.children && (
                  <div className="mt-1 space-y-2 border-l-2 border-rational-red/40 pl-4">
                    {link.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-sm text-muted-foreground hover:text-rational-red transition-colors duration-300"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsQuoteOpen(true);
              }}
              className="mt-2 w-full bg-rational-red px-5 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground hover:bg-foreground transition-colors duration-300"
            >
              Request Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
