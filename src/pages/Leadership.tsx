import Navigation from "@/components/Navigation";
import AboutSubNav from "@/components/AboutSubNav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import founderAsset from "@/assets/founder-mahendra-jain.jpg.asset.json";
import jubin from "@/assets/director-jubin-jain.jpg";
import ajit from "@/assets/director-ajit-venugopalan.jpg";
import gandhi from "@/assets/director-nilesh-gandhi.jpg";
import vedakAsset from "@/assets/director-nilesh-vedak.jpg.asset.json";
import kajolAsset from "@/assets/director-kajol-jain.jpg.asset.json";
import bipin from "@/assets/director-bipin-joshi.jpg";
import { assetUrl } from "@/lib/assetUrl";

type Leader = {
  name: string;
  role: string;
  org: string;
  din?: string;
  image: string;
  quote?: string;
  bio: string[];
  facts: string[];
};

const leaders: Leader[] = [
  {
    name: "Mahendra Khyalilal Jain",
    role: "Chairman & Managing Director",
    org: "Rational Engineers Group",
    din: "00416102",
    image: assetUrl(founderAsset),
    quote:
      "Success is measured by the trust we earn and the impact we create for others.",
    bio: [
      "Under his leadership, Rational Engineers Group has grown from a single enterprise into a diversified industrial group with a strong presence in the power and electrical equipment sector.",
      "His unwavering focus on quality, technology, people and values has transformed the Group into a trusted partner for customers in India and across the world.",
    ],
    facts: [
      "₹1,600+ Cr Group Revenue (FY 25-26)",
      "800+ Strong Workforce",
      "5 Manufacturing Facilities",
      "India | UAE",
    ],
  },
  {
    name: "Jubin Mahendra Jain",
    role: "CEO & WHOLE TIME DIRECTOR",
    org: "Rational Engineers Limited",
    din: "754430",
    image: jubin,
    quote:
      "Every achievement stands on a foundation of trust, hard work, and values.",
    bio: [
      "Shaping the next chapter of growth through innovation, modernization and vision. As part of the next generation of leadership, he has been actively involved across operations, customer engagement, business development and strategic planning.",
      "He represents the continuity of a legacy built on trust, quality and excellence, while bringing fresh perspectives aligned with the evolving needs of the industry.",
    ],
    facts: [
      "Operations & Business Development",
      "Global Expansion Mandate",
      "Manufacturing Modernization",
    ],
  },
  {
    name: "Kajol Mahendra Jain",
    role: "Director",
    org: "Rational Engineers Limited",
    din: "08014510",
    image: assetUrl(kajolAsset),
    quote:
      "Success is not defined by profit alone, but by the value we create for people, communities, and future generations.",
    bio: [
      "The Finance Mind — with sharp financial acumen and strategic foresight, Kajol Mahendra Jain ensures the financial strength, transparency and sustainability of the Group. Her disciplined approach to finance drives growth, optimizes value and builds a strong foundation for the future.",
      "Champion of CSR — believing in responsible business beyond boundaries, she actively supports CSR initiatives that empower communities, promote education, healthcare and sustainable development. A strong advocate of social impact, she proudly supports the noble initiatives of JITO Trust, Thane, working towards uplifting lives and creating positive change in society.",
    ],
    facts: [
      "Finance & Strategy Leadership",
      "Governance & Transparency",
      "CSR & Community Development",
      "Proud Supporter of JITO Trust Thane",
    ],
  },
  {

    name: "Nilesh Pramod Vedak",
    role: "COO & EXECUTIVE DIRECTOR",
    org: "Rational Engineers Limited",
    din: "07874351",
    image: assetUrl(vedakAsset),
    quote:
      "Every achievement stands on a foundation of trust, hard work, and values. Our responsibility is to strengthen that foundation while creating new possibilities for tomorrow.",
    bio: [
      "Drives strategic growth, manufacturing excellence, operational efficiency and customer development, strengthening Rational Engineers' position as a preferred partner for transformer winding solutions.",
      "Previously Vice President Operations & Managing Director at Syntegon Processing & Packaging, where he turned profitability from -2.5% to +2.4% EBIT and delivered 17% year-on-year revenue growth. As Project Director & Site Managing Director at Alstom he delivered the €315M Mumbai Metro Line-3 rolling stock project and established India as a global supply hub. At Siemens he led operational excellence programmes using Lean Manufacturing, SAP, Design-to-Cost, Kanban and Just-in-Time systems.",
    ],
    facts: [
      "33+ Years Industrial Leadership",
      "17% Revenue Growth Achieved",
      "-2.5% → +8.4% EBIT Turnaround",
      "800+ People Led Across Operations",
      "10 Mega Infrastructure Projects",
      "Global Manufacturing & Supply Hub",
    ],
  },
  {
    name: "Ajit E Venugopalan",
    role: "INDEPENDENT DIRECTOR",
    org: "Rational Engineers Limited",
    image: ajit,
    bio: [
      "An accomplished banking and finance professional with over 30 years of experience in credit management, business development and bottom-line growth, while strengthening governance and delivering consistent results.",
      "His career spans Chief General Manager (Wholesale Banking) — where he grew the wholesale credit portfolio from ₹1,200 Cr to ₹8,700 Cr — along with senior credit leadership roles as General Manager, Deputy General Manager and Assistant General Manager. He is recognised for strategic leadership, strong networks and building high-performing teams.",
    ],
    facts: [
      "30+ Years of Experience",
      "₹29,700 Cr Total Business Managed",
      "5 Board Positions",
      "Multiple Board Committees",
      "Banking & Finance Network",
      "Strategic Leadership & Value Creation",
    ],
  },
  {
    name: "Nilesh Bhogilal Gandhi",
    role: "Independent Director",
    org: "Rational Engineers Limited · Appointed April 2022",
    image: gandhi,
    bio: [
      "A seasoned finance professional and management consultant with more than 30 years of experience across treasury management, corporate finance, investment management, private equity, structured finance and family investment offices.",
      "He has held senior leadership and board positions across financial services, industrial enterprises, renewable energy and education businesses, including establishing treasury operations as independent profit centres and overseeing investment portfolios exceeding ₹400 crore. As an Independent Director he brings financial expertise, strategic perspective and independent oversight to the Board.",
    ],
    facts: [
      "30+ Years in Finance",
      "Corporate Governance & Oversight",
      "Treasury Management",
      "Private Equity & Structured Finance",
      "Renewable Energy Boards",
      "Project Funding & Term Loans",
    ],
  },

  {
    name: "Bipin Joshi",
    role: "INDEPENDANT DIRECTOR - ADVOCATE, BOMBAY HIGH COURT",
    org: "Legal Counsel · B.A., LL.B.",
    image: bipin,
    bio: [
      "With over four decades of distinguished legal practice since 1980, Mr. Bipin Joshi brings extensive experience in civil and commercial litigation, corporate matters, debt recovery, consumer disputes and proceedings before the High Court and various judicial and quasi-judicial forums. His longstanding practice is marked by substantial courtroom experience, sound legal acumen and a comprehensive understanding of complex civil-law matters.",
    ],
    facts: [],
  },
];

const Leadership = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 md:pt-40">
        <AboutSubNav />
      </div>

      <section className="pt-14 pb-16 md:pt-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-rational-red" />
              <span className="text-minimal tracking-[0.3em] text-muted-foreground">
                ABOUT US — LEADERSHIP
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-light text-architectural md:text-6xl">
              Driven by Vision.
              <br />
              Defined by Values.
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              The board and leadership team steering Rational Engineers Group across
              engineering, metals, infrastructure, finance and aviation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl space-y-16 md:space-y-24">
            {leaders.map((leader, i) => (
              <motion.article
                key={leader.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`grid gap-10 md:grid-cols-[0.8fr_1fr] md:gap-16 ${
                  i % 2 === 1 ? "md:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="relative">
                  <div className="absolute -left-4 -top-4 h-2/3 w-2/3 bg-rational-red/10" />
                  <img
                    src={leader.image}
                    alt={`${leader.name}, ${leader.role} at ${leader.org}`}
                    className="relative aspect-[4/5] w-full object-cover object-top"
                    loading="lazy"
                  />
                </figure>

                <div>
                  <h2 className="text-2xl font-light text-architectural md:text-4xl">
                    {leader.name}
                  </h2>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-rational-red">
                    {leader.role}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{leader.org}</p>
                  {leader.din && (
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      DIN: {leader.din}
                    </p>
                  )}

                  {leader.quote && (
                    <blockquote className="mt-6 border-l-2 border-rational-red pl-5 text-lg font-light italic text-foreground">
                      “{leader.quote}”
                    </blockquote>
                  )}

                  <div className="mt-6 space-y-4">
                    {leader.bio.map((p) => (
                      <p key={p} className="text-muted-foreground leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>

                  {leader.facts.length > 0 && (
                    <ul className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                      {leader.facts.map((f) => (
                        <li
                          key={f}
                          className="bg-background px-5 py-4 text-xs font-medium uppercase tracking-[0.12em] text-foreground"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Leadership;
