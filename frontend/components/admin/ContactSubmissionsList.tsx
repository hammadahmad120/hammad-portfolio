"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAdminContactSubmissions } from "@/lib/api";
import { fadeUp, sectionTransition, staggerContainer } from "@/lib/motion";

const DAY_OPTIONS = [
  { value: 7, label: "Last 7 days" },
  { value: 14, label: "Last 14 days" },
  { value: 30, label: "Last 30 days" },
  { value: 60, label: "Last 60 days" },
  { value: 90, label: "Last 90 days" },
  { value: 180, label: "Last 180 days" },
  { value: 365, label: "Last 365 days" },
] as const;

const PAGE_SIZE = 10;

const STATUS_STYLES: Record<string, string> = {
  unread:
    "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  read: "border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
  replied:
    "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusLabel(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function ContactSubmissionsList() {
  const prefersReducedMotion = useReducedMotion();
  const [days, setDays] = useState(30);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminContactSubmissions(days, page, PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [days]);

  const totalPages = data?.totalPages ?? 1;
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <motion.section
      initial={prefersReducedMotion ? false : "hidden"}
      animate="visible"
      variants={staggerContainer}
      className="space-y-6"
    >
      <motion.div
        variants={fadeUp}
        transition={sectionTransition}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contact</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Messages submitted through the public contact form.
          </p>
        </div>

        <div className="w-full space-y-2 sm:w-56">
          <Label htmlFor="contact-days">Time range</Label>
          <select
            id="contact-days"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="flex h-10 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus-visible:ring-zinc-500"
          >
            {DAY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {isLoading ? (
        <motion.div variants={fadeUp} transition={sectionTransition} className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
            />
          ))}
        </motion.div>
      ) : null}

      {isError ? (
        <motion.div
          variants={fadeUp}
          transition={sectionTransition}
          className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40"
        >
          <p className="text-sm text-red-700 dark:text-red-300">
            {error instanceof Error
              ? error.message
              : "Failed to load contact submissions"}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => void refetch()}
          >
            Try again
          </Button>
        </motion.div>
      ) : null}

      {!isLoading && !isError && data?.items.length === 0 ? (
        <motion.div
          variants={fadeUp}
          transition={sectionTransition}
          className="rounded-lg border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700"
        >
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No submissions in the last {days} day{days === 1 ? "" : "s"}.
          </p>
        </motion.div>
      ) : null}

      {!isLoading && !isError && data && data.items.length > 0 ? (
        <motion.div variants={fadeUp} transition={sectionTransition} className="space-y-4">
          {isFetching && !isLoading ? (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Refreshing…</p>
          ) : null}

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {data.total} submission{data.total === 1 ? "" : "s"} in the last{" "}
            {data.days} day{data.days === 1 ? "" : "s"}
          </p>

          <ul className="divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
            {data.items.map((submission) => (
              <li key={submission.id} className="space-y-3 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">
                      {submission.name}
                    </p>
                    <a
                      href={`mailto:${submission.email}`}
                      className="text-sm text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
                    >
                      {submission.email}
                    </a>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      {formatDate(submission.created_at)}
                    </p>
                  </div>
                  <Badge
                    className={
                      STATUS_STYLES[submission.status] ??
                      STATUS_STYLES.read
                    }
                  >
                    {statusLabel(submission.status)}
                  </Badge>
                </div>
                <p className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
                  {submission.message}
                </p>
              </li>
            ))}
          </ul>

          {totalPages > 1 ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Page {data.page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!canPrev || isFetching}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!canNext || isFetching}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </motion.section>
  );
}
