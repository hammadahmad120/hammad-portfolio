import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  Database,
  Lock,
  type LucideIcon,
  MessageSquare,
  Search,
  ShieldCheck,
} from "lucide-react";
import { InstantBotPreview } from "@/components/home/InstantBotPreview";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { site, type CaseStudyIcon } from "@/lib/site";
import { cn } from "@/lib/utils";

const { featuredProduct: product } = site;

const icons: Record<CaseStudyIcon, LucideIcon> = {
  database: Database,
  shield: ShieldCheck,
  search: Search,
  message: MessageSquare,
  chart: Activity,
};

const walkthrough = [
  {
    src: "/instantbot/01-documents.png",
    width: 1060,
    height: 1009,
    title: "Add knowledge",
    body: "Upload PDFs per tenant. Each document is parsed, chunked, and embedded, with processing status updating live.",
  },
  {
    src: "/instantbot/02-knowledge-assistant.png",
    width: 1426,
    height: 1009,
    title: "Knowledge Assistant answers from the documents",
    body: "A policy question gets a structured, grounded answer with follow-ups. An off-topic question is refused and routed to a human instead of being improvised.",
  },
  {
    src: "/instantbot/03-document-scout.png",
    width: 879,
    height: 1009,
    title: "Document Scout screens against a brief",
    body: "Requirements are extracted from a plain-text brief, each document is scored per requirement with quoted evidence, and the result is an explainable ranked shortlist.",
  },
  {
    src: "/instantbot/04-performance.png",
    width: 1825,
    height: 1009,
    title: "Performance and documentation gaps",
    body: "Answer rate, helpful-response feedback, volume over time, and the questions the knowledge base could not answer, so the owner knows what to document next.",
  },
  {
    src: "/instantbot/05-website-widget.png",
    width: 1248,
    height: 1009,
    title: "Embeddable website chatbot",
    body: "A copy-paste snippet adds the assistant to any site. Test and live keys are scoped to allowed domains and can be rotated or disabled.",
  },
  {
    src: "/instantbot/06-whatsapp.png",
    width: 780,
    height: 1009,
    title: "WhatsApp Business channel",
    body: "Connect a WhatsApp number through the Meta API, choose open or invite-only access, and set per-person and per-day message limits.",
  },
] as const;

export const metadata: Metadata = {
  title: `${product.name} — case study`,
  description: product.description,
  openGraph: {
    type: "article",
    title: `${product.name} — ${product.tagline}`,
    description: product.description,
    images: ["/opengraph-image"],
  },
};

export default function InstantBotCaseStudyPage() {
  return (
    <article className="space-y-16">
      <Link
        href="/projects"
        className="inline-flex items-center text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />
        All projects
      </Link>

      <header className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-700 dark:text-accent-400">
            Case study
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="text-xl font-medium text-zinc-700 dark:text-zinc-300">
            {product.tagline}
          </p>
          <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">Role</dt>
              <dd className="font-medium">{product.role}</dd>
            </div>
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">Products</dt>
              <dd className="font-medium">{product.products.length}</dd>
            </div>
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">Period</dt>
              <dd className="font-medium">{product.period}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-zinc-500 dark:text-zinc-400">Channels</dt>
              <dd className="font-medium">{product.channels.join(", ")}</dd>
            </div>
          </dl>
        </div>
        <InstantBotPreview />
      </header>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold tracking-tight">Overview</h2>
        <p className="max-w-3xl leading-relaxed text-zinc-600 dark:text-zinc-400">
          {product.description}
        </p>
        <blockquote className="max-w-3xl border-l-4 border-accent-400 pl-4 italic text-zinc-700 dark:border-accent-600 dark:text-zinc-300">
          {product.caseStudy.problem}
        </blockquote>
      </section>

      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Two products, one platform
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {product.products.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-accent-200/70 bg-accent-50/40 p-5 dark:border-accent-900/50 dark:bg-accent-950/20"
            >
              <h3 className="font-display text-base font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Product walkthrough
          </h2>
          <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-400">
            Screenshots from the internal validation build. Tenant names, keys, and
            personal details are blurred.
          </p>
        </div>
        <ol className="space-y-10">
          {walkthrough.map((step, index) => (
            <li key={step.src} className="space-y-4">
              <div className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-700 font-display text-sm font-semibold text-white dark:bg-accent-500 dark:text-zinc-950">
                  {index + 1}
                </span>
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                  <p className="max-w-3xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {step.body}
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <Image
                  src={step.src}
                  alt={`InstantBot screenshot: ${step.title}`}
                  width={step.width}
                  height={step.height}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="h-auto w-full"
                />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          How it works
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {product.caseStudy.sections.map((section) => {
            const Icon = icons[section.icon];
            return (
              <div
                key={section.title}
                className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-700 dark:bg-accent-950/50 dark:text-accent-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-base font-semibold">
                    {section.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {section.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold tracking-tight">Outcomes</h2>
          <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
            {product.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-400"
                  aria-hidden="true"
                />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold tracking-tight">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {product.tech.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:flex sm:items-center sm:justify-between sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:text-zinc-300 dark:ring-zinc-800">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="space-y-1">
            <h2 className="font-display text-xl font-semibold">
              Private repository, access available on request
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              The source and full commit history are private. Send me your GitHub
              username and I will grant read access, or ask for a live walkthrough.
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className={cn(buttonVariants(), "mt-5 shrink-0 gap-2 sm:ml-6 sm:mt-0")}
        >
          Request access
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </article>
  );
}
