import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(8).max(128),
});

export type LoginInput = z.infer<typeof LoginSchema>;

const UpdateProfileBodySchema = z.object({
  first_name: z.string().trim().min(1).max(100).optional(),
  last_name: z.string().trim().min(1).max(100).optional(),
  date_of_birth: z
    .union([
      z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format"),
      z.null(),
    ])
    .optional(),
  phone: z.string().trim().min(7).max(20).optional().nullable(),
});

export const UpdateProfileSchema = UpdateProfileBodySchema.refine(
  (body: z.infer<typeof UpdateProfileBodySchema>) =>
      body.first_name !== undefined ||
      body.last_name !== undefined ||
      body.date_of_birth !== undefined ||
      body.phone !== undefined,
  { message: "At least one field is required" }
);

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
