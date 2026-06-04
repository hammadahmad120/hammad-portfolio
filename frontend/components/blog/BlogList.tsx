"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { useBlogsInfinite, useTags } from "@/lib/api";
import { fadeUp, sectionTransition, staggerContainer } from "@/lib/motion";

const PAGE_SIZE = 12;

function BlogListSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-9 w-24 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-5 w-full max-w-md animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
          />
        ))}
      </div>
    </div>
  );
}

export function BlogList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();

  const activeTag = searchParams.get("tag")?.trim() || undefined;

  const {
    data: tagsData,
    isLoading: tagsLoading,
    isError: tagsError,
  } = useTags();

  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useBlogsInfinite(PAGE_SIZE, activeTag);

  const tags = tagsData ?? [];
  const activeTagName = tags.find((tag) => tag.slug === activeTag)?.name;

  const setTagFilter = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("tag", slug);
    } else {
      params.delete("tag");
    }
    const query = params.toString();
    router.push(query ? `/blog?${query}` : "/blog", { scroll: false });
  };

  const pages = data?.pages ?? [];
  const items = pages.flatMap((page) => page.items);
  const total = pages[0]?.total ?? 0;

  const showTagFilters = tagsLoading || tags.length > 0;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {activeTagName
            ? `Posts tagged “${activeTagName}”.`
            : "Articles on engineering, projects, and things I am learning."}
        </p>
      </div>

      {showTagFilters ? (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Filter by tag
          </p>
          {tagsLoading ? (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 w-20 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800"
                />
              ))}
            </div>
          ) : tagsError ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Tags could not be loaded.
            </p>
          ) : (
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter posts by tag"
            >
              <Button
                type="button"
                size="sm"
                variant={!activeTag ? "default" : "outline"}
                aria-pressed={!activeTag}
                onClick={() => setTagFilter(null)}
              >
                All
              </Button>
              {tags.map((tag) => {
                const isActive = activeTag === tag.slug;
                return (
                  <Button
                    key={tag.slug}
                    type="button"
                    size="sm"
                    variant={isActive ? "default" : "outline"}
                    aria-pressed={isActive}
                    onClick={() =>
                      setTagFilter(isActive ? null : tag.slug)
                    }
                  >
                    {tag.name}
                  </Button>
                );
              })}
            </div>
          )}
          {activeTag && !tagsLoading ? (
            <Link
              href="/blog"
              className="text-sm text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
            >
              Clear filter
            </Link>
          ) : null}
        </div>
      ) : null}

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
        <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            {activeTag
              ? activeTagName
                ? `No published posts tagged “${activeTagName}”.`
                : "No published posts for this tag."
              : "No published blogs yet. Check back soon."}
          </p>
          {activeTag ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setTagFilter(null)}
            >
              View all posts
            </Button>
          ) : null}
        </div>
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
              {total === 1 ? "post" : "posts"}
              {activeTagName ? ` tagged “${activeTagName}”` : ""}
            </p>
          ) : null}
        </motion.div>
      ) : null}
    </div>
  );
}

export { BlogListSkeleton };
