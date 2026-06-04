import { z } from "zod";
import type { Json } from "@/types/database.types";

export const EMPTY_TIPTAP_DOC: Json = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email").max(320),
  message: z.string().min(1, "Message is required").max(5000),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export const BlogPostSchema = z.object({
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(300),
  excerpt: z.string().max(500).optional(),
  cover_url: z.string().url().optional().nullable(),
  content: z.record(z.string(), z.unknown()),
  published: z.boolean().optional(),
});

export type BlogPostInput = z.infer<typeof BlogPostSchema>;

export const BlogPostUpdateSchema = BlogPostSchema.partial().refine(
  (body) => Object.keys(body).length > 0,
  { message: "At least one field is required" }
);

export type BlogPostUpdateInput = z.infer<typeof BlogPostUpdateSchema>;

export const UploadSchema = z.object({
  file: z.instanceof(File),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .max(320),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128),
});

export type LoginInput = z.infer<typeof LoginSchema>;
