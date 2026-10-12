export type SocialLink = {
  label: string;
  href: string;
};

export type SkillGroup = {
  name: string;
  items: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  period: string;
  project?: string;
  highlights: string[];
  technologies: string[];
};

export type ProjectEntry = {
  title: string;
  description: string;
  href?: string;
  tags: string[];
};

export const site = {
  name: "Muhammad Hammad Ahmad",
  shortName: "Hammad Ahmad",
  title: "Senior Software Engineer (Full Stack · AI Applications)",
  location: "Lahore, Pakistan",
  email: "hammad.shahid120@gmail.com",
  phone: "+923244112700",
  yearsExperience: "7+",
  tagline:
    "Full-stack engineer building production AI applications and scalable web platforms with TypeScript, React/Next.js, and Node.js/NestJS.",
  summary: [
    "7+ years building production AI applications — RAG, hybrid search, guardrails, LLM evaluation — and scalable web platforms using TypeScript, React/Next.js, and Node.js/NestJS.",
    "Creator of InstantBot, a multi-tenant AI knowledge-assistant SaaS piloted with an HR team.",
    "Led a team of four engineers and owned services end to end; currently extending into AI agents, tool calling, and MCP.",
  ],
  social: [
    {
      label: "GitHub",
      href: "https://github.com/hammadahmad120",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hammad-ahmad-0139bb162",
    },
    {
      label: "Email",
      href: "mailto:hammad.shahid120@gmail.com",
    },
  ] satisfies SocialLink[],
  skills: [
    {
      name: "AI / LLM",
      items: [
        "RAG",
        "Hybrid search",
        "pgvector",
        "Embeddings",
        "Reranking",
        "Prompt engineering",
        "Gemini API",
        "Groq API",
        "Grounding & guardrails",
        "LLM evaluation",
        "Structured outputs",
        "Claude Code",
        "MCP",
      ],
    },
    {
      name: "Frontend",
      items: [
        "React",
        "Next.js (App Router)",
        "TypeScript",
        "Redux Toolkit",
        "Material UI",
        "react-hook-form",
        "next-intl",
        "Google Analytics 4",
      ],
    },
    {
      name: "Backend & Data",
      items: [
        "Node.js",
        "NestJS",
        "Express",
        "GraphQL",
        "REST",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "TypeORM",
        "Sequelize",
        "Supabase",
        "Python",
      ],
    },
    {
      name: "Tools & Practices",
      items: [
        "Jest",
        "Docker",
        "Jenkins",
        "Git",
        "Jira",
        "Figma",
        "Swagger",
        "Azure App Insights",
        "AWS S3",
        "Stripe",
        "Adyen",
        "Microservices",
      ],
    },
  ] satisfies SkillGroup[],
  experience: [
    {
      company: "Nextbridge FZE",
      role: "Senior Software Engineer (Contract)",
      location: "Remote",
      period: "Oct 2024 – Present",
      project: "Aqari — ADRES Sharjah real-estate digital services portal",
      highlights: [
        "Lead frontend engineer for a government portal with 29 real-estate workflows (web plus ADRES iOS/Android apps): production support, enhancements, and feature delivery in a 200k+ line Next.js/TypeScript codebase.",
        "Took over the iOS and Android apps after the mobile team was dissolved; built the typed web-to-native webview bridge (navigation, downloads, platform detection) and manage native releases.",
        "Designed a GA4 analytics layer, hardened the shared API client (token refresh, SSO re-auth, error mapping), enforced pixel-perfect UI via a shared component library, and built an AI-assisted code generation workflow with Jira and Figma.",
      ],
      technologies: [
        "Next.js 14",
        "React 18",
        "TypeScript",
        "Redux Toolkit",
        "Material UI",
        "GA4",
      ],
    },
    {
      company: "Confiz",
      role: "Senior Software Engineer",
      location: "Lahore",
      period: "Feb 2023 – Sep 2024",
      project: "Lebara — telecom platform",
      highlights: [
        "Built full-stack features from scratch, integrating third-party and internal services with architecture reviews, docs, and unit tests.",
        "Improved performance with Redis caching; added rate limiting, reCAPTCHA v3, and App Insights logging and usage analytics.",
      ],
      technologies: [
        "React",
        "Redux",
        "GraphQL",
        "Node.js",
        "TypeScript",
        "AEM",
        "Adyen",
        "Jest",
      ],
    },
    {
      company: "Afiniti",
      role: "Senior Software Engineer",
      location: "Lahore",
      period: "Jan 2022 – Feb 2023",
      project: "Mega — contact-center product on microservices",
      highlights: [
        "Service lead for billing and auto-configuration microservices (REST APIs, Swagger docs, database design, per-service front-ends); cut configuration time from 3–5 minutes to under 1 minute and raised unit test coverage from 0% to 80%.",
        "Led a team of four engineers: code reviews, client demos, sprint planning, and containerized deployments.",
      ],
      technologies: [
        "NestJS",
        "Next.js",
        "PostgreSQL",
        "TypeORM",
        "TypeScript",
        "Material UI",
        "Stripe",
      ],
    },
    {
      company: "Nextbridge Pvt Ltd",
      role: "Software Engineer",
      location: "Lahore",
      period: "Sep 2020 – Dec 2021",
      highlights: [
        "Zerodocs.com: built the SPA from scratch as sole developer — auth, bulk file management, collaboration, chat, and AWS S3 bulk uploads.",
        "Valorx: built a Chrome extension bringing Salesforce data into AG Grid with spreadsheet-style editing, bulk updates, and versioning.",
      ],
      technologies: [
        "React",
        "TypeScript",
        "AWS S3",
        "AG Grid",
        "Salesforce",
        "Bootstrap",
      ],
    },
    {
      company: "Educative Inc",
      role: "Software Engineer",
      location: "Lahore",
      period: "Jul 2019 – Aug 2020",
      project: "Educative.io",
      highlights: [
        "Full-stack work on Educative.io: faster rendering, SEO structured data, React-to-Next.js migration, and 80% test coverage.",
      ],
      technologies: [
        "Next.js",
        "React",
        "Material UI",
        "Redux",
        "TypeScript",
        "Jest",
      ],
    },
  ] satisfies ExperienceEntry[],
  education: {
    school: "Punjab University (PUCIT), Lahore",
    degree: "BS (Hons.) Computer Science",
    period: "2015 – 2019",
    cgpa: "3.89",
    honors: ["2nd in class", "Principal's List in all 8 semesters"],
  },
  achievements: [
    "Runner-up, Softec'19 (FAST) — FYP software competition",
    "Runner-up, COMPPEC'19 (NUST) — FYP software competition",
  ],
  languages: [
    { name: "Urdu", level: "Native" },
    { name: "Punjabi", level: "Native" },
    { name: "English", level: "Professional" },
  ],
  projects: [
    {
      title: "InstantBot — AI Knowledge Assistant & Document Intelligence SaaS",
      description:
        "Multi-tenant SaaS that turns a company's documents into a grounded, citation-backed AI assistant (web, widget, WhatsApp). End-to-end RAG with pgvector hybrid retrieval and reranking, guardrails that prevent hallucinations, Document Scout for LLM-driven document screening, and an LLM evaluation framework. Piloted with an HR team to screen CVs.",
      tags: [
        "Node.js",
        "TypeScript",
        "Next.js",
        "Supabase",
        "pgvector",
        "Python",
        "Gemini API",
        "Groq API",
        "WhatsApp Business API",
      ],
    },
    {
      title: "Minhaj Dispensary Management System",
      description:
        "End-to-end system for a welfare organization — database design, backend APIs, and admin UI built pro bono.",
      tags: ["React.js", "Node.js", "Material UI", "PostgreSQL", "Sequelize"],
    },
    {
      title: "Node.js REST API Boilerplate",
      description:
        "Production-ready starter with 3-layer architecture, generic exception handling, and CRUD APIs.",
      href: "https://github.com/hammadahmad120",
      tags: ["Node.js", "Express", "TypeScript", "PostgreSQL"],
    },
    {
      title: "Zerodocs.com",
      description:
        "Document collaboration SPA with auth, bulk S3 uploads, sharing, notifications, and chat.",
      tags: ["React.js", "AWS S3", "Bootstrap"],
    },
    {
      title: "Valorx Chrome Extension",
      description:
        "Salesforce bulk editor with AG Grid, spreadsheet-style editing, custom version control, and direct Salesforce sync.",
      tags: ["React.js", "TypeScript", "AG Grid", "Salesforce"],
    },
    {
      title: "Audionic Obstacle Detector",
      description:
        "Wearable aid for blind users — obstacle detection, distance calculation, and audio guidance using CV/ML.",
      tags: ["OpenCV", "Python", "YOLO", "Machine Learning"],
    },
  ] satisfies ProjectEntry[],
} as const;

/**
 * Absolute origin of the deployed site, without a trailing slash.
 * Set NEXT_PUBLIC_SITE_URL to your domain; VERCEL_URL is the fallback on Vercel.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
