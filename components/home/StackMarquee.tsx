import type { ComponentType } from "react";
import Image from "next/image";
import {
  ArrowLeftRight,
  Binary,
  Bot,
  Braces,
  Brain,
  ChartLine,
  Cpu,
  DatabaseZap,
  ListOrdered,
  MessageSquareText,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { site, type ConceptIcon, type StackItem } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const conceptIcons: Record<
  ConceptIcon,
  ComponentType<{ className?: string }>
> = {
  rag: DatabaseZap,
  llm: Brain,
  agents: Bot,
  toolCalling: Wrench,
  prompt: MessageSquareText,
  embeddings: Binary,
  hybridSearch: Search,
  reranking: ListOrdered,
  guardrails: ShieldCheck,
  evaluation: ChartLine,
  structured: Braces,
  rest: ArrowLeftRight,
  chip: Cpu,
};

function Pill({ name, logo, dark, concept }: StackItem) {
  const Icon = concept ? conceptIcons[concept] : null;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-sm font-medium text-zinc-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
      {logo ? (
        <Image
          src={`/logos/tech/${logo}.svg`}
          alt=""
          width={20}
          height={20}
          unoptimized
          className={cn(
            "h-5 w-5",
            dark === "invert" && "dark:invert",
            dark === "white" && "dark:brightness-0 dark:invert",
          )}
        />
      ) : Icon ? (
        <Icon
          className="h-5 w-5 text-accent-600 dark:text-accent-400"
          aria-hidden="true"
        />
      ) : null}
      {name}
    </span>
  );
}

/** Seconds per item, so every row scrolls at the same speed regardless of length. */
const SECONDS_PER_ITEM = 4;

/**
 * Three looping rows of stack pills. Each list is rendered twice and the track
 * slides by exactly half its width, so the loop is seamless. Pauses on hover and
 * stops under reduced motion. Duration is set inline because it depends on the
 * item count (same approach as the hero's animation delays).
 */
export function StackMarquee() {
  return (
    <section id="stack" className="scroll-mt-20 space-y-8">
      <Reveal>
        <SectionHeading
          eyebrow="Stack"
          title="Tools I ship with"
          description="Frameworks, platforms, and AI tooling I use to build and run production software."
        />
      </Reveal>
      <div className="space-y-6">
        {site.stackRows.map((row, index) => (
          <Reveal key={row.name} delay={index * 0.05} className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {row.name}
              </h3>
              {row.badge ? (
                <Badge className="border-accent-200 bg-accent-50 text-[11px] text-accent-800 dark:border-accent-900 dark:bg-accent-950/50 dark:text-accent-300">
                  {row.badge}
                </Badge>
              ) : null}
            </div>
            <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <ul
                className={cn(
                  "flex w-max motion-reduce:animate-none group-hover:[animation-play-state:paused]",
                  row.direction === "left"
                    ? "animate-marquee-left"
                    : "animate-marquee-right",
                )}
                aria-label={row.name}
                style={{
                  animationDuration: `${row.items.length * SECONDS_PER_ITEM}s`,
                }}
              >
                {[0, 1].map((copy) =>
                  row.items.map((item) => (
                    <li
                      key={`${copy}-${item.name}`}
                      className="pr-3"
                      aria-hidden={copy === 1 ? true : undefined}
                    >
                      <Pill {...item} />
                    </li>
                  )),
                )}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
