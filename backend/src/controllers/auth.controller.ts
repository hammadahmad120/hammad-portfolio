import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth";
import {
  LoginSchema,
  UpdateProfileSchema,
} from "../schemas/auth.schema";
import { authService } from "../services/auth.service";
import { AppError } from "../utils/AppError";

export const authController = {
  async login(req: AuthenticatedRequest, res: Response): Promise<void> {
    const parsed = LoginSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    try {
      const data = await authService.login(
        parsed.data.email,
        parsed.data.password
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

  async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const data = await authService.getProfile(req.userId!);
      res.status(200).json({ data });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    const parsed = UpdateProfileSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ error: "Invalid profile data" });
      return;
    }

    try {
      const data = await authService.updateProfile(
        req.userId!,
        parsed.data
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
};
