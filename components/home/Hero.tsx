import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Layers, Mail, MapPin, Sparkles } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Email: Mail,
};

/** CSS-driven entrance: visible without JS, staggered via animation-delay. */
const enter = "animate-fade-up motion-reduce:animate-none";
const delay = (step: number) => ({ animationDelay: `${step * 90}ms` });

function FloatingBadge({
  icon: Icon,
  title,
  subtitle,
  className,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute hidden items-center gap-3 rounded-xl border border-white/60 bg-white/85 px-3.5 py-2.5 shadow-lg shadow-zinc-900/10 backdrop-blur-md sm:flex dark:border-zinc-700/60 dark:bg-zinc-900/85 dark:shadow-black/40",
        className
      )}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-600 text-white dark:bg-accent-500 dark:text-zinc-950">
        <Icon className="h-4 w-4" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </span>
        <span className="block text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</span>
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate pt-6 sm:pt-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-28 bottom-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-[10%] top-0 h-[26rem] w-[36rem] rounded-full bg-accent-400/20 blur-3xl dark:bg-accent-500/10" />
        <div className="absolute right-[-10%] top-24 h-[22rem] w-[28rem] rounded-full bg-emerald-300/20 blur-3xl dark:bg-accent-700/10" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
        <div className="lg:pb-12">
          <div className={enter} style={delay(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-medium text-accent-800 dark:border-accent-900 dark:bg-accent-950/50 dark:text-accent-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
              </span>
              {site.availability}
            </span>
          </div>

          <div className={cn(enter, "mt-6 space-y-5")} style={delay(1)}>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {site.name} · {site.title}
            </p>
            <h1 className="max-w-3xl text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-[2.75rem] lg:leading-[1.12]">
              7+ years shipping production web platforms. Now building{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-accent-600 to-accent-400 bg-clip-text text-transparent dark:from-accent-400 dark:to-accent-200">
                AI-powered products
              </span>{" "}
              on top of that.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
              {site.tagline}
            </p>
          </div>

          <p
            className={cn(
              enter,
              "mt-5 inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400"
            )}
            style={delay(2)}
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {site.location}
          </p>

          <div
            className={cn(enter, "mt-8 flex flex-wrap items-center gap-3")}
            style={delay(3)}
          >
            <Link href="/projects" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
              View projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Résumé
            </a>
            <ul className="flex items-center gap-1 sm:ml-2">
              {site.social.map(({ label, href }) => {
                const Icon = socialIcons[label];
                const external = !href.startsWith("mailto:");
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      title={label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-md text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                    >
                      {Icon ? <Icon className="h-5 w-5" /> : label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Portrait: cutout stands on the page, bottom edge flush with the stats strip */}
        <div
          className={cn(
            enter,
            "relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:mx-0 lg:max-w-[500px] lg:justify-self-end"
          )}
          style={delay(2)}
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-[-15%] bottom-0 top-[18%] -z-10 rounded-full bg-gradient-to-t from-accent-400/35 to-accent-200/10 blur-3xl dark:from-accent-500/25 dark:to-accent-900/5"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[14%] -z-10 h-[72%] w-[72%] -translate-x-1/2 rounded-full border-[10px] border-accent-200/70 dark:border-accent-900/40"
          />
          <Image
            src="/hammad-ahmad-cutout.png"
            alt={site.name}
            width={1151}
            height={1280}
            priority
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 500px"
            className="relative block h-auto w-full drop-shadow-[0_24px_36px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_24px_36px_rgba(0,0,0,0.6)]"
          />

          <FloatingBadge
            icon={Sparkles}
            title="Creator of InstantBot"
            subtitle="AI knowledge-assistant SaaS"
            className="-left-14 top-[22%] lg:-left-24"
          />
          <FloatingBadge
            icon={Layers}
            title="200k+ lines of Next.js"
            subtitle="Lead frontend, Aqari portal"
            className="-right-4 bottom-[18%] lg:-right-8"
          />
        </div>
      </div>

      <dl
        className={cn(
          enter,
          "relative grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800"
        )}
        style={delay(4)}
      >
        {site.stats.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col-reverse gap-1 bg-white px-5 py-5 dark:bg-zinc-950"
          >
            <dt className="text-sm text-zinc-500 dark:text-zinc-400">{label}</dt>
            <dd className="font-display text-3xl font-bold tracking-tight">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
