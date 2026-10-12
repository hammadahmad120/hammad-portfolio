import Link from "next/link";
import {
  ArrowRight,
  Award,
  Check,
  GraduationCap,
  Languages,
  Mail,
  Sparkles,
} from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Hero } from "./Hero";
import { InstantBotPreview } from "./InstantBotPreview";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const { featuredProduct } = site;

export function HomePage() {
  return (
    <div className="space-y-24 pb-8 sm:space-y-32">
      <Hero />

      {/* Two tracks */}
      <section className="space-y-8">
        <Reveal>
          <SectionHeading
            eyebrow="What I do"
            title="Two tracks, one engineer"
            description="Years of production web engineering, and the AI product work now built on top of it."
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {site.tracks.map((track, index) => {
            const isAi = index === 1;
            return (
              <Reveal key={track.name} delay={index * 0.08} className="h-full">
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border bg-white p-6 sm:p-7 dark:bg-zinc-900/40",
                    isAi
                      ? "border-accent-200/80 dark:border-accent-900/60"
                      : "border-zinc-200 dark:border-zinc-800"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold">{track.name}</h3>
                    <Badge
                      className={cn(
                        isAi &&
                          "border-accent-200 bg-accent-50 text-accent-800 dark:border-accent-900 dark:bg-accent-950/50 dark:text-accent-300"
                      )}
                    >
                      {track.period}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {track.pitch}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {track.items.map((item) => (
                      <Badge key={item} className="text-[11px]">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Proof
                  </p>
                  <ul className="mt-2 flex-1 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    {track.proof.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-400"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={track.cta.href}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent-700 underline-offset-4 hover:underline dark:text-accent-400"
                  >
                    {track.cta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Featured product */}
      <Reveal as="section">
        <div className="relative overflow-hidden rounded-2xl border border-accent-200/70 bg-gradient-to-br from-accent-50 via-white to-white p-6 sm:p-10 dark:border-accent-900/50 dark:from-accent-950/40 dark:via-zinc-950 dark:to-zinc-950">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-700 dark:text-accent-400">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Featured product · {featuredProduct.period}
              </p>
              <div className="space-y-2">
                <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {featuredProduct.name}
                </h2>
                <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                  {featuredProduct.tagline}
                </p>
              </div>
              <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                {featuredProduct.description}
              </p>
              <ul className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                {featuredProduct.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-400"
                      aria-hidden="true"
                    />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {featuredProduct.tech.map((item) => (
                  <Badge key={item} className="text-[11px]">
                    {item}
                  </Badge>
                ))}
              </div>
              <Link
                href={`/projects/${featuredProduct.slug}`}
                className={cn(buttonVariants(), "gap-2")}
              >
                Read the case study
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <InstantBotPreview />
          </div>
        </div>
      </Reveal>

      {/* Experience */}
      <section id="experience" className="scroll-mt-24 space-y-8">
        <Reveal>
          <SectionHeading
            eyebrow="Career"
            title="Work experience"
            description="Roles across government, telecom, SaaS, and e-learning."
          />
        </Reveal>
        <ol className="relative space-y-10 border-l border-zinc-200 pl-8 dark:border-zinc-800">
          {site.experience.map((job) => {
            const isCurrent = job.period.endsWith("Present");
            return (
              <Reveal key={`${job.company}-${job.period}`} as="li" className="relative">
                <span
                  className={cn(
                    "absolute -left-[2.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-zinc-950",
                    isCurrent
                      ? "bg-accent-500 ring-4 ring-accent-500/20"
                      : "bg-zinc-300 dark:bg-zinc-600"
                  )}
                  aria-hidden="true"
                />
                <div className="space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {job.role}
                      <span className="text-zinc-400 dark:text-zinc-600"> · </span>
                      {job.company}
                    </h3>
                    <p className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {job.period}
                      {isCurrent ? (
                        <Badge className="border-accent-200 bg-accent-50 text-accent-800 dark:border-accent-900 dark:bg-accent-950/50 dark:text-accent-300">
                          Current
                        </Badge>
                      ) : null}
                    </p>
                  </div>
                  {job.project ? (
                    <p className="text-sm font-medium text-accent-700 dark:text-accent-400">
                      {job.project}
                    </p>
                  ) : null}
                  <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {job.highlights.map((item) => (
                      <li key={item.slice(0, 48)}>{item}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} className="text-[11px]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </section>

      {/* Skills */}
      <section className="space-y-8">
        <Reveal>
          <SectionHeading
            eyebrow="Stack"
            title="Skills & tools"
            description="A production web stack, plus the AI tooling I now build products with."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {site.skills.map((group, index) => (
            <Reveal key={group.name} delay={index * 0.05}>
              <div
                className={cn(
                  "h-full rounded-xl border bg-white p-5 dark:bg-zinc-900/40",
                  group.badge
                    ? "border-accent-200/80 dark:border-accent-900/60"
                    : "border-zinc-200 dark:border-zinc-800"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-accent-700 dark:text-accent-400">
                    {group.name}
                  </h3>
                  {group.badge ? (
                    <Badge className="border-accent-200 bg-accent-50 text-[11px] text-accent-800 dark:border-accent-900 dark:bg-accent-950/50 dark:text-accent-300">
                      {group.badge}
                    </Badge>
                  ) : null}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Work"
              title="Selected projects"
              description="Web platforms, tools, and AI products — professional and personal."
            />
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent-700 underline-offset-4 hover:underline dark:text-accent-400"
            >
              See all
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {site.projects.slice(0, 4).map((project, index) => (
            <Reveal key={project.title} delay={index * 0.05} className="h-full">
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education & achievements */}
      <section className="grid gap-6 md:grid-cols-2">
        <Reveal className="h-full">
          <div className="h-full rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-700 dark:bg-accent-950/50 dark:text-accent-400">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold">Education</h3>
            </div>
            <div className="mt-4 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <p className="font-medium text-zinc-900 dark:text-zinc-50">
                {site.education.degree}
              </p>
              <p>{site.education.school}</p>
              <p className="font-mono text-xs">
                {site.education.period} · CGPA {site.education.cgpa}
              </p>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
              {site.education.honors.map((honor) => (
                <li key={honor} className="flex gap-2">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-400"
                    aria-hidden="true"
                  />
                  {honor}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="h-full">
          <div className="h-full rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-700 dark:bg-accent-950/50 dark:text-accent-400">
                <Award className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold">Achievements</h3>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
              {site.achievements.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-400"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              <Languages className="h-4 w-4 text-zinc-500" aria-hidden="true" />
              Languages
            </div>
            <ul className="mt-2 flex flex-wrap gap-2">
              {site.languages.map(({ name, level }) => (
                <li key={name}>
                  <Badge>
                    {name} · {level}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <Reveal as="section">
        <div className="relative isolate overflow-hidden rounded-2xl bg-zinc-900 px-6 py-14 text-center text-zinc-50 sm:px-12 dark:bg-zinc-900">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 -z-10 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/30 blur-3xl"
          />
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s build something together.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-300">
            Need a senior full-stack engineer, an AI feature inside your product, or
            an AI product built end to end? I do all three.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className={buttonVariants({ size: "lg" })}>
              Send a message
            </Link>
            <a
              href={`mailto:${site.email}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2 border-zinc-700 bg-transparent text-zinc-50 hover:border-zinc-500 hover:bg-zinc-800"
              )}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {site.email}
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
