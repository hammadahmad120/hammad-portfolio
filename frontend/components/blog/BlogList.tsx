"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { useBlogsInfinite } from "@/lib/api";
import { fadeUp, sectionTransition, staggerContainer } from "@/lib/motion";

const PAGE_SIZE = 12;

export function BlogList() {
  const prefersReducedMotion = useReducedMotion();
  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useBlogsInfinite(PAGE_SIZE);

  const pages = data?.pages ?? [];
  const items = pages.flatMap((page) => page.items);
  const total = pages[0]?.total ?? 0;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Articles on engineering, projects, and things I am learning.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
            />
          ))}
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/40">
          <p className="text-sm text-red-700 dark:text-red-300">
            {error instanceof Error ? error.message : "Failed to load blogs"}
          </p>
        </div>
      ) : null}

      {!isLoading && !isError && items.length === 0 ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          No published blogs yet. Check back soon.
        </p>
      ) : null}

      {!isLoading && !isError && items.length > 0 ? (
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.ul
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2"
          >
            {items.map((blog) => (
              <motion.li key={blog.id} variants={fadeUp} transition={sectionTransition}>
                <BlogCard
                  slug={blog.slug}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  cover_url={blog.cover_url}
                  publishedAt={blog.published_at}
                  tags={blog.tags.map((t) => t.name)}
                />
              </motion.li>
            ))}
          </motion.ul>

          {hasNextPage ? (
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                disabled={isFetchingNextPage}
                onClick={() => void fetchNextPage()}
              >
                {isFetchingNextPage ? "Loading…" : "Load more"}
              </Button>
            </div>
          ) : null}

          {total > 0 ? (
            <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
              Showing {items.length} of {total} published{" "}
              {total === 1 ? "blog" : "blogs"}
            </p>
          ) : null}
        </motion.div>
      ) : null}
    </div>
  );
}
