import { Router } from "express";
import { adminPostsController } from "../../controllers/admin/posts.controller";
import { requireAuth } from "../../middleware/auth";
import { asyncHandler } from "../../utils/asyncHandler";

export const adminPostsRouter = Router();

adminPostsRouter.use(requireAuth);

adminPostsRouter.get("/", asyncHandler(adminPostsController.list));
adminPostsRouter.get("/:id", asyncHandler(adminPostsController.getById));
adminPostsRouter.post("/", asyncHandler(adminPostsController.create));
adminPostsRouter.patch("/:id", asyncHandler(adminPostsController.update));
adminPostsRouter.delete("/:id", asyncHandler(adminPostsController.delete));
