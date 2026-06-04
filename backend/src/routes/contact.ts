import { Router } from "express";
import { contactController } from "../controllers/contact.controller";
import { contactRateLimiter } from "../middleware/rateLimiter";
import { asyncHandler } from "../utils/asyncHandler";

export const contactRouter = Router();

contactRouter.post(
  "/",
  contactRateLimiter,
  asyncHandler(contactController.submit)
);
