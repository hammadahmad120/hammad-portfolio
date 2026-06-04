export type SocialLink = {
  label: string;
  href: string;
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
  title: "Senior Software Engineer (Full Stack)",
  location: "Lahore, Punjab, Pakistan",
  email: "hammad.shahid120@gmail.com",
  phone: "+923244112700",
  yearsExperience: "5+",
  tagline:
    "Full-stack engineer building telco, SaaS, and e-learning platforms with React, Next.js, and Node.",
  summary: [
    "5+ years working with React.js, Node.js, Nest.js, Next.js, TypeScript, Express, Redux, GraphQL, and Material UI, plus PostgreSQL, MongoDB, TypeORM, and Sequelize.",
    "Strong background in layered architecture and MVC, organizing and structuring production codebases.",
    "Experienced across diverse teams — client communication, demos, sprint planning, requirements gathering, and conflict management.",
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
  skills: {
    proficient: [
      "React.js",
      "Node.js",
      "Nest.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "GraphQL",
      "Express",
      "Redux",
      "PostgreSQL",
      "MongoDB",
      "TypeORM",
      "Redis",
      "HTML5",
      "CSS/SCSS",
      "Jest",
      "Git",
      "Azure App Insights",
    ],
    familiar: [
      "Angular.js",
      "OpenCV",
      "Python",
      "C++",
      "Docker",
      "Selenium",
      "Firebase",
      "AEM",
    ],
  },
  experience: [
    {
      company: "Confiz",
      role: "Senior Software Engineer",
      location: "Lahore",
      period: "Feb 2023 – Present",
      project: "Lebara",
      highlights: [
        "Built full-stack telco features from scratch, integrating third-party and internal services with architecture reviews, documentation, and unit tests.",
        "Improved performance with Redis caching; added rate limiting and Google Captcha v3 for security.",
        "Integrated Azure App Insights for event logging, debugging, and usage analytics.",
      ],
      technologies: [
        "React.js",
        "Redux",
        "GraphQL",
        "Node.js",
        "TypeScript",
        "Azure App Insights",
        "Adyen",
        "Jest",
        "Jenkins",
      ],
    },
    {
      company: "Afiniti",
      role: "Senior Software Engineer",
      location: "Lahore",
      period: "Jan 2022 – Feb 2023",
      project: "Mega",
      highlights: [
        "Service lead for a call-center product on microservices architecture.",
        "Developed billing and auto-configuration REST services with Swagger docs and database design.",
        "Reduced auto-configuration time from 3–5 minutes to under one minute; raised unit test coverage from 0% to 80%.",
        "Led a team of four — code reviews, client demos, sprint planning, and Docker deployments.",
      ],
      technologies: [
        "Nest.js",
        "Next.js",
        "PostgreSQL",
        "TypeORM",
        "Material UI",
        "Stripe",
        "Swagger",
        "Jest",
      ],
    },
    {
      company: "Nextbridge",
      role: "Software Engineer",
      location: "Lahore",
      period: "Sept 2020 – Dec 2021",
      project: "Zerodocs.com",
      highlights: [
        "Sole developer of a SPA with auth, bulk file management, project sharing, notifications, and chat.",
        "Implemented parallel bulk uploads to AWS S3 with react-dropzone.",
      ],
      technologies: [
        "React.js",
        "Bootstrap",
        "AWS S3",
        "Google Captcha",
        "axios",
      ],
    },
    {
      company: "Educative",
      role: "Software Engineer",
      location: "Lahore",
      period: "July 2019 – Aug 2020",
      project: "Educative.io",
      highlights: [
        "Full-stack work on an e-learning platform; improved performance and structured data for SEO.",
        "Migrated pages from React to Next.js; increased unit test coverage to 80%.",
      ],
      technologies: [
        "Next.js",
        "React.js",
        "Material UI",
        "Redux",
        "TypeScript",
        "Jest",
        "Selenium",
      ],
    },
  ] satisfies ExperienceEntry[],
  education: {
    school: "Punjab University (PUCIT)",
    degree: "BS (Hons.) Computer Science",
    period: "Oct 2015 – June 2019",
    cgpa: "3.89",
    honors: [
      "Principal List winner in all 8 semesters",
      "2nd position in university",
    ],
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
      title: "Valorx Google Extension",
      description:
        "Salesforce bulk editor with AG Grid, excel-like updates, custom version control, and direct Salesforce sync.",
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
