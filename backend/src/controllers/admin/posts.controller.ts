import type { Request, Response } from "express";
import {
  BlogPostSchema,
  PostIdSchema,
  UpdateBlogPostSchema,
} from "../../schemas/admin/posts.schema";
import { adminPostsService } from "../../services/admin/posts.service";
import { AppError } from "../../utils/AppError";

export const adminPostsController = {
  async list(_req: Request, res: Response): Promise<void> {
    try {
      const data = await adminPostsService.listAll();
      res.status(200).json({ data });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    const parsed = PostIdSchema.safeParse(req.params);

    if (!parsed.success) {
      res.status(400).json({ error: "Invalid post id" });
      return;
    }

    try {
      const data = await adminPostsService.getById(parsed.data.id);
      res.status(200).json({ data });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    const parsed = BlogPostSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ error: "Invalid post data" });
      return;
    }

    try {
      const data = await adminPostsService.create(parsed.data);
      res.status(201).json({ data });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    const idParsed = PostIdSchema.safeParse(req.params);

    if (!idParsed.success) {
      res.status(400).json({ error: "Invalid post id" });
      return;
    }

    const bodyParsed = UpdateBlogPostSchema.safeParse(req.body);

    if (!bodyParsed.success) {
      res.status(400).json({ error: "Invalid post data" });
      return;
    }

    try {
      const data = await adminPostsService.update(
        idParsed.data.id,
        bodyParsed.data
      );
      res.status(200).json({ data });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    const parsed = PostIdSchema.safeParse(req.params);

    if (!parsed.success) {
      res.status(400).json({ error: "Invalid post id" });
      return;
    }

    try {
      const data = await adminPostsService.delete(parsed.data.id);
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
