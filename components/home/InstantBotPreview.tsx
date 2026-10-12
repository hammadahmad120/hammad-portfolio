import { Bot, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const pipeline = ["Ingest", "Embed", "Hybrid retrieve", "Rerank", "Ground", "Answer"];

/** Decorative mock of the InstantBot chat UI. Illustrative content only. */
export function InstantBotPreview() {
  return (
    <div className="relative" aria-hidden="true">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent-400/20 blur-2xl dark:bg-accent-500/10" />
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-600 text-white dark:bg-accent-500 dark:text-zinc-950">
            <Bot className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-semibold">InstantBot</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Grounded
          </span>
        </div>

        <div className="space-y-3 px-4 py-4 text-sm">
          <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-accent-600 px-3.5 py-2 text-white dark:bg-accent-500 dark:text-zinc-950">
            What is the notice period for contractors?
          </div>
          <div className="max-w-[90%] space-y-2.5 rounded-2xl rounded-bl-sm bg-zinc-100 px-3.5 py-2.5 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            <p>
              Contractors must give <strong>30 days&apos; written notice</strong>.
              Shorter notice needs written approval from the engagement manager.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400">
                <FileText className="h-3 w-3" />
                Contractor-Policy.pdf · p. 4
              </span>
              <span className="inline-flex items-center rounded-md border border-accent-200 bg-accent-50 px-2 py-0.5 text-[11px] font-medium text-accent-800 dark:border-accent-900 dark:bg-accent-950/50 dark:text-accent-300">
                Evidence 0.92
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            {pipeline.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={cn(
                    step === "Ground" &&
                      "font-semibold text-accent-700 dark:text-accent-400"
                  )}
                >
                  {step}
                </span>
                {index < pipeline.length - 1 ? <span>→</span> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
