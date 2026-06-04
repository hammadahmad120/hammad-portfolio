import { Router } from "express";
import { tagsController } from "../controllers/tags.controller";
import { asyncHandler } from "../utils/asyncHandler";

export const tagsRouter = Router();

tagsRouter.get("/", asyncHandler(tagsController.list));
