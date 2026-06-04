import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth";
import { authLoginRateLimiter } from "../middleware/rateLimiter";
import { asyncHandler } from "../utils/asyncHandler";

export const authRouter = Router();

authRouter.post(
  "/login",
  authLoginRateLimiter,
  asyncHandler(authController.login)
);

authRouter.get("/me", requireAuth, asyncHandler(authController.getMe));

authRouter.patch("/me", requireAuth, asyncHandler(authController.updateMe));
