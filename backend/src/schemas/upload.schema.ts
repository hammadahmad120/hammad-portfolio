import { z } from "zod";

export const AllowedMimeSchema = z.enum([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

export const ALLOWED_MIME_TYPES = AllowedMimeSchema.options;

export type AllowedMimeType = z.infer<typeof AllowedMimeSchema>;

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const UploadedFileSchema = z.object({
  mimetype: AllowedMimeSchema,
  size: z.number().int().positive().max(MAX_FILE_SIZE),
  buffer: z.instanceof(Buffer),
});

export type UploadedFileInput = z.infer<typeof UploadedFileSchema>;

export const MIME_TO_EXT: Record<AllowedMimeType, string> =
  {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
  };
