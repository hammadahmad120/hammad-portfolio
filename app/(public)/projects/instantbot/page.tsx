import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  Database,
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

export const metadata: Metadata = {
  title: `${product.name} — case study`,
  description: product.description,
  openGraph: {
    type: "article",
    title: `${product.name} — ${product.tagline}`,
    description: product.description,
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
          <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">Role</dt>
              <dd className="font-medium">{product.role}</dd>
            </div>
            <div>
              <dt className="text-zinc-500 dark:text-zinc-400">Period</dt>
              <dd className="font-medium">{product.period}</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
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
        <div className="space-y-1">
          <h2 className="font-display text-xl font-semibold">
            Building something similar?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            I am happy to talk through RAG architecture, guardrails, and evaluation.
          </p>
        </div>
        <Link
          href="/contact"
          className={cn(buttonVariants(), "mt-4 gap-2 sm:mt-0")}
        >
          Get in touch
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </article>
  );
}
