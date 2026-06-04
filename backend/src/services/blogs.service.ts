import { blogPostsRepository } from "../repositories/blogPosts.repository";
import { tagsRepository } from "../repositories/tags.repository";
import type { ListQueryInput } from "../schemas/blogs.schema";
import type {
  PaginatedBlogs,
  PostTagJoin,
  PublicBlogDetail,
  PublicBlogListItem,
  RawDetailRow,
  RawListRow,
  TagJoin,
} from "../types/blog.types";
import { AppError } from "../utils/AppError";

function normalizeTags(
  blogPostTags: PostTagJoin[] | null | undefined
): TagJoin[] {
  if (!blogPostTags?.length) return [];

  const tags: TagJoin[] = [];
  for (const row of blogPostTags) {
    const joined = row.tags;
    if (!joined) continue;
    if (Array.isArray(joined)) {
      tags.push(...joined);
    } else {
      tags.push(joined);
    }
  }
  return tags;
}

function mapListRow(row: RawListRow): PublicBlogListItem {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    cover_url: row.cover_url,
    published_at: row.published_at,
    tags: normalizeTags(row.blog_post_tags),
  };
}

function mapDetailRow(row: RawDetailRow): PublicBlogDetail {
  return {
    ...mapListRow(row),
    content: row.content,
  };
}

function emptyPage(page: number, limit: number): PaginatedBlogs {
  return { items: [], page, limit, total: 0, totalPages: 0 };
}

export const blogsService = {
  async listPublished(query: ListQueryInput): Promise<PaginatedBlogs> {
    const { page, limit, tag } = query;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let postIds: string[] | undefined;

    if (tag) {
      const { id: tagId, error: tagError } =
        await tagsRepository.findIdBySlug(tag);

      if (tagError) {
        throw new AppError(500, "Failed to filter by tag");
      }

      if (!tagId) return emptyPage(page, limit);

      const { postIds: ids, error: linksError } =
        await tagsRepository.findPostIdsByTagId(tagId);

      if (linksError) {
        throw new AppError(500, "Failed to filter by tag");
      }

      if (ids.length === 0) return emptyPage(page, limit);

      postIds = ids;
    }

    const { rows, count, error } = await blogPostsRepository.findPublishedPaginated(
      { from, to, postIds }
    );

    if (error) {
      throw new AppError(500, "Failed to list blogs");
    }

    const total = count;
    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

    return {
      items: rows.map(mapListRow),
      page,
      limit,
      total,
      totalPages,
    };
  },

  async getPublishedBySlug(slug: string): Promise<PublicBlogDetail> {
    const { row, error } = await blogPostsRepository.findPublishedBySlug(slug);

    if (error) {
      throw new AppError(500, "Failed to fetch blog");
    }

    if (!row) {
      throw new AppError(404, "Blog not found");
    }

    return mapDetailRow(row);
  },
};
