"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { fadeUp, sectionTransition, staggerContainer } from "@/lib/motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

export function HomePage() {
  const prefersReducedMotion = useReducedMotion();

  /** initial={false} keeps content visible on first load (SSR/hydration-safe). */
  const sectionMotion = prefersReducedMotion
    ? { initial: false as const }
    : { initial: false as const, animate: "visible" as const };

  return (
    <div className="space-y-20 pb-8 sm:space-y-24">
      <motion.section
        variants={staggerContainer}
        {...sectionMotion}
        className="relative space-y-8"
      >
        <motion.div variants={fadeUp} transition={sectionTransition}>
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {site.title}
          </p>
        </motion.div>

        <motion.div variants={fadeUp} transition={sectionTransition} className="space-y-4">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="text-zinc-900 dark:text-zinc-50">{site.shortName}</span>
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
            {site.tagline}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={sectionTransition}
          className="flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden />
            {site.location}
          </span>
          <span className="hidden text-zinc-300 sm:inline dark:text-zinc-700">|</span>
          <span>{site.yearsExperience} years experience</span>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={sectionTransition}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/projects"
            className={cn(buttonVariants({ size: "lg" }), "gap-2")}
          >
            View projects
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/contact"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Get in touch
          </Link>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          transition={sectionTransition}
          className="flex flex-wrap gap-3"
        >
          {site.social.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className={cn(
                  "inline-flex items-center rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.section
        variants={staggerContainer}
        {...sectionMotion}
        className="space-y-6"
      >
        <motion.div variants={fadeUp} transition={sectionTransition}>
          <SectionHeading
            eyebrow="About"
            title="Building reliable full-stack products"
            description="Summary from my professional background."
          />
        </motion.div>
        <motion.ul
          variants={staggerContainer}
          className="space-y-3 text-zinc-600 dark:text-zinc-400"
        >
          {site.summary.map((paragraph) => (
            <motion.li
              key={paragraph.slice(0, 40)}
              variants={fadeUp}
              transition={sectionTransition}
              className="flex gap-3 leading-relaxed"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"
                aria-hidden
              />
              <span>{paragraph}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      <motion.section
        variants={staggerContainer}
        {...sectionMotion}
        className="space-y-8"
      >
        <motion.div variants={fadeUp} transition={sectionTransition}>
          <SectionHeading
            eyebrow="Stack"
            title="Skills & tools"
            description="Technologies I use day to day and others I've worked with."
          />
        </motion.div>
        <div className="grid gap-8 sm:grid-cols-2">
          <motion.div variants={fadeUp} transition={sectionTransition} className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Proficient
            </h3>
            <div className="flex flex-wrap gap-2">
              {site.skills.proficient.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} transition={sectionTransition} className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Familiar
            </h3>
            <div className="flex flex-wrap gap-2">
              {site.skills.familiar.map((skill) => (
                <Badge
                  key={skill}
                  className="border-zinc-300 text-zinc-600 dark:border-zinc-600 dark:text-zinc-400"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={staggerContainer}
        {...sectionMotion}
        className="space-y-8"
      >
        <motion.div variants={fadeUp} transition={sectionTransition}>
          <SectionHeading
            eyebrow="Career"
            title="Work experience"
            description="Recent roles across telco, SaaS, and e-learning."
          />
        </motion.div>
        <ol className="relative space-y-8 border-l border-zinc-200 pl-6 dark:border-zinc-800">
          {site.experience.map((job) => (
            <motion.li
              key={`${job.company}-${job.period}`}
              variants={fadeUp}
              transition={sectionTransition}
              className="relative"
            >
              <span
                className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-zinc-900 dark:border-zinc-950 dark:bg-zinc-50"
                aria-hidden
              />
              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {job.role} · {job.company}
                    </p>
                    {job.project ? (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {job.project}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{job.period}</p>
                </div>
                <ul className="list-disc space-y-1.5 pl-4 text-sm text-zinc-600 dark:text-zinc-400">
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
            </motion.li>
          ))}
        </ol>
      </motion.section>

      <motion.section
        variants={staggerContainer}
        {...sectionMotion}
        className="space-y-8"
      >
        <motion.div
          variants={fadeUp}
          transition={sectionTransition}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured projects"
            description="Selected work from professional and personal builds."
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-50"
          >
            See all
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2">
          {site.projects.slice(0, 4).map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              transition={sectionTransition}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={staggerContainer}
        {...sectionMotion}
        className="grid gap-6 sm:grid-cols-2"
      >
        <motion.div variants={fadeUp} transition={sectionTransition}>
          <Card className="h-full">
            <CardTitle>Education</CardTitle>
            <CardDescription className="mt-3 space-y-2">
              <p className="font-medium text-zinc-900 dark:text-zinc-50">
                {site.education.degree}
              </p>
              <p>{site.education.school}</p>
              <p>
                {site.education.period} · CGPA {site.education.cgpa}
              </p>
              <ul className="list-disc space-y-1 pl-4 pt-2 text-zinc-600 dark:text-zinc-400">
                {site.education.honors.map((honor) => (
                  <li key={honor}>{honor}</li>
                ))}
              </ul>
            </CardDescription>
          </Card>
        </motion.div>
        <motion.div variants={fadeUp} transition={sectionTransition}>
          <Card className="h-full">
            <CardTitle>Achievements & languages</CardTitle>
            <CardDescription className="mt-3 space-y-4">
              <ul className="list-disc space-y-1 pl-4">
                {site.achievements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div>
                <p className="mb-2 font-medium text-zinc-900 dark:text-zinc-50">Languages</p>
                <ul className="space-y-1">
                  {site.languages.map(({ name, level }) => (
                    <li key={name}>
                      {name} — {level}
                    </li>
                  ))}
                </ul>
              </div>
            </CardDescription>
          </Card>
        </motion.div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        {...sectionMotion}
        transition={sectionTransition}
      >
        <Card className="flex flex-col items-start gap-4 bg-zinc-50 dark:bg-zinc-900/50 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle>Let&apos;s work together</CardTitle>
            <CardDescription>
              Open to senior full-stack roles, consulting, and interesting product work.
            </CardDescription>
          </div>
          <Link href="/contact" className={buttonVariants({ size: "lg" })}>
            Send a message
          </Link>
        </Card>
      </motion.section>
    </div>
  );
}
