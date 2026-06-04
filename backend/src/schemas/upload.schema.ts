import { z } from "zod";

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const UploadedFileSchema = z.object({
  mimetype: z.enum(ALLOWED_MIME_TYPES),
  size: z.number().int().positive().max(MAX_FILE_SIZE),
  buffer: z.instanceof(Buffer),
});

export type UploadedFileInput = z.infer<typeof UploadedFileSchema>;

export const MIME_TO_EXT: Record<(typeof ALLOWED_MIME_TYPES)[number], string> =
  {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
  };
