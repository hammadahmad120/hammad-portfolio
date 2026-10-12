import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import type { ProjectEntry } from "@/lib/site";

export function ProjectCard({
  title,
  description,
  href,
  github,
  note,
  tags,
}: ProjectEntry) {
  const hasLinks = Boolean(href || github || note);

  return (
    <article className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-accent-800">
      <div
        className="mb-4 h-1 w-10 rounded-full bg-gradient-to-r from-accent-500 to-accent-300"
        aria-hidden="true"
      />
      <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      {tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}
      {hasLinks ? (
        <div className="mt-5 flex items-center gap-4 text-sm font-medium">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent-700 underline-offset-4 hover:underline dark:text-accent-400"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live
            </a>
          ) : null}
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              Code
            </a>
          ) : null}
          {note ? (
            <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
              {note}
            </span>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
