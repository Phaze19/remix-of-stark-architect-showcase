import { useState } from "react";
import { Menu, X } from "lucide-react";
import QuoteDialog from "@/components/QuoteDialog";
import logoDark from "@/assets/rational-logo-original.jpeg";

const navLinks = [
  { href: "#capabilities", label: "CAPABILITIES" },
  { href: "#trust", label: "WHY LEADERS CHOOSE US" },
  { href: "#quality", label: "QUALITY SYSTEMS" },
  { href: "/founder", label: "FOUNDER'S JOURNEY" },
  { href: "/certifications", label: "CERTIFICATIONS" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/contact", label: "CONTACT" },
];

const desktopLinkClass =
  "relative whitespace-nowrap text-minimal text-foreground/70 hover:text-rational-red transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-rational-red after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

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
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={desktopLinkClass}>
              {link.label}
            </a>
          ))}
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
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-1.5 text-minimal text-foreground/70 hover:text-rational-red transition-colors duration-300"
              >
                {link.label}
              </a>
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
