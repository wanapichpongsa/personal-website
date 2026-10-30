export type Experience = {
  role: string;
  company: string;
  years: string;
  bullets: string[];
  badgeClass: string;
};

export type Project = {
  name: string;
  description: string;
  href: string;
};

export const profile = {
  name: "Wana Pichpongsa",
  tagline: "I scale products",
};

export const experience: Experience[] = [
  {
    role: "Interim Founding Full-stack Engineer",
    company: "Greenfinder",
    years: "Jun–Aug 2025",
    badgeClass: "bg-blue-500 text-white",
    bullets: [
      "First software engineer at a seed-stage startup; built the full-stack TypeScript backend aggregating multiple third-party APIs into a single service.",
      "Designed a generalised parsing algorithm for highly heterogeneous metadata, applying set theory to minimise type, variable and function redundancy.",
      "Shipped the beta product with the founding team of three within two months.",
    ],
  },
  {
    role: "Founders Associate",
    company: "Anyverse",
    years: "Nov 2023–Jan 2024",
    badgeClass: "bg-sky-100 text-sky-600",
    bullets: [
      "Assumed the role of the sole marketer at an education technology startup. Converted roughly 300 users through social media marketing in the two weeks leading up to the UCAS deadline.",
    ],
  },
  {
    role: "Investment Banking Intern (M&A)",
    company: "The Quant Group",
    years: "Jul–Aug 2023",
    badgeClass: "bg-neutral-800 text-white",
    bullets: [
      "Led an intern team producing energy-sector research reports to support a senior banker on a live acquisition mandate.",
      "Built trading comps, transaction comps and DCF valuation models.",
      "Automated a data-entry task traditionally done manually by interns over three days; built an Excel formula and pivot-table system that completed it in four hours with zero errors on reconciliation.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "parse",
    description: "An ERP that codes itself",
    href: "/projects/parse",
  },
];
