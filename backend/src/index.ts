import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { healthController } from "./controllers/health.controller";
import { apiRateLimiter } from "./middleware/rateLimiter";
import { adminContactRouter } from "./routes/admin/contact";
import { adminPostsRouter } from "./routes/admin/posts";
import { authRouter } from "./routes/auth";
import { blogsRouter } from "./routes/blogs";
import { contactRouter } from "./routes/contact";
import { tagsRouter } from "./routes/tags";
import { uploadRouter } from "./routes/upload";

const app = express();
const port = Number(process.env.PORT) || 4000;
const allowedOrigin = process.env.ALLOWED_ORIGIN ?? "http://localhost:3001";

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(apiRateLimiter);

app.get("/health", healthController.check);

app.use("/api/auth", authRouter);
app.use("/api/admin/contact-submissions", adminContactRouter);
app.use("/api/admin/posts", adminPostsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/upload", uploadRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
