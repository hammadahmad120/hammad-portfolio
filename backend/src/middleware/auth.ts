import type { NextFunction, Request, Response } from "express";
import { userIsAdmin } from "../services/auth.service";
import { getSupabase } from "../lib/supabase";

export type AuthenticatedRequest = Request & {
  userId?: string;
  accessToken?: string;
};

/**
 * Verifies Supabase JWT from Authorization: Bearer <token>.
 * Attach userId to the request on success.
 */
export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid authorization header" });
    return;
  }

  const token = header.slice(7);
  const { data, error } = await getSupabase().auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }

  if (!(await userIsAdmin(data.user.id))) {
    res.status(403).json({ error: "Not authorized for admin access" });
    return;
  }

  req.userId = data.user.id;
  req.accessToken = token;
  next();
}
