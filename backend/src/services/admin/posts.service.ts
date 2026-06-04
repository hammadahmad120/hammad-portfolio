import {
  blogPostsRepository,
  type BlogPostRow,
  type BlogPostUpdate,
  type Json,
} from "../../repositories/blogPosts.repository";
import { tagsRepository } from "../../repositories/tags.repository";
import type {
  CreateBlogPostInput,
  UpdateBlogPostInput,
} from "../../schemas/admin/posts.schema";
import type { AdminBlogPost, RawAdminPostRow } from "../../types/blog.types";
import { AppError } from "../../utils/AppError";
import { normalizeTags } from "../../utils/blogTags";

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

function mapAdminRow(row: RawAdminPostRow): AdminBlogPost {
  const { blog_post_tags, ...post } = row;
  return {
    ...post,
    tags: normalizeTags(blog_post_tags),
  };
}

async function syncPostTags(
  postId: string,
  tagNames: string[] | undefined
): Promise<void> {
  if (tagNames === undefined) return;

  const { tagIds, error } = await tagsRepository.resolveIdsByNames(tagNames);
  if (error) throw new AppError(500, "Failed to save tags");

  const { error: linkError } = await tagsRepository.replacePostTags(
    postId,
    tagIds
  );
  if (linkError) throw new AppError(500, "Failed to save tags");
}

async function loadAdminPost(id: string): Promise<AdminBlogPost> {
  const { row, error } = await blogPostsRepository.findByIdAdmin(id);
  if (error) throw new AppError(500, "Failed to fetch post");
  if (!row) throw new AppError(404, "Post not found");
  return mapAdminRow(row);
}

export const adminPostsService = {
  async listAll(): Promise<AdminBlogPost[]> {
    const { rows, error } = await blogPostsRepository.findAllAdmin();
    if (error) throw new AppError(500, "Failed to list posts");
    return rows.map(mapAdminRow);
  },

  async getById(id: string): Promise<AdminBlogPost> {
    return loadAdminPost(id);
  },

  async create(input: CreateBlogPostInput): Promise<AdminBlogPost> {
    const { title, slug, excerpt, cover_url, content, published, tags } = input;
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

    await syncPostTags(row.id, tags ?? []);
    return loadAdminPost(row.id);
  },

  async update(id: string, input: UpdateBlogPostInput): Promise<AdminBlogPost> {
    const existingRow = await blogPostsRepository.findByIdAdmin(id);
    if (existingRow.error) throw new AppError(500, "Failed to fetch post");
    if (!existingRow.row) throw new AppError(404, "Post not found");

    const existing = existingRow.row;
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

    if (Object.keys(update).length > 0) {
      const { row, error } = await blogPostsRepository.updateById(id, update);

      if (error) {
        const conflict = slugConflictMessage(error);
        if (conflict) throw new AppError(409, conflict);
        throw new AppError(500, "Failed to update post");
      }

      if (!row) throw new AppError(500, "Failed to update post");
    }

    await syncPostTags(id, input.tags);
    return loadAdminPost(id);
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
