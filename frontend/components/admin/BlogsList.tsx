"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DeleteBlogDialog } from "@/components/admin/DeleteBlogDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useAdminBlogs,
  useDeleteAdminBlog,
  type AdminBlogPost,
} from "@/lib/api";
import { fadeUp, sectionTransition, staggerContainer } from "@/lib/motion";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function BlogsList() {
  const prefersReducedMotion = useReducedMotion();
  const { data: blogs, isLoading, isError, error, refetch, isFetching } =
    useAdminBlogs();
  const deleteBlog = useDeleteAdminBlog();
  const [blogToDelete, setBlogToDelete] = useState<AdminBlogPost | null>(null);

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;

    try {
      await deleteBlog.mutateAsync(blogToDelete.id);
      toast.success("Blog deleted");
      setBlogToDelete(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete blog";
      toast.error(message);
    }
  };

  return (
    <>
      <motion.section
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
        variants={staggerContainer}
        className="space-y-6"
      >
        <motion.div
          variants={fadeUp}
          transition={sectionTransition}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Blogs</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Create, edit, and publish entries for the public blog.
            </p>
          </div>
          <Link href="/admin/blogs/new">
            <Button type="button">New blog</Button>
          </Link>
        </motion.div>

        {isLoading ? (
          <motion.div variants={fadeUp} transition={sectionTransition} className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-20 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
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
              {error instanceof Error ? error.message : "Failed to load blogs"}
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

        {!isLoading && !isError && blogs?.length === 0 ? (
          <motion.div
            variants={fadeUp}
            transition={sectionTransition}
            className="rounded-lg border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700"
          >
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No blogs yet. Create your first one to get started.
            </p>
            <Link href="/admin/blogs/new" className="mt-4 inline-block">
              <Button type="button">New blog</Button>
            </Link>
          </motion.div>
        ) : null}

        {!isLoading && !isError && blogs && blogs.length > 0 ? (
          <motion.div variants={fadeUp} transition={sectionTransition} className="space-y-3">
            {isFetching && !isLoading ? (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Refreshing…</p>
            ) : null}

            <ul className="divide-y divide-zinc-200 overflow-hidden rounded-lg border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
              {blogs.map((blog) => (
                <li
                  key={blog.id}
                  className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/admin/blogs/${blog.id}`}
                        className="truncate font-medium text-zinc-900 hover:underline dark:text-zinc-50"
                      >
                        {blog.title}
                      </Link>
                      <Badge
                        className={
                          blog.published
                            ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
                            : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300"
                        }
                      >
                        {blog.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                      /blog/{blog.slug}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      Updated {formatDate(blog.updated_at)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Link href={`/admin/blogs/${blog.id}`}>
                      <Button type="button" variant="outline" size="sm">
                        <Pencil className="mr-1.5 h-3.5 w-3.5" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setBlogToDelete(blog)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </motion.section>

      <DeleteBlogDialog
        blog={blogToDelete}
        open={Boolean(blogToDelete)}
        isDeleting={deleteBlog.isPending}
        onConfirm={() => void handleDeleteConfirm()}
        onCancel={() => setBlogToDelete(null)}
      />
    </>
  );
}
