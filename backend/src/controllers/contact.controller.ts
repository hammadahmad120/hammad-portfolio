import type { Request, Response } from "express";
import { ContactSchema } from "../schemas/contact.schema";
import { contactService } from "../services/contact.service";
import { AppError } from "../utils/AppError";

export const contactController = {
  async submit(req: Request, res: Response): Promise<void> {
    const parsed = ContactSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ error: "Invalid contact data" });
      return;
    }

    try {
      await contactService.submit(parsed.data);
      res.status(201).json({ data: { ok: true } });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
