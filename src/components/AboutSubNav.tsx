import { useLocation } from "react-router-dom";

const items = [
  { href: "/about", label: "Company Overview", desc: "Legacy, values & milestones" },
  { href: "/leadership", label: "Leadership", desc: "Board & director profiles" },
  { href: "/csr", label: "CSR Activities", desc: "Education, healthcare & sustainability" },
];

const AboutSubNav = () => {
  const { pathname } = useLocation();

  return (
    <nav aria-label="About Us sections" className="border-b border-border bg-muted/30">
      <div className="container mx-auto px-6">
        <ul className="mx-auto grid max-w-4xl gap-px overflow-hidden bg-border sm:grid-cols-3">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group block h-full bg-background px-5 py-5 transition-colors duration-300 hover:bg-muted/60 ${
                    active ? "border-t-2 border-rational-red" : "border-t-2 border-transparent"
                  }`}
                >
                  <span
                    className={`block text-sm font-semibold uppercase tracking-[0.14em] ${
                      active ? "text-rational-red" : "text-foreground group-hover:text-rational-red"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="mt-2 block text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    {item.desc}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default AboutSubNav;
