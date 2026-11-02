import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Brain,
  ChartLine,
  Check,
  DatabaseZap,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  McpLogo,
  NestjsLogo,
  NextjsLogo,
  NodejsLogo,
  PostgresqlLogo,
  PythonLogo,
  ReactLogo,
  TypeScriptLogo,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import {
  site,
  type FocusIcon,
  type StackLogo,
  type TrackIcon,
} from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type IconComponent = ComponentType<{ className?: string }>;

const stackLogos: Record<StackLogo, IconComponent> = {
  react: ReactLogo,
  nextjs: NextjsLogo,
  typescript: TypeScriptLogo,
  nodejs: NodejsLogo,
  nestjs: NestjsLogo,
  postgresql: PostgresqlLogo,
};

const trackIcons: Record<TrackIcon, IconComponent> = {
  web: Layers,
  ai: Sparkles,
};

const focusIcons: Record<FocusIcon, IconComponent> = {
  rag: DatabaseZap,
  llm: Brain,
  agent: Bot,
  mcp: McpLogo,
  guardrails: ShieldCheck,
  evals: ChartLine,
  python: PythonLogo,
  pgvector: PostgresqlLogo,
};

/**
 * Eight points on the ring, 45° apart, clockwise from 3 o'clock. Pills stay put
 * (labelled pills collide if they orbit on a ring this small); the dashed ring
 * itself spins for motion.
 */
const ringPositions = [
  "left-full top-1/2",
  "left-[85.36%] top-[85.36%]",
  "left-1/2 top-full",
  "left-[14.64%] top-[85.36%]",
  "left-0 top-1/2",
  "left-[14.64%] top-[14.64%]",
  "left-1/2 top-0",
  "left-[85.36%] top-[14.64%]",
] as const;

/** Renders `**text**` spans in content strings as bold. */
function emphasise(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <strong
        key={index}
        className="font-semibold text-zinc-900 dark:text-zinc-50"
      >
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

const tile =
  "flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900/40";

const tileTitle =
  "font-display text-xs font-semibold uppercase tracking-wider text-accent-700 dark:text-accent-400";

/**
 * Content-width panel that scrolls over the pinned hero (see HomePage). The
 * border, shadow and near-opaque background make it read as a sheet sliding up
 * in front of the blurred hero rather than a page swap.
 */
export function AboutBento() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 scroll-mt-20 space-y-8 rounded-3xl border border-zinc-200/80 bg-zinc-50/95 p-4 shadow-2xl shadow-zinc-900/10 backdrop-blur-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-950/90 dark:shadow-black/60"
    >
      <Reveal>
        <SectionHeading
          id="about-heading"
          eyebrow="About"
          title="Two tracks, one engineer"
          description="Years of production web engineering, and the AI product work now built on top of it."
        />
      </Reveal>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-12">
        {/* Stats */}
        {site.stats.map(({ value, label, context }, index) => (
          <Reveal
            key={label}
            delay={index * 0.05}
            className="col-span-1 md:col-span-3"
          >
            <div className={cn(tile, "gap-1 p-4 sm:p-5")}>
              <p className="font-display text-3xl font-bold tracking-tight">
                {value}
              </p>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {label}
              </p>
              {context ? (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {context}
                </p>
              ) : null}
            </div>
          </Reveal>
        ))}

        {/* Two tracks */}
        {site.tracks.map((track, index) => {
          const isAi = track.icon === "ai";
          const Icon = trackIcons[track.icon];
          return (
            <Reveal
              key={track.name}
              delay={index * 0.08}
              className="col-span-2 md:col-span-6"
            >
              <div
                className={cn(
                  tile,
                  isAi && "border-accent-200/80 dark:border-accent-900/60",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        isAi
                          ? "bg-accent-50 text-accent-700 dark:bg-accent-950/50 dark:text-accent-400"
                          : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-xl font-semibold">
                      {track.name}
                    </h3>
                  </div>
                  <Badge
                    className={cn(
                      "shrink-0",
                      isAi &&
                        "border-accent-200 bg-accent-50 text-accent-800 dark:border-accent-900 dark:bg-accent-950/50 dark:text-accent-300",
                    )}
                  >
                    {track.period}
                  </Badge>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {emphasise(track.pitch)}
                </p>
                <ul className="mt-5 flex-1 space-y-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                  {track.proof.map(({ name, detail }) => (
                    <li key={name} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                          {name}
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {detail}
                        </p>
                      </div>
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

        {/* Core stack */}
        <Reveal className="col-span-2 md:col-span-6 lg:col-span-4">
          <div className={tile}>
            <h3 className={tileTitle}>Core stack</h3>
            <ul className="mt-4 grid flex-1 grid-cols-3 gap-2">
              {site.coreStack.map(({ name, logo }) => {
                const Logo = stackLogos[logo];
                return (
                  <li
                    key={name}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl bg-zinc-50 px-2 py-4 dark:bg-zinc-900/70"
                  >
                    <Logo className="h-7 w-7" />
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      {name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        {/* Current focus ring */}
        <Reveal delay={0.05} className="col-span-2 md:col-span-6 lg:col-span-4">
          <div
            className={cn(
              tile,
              "border-accent-200/80 dark:border-accent-900/60",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className={tileTitle}>Current focus</h3>
              <Badge className="border-accent-200 bg-accent-50 text-[11px] text-accent-800 dark:border-accent-900 dark:bg-accent-950/50 dark:text-accent-300">
                {site.focusRing.period}
              </Badge>
            </div>
            <div className="flex flex-1 items-center justify-center py-6">
              <div className="relative aspect-square w-52">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 animate-orbit rounded-full border border-dashed border-zinc-300 motion-reduce:animate-none dark:border-zinc-700"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-[16%] rounded-full bg-accent-50 dark:bg-accent-950/40"
                />
                <p className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <Sparkles
                    className="mb-1 h-4 w-4 text-accent-600 dark:text-accent-400"
                    aria-hidden="true"
                  />
                  <span className="w-[62%] text-[11px] font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
                    {site.focusRing.title}
                  </span>
                  <span className="mt-0.5 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                    {site.focusRing.period}
                  </span>
                </p>
                <ul className="absolute inset-0">
                  {site.focusRing.items.map(({ label, icon }, index) => {
                    const Icon = focusIcons[icon];
                    return (
                      <li
                        key={label}
                        className={cn(
                          "absolute -translate-x-1/2 -translate-y-1/2",
                          ringPositions[index % ringPositions.length],
                        )}
                      >
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                          <Icon className="h-3.5 w-3.5 text-accent-600 dark:text-accent-400" />
                          {label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* How I work */}
        <Reveal delay={0.1} className="col-span-2 md:col-span-12 lg:col-span-4">
          <div className={tile}>
            <h3 className={tileTitle}>How I work</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {site.howIWork.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-400"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
