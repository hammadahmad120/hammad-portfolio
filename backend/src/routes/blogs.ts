import { Router } from "express";
import { blogsController } from "../controllers/blogs.controller";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";

export const blogsRouter = Router();

blogsRouter.get("/", asyncHandler(blogsController.list));
blogsRouter.get("/:slug", asyncHandler(blogsController.getBySlug));

blogsRouter.post("/", requireAuth, blogsController.notImplemented);
blogsRouter.patch("/:id", requireAuth, blogsController.notImplemented);
blogsRouter.delete("/:id", requireAuth, blogsController.notImplemented);
