import { ArrowRight, TrendingUp, Newspaper, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const newsItems = [
  {
    date: "February 2026",
    tag: "BRAND EVOLUTION",
    icon: Sparkles,
    title: "From Copper Manufacturers to Product Engineers",
    excerpt:
      "Rational Engineers is redefining its identity — evolving beyond raw material supply into precision-engineered winding solutions. This strategic shift reflects our commitment to delivering application-specific products, not just commodities.",
    highlight: true,
  },
  {
    date: "January 2026",
    tag: "INDUSTRY TREND",
    icon: TrendingUp,
    title: "Rising Demand for CTC Conductors in Renewable Energy",
    excerpt:
      "With India's push toward 500 GW renewable capacity by 2030, demand for Continuously Transposed Conductors (CTC) in wind and solar transformer applications has surged — a segment where REL holds deep expertise.",
  },
  {
    date: "December 2025",
    tag: "COMPANY UPDATE",
    icon: Newspaper,
    title: "Expanded Capacity for Paper-Insulated Copper Conductors",
    excerpt:
      "Our Jaipur facility now operates an additional high-speed paper-covering line, increasing output capacity by 30% to meet growing orders from transformer OEMs across South Asia.",
  },
  {
    date: "November 2025",
    tag: "MARKET INSIGHT",
    icon: TrendingUp,
    title: "Global Copper Winding Wire Market Poised for 6.2% CAGR",
    excerpt:
      "Industry analysts project robust growth driven by electrification of transport and grid modernisation — sectors where Rational Engineers is strategically positioned with BIS and NABL-backed product lines.",
  },
];

const NewsUpdates = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-minimal text-muted-foreground mb-4 tracking-widest">
              NEWS & UPDATES
            </h2>
            <h3 className="text-4xl md:text-5xl font-light text-foreground max-w-3xl">
              What's Shaping Our Next Chapter
            </h3>
          </motion.div>

          {/* Featured Update */}
          {newsItems
            .filter((n) => n.highlight)
            .map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-16 border border-primary/30 bg-primary/5 rounded-lg p-8 md:p-12 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs font-semibold tracking-widest text-primary">
                      {item.tag}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {item.date}
                    </span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-light text-foreground mb-4">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed max-w-3xl text-lg">
                    {item.excerpt}
                  </p>
                </div>
              </motion.div>
            ))}

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems
              .filter((n) => !n.highlight)
              .map((item, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group border border-border rounded-lg p-6 hover:border-foreground/30 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-xs font-semibold tracking-widest text-muted-foreground">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground block mb-3">
                    {item.date}
                  </span>
                  <h4 className="text-lg font-medium text-foreground mb-3 group-hover:text-foreground/80 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    READ MORE{" "}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdates;
