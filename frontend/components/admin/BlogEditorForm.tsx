"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { Editor } from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useAdminBlog,
  useCreateAdminBlog,
  useUpdateAdminBlog,
  useUploadImage,
} from "@/lib/api";
import { fadeUp, sectionTransition } from "@/lib/motion";
import { BlogPostSchema, EMPTY_TIPTAP_DOC, type BlogPostInput } from "@/lib/schemas";
import { slugify } from "@/lib/slugify";

type BlogEditorFormProps = {
  blogId: string;
};

type BlogFormValues = BlogPostInput;

export function BlogEditorForm({ blogId }: BlogEditorFormProps) {
  const router = useRouter();
  const isNew = blogId === "new";
  const prefersReducedMotion = useReducedMotion();
  const slugManuallyEdited = useRef(false);

  const { data: existingBlog, isLoading, isError } = useAdminBlog(isNew ? null : blogId);
  const createBlog = useCreateAdminBlog();
  const updateBlog = useUpdateAdminBlog();
  const uploadImage = useUploadImage();
  const coverInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      cover_url: "",
      content: EMPTY_TIPTAP_DOC as Record<string, unknown>,
      published: false,
    },
  });

  const title = watch("title");
  const content = watch("content");
  const published = watch("published");

  useEffect(() => {
    if (!existingBlog || isNew) return;

    reset({
      title: existingBlog.title,
      slug: existingBlog.slug,
      excerpt: existingBlog.excerpt ?? "",
      cover_url: existingBlog.cover_url ?? "",
      content: existingBlog.content as Record<string, unknown>,
      published: existingBlog.published,
    });
    slugManuallyEdited.current = true;
  }, [existingBlog, isNew, reset]);

  useEffect(() => {
    if (isNew && title && !slugManuallyEdited.current) {
      setValue("slug", slugify(title), { shouldDirty: true });
    }
  }, [isNew, title, setValue]);

  const busy =
    isSubmitting ||
    createBlog.isPending ||
    updateBlog.isPending ||
    uploadImage.isPending ||
    isLoading;

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }

    try {
      const { url } = await uploadImage.mutateAsync(file);
      setValue("cover_url", url, { shouldDirty: true, shouldValidate: true });
      toast.success("Cover image uploaded");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      toast.error(message);
    }
  };

  const handleEditorImageUpload = async (file: File): Promise<string> => {
    const { url } = await uploadImage.mutateAsync(file);
    return url;
  };

  const onSubmit = handleSubmit(async (values) => {
    const parsed = BlogPostSchema.safeParse({
      ...values,
      excerpt: values.excerpt || undefined,
      cover_url: values.cover_url?.trim() ? values.cover_url.trim() : null,
    });

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (
          field === "title" ||
          field === "slug" ||
          field === "excerpt" ||
          field === "cover_url" ||
          field === "content"
        ) {
          setError(field, { message: issue.message });
        }
      }
      return;
    }

    try {
      if (isNew) {
        const created = await createBlog.mutateAsync(parsed.data);
        toast.success("Blog created");
        router.replace(`/admin/blogs/${created.id}`);
        return;
      }

      await updateBlog.mutateAsync({ id: blogId, ...parsed.data });
      toast.success("Blog saved");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save blog";
      toast.error(message);
    }
  });

  if (!isNew && isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-10 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-64 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
      </div>
    );
  }

  if (!isNew && (isError || (!isLoading && !existingBlog))) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Blog not found</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This blog does not exist or may have been deleted.
        </p>
        <Link href="/admin/blogs">
          <Button type="button" variant="outline">
            Back to blogs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? false : "hidden"}
      animate="visible"
      variants={fadeUp}
      transition={sectionTransition}
      className="space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">
          {isNew ? "New blog" : "Edit blog"}
        </h1>
        <Link href="/admin/blogs">
          <Button type="button" variant="outline" disabled={busy}>
            Cancel
          </Button>
        </Link>
      </div>

      <form onSubmit={onSubmit} className="space-y-6" noValidate>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Blog title"
              disabled={busy}
              aria-invalid={Boolean(errors.title)}
              {...register("title")}
            />
            {errors.title ? (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.title.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={busy || !title}
                onClick={() => {
                  setValue("slug", slugify(title), { shouldDirty: true });
                  slugManuallyEdited.current = false;
                }}
              >
                Generate from title
              </Button>
            </div>
            <Input
              id="slug"
              placeholder="blog-url-slug"
              disabled={busy}
              aria-invalid={Boolean(errors.slug)}
              {...register("slug", {
                onChange: () => {
                  slugManuallyEdited.current = true;
                },
              })}
            />
            {errors.slug ? (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.slug.message}
              </p>
            ) : null}
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Public URL: /blog/{watch("slug") || "…"}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            rows={3}
            placeholder="Short summary for blog cards and SEO"
            disabled={busy}
            aria-invalid={Boolean(errors.excerpt)}
            {...register("excerpt")}
          />
          {errors.excerpt ? (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.excerpt.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Label htmlFor="cover_url">Cover image</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={busy}
              onClick={() => coverInputRef.current?.click()}
            >
              {uploadImage.isPending ? "Uploading…" : "Upload image"}
            </Button>
          </div>
          <Input
            id="cover_url"
            type="url"
            placeholder="https://… or upload a file"
            disabled={busy}
            aria-invalid={Boolean(errors.cover_url)}
            {...register("cover_url")}
          />
          {errors.cover_url ? (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.cover_url.message}
            </p>
          ) : null}
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => void handleCoverUpload(event)}
          />
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <Editor
            content={content}
            disabled={busy}
            onImageUpload={handleEditorImageUpload}
            onChange={(next) =>
              setValue("content", next, { shouldDirty: true, shouldValidate: true })
            }
          />
          {errors.content?.message ? (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {String(errors.content.message)}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-600"
              disabled={busy}
              {...register("published")}
            />
            <span>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                Published
              </span>
              <span className="mt-0.5 block text-zinc-500 dark:text-zinc-400">
                {published
                  ? "Visible on the public blog at /blog."
                  : "Saved as a draft."}
              </span>
            </span>
          </label>

          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : isNew ? "Create blog" : "Save changes"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
