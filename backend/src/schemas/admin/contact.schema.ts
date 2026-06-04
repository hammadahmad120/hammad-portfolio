import { z } from "zod";

export const ListContactSubmissionsQuerySchema = z.object({
  days: z.coerce.number().int().min(1).max(365),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type ListContactSubmissionsQueryInput = z.infer<
  typeof ListContactSubmissionsQuerySchema
>;
