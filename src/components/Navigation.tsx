import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, MapPin, Phone, Mail, Linkedin } from "lucide-react";
import QuoteDialog from "@/components/QuoteDialog";
import SmartLink from "@/components/SmartLink";
import { Button } from "@/components/ui/button";
import logoDark from "@/assets/rational-logo-original.jpeg";

const LINKEDIN_URL = "https://www.linkedin.com/company/5681546";

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
  "relative whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.14em] text-white/80 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-8px] after:left-0 after:bg-rational-red after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";


const contactItems = [
  {
    icon: MapPin,
    label: "Visit Us",
    lines: ["103, Dhanlaxmi Residency, Naupada,", "L.B.S. Marg, Thane West, MH 400604"],
  },
  { icon: Phone, label: "Call Us", lines: ["+91 91686 43114"], href: "tel:+919168643114" },
  { icon: Mail, label: "Mail Us", lines: ["info@rationalengineers.com"], href: "mailto:info@rationalengineers.com" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const navRef = useRef<HTMLElement | null>(null);
  const pointerTypeRef = useRef<string | null>(null);

  const closeNavigation = () => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
    setOpenMobileGroup(null);
  };

  // Header should not stay frozen over the content: it slides away while
  // scrolling down and returns as soon as the user scrolls back up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current;
      lastY.current = y;
      if (isMenuOpen || openDropdown) return;
      setHidden(goingDown && y > 220);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen, openDropdown]);

  // Close dropdown / mobile menu on outside click and on Escape so the
  // navigation never traps focus or stays stuck open on touch devices.
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeNavigation();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeNavigation();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);


  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className={`fixed top-8 left-0 right-0 z-50 transition-transform duration-500 ease-out will-change-transform ${
        hidden ? "-translate-y-[calc(100%+2rem)]" : "translate-y-0"
      }`}
    >
      {/* Tier 1 — logo band + contact strip */}
      <div className="relative bg-background shadow-[0_1px_0_0_hsl(var(--border))]">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:py-4 md:px-6 md:py-5 lg:px-8">
          <a href="/" aria-label="Rational Engineers — home" className="relative z-10 flex min-w-0 shrink items-center">
            <img
              src={logoDark}
              alt="Rational Engineers"
              width={919}
              height={485}
              decoding="async"
              className="h-12 w-auto max-w-full object-contain sm:h-16 md:h-24 xl:h-28"
            />
          </a>


          <div className="hidden items-stretch gap-8 lg:flex">
            {contactItems.map((item) => {
              const Body = (
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-rational-red/10">
                    <item.icon className="h-5 w-5 text-rational-red" />
                  </span>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-rational-red">
                      {item.label}
                    </span>
                    {item.lines.map((line) => (
                      <span key={line} className="block text-[13px] leading-relaxed text-foreground/75">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              );

              return (
                <div
                  key={item.label}
                  className="border-l border-border pl-8 first:border-l-0 first:pl-0"
                >
                  {item.href ? (
                    <a href={item.href} className="block transition-opacity hover:opacity-70">
                      {Body}
                    </a>
                  ) : (
                    Body
                  )}
                </div>
              );
            })}
          </div>

          {/* Social icons */}
          <div className="hidden items-center gap-3 lg:flex">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/40">
              Follow
            </span>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rational Engineers on LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-all duration-300 hover:border-rational-red hover:bg-rational-red hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>


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
      </div>

      {/* Tier 2 — nav bar */}
      <div className="relative hidden bg-foreground lg:block">
        <div
          className="absolute inset-y-0 right-0 w-[30%] bg-rational-red"
          style={{ clipPath: "polygon(56px 0, 100% 0, 100% 100%, 0 100%)" }}
        />

        <div className="container mx-auto flex items-center justify-between gap-6 px-4 md:px-6 lg:px-8">
          <div className="relative z-10 flex items-center gap-7 py-6 xl:gap-11">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onPointerEnter={(event) => {
                    // Hover-open only for real mice; touch/pen rely on the click toggle.
                    if (event.pointerType === "mouse") setOpenDropdown(link.label);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") setOpenDropdown(null);
                  }}
                >
                  <button
                    type="button"
                    id={`${link.label}-trigger`}
                    aria-haspopup="menu"
                    aria-expanded={openDropdown === link.label}
                    onPointerDown={(event) => {
                      pointerTypeRef.current = event.pointerType;
                    }}
                    onClick={() => {
                      // Mouse users already see the panel from hover, so a click must never
                      // collapse it. Touch / keyboard users get a real toggle.
                      if (pointerTypeRef.current === "mouse") {
                        setOpenDropdown(link.label);
                        return;
                      }
                      setOpenDropdown((current) => (current === link.label ? null : link.label));
                      pointerTypeRef.current = null;
                    }}
                    className={`${desktopLinkClass} flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rational-red`}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={`mt-px transition-transform duration-300 ${openDropdown === link.label ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openDropdown === link.label && (
                    <div
                      className="absolute left-1/2 top-full z-[80] -translate-x-1/2 pt-5"
                      role="menu"
                      aria-labelledby={`${link.label}-trigger`}
                    >
                      <div className="w-[520px] overflow-hidden border-t-2 border-rational-red bg-[linear-gradient(135deg,#1a0f0a_0%,#3d1f10_45%,#0d0d0d_100%)] shadow-2xl">
                        <div className="grid grid-cols-2 gap-px bg-white/10">
                          {link.children.map((child) => (
                            <SmartLink
                              key={child.href}
                              href={child.href}
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                              className="group block bg-[#140c08]/95 px-6 py-6 transition-colors duration-300 hover:bg-[#4a2612]/80"
                            >
                              <span className="block font-display text-lg font-light text-[#f5e2d2] group-hover:text-white">
                                {child.label}
                              </span>
                              <span className="mt-2 block h-px w-full origin-left scale-x-100 bg-gradient-to-r from-[#c87b48] to-transparent transition-transform duration-300 group-hover:from-rational-red" />
                              <span className="mt-2 block text-[11px] uppercase tracking-[0.14em] text-[#c9a58c]">
                                {child.desc}
                              </span>
                            </SmartLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <SmartLink key={link.href} href={link.href} className={desktopLinkClass}>
                  {link.label}
                </SmartLink>
              )
            )}
          </div>

          <Button
            type="button"
            onClick={() => setIsQuoteOpen(true)}
            className="relative z-10 h-auto shrink-0 whitespace-nowrap rounded-none bg-background px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-rational-red hover:bg-foreground hover:text-white"
          >
            Request Quote
          </Button>
        </div>
      </div>

      <QuoteDialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />


      {/* Mobile / tablet menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="container mx-auto space-y-3 px-4 py-4 md:px-6">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={openMobileGroup === link.label}
                    onClick={() =>
                      setOpenMobileGroup((current) => (current === link.label ? null : link.label))
                    }
                    className="flex min-h-11 w-full items-center justify-between py-1.5 text-left text-minimal text-foreground/70 transition-colors duration-300 hover:text-rational-red"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${openMobileGroup === link.label ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <SmartLink
                    href={link.href}
                    onClick={closeNavigation}
                    className="block min-h-11 py-2.5 text-minimal text-foreground/70 hover:text-rational-red transition-colors duration-300"
                  >
                    {link.label}
                  </SmartLink>
                )}
                {link.children && (
                  <div
                    className={`mt-1 space-y-2 overflow-hidden border-l-2 border-rational-red/40 pl-4 transition-[max-height,opacity] duration-300 ${
                      openMobileGroup === link.label ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
                    }`}
                    role="menu"
                  >
                    {link.children.map((child) => (
                      <SmartLink
                        key={child.href}
                        href={child.href}
                        role="menuitem"
                        onClick={closeNavigation}
                        className="block min-h-10 py-2 text-sm text-muted-foreground hover:text-rational-red transition-colors duration-300"
                      >
                        {child.label}
                      </SmartLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/40">
                Follow
              </span>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rational Engineers on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-all duration-300 hover:border-rational-red hover:bg-rational-red hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <Button
              type="button"
              onClick={() => {
                closeNavigation();
                setIsQuoteOpen(true);
              }}
              className="mt-2 h-auto w-full rounded-none bg-rational-red px-5 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground hover:bg-foreground"
            >
              Request Quote
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
