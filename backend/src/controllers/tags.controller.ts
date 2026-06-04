import type { Request, Response } from "express";
import { tagsService } from "../services/tags.service";
import { AppError } from "../utils/AppError";

export const tagsController = {
  async list(_req: Request, res: Response): Promise<void> {
    try {
      const data = await tagsService.listAll();
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
