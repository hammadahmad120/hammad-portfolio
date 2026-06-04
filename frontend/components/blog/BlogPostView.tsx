"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BlogRenderer } from "@/components/BlogRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/lib/api";
import { fadeUp, sectionTransition } from "@/lib/motion";

type BlogPostViewProps = {
  slug: string;
};

function formatPublishedDate(value: string | null): string | undefined {
  if (!value) return undefined;
  return new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
    new Date(value)
  );
}

function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && /not found/i.test(error.message);
}

export function BlogPostView({ slug }: BlogPostViewProps) {
  const prefersReducedMotion = useReducedMotion();
  const { data: blog, isLoading, isError, error } = useBlog(slug);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-24 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="aspect-[16/9] max-h-[420px] animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-10 w-2/3 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-full animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-4/5 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    );
  }

  if (isError && isNotFoundError(error)) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Blog not found</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This blog may be unpublished or the link is incorrect.
        </p>
        <Link href="/blog">
          <Button type="button" variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Button>
        </Link>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
        <p className="text-sm text-red-600 dark:text-red-400">
          {error instanceof Error ? error.message : "Failed to load blog"}
        </p>
        <Link href="/blog">
          <Button type="button" variant="outline">
            Back to blog
          </Button>
        </Link>
      </div>
    );
  }

  const publishedLabel = formatPublishedDate(blog.published_at);

  return (
    <motion.article
      initial={prefersReducedMotion ? false : "hidden"}
      animate="visible"
      variants={fadeUp}
      transition={sectionTransition}
      className="space-y-8"
    >
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Back to blog
      </Link>

      <header className="space-y-4">
        {blog.cover_url ? (
          <div className="relative aspect-[16/9] max-h-[420px] w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={blog.cover_url}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        ) : null}

        <div className="space-y-3">
          {publishedLabel && blog.published_at ? (
            <time
              dateTime={blog.published_at}
              className="text-sm text-zinc-500 dark:text-zinc-400"
            >
              {publishedLabel}
            </time>
          ) : null}
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {blog.title}
          </h1>
          {blog.excerpt ? (
            <p className="text-lg text-zinc-600 dark:text-zinc-400">{blog.excerpt}</p>
          ) : null}
          {blog.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag.slug}>{tag.name}</Badge>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <BlogRenderer content={blog.content} />
    </motion.article>
  );
}
