export type SocialLink = {
  label: string;
  href: string;
};

export type ConceptIcon =
  | "rag"
  | "llm"
  | "agents"
  | "toolCalling"
  | "prompt"
  | "embeddings"
  | "hybridSearch"
  | "reranking"
  | "guardrails"
  | "evaluation"
  | "structured"
  | "rest"
  | "chip";

export type StackItem = {
  name: string;
  /** Brand logo file: `public/logos/tech/<logo>.svg`. */
  logo?: string;
  /** How a dark-on-light logo is shown in dark mode. */
  dark?: "invert" | "white";
  /** Lucide icon for practices and tools without a usable logo. */
  concept?: ConceptIcon;
};

export type StackRow = {
  name: string;
  /** Short label next to the row name, e.g. "Current focus". */
  badge?: string;
  direction: "left" | "right";
  items: StackItem[];
};

export type TrackIcon = "web" | "ai";

export type TrackProof = {
  /** Product or company, shown bold. */
  name: string;
  /** One short line under the name. */
  detail: string;
};

export type Track = {
  name: string;
  icon: TrackIcon;
  period: string;
  /** One sentence; `**text**` renders bold (used to highlight the stack). */
  pitch: string;
  /** Five lines, one per product or role, so the two tiles stay level. */
  proof: TrackProof[];
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
  /** Short note shown with the links, e.g. when a product is no longer public. */
  note?: string;
  tags: string[];
};

export type StackLogo =
  "react" | "nextjs" | "typescript" | "nodejs" | "nestjs" | "postgresql";

export type CoreStackItem = {
  name: string;
  logo: StackLogo;
};

export type FocusIcon =
  | "rag"
  | "llm"
  | "agent"
  | "mcp"
  | "guardrails"
  | "evals"
  | "python"
  | "pgvector";

export type FocusItem = {
  label: string;
  icon: FocusIcon;
};

export type Story = {
  slug: string;
  name: string;
  /** Employer or role, with the period, e.g. "Confiz · 2023 – 2024". */
  context: string;
  /** One line: what the product is. */
  tagline: string;
  /** What the product does and my part in it; keep to two sentences. */
  description: string;
  /** One sentence: scope of the role first, then its headline result. Full bullets live in `experience`. */
  highlight: string;
  /** Composite image under public/stories, 3200×2000. */
  image: string;
  /** Live URL, or an internal link such as the case study. */
  href?: string;
  linkLabel?: string;
  /** Shown instead of a link, or as a caveat under it. */
  note?: string;
};

export type Stat = {
  value: string;
  label: string;
  /** Where or how the number was achieved. */
  context?: string;
};

export type CaseStudyIcon =
  "database" | "shield" | "search" | "message" | "chart";

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
      context:
        "Lebara, Educative, Aqari, Zerodocs · millions in monthly transactions combined",
    },
    {
      value: "2",
      label: "AI products I created and built",
      context:
        "InstantBot Knowledge Assistant and Document Scout · validated internally",
    },
  ] satisfies Stat[],
  tracks: [
    {
      name: "Web platforms",
      icon: "web",
      period: "7+ years",
      pitch:
        "Production **React / Next.js** front-ends and **Node.js / NestJS** services on **PostgreSQL** and **Redis**, from architecture to deployment.",
      proof: [
        {
          name: "Aqari · ADRES Sharjah",
          detail:
            "Government real-estate portal across web and native apps: 20 workflows built from scratch, webviews, event tracking, and Jest",
        },
        {
          name: "Lebara",
          detail:
            "Telecom platform for 4M+ users in 5 countries: Redis caching, a brute-force rate limiter, and App Insights-driven bug fixes",
        },
        {
          name: "Afiniti",
          detail:
            "Contact-center platform where I led 3 microservices, cutting setup from 5 minutes to under 1 and raising test coverage from 0% to 80%",
        },
        {
          name: "Zerodocs",
          detail:
            "Document collaboration SaaS I built from scratch and ran in production as the sole developer, from features to incident fixes",
        },
        {
          name: "Educative.io",
          detail:
            "Learning platform used by 1M+ developers, where my SSR, caching, and SEO work lifted Lighthouse above 80 on every metric",
        },
      ],
      cta: { label: "See experience", href: "#experience" },
    },
    {
      name: "AI-powered products",
      icon: "ai",
      period: "Since 2026",
      pitch:
        "AI products built end to end in **Python** and **Node.js**: **RAG** retrieval on **pgvector**, **LLM** grounding and guardrails, **agents** and **MCP**, and evaluation.",
      proof: [
        {
          name: "InstantBot",
          detail:
            "Two AI products I created: Knowledge Assistant and Document Scout",
        },
        {
          name: "Knowledge Assistant",
          detail:
            "Grounded, citation-backed answers on web chat, widget, and WhatsApp",
        },
        {
          name: "Document Scout",
          detail:
            "LLM screening with source-quoted verification, used by HR for CVs",
        },
        {
          name: "Multi-tenant core",
          detail:
            "Row-level security, rate limits, and per-tenant quotas across three channels",
        },
        {
          name: "Evaluation loop",
          detail: "Framework tracking recall, MRR, hit@k, and latency",
        },
      ],
      cta: { label: "Read the case study", href: "/projects/instantbot" },
    },
  ] satisfies Track[],
  /** Bento tile: the six tools that define the web track. */
  coreStack: [
    { name: "React", logo: "react" },
    { name: "Next.js", logo: "nextjs" },
    { name: "TypeScript", logo: "typescript" },
    { name: "Node.js", logo: "nodejs" },
    { name: "NestJS", logo: "nestjs" },
    { name: "PostgreSQL", logo: "postgresql" },
  ] satisfies CoreStackItem[],
  /**
   * Bento tile: ring of current AI focus areas around the tenure label. Exactly 8
   * items, placed clockwise from 3 o'clock; keep short labels at 3 and 9 o'clock
   * and long ones diagonal so neighbours never touch.
   */
  focusRing: {
    title: "AI-powered products",
    period: "since 2026",
    items: [
      { label: "RAG", icon: "rag" },
      { label: "Agentic AI", icon: "agent" },
      { label: "Python", icon: "python" },
      { label: "Guardrails", icon: "guardrails" },
      { label: "MCP", icon: "mcp" },
      { label: "pgvector", icon: "pgvector" },
      { label: "LLMs", icon: "llm" },
      { label: "Evals", icon: "evals" },
    ] satisfies FocusItem[],
  },
  /** Bento tile: how I work. */
  howIWork: [
    "I own delivery end to end: web, mobile, and backend.",
    "Remote-first and async across time zones. I have worked with teams in the UAE, Europe, and the US.",
    "I ship with tests, docs, and monitoring, not just features.",
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
  /** Stack marquee rows (home). Logos live in public/logos/tech. */
  stackRows: [
    {
      name: "Frontend & UI",
      direction: "left",
      items: [
        { name: "HTML", logo: "html5" },
        { name: "CSS", logo: "css" },
        { name: "JavaScript", logo: "javascript" },
        { name: "React", logo: "react" },
        { name: "Next.js", logo: "nextjs", dark: "invert" },
        { name: "TypeScript", logo: "typescript" },
        { name: "Redux", logo: "redux" },
        { name: "Material UI", logo: "mui" },
        { name: "React Hook Form", logo: "reacthookform" },
        { name: "Figma", logo: "figma" },
        { name: "Google Analytics", logo: "googleanalytics" },
      ],
    },
    {
      name: "Backend, data & infra",
      direction: "right",
      items: [
        { name: "Node.js", logo: "nodejs" },
        { name: "NestJS", logo: "nestjs" },
        { name: "Express", logo: "express", dark: "invert" },
        { name: "GraphQL", logo: "graphql" },
        { name: "REST", concept: "rest" },
        { name: "PostgreSQL", logo: "postgresql" },
        { name: "MongoDB", logo: "mongodb" },
        { name: "Redis", logo: "redis" },
        { name: "Supabase", logo: "supabase" },
        { name: "TypeORM", logo: "typeorm" },
        { name: "Python", logo: "python" },
        { name: "Docker", logo: "docker" },
        { name: "Jenkins", logo: "jenkins" },
        { name: "AWS", logo: "aws", dark: "white" },
        { name: "Azure", logo: "azure" },
        { name: "Vercel", logo: "vercel", dark: "invert" },
        { name: "Stripe", logo: "stripe" },
        { name: "Adyen", logo: "adyen" },
        { name: "Git", logo: "git" },
        { name: "GitHub", logo: "github", dark: "invert" },
        { name: "Jira", logo: "jira" },
        { name: "Swagger", logo: "swagger" },
      ],
    },
    {
      name: "AI / LLM",
      badge: "Current focus",
      direction: "left",
      items: [
        { name: "RAG", concept: "rag" },
        { name: "LLMs", concept: "llm" },
        { name: "Agents", concept: "agents" },
        { name: "Tool calling", concept: "toolCalling" },
        { name: "MCP", logo: "mcp", dark: "invert" },
        { name: "Prompt engineering", concept: "prompt" },
        { name: "Embeddings", concept: "embeddings" },
        { name: "Hybrid search", concept: "hybridSearch" },
        { name: "Reranking", concept: "reranking" },
        { name: "Guardrails", concept: "guardrails" },
        { name: "LLM evaluation", concept: "evaluation" },
        { name: "Structured outputs", concept: "structured" },
        { name: "Gemini", logo: "gemini" },
        { name: "Groq", concept: "chip" },
        { name: "pgvector", logo: "postgresql" },
      ],
    },
  ] satisfies StackRow[],
  experience: [
    {
      company: "Nextbridge FZE",
      role: "Senior Software Engineer (Contract)",
      location: "Remote",
      period: "Oct 2024 – Present",
      project: "Aqari — ADRES Sharjah real-estate digital services portal",
      highlights: [
        "Built 20 of the portal's real-estate workflows from scratch on a 200k+ line Next.js and TypeScript codebase, and own its releases and production support.",
        "Took over iOS and Android delivery: built the typed web-to-native webview bridge and now ship native releases alongside web.",
        "Built a dynamic event-tracking layer on GA4 and the Jest test setup, hardened the shared API client, and introduced an AI-assisted code-generation workflow wired to Jira and Figma.",
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
      project:
        "Lebara — telecom platform, 4M+ users across Germany, the UK, the Netherlands, Denmark, and France",
      highlights: [
        "Cut the dashboard's data load from 7–10 seconds to under 3 by caching slow-changing data in Redis, on a platform serving 4M+ users and absorbing spikes of millions of requests within seconds.",
        "Stopped brute-force attacks with a custom Redis-backed rate limiter and reCAPTCHA v3.",
        "Ranked production errors by frequency with Azure App Insights queries and fixed the most frequent ones first, then built the usage analytics and event logging on top of it.",
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
        "Led three microservices end to end (billing, auto-configuration, storefront): REST APIs, Swagger docs, database design, and their front-ends.",
        "Cut auto-configuration setup from 5 minutes to under 1 (over 80% faster) and raised unit test coverage from 0% to 80%.",
        "Built call-centre white-labelling (primary and secondary colours and logos applied site-wide) and led a team of four through reviews, demos, sprint planning, and containerised deployments.",
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
        "Zerodocs: built the SPA from scratch and shipped it to production as the sole developer, then owned features, bugs, and production incidents alone.",
        "Delivered auth, bulk file management, collaboration, chat, and parallel bulk uploads to AWS S3.",
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
        "Lifted Lighthouse scores above 80 on every metric through server-side rendering, fewer re-renders, and page caching with invalidation on data change.",
        "Added structured data for SEO and accessibility fixes across a product used by 1M+ developers.",
        "Contributed to the React-to-Next.js migration and raised unit test coverage to 80%.",
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
    honors: ["Silver medalist"],
  },
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
  /** Home "Success stories", in display order. InstantBot has its own spotlight above. */
  stories: [
    {
      slug: "aqari",
      name: "Aqari",
      context: "Nextbridge FZE · Oct 2024 – Present",
      tagline: "Government real-estate portal for ADRES Sharjah",
      description:
        "Tenancy contracts, power of attorney, and request tracking for Sharjah residents, on the web and inside the ADRES iOS and Android apps. I own the frontend across all three.",
      highlight:
        "Own the frontend across web, iOS, and Android: 20 of its 29 workflows built from scratch, plus the native bridge, analytics, and releases.",
      image: "/stories/aqari.webp",
      href: "https://ds.sharjah.ae/home",
      linkLabel: "Live site",
    },
    {
      slug: "lebara",
      name: "Lebara",
      context: "Confiz · Feb 2023 – Sep 2024",
      tagline: "Telecom platform for 4M+ users across five countries",
      description:
        "Plans, top-ups, usage, and payments for Lebara customers in Germany, the UK, the Netherlands, Denmark, and France, under spikes of millions of requests within seconds.",
      highlight:
        "Full-stack features across the platform, including Redis caching that took the dashboard from 7–10 seconds to under 3 and a rate limiter that stopped brute-force attacks.",
      image: "/stories/lebara.webp",
      href: "https://www.lebara.com/",
      linkLabel: "Live site",
      note: "Screens in the image are illustrative, not customer data.",
    },
    {
      slug: "mega",
      name: "Mega Cloud",
      context: "Afiniti · Jan 2022 – Feb 2023",
      tagline: "Self-serve contact-center product on microservices",
      description:
        "A contact center a customer sets up alone: queues, phone numbers, billing, and their own branding. I led three of its microservices end to end.",
      highlight:
        "Led three microservices end to end, with setup time cut from 5 minutes to under 1 and test coverage raised from 0% to 80%.",
      image: "/stories/mega.webp",
      note: "Internal product, no longer publicly available.",
    },
    {
      slug: "zerodocs",
      name: "Zerodocs",
      context: "Nextbridge Pvt Ltd · Sep 2020 – Dec 2021",
      tagline: "Construction document collaboration SaaS",
      description:
        "Project specs, bulk document uploads, controlled sharing, and chat for construction teams.",
      highlight:
        "I built it from scratch and ran it in production as the sole developer: features, bugs, and incidents included.",
      image: "/stories/zerodocs.webp",
      href: "https://zerodocs.com/",
      linkLabel: "Live site",
    },
    {
      slug: "educative",
      name: "Educative.io",
      context: "Educative · Jul 2019 – Aug 2020",
      tagline: "Interactive learning platform for 1M+ developers",
      description:
        "Hands-on courses in a browser-based editor. I worked on the core product's rendering, SEO, and accessibility.",
      highlight:
        "Rendering, caching, SEO, and accessibility work on the core product that lifted Lighthouse above 80 on every metric.",
      image: "/stories/educative.webp",
      href: "https://www.educative.io/",
      linkLabel: "Live site",
    },
  ] satisfies Story[],
  projects: [
    {
      title: "Aqari — ADRES Sharjah real-estate portal",
      description:
        "Government digital services portal with 29 real-estate workflows across web and native apps. I own the frontend across web, iOS, and Android: typed web-to-native bridge, GA4 analytics layer, hardened API client, shared component library, and releases.",
      category: "web",
      href: "https://ds.sharjah.ae/home",
      tags: [
        "Next.js 14",
        "React 18",
        "TypeScript",
        "Redux Toolkit",
        "Material UI",
      ],
    },
    {
      title: "Lebara — telecom platform",
      description:
        "Telecom platform serving 4M+ users across Germany, the UK, the Netherlands, Denmark, and France. Built full-stack features; stopped brute-force attacks with a custom Redis-backed rate limiter and reCAPTCHA v3; cut API latency with Redis caching; debugged live production with Azure App Insights.",
      category: "web",
      href: "https://www.lebara.com/",
      tags: [
        "React",
        "Redux",
        "GraphQL",
        "Node.js",
        "TypeScript",
        "Redis",
        "Azure App Insights",
        "Adyen",
      ],
    },
    {
      title: "Mega — contact-center platform (Afiniti)",
      description:
        "Contact-center product on microservices. Service lead for billing, auto-configuration, and storefront: REST APIs, Swagger docs, database design, and per-service front-ends. Cut configuration time from 3–5 minutes to under 1 minute, raised test coverage from 0% to 80%, and led a team of four.",
      category: "web",
      note: "Internal product, no longer publicly available",
      tags: [
        "NestJS",
        "Next.js",
        "PostgreSQL",
        "TypeORM",
        "Material UI",
        "Stripe",
      ],
    },
    {
      title: "Educative.io — interactive learning platform",
      description:
        "E-learning platform used by 1M+ developers. Full-stack work on the core product: faster rendering, SEO structured data, a React-to-Next.js migration, and unit test coverage raised to 80%.",
      category: "web",
      href: "https://www.educative.io/",
      tags: ["Next.js", "React", "Material UI", "Redux", "TypeScript", "Jest"],
    },
    {
      title: "Zerodocs — document collaboration SaaS",
      description:
        "Built the frontend from scratch as sole frontend engineer: auth, bulk file management, project sharing, notifications, chat, and parallel bulk uploads to AWS S3. Still live today.",
      category: "web",
      href: "https://zerodocs.com/",
      tags: ["React", "AWS S3", "Bootstrap", "react-dropzone"],
    },
    {
      title: "Audionic Obstacle Detector",
      description:
        "Wearable aid for blind users — obstacle detection, distance calculation, and audio guidance using computer vision and machine learning. Final-year project; runner-up at Softec'19 and COMPPEC'19.",
      category: "web",
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
