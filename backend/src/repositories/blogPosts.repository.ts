import { getSupabase } from "../lib/supabase";
import type { Database, Json } from "../types/database.types";
import type { RawAdminPostRow, RawDetailRow, RawListRow } from "../types/blog.types";

export type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];
export type BlogPostUpdate =
  Database["public"]["Tables"]["blog_posts"]["Update"];

export const BLOG_POST_ADMIN_COLUMNS =
  "id, title, slug, excerpt, cover_url, content, published, published_at, created_at, updated_at" as const;

const ADMIN_WITH_TAGS_COLUMNS =
  `${BLOG_POST_ADMIN_COLUMNS}, blog_post_tags(tags(name, slug))` as const;

const PUBLIC_LIST_COLUMNS =
  "id, title, slug, excerpt, cover_url, published_at, blog_post_tags(tags(name, slug))" as const;

const PUBLIC_DETAIL_COLUMNS =
  "id, title, slug, excerpt, cover_url, content, published_at, blog_post_tags(tags(name, slug))" as const;

export const blogPostsRepository = {
  async findPublishedPaginated(params: {
    from: number;
    to: number;
    postIds?: string[];
  }): Promise<{
    rows: RawListRow[];
    count: number;
    error: boolean;
  }> {
    let query = getSupabase()
      .from("blog_posts")
      .select(PUBLIC_LIST_COLUMNS, { count: "exact" })
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (params.postIds) {
      query = query.in("id", params.postIds);
    }

    const { data, error, count } = await query.range(params.from, params.to);

    return {
      rows: (data ?? []) as RawListRow[],
      count: count ?? 0,
      error: Boolean(error),
    };
  },

  async findPublishedBySlug(slug: string): Promise<{
    row: RawDetailRow | null;
    error: boolean;
  }> {
    const { data, error } = await getSupabase()
      .from("blog_posts")
      .select(PUBLIC_DETAIL_COLUMNS)
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    return {
      row: data as RawDetailRow | null,
      error: Boolean(error),
    };
  },

  async findAllAdmin(): Promise<{
    rows: RawAdminPostRow[];
    error: boolean;
  }> {
    const { data, error } = await getSupabase()
      .from("blog_posts")
      .select(ADMIN_WITH_TAGS_COLUMNS)
      .order("updated_at", { ascending: false });

    return { rows: (data ?? []) as RawAdminPostRow[], error: Boolean(error) };
  },

  async findByIdAdmin(id: string): Promise<{
    row: RawAdminPostRow | null;
    error: boolean;
  }> {
    const { data, error } = await getSupabase()
      .from("blog_posts")
      .select(ADMIN_WITH_TAGS_COLUMNS)
      .eq("id", id)
      .maybeSingle();

    return {
      row: data as RawAdminPostRow | null,
      error: Boolean(error),
    };
  },

  async existsById(id: string): Promise<{
    exists: boolean;
    error: boolean;
  }> {
    const { data, error } = await getSupabase()
      .from("blog_posts")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    return { exists: Boolean(data), error: Boolean(error) };
  },

  async insert(
    row: Database["public"]["Tables"]["blog_posts"]["Insert"]
  ): Promise<{
    row: BlogPostRow | null;
    error: { code?: string; message?: string } | null;
  }> {
    const { data, error } = await getSupabase()
      .from("blog_posts")
      .insert(row)
      .select(BLOG_POST_ADMIN_COLUMNS)
      .single();

    return {
      row: data as BlogPostRow | null,
      error: error ?? null,
    };
  },

  async updateById(
    id: string,
    patch: BlogPostUpdate
  ): Promise<{
    row: BlogPostRow | null;
    error: { code?: string; message?: string } | null;
  }> {
    const { data, error } = await getSupabase()
      .from("blog_posts")
      .update(patch)
      .eq("id", id)
      .select(BLOG_POST_ADMIN_COLUMNS)
      .single();

    return {
      row: data as BlogPostRow | null,
      error: error ?? null,
    };
  },

  async deleteById(id: string): Promise<{ error: boolean }> {
    const { error } = await getSupabase()
      .from("blog_posts")
      .delete()
      .eq("id", id);

    return { error: Boolean(error) };
  },
};

export type { Json };
