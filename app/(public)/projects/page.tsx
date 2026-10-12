import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Featured professional and personal projects by Hammad Ahmad.",
};

export default function ProjectsPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Work spanning telco platforms, SaaS, welfare systems, and research tooling.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {site.projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
