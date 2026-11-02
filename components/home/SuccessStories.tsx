import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * One story per product: composite image on one side, what the product is and
 * one headline result on the other, sides alternating. Deliberately lean: the
 * full accomplishment bullets and stack live in the Experience timeline.
 * Images are 3200×2000 blueprint composites (see scripts/stories).
 */
export function SuccessStories() {
  return (
    <section className="space-y-10">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Work"
            title="Success stories"
            description="More products I built or led, and the one result each is known for."
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent-700 underline-offset-4 hover:underline dark:text-accent-400"
          >
            See all projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>

      <ol className="space-y-14 sm:space-y-20">
        {site.stories.map((story, index) => {
          const flip = index % 2 === 1;
          const external = story.href?.startsWith("http");
          return (
            <Reveal key={story.slug} as="li">
              <article className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl border border-zinc-200 shadow-xl shadow-zinc-900/10 dark:border-zinc-800 dark:shadow-black/50",
                    flip && "lg:order-2",
                  )}
                >
                  <Image
                    src={story.image}
                    alt={`${story.name}: ${story.tagline}`}
                    width={3200}
                    height={2000}
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="block h-auto w-full"
                  />
                </div>

                <div className={cn("space-y-4", flip && "lg:order-1")}>
                  <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {story.context}
                  </p>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {story.name}
                    </h3>
                    <p className="text-base font-medium text-zinc-700 dark:text-zinc-300">
                      {story.tagline}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {story.description}
                  </p>
                  <p className="flex gap-2.5 rounded-xl border border-accent-200/80 bg-accent-50/60 px-4 py-3 text-sm font-medium text-zinc-900 dark:border-accent-900/60 dark:bg-accent-950/30 dark:text-zinc-50">
                    <Sparkles
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-400"
                      aria-hidden="true"
                    />
                    <span>{story.highlight}</span>
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {story.href ? (
                      external ? (
                        <a
                          href={story.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 underline-offset-4 hover:underline dark:text-accent-400"
                        >
                          <ExternalLink
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                          {story.linkLabel ?? "Live site"}
                        </a>
                      ) : (
                        <Link
                          href={story.href}
                          className="inline-flex items-center gap-1 text-sm font-medium text-accent-700 underline-offset-4 hover:underline dark:text-accent-400"
                        >
                          {story.linkLabel ?? "Read more"}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      )
                    ) : null}
                    {story.note ? (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {story.note}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
