import type { NextFunction, Request, Response } from "express";
import { isAppError } from "./AppError";

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

/** Sends { error } for AppError; otherwise 500. */
export function asyncHandler(fn: AsyncRequestHandler): AsyncRequestHandler {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (isAppError(error)) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
