import type { Request, Response } from "express";
import { UploadedFileSchema } from "../schemas/upload.schema";
import { uploadService } from "../services/upload.service";
import { AppError } from "../utils/AppError";

export const uploadController = {
  async upload(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      res.status(400).json({
        error: 'No file provided. Use multipart field name "file".',
      });
      return;
    }

    const parsed = UploadedFileSchema.safeParse({
      mimetype: req.file.mimetype,
      size: req.file.size,
      buffer: req.file.buffer,
    });

    if (!parsed.success) {
      res.status(400).json({
        error: "Invalid file. Allowed types: JPEG, PNG, GIF, WebP (max 5 MB).",
      });
      return;
    }

    try {
      const data = await uploadService.uploadBlogImage(parsed.data);
      res.status(200).json({ data });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
