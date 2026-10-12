import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { ProjectEntry } from "@/lib/site";

export type Project = ProjectEntry;

export function ProjectCard({ title, description, href, tags }: Project) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <CardTitle>{title}</CardTitle>
        {href ? (
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50"
            aria-hidden
          />
        ) : null}
      </div>
      <CardDescription className="mt-2">{description}</CardDescription>
      {tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block transition hover:opacity-95"
      >
        <Card className="h-full transition group-hover:border-zinc-300 dark:group-hover:border-zinc-600">
          {content}
        </Card>
      </a>
    );
  }

  return <Card className="h-full">{content}</Card>;
}
