import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { site, type ProjectEntry } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: `AI products and selected professional and personal builds by ${site.shortName}.`,
};

const { featuredProduct } = site;
const projects: ProjectEntry[] = [...site.projects];
const aiProjects = projects.filter((project) => project.category === "ai");
const webProjects = projects.filter((project) => project.category === "web");

export default function ProjectsPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          Web platforms, tools, and AI products from professional and personal work.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="font-display text-xs font-semibold uppercase tracking-wider text-accent-700 dark:text-accent-400">
          AI-powered products
        </h2>
      <article className="relative overflow-hidden rounded-2xl border border-accent-200/70 bg-gradient-to-br from-accent-50 via-white to-white p-6 sm:p-8 dark:border-accent-900/50 dark:from-accent-950/40 dark:via-zinc-950 dark:to-zinc-950">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-700 dark:text-accent-400">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Featured · {featuredProduct.role} · {featuredProduct.period}
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {featuredProduct.name}
          <span className="text-zinc-400 dark:text-zinc-600"> — </span>
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            {featuredProduct.tagline}
          </span>
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-zinc-600 dark:text-zinc-400">
          {featuredProduct.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {featuredProduct.tech.map((item) => (
            <Badge key={item} className="text-[11px]">
              {item}
            </Badge>
          ))}
        </div>
        <Link
          href={`/projects/${featuredProduct.slug}`}
          className={cn(buttonVariants({ size: "sm" }), "mt-6 gap-2")}
        >
          Read the case study
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </article>
        {aiProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {aiProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-6">
        <h2 className="font-display text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Web platforms & tools
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {webProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
