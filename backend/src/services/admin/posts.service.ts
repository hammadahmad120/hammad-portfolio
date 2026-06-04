import {
  blogPostsRepository,
  type BlogPostRow,
  type BlogPostUpdate,
  type Json,
} from "../../repositories/blogPosts.repository";
import type {
  CreateBlogPostInput,
  UpdateBlogPostInput,
} from "../../schemas/admin/posts.schema";
import { AppError } from "../../utils/AppError";

function slugConflictMessage(error: {
  code?: string;
  message?: string;
}): string | null {
  if (error.code === "23505") {
    return "A post with this slug already exists";
  }
  return null;
}

function resolvePublishedAt(
  published: boolean,
  previous: Pick<BlogPostRow, "published" | "published_at">
): string | null {
  if (!published) return null;
  if (published && !previous.published) return new Date().toISOString();
  return previous.published_at;
}

export const adminPostsService = {
  async listAll(): Promise<BlogPostRow[]> {
    const { rows, error } = await blogPostsRepository.findAllAdmin();
    if (error) throw new AppError(500, "Failed to list posts");
    return rows;
  },

  async getById(id: string): Promise<BlogPostRow> {
    const { row, error } = await blogPostsRepository.findByIdAdmin(id);
    if (error) throw new AppError(500, "Failed to fetch post");
    if (!row) throw new AppError(404, "Post not found");
    return row;
  },

  async create(input: CreateBlogPostInput): Promise<BlogPostRow> {
    const { title, slug, excerpt, cover_url, content, published } = input;
    const isPublished = published ?? false;
    const now = new Date().toISOString();

    const { row, error } = await blogPostsRepository.insert({
      title,
      slug,
      excerpt: excerpt ?? null,
      cover_url: cover_url ?? null,
      content: content as Json,
      published: isPublished,
      published_at: isPublished ? now : null,
    });

    if (error) {
      const conflict = slugConflictMessage(error);
      if (conflict) throw new AppError(409, conflict);
      throw new AppError(500, "Failed to create post");
    }

    if (!row) throw new AppError(500, "Failed to create post");
    return row;
  },

  async update(id: string, input: UpdateBlogPostInput): Promise<BlogPostRow> {
    const existing = await this.getById(id);

    const nextPublished =
      input.published !== undefined ? input.published : existing.published;

    const update: BlogPostUpdate = {};

    if (input.title !== undefined) update.title = input.title;
    if (input.slug !== undefined) update.slug = input.slug;
    if (input.excerpt !== undefined) update.excerpt = input.excerpt;
    if (input.cover_url !== undefined) update.cover_url = input.cover_url;
    if (input.content !== undefined) update.content = input.content as Json;
    if (input.published !== undefined) {
      update.published = input.published;
      update.published_at = resolvePublishedAt(nextPublished, existing);
    }

    const { row, error } = await blogPostsRepository.updateById(id, update);

    if (error) {
      const conflict = slugConflictMessage(error);
      if (conflict) throw new AppError(409, conflict);
      throw new AppError(500, "Failed to update post");
    }

    if (!row) throw new AppError(500, "Failed to update post");
    return row;
  },

  async delete(id: string): Promise<{ id: string }> {
    const { exists, error: existsError } =
      await blogPostsRepository.existsById(id);

    if (existsError) throw new AppError(500, "Failed to fetch post");
    if (!exists) throw new AppError(404, "Post not found");

    const { error } = await blogPostsRepository.deleteById(id);
    if (error) throw new AppError(500, "Failed to delete post");

    return { id };
  },
};
