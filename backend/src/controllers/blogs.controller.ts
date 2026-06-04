import type { Request, Response } from "express";
import {
  ListQuerySchema,
  SlugParamSchema,
} from "../schemas/blogs.schema";
import { blogsService } from "../services/blogs.service";
import { AppError } from "../utils/AppError";

export const blogsController = {
  async list(req: Request, res: Response): Promise<void> {
    const parsed = ListQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      res.status(400).json({ error: "Invalid query parameters" });
      return;
    }

    try {
      const data = await blogsService.listPublished(parsed.data);
      res.status(200).json({ data });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getBySlug(req: Request, res: Response): Promise<void> {
    const parsed = SlugParamSchema.safeParse(req.params);

    if (!parsed.success) {
      res.status(400).json({ error: "Invalid slug" });
      return;
    }

    try {
      const data = await blogsService.getPublishedBySlug(parsed.data.slug);
      res.status(200).json({ data });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },

  notImplemented(_req: Request, res: Response): void {
    res.status(501).json({ error: "Not implemented" });
  },
};
