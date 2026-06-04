import { Router } from "express";
import { adminContactController } from "../../controllers/admin/contact.controller";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../utils/asyncHandler";

export const adminContactRouter = Router();

adminContactRouter.use(requireAuth);

adminContactRouter.get(
  "/",
  asyncHandler(adminContactController.list)
);
