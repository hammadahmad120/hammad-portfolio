import type { Request, Response } from "express";
import { ListContactSubmissionsQuerySchema } from "../../schemas/admin/contact.schema";
import { adminContactService } from "../../services/admin/contact.service";
import { AppError } from "../../utils/AppError";

export const adminContactController = {
  async list(req: Request, res: Response): Promise<void> {
    const parsed = ListContactSubmissionsQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      res.status(400).json({ error: "Invalid query parameters" });
      return;
    }

    try {
      const data = await adminContactService.list(parsed.data);
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
