import Navigation from "@/components/Navigation";
import AboutSubNav from "@/components/AboutSubNav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { GraduationCap, HeartPulse, Building2, Sprout } from "lucide-react";

const pillars = [
  {
    icon: GraduationCap,
    tag: "EDUCATION",
    title: "Vimladevi Khyalilalji Vagrecha College of Nursing — Thane",
    desc: "Promoting quality nursing education and healthcare training, raising the standards of next-generation healthcare.",
    points: [
      "Accessible & affordable education",
      "Training next-generation healthcare professionals",
      "Empowering minds, enriching lives",
    ],
  },
  {
    icon: Building2,
    tag: "PROPOSED SCHOOL",
    title: "A School Rooted in Tradition, Built on Values",
    desc: "A future-facing campus designed to nurture young minds and holistic growth in line with modern educational needs.",
    points: [
      "Under development",
      "Modern, values-led curriculum",
      "Holistic growth for young minds",
    ],
  },
  {
    icon: HeartPulse,
    tag: "HEALTHCARE",
    title: "Shri Mahavir Jain Hospital",
    desc: "A joint initiative under Shri Mahavir Jain Trust delivering affordable and accessible healthcare to the community.",
    points: [
      "2,000+ free dialysis sessions every month",
      "Affordable cardiac surgeries",
      "Affordable kidney transplant programme",
      "Thousands of surgeries conducted free of cost",
    ],
  },
  {
    icon: HeartPulse,
    tag: "CANCER CARE",
    title: "600-Bed Cancer Hospital, Thane",
    desc: "A strategic partnership to bring world-class cancer care closer to the community.",
    points: [
      "600 beds planned",
      "World-class oncology infrastructure",
      "Community-first access model",
    ],
  },
  {
    icon: Sprout,
    tag: "SUSTAINABILITY",
    title: "Pashupati Goshala",
    desc: "Empowering rural communities by promoting sustainable agriculture, animal care and natural living.",
    points: [
      "Sustainable agricultural practices",
      "Promoting wellness & animal care",
      "Empowering rural communities",
    ],
  },
];

const covidRelief = [
  "Support for 1,100+ bed COVID healthcare infrastructure",
  "Vaccination drives for 550+ Sadhus and Sadhvis",
  "Distribution of 100,000 food packets",
  "Distribution of 3,300 grocery kits",
];

const CSR = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 md:pt-40">
        <AboutSubNav />
      </div>

      {/* Hero */}
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
                ABOUT US — CSR ACTIVITIES
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-light text-architectural md:text-6xl">
              Building Industries.
              <br />
              Empowering Communities.
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Through the MJ Education & Medical Trust, the Rational Engineers Group
              invests in education, healthcare and rural livelihood — because success is
              not defined by profit alone, but by the value we create for people,
              communities and future generations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {pillars.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group bg-background p-8 md:p-10"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-rational-red/10">
                  <p.icon className="h-6 w-6 text-rational-red" />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rational-red">
                  {p.tag}
                </p>
                <h2 className="mt-3 text-xl font-medium text-foreground md:text-2xl">
                  {p.title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{p.desc}</p>
                <ul className="mt-6 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-rational-red" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* COVID relief */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-minimal mb-3 tracking-[0.3em] text-muted-foreground">
              PANDEMIC RESPONSE
            </h2>
            <h3 className="mb-10 text-2xl font-light text-architectural md:text-4xl">
              Standing With Communities When It Mattered Most
            </h3>
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {covidRelief.map((item) => (
                <div key={item} className="bg-background px-6 py-8 text-sm text-foreground">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Our Commitment. Our Values.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CSR;
