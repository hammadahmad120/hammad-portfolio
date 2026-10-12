export type SocialLink = {
  label: string;
  href: string;
};

export type SkillGroup = {
  name: string;
  items: string[];
  /** Short label shown on the card, e.g. "Current focus". */
  badge?: string;
};

export type Track = {
  name: string;
  period: string;
  pitch: string;
  items: string[];
  proof: string[];
  cta: { label: string; href: string };
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

export type ProjectCategory = "ai" | "web";

export type ProjectEntry = {
  title: string;
  description: string;
  category: ProjectCategory;
  /** Live URL. */
  href?: string;
  /** Source repository URL. */
  github?: string;
  tags: string[];
};

export type Stat = {
  value: string;
  label: string;
  /** Where or how the number was achieved. */
  context?: string;
};

export type CaseStudyIcon = "database" | "shield" | "search" | "message" | "chart";

export type CaseStudySection = {
  title: string;
  icon: CaseStudyIcon;
  body: string;
};

export type SuiteProduct = {
  name: string;
  summary: string;
};

export type FeaturedProduct = {
  name: string;
  slug: string;
  role: string;
  period: string;
  tagline: string;
  description: string;
  products: SuiteProduct[];
  channels: string[];
  outcomes: string[];
  tech: string[];
  caseStudy: {
    problem: string;
    sections: CaseStudySection[];
  };
};

export const site = {
  name: "Muhammad Hammad Ahmad",
  shortName: "Hammad Ahmad",
  title: "Senior Full-Stack Engineer · Building AI-powered products",
  location: "Lahore, Pakistan",
  email: "hammad.shahid120@gmail.com",
  phone: "+923244112700",
  yearsExperience: "7+",
  availability: "Open to senior full-stack & AI product roles",
  headline:
    "7+ years shipping production web platforms. Now building AI-powered products on top of that.",
  tagline:
    "React/Next.js and Node.js/NestJS across telecom, government, SaaS, and e-learning. Since early 2026, building AI products end to end — RAG, guardrails, evaluation, and the product surfaces around them. Creator of InstantBot.",
  resumeUrl: "/Hammad_Ahmad_Resume.pdf",
  stats: [
    {
      value: "7+",
      label: "Years in production",
      context: "Full-stack, web platforms to AI products",
    },
    {
      value: "4M+",
      label: "Production users, single platform",
      context: "Lebara telecom · 5 countries (DE, UK, NL, DK, FR)",
    },
    {
      value: "4",
      label: "Revenue-generating products",
      context: "Lebara, Educative, Aqari, Zerodocs · millions in monthly transactions combined",
    },
    {
      value: "2",
      label: "AI products I created and built",
      context: "InstantBot Knowledge Assistant and Document Scout · validated internally",
    },
  ] satisfies Stat[],
  tracks: [
    {
      name: "Web platforms",
      period: "7+ years",
      pitch:
        "Production React/Next.js front-ends and Node.js/NestJS services, from architecture and data modelling to deployment and support.",
      items: [
        "React / Next.js",
        "Node.js / NestJS",
        "TypeScript",
        "PostgreSQL / Redis",
        "GraphQL / REST",
        "Microservices",
      ],
      proof: [
        "Own Aqari, ADRES Sharjah's government portal, across web, iOS, and Android — releases, API client, analytics, and the native bridge",
        "Caching, rate limiting, and live production debugging for Lebara's telecom platform (4M+ users, 5 countries)",
        "Service lead and team lead of four on Afiniti's contact-center microservices",
      ],
      cta: { label: "See experience", href: "#experience" },
    },
    {
      name: "AI-powered products",
      period: "Since 2026",
      pitch:
        "AI applications built end to end: retrieval, grounding and guardrails, evaluation, and the product people actually use.",
      items: [
        "RAG / hybrid retrieval",
        "pgvector",
        "Grounding & guardrails",
        "LLM evaluation",
        "Gemini / Groq APIs",
        "Agents, tool calling, MCP",
      ],
      proof: [
        "Created InstantBot: two AI products, Knowledge Assistant and Document Scout, validated internally",
        "Document Scout: LLM-driven screening with source-quoted verification, used by HR to screen CVs against job requirements",
        "Evaluation framework tracking recall, MRR, hit@k, and latency",
      ],
      cta: { label: "Read the case study", href: "/projects/instantbot" },
    },
  ] satisfies Track[],
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
      name: "AI / LLM",
      badge: "Current focus",
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
        "Own the delivery of a government portal with 29 real-estate workflows across web and the ADRES iOS/Android apps: production support, enhancements, feature delivery, and releases on a 200k+ line Next.js/TypeScript codebase.",
        "Own the frontend across all three channels — web, iOS, and Android — after taking over the native apps when the mobile team was dissolved; built the typed web-to-native webview bridge (navigation, downloads, platform detection) and manage native releases.",
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
      project: "Lebara — telecom platform, 4M+ users across Germany, the UK, the Netherlands, Denmark, and France",
      highlights: [
        "Built full-stack features for a platform serving millions of live users and absorbing traffic spikes of millions of requests within seconds, integrating third-party and internal services with architecture reviews, docs, and unit tests.",
        "Stopped brute-force attacks with a custom Redis-backed rate limiter and reCAPTCHA v3; cached slow-changing data in Redis to cut API latency.",
        "Debugged live production issues with Azure App Insights and built the usage analytics and event logging on top of it.",
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
  featuredProduct: {
    name: "InstantBot",
    slug: "instantbot",
    role: "Creator",
    period: "Mar 2026 – Present",
    tagline: "AI knowledge assistant & document intelligence suite",
    description:
      "Multi-tenant AI suite with two products built end to end: Knowledge Assistant turns a company's documents into a grounded, citation-backed assistant across web chat, an embeddable widget, and WhatsApp; Document Scout screens and ranks documents against requirements with source-quoted verification. Validated internally, with HR using Document Scout to screen CVs.",
    products: [
      {
        name: "Knowledge Assistant",
        summary:
          "Ask questions over company documents and get grounded answers with citations — on web chat, an embeddable widget, and WhatsApp.",
      },
      {
        name: "Document Scout",
        summary:
          "Give it requirements and a set of documents; it extracts fields, verifies them with quoted sources, and returns an explainable ranked shortlist.",
      },
    ],
    channels: ["Web chat", "Embeddable widget", "WhatsApp Business"],
    outcomes: [
      "Grounded, citation-backed answers with guardrails that prevent hallucinations and cut cost",
      "Explainable, source-quoted shortlists for screening documents against requirements",
      "Secure multi-tenancy with row-level security, rate limits, and quotas across three channels",
    ],
    tech: [
      "Node.js",
      "TypeScript",
      "Express",
      "Next.js",
      "Supabase",
      "pgvector",
      "Python",
      "Gemini API",
      "Groq API",
      "WhatsApp Business API",
    ],
    caseStudy: {
      problem:
        "Companies keep policies, contracts, and CVs in piles of documents. Teams need answers they can trust, with the source attached — not a chatbot that improvises.",
      sections: [
        {
          title: "Retrieval pipeline",
          icon: "database",
          body: "Documents go through parsing, OCR, and chunking, then into pgvector embeddings. Retrieval is hybrid — vector plus keyword — with a reranking stage, so the context sent to the model is small and relevant.",
        },
        {
          title: "Grounding and guardrails",
          icon: "shield",
          body: "Evidence scoring, tiered prompts, refusal handling, and fallbacks make sure the assistant answers only from the documents it has, declines when evidence is weak, and keeps token cost under control.",
        },
        {
          title: "Document Scout",
          icon: "search",
          body: "LLM-driven requirement and field extraction with source-quoted verification produces explainable, ranked shortlists. Validated internally, with HR using it to screen CVs against job requirements.",
        },
        {
          title: "Channels and tenancy",
          icon: "message",
          body: "Streaming web chat, an embeddable widget, and WhatsApp Business run on one multi-tenant core with row-level security, rate limits, and per-tenant quotas.",
        },
        {
          title: "Evaluation loop",
          icon: "chart",
          body: "An evaluation framework tracks recall, MRR, hit@k, and latency, with human-in-the-loop analytics feeding back into prompt and retrieval tuning.",
        },
      ],
    },
  } satisfies FeaturedProduct,
  projects: [
    {
      title: "Aqari — ADRES Sharjah real-estate portal",
      description:
        "Government digital services portal with 29 real-estate workflows across web and native apps. Lead frontend engineer: typed web-to-native bridge, GA4 analytics layer, hardened API client, shared component library.",
      category: "web",
      tags: ["Next.js 14", "React 18", "TypeScript", "Redux Toolkit", "Material UI"],
    },
    {
      title: "Minhaj Dispensary Management System",
      category: "web",
      description:
        "End-to-end system for a welfare organization — database design, backend APIs, and admin UI built pro bono.",
      tags: ["React.js", "Node.js", "Material UI", "PostgreSQL", "Sequelize"],
    },
    {
      title: "Node.js REST API Boilerplate",
      category: "web",
      description:
        "Production-ready starter with 3-layer architecture, generic exception handling, and CRUD APIs.",
      github: "https://github.com/hammadahmad120",
      tags: ["Node.js", "Express", "TypeScript", "PostgreSQL"],
    },
    {
      title: "Zerodocs.com",
      category: "web",
      description:
        "Document collaboration SPA with auth, bulk S3 uploads, sharing, notifications, and chat.",
      tags: ["React.js", "AWS S3", "Bootstrap"],
    },
    {
      title: "Valorx Chrome Extension",
      category: "web",
      description:
        "Salesforce bulk editor with AG Grid, spreadsheet-style editing, custom version control, and direct Salesforce sync.",
      tags: ["React.js", "TypeScript", "AG Grid", "Salesforce"],
    },
    {
      title: "Audionic Obstacle Detector",
      category: "web",
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
