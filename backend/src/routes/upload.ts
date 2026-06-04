import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import multer, { MulterError } from "multer";
import { uploadController } from "../controllers/upload.controller";
import { requireAuth } from "../middleware/auth";
import { MAX_FILE_SIZE } from "../schemas/upload.schema";
import { asyncHandler } from "../utils/asyncHandler";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
});

export const uploadRouter = Router();

function handleMulter(req: Request, res: Response, next: NextFunction): void {
  upload.single("file")(req, res, (err: unknown) => {
    if (err instanceof MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({ error: "File must be 5 MB or smaller" });
        return;
      }
      res.status(400).json({ error: "Invalid file upload" });
      return;
    }
    if (err) {
      res.status(400).json({ error: "Invalid file upload" });
      return;
    }
    next();
  });
}

uploadRouter.post(
  "/",
  requireAuth,
  handleMulter,
  asyncHandler(uploadController.upload)
);
