"use client";

import type { AdminBlogPost } from "@/lib/api";
import { Button } from "@/components/ui/button";

type DeleteBlogDialogProps = {
  blog: AdminBlogPost | null;
  open: boolean;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteBlogDialog({
  blog,
  open,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteBlogDialogProps) {
  if (!open || !blog) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-blog-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-zinc-950/50"
        aria-label="Close dialog"
        onClick={onCancel}
        disabled={isDeleting}
      />
      <div className="relative w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
        <h2
          id="delete-blog-title"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Delete blog?
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {blog.title}
          </span>{" "}
          will be permanently deleted. This cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" disabled={isDeleting} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
