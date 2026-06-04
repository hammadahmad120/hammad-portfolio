import { z } from "zod";

const tagNameSchema = z.string().trim().min(1).max(100);

export const BlogPostSchema = z.object({
  title: z.string().trim().min(1).max(300),
  slug: z.string().trim().min(1).max(300),
  excerpt: z.string().trim().max(500).optional().nullable(),
  cover_url: z.string().url().optional().nullable(),
  content: z.record(z.string(), z.unknown()),
  published: z.boolean().optional(),
  tags: z.array(tagNameSchema).max(20).optional(),
});

export type CreateBlogPostInput = z.infer<typeof BlogPostSchema>;

export const UpdateBlogPostSchema = BlogPostSchema.partial().refine(
  (body: Partial<CreateBlogPostInput>) => Object.keys(body).length > 0,
  { message: "At least one field is required" }
);

export type UpdateBlogPostInput = z.infer<typeof UpdateBlogPostSchema>;

export const PostIdSchema = z.object({
  id: z.string().uuid(),
});
