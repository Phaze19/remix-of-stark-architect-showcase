import Navigation from "@/components/Navigation";
import AboutSubNav from "@/components/AboutSubNav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import founder from "@/assets/founder-mahendra-jain.jpg";
import jubin from "@/assets/director-jubin-jain.jpg";
import parth from "@/assets/director-parth-jain.jpg";
import mukul from "@/assets/director-mukul-srivastava.jpg";
import ajit from "@/assets/director-ajit-venugopalan.jpg";
import nilesh from "@/assets/director-nilesh-gandhi.jpg";
import bipin from "@/assets/director-bipin-joshi.jpg";

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
    image: founder,
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
      "India | UAE | Germany",
    ],
  },
  {
    name: "Jubin Mahendra Jain",
    role: "Director",
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
    name: "Parth Ketan Jain",
    role: "Director",
    org: "Gemini Instratech & HMTD Engineering Pvt. Ltd.",
    din: "09706015",
    image: parth,
    bio: [
      "Drives growth across the Group's technology and infrastructure verticals, with responsibility for engineering delivery and capacity expansion.",
    ],
    facts: ["200,000+ sq. ft. Manufacturing Area", "Infrastructure & Motors"],
  },
  {
    name: "Mukul Premprasad Srivastava",
    role: "Chief Executive Officer",
    org: "Gemini Instratech",
    image: mukul,
    bio: [
      "A power-systems veteran with three decades of leadership across global utilities and industrial customers, with deep experience in P&L ownership and operational transformation.",
    ],
    facts: [
      "33+ Years Industry Leadership",
      "30+ Years Power Systems",
      "15+ Years P&L Leadership",
      "LEAN, Six Sigma & TQM",
    ],
  },
  {
    name: "Ajit E Venugopalan",
    role: "Director",
    org: "Rational Engineers Limited",
    image: ajit,
    bio: [
      "Brings strategic leadership and value creation expertise with a strong network across the banking and finance ecosystem.",
    ],
    facts: ["5 Board Positions", "Multiple Board Committees", "Banking & Finance"],
  },
  {
    name: "Nilesh Vedak",
    role: "Director",
    org: "Rational Engineers Limited · Appointed April 2022",
    image: nilesh,
    bio: [
      "A finance professional with extensive experience in treasury management, project funding and corporate accounts across large portfolios.",
    ],
    facts: ["Treasury Management", "Project Funding & Term Loans", "Accounts & Finance"],
  },
  {
    name: "Bipin Joshi",
    role: "Advocate, Bombay High Court",
    org: "Legal Counsel · B.A., LL.B.",
    image: bipin,
    bio: [
      "Enrolled with the Bar in 1980, with more than four decades of distinguished legal practice advising on corporate, commercial and regulatory matters.",
    ],
    facts: ["45+ Years of Legal Practice", "Enrolled with the Bar in 1980"],
  },
];

const Leadership = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 md:pt-40">
        <AboutSubNav />
      </div>

      <section className="pt-40 pb-16 md:pt-48">
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
                    className="relative w-full object-cover"
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
