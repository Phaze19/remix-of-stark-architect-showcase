export type Milestone = {
  year: string;
  title: string;
  desc: string;
  /** Story phase used by the homepage timeline. */
  phase: string;
};

/**
 * Verified company milestones. Shared by the homepage history timeline and the
 * /founder journey page so both stay in sync.
 */
export const milestones: Milestone[] = [
  {
    year: "1989",
    phase: "Foundation",
    title: "Rational Engineers Limited Founded",
    desc: "Established with a commitment to precision-engineered copper and aluminium winding solutions for the electrical industry.",
  },
  {
    year: "2006",
    phase: "New Ownership",
    title: "Acquired -\u00a0Rational Engineers Limited",
    desc: "Taken over by Mr. Mahendra Jain with a vision to transform the production and distribution landscape of copper conductors.",
  },
  {
    year: "2018",
    phase: "Leadership",
    title: "Next-Generation Leadership",
    desc: "Mr. Jubin Jain joined the business, bringing electrical engineering expertise and a drive for modern manufacturing excellence.",
  },
  {
    year: "2020",
    phase: "Capability",
    title: "Acquired - Gemini Instratech",
    desc: "Strengthened metal processing capabilities and expanded the product portfolio for transformer and motor winding applications.",
  },
  {
    year: "2022",
    phase: "Diversification",
    title: "Acquired - Skylink Aero",
    desc: "Diversified into aviation services, broadening the group's presence beyond engineering and metals.",
  },
  {
    year: "2024",
    phase: "Expansion",
    title: "Acquired - HMTD Engineering Private Limited",
    desc: "Expanded engineering depth and industrial reach to support large-scale infrastructure and power projects.",
  },
  {
    year: "2025",
    phase: "Today",
    title: "Greenfield Factory - Vadodara",
    desc: "Building a state-of-the-art manufacturing facility for the future — driven by innovation, sustainability and growth.",
  },
];
