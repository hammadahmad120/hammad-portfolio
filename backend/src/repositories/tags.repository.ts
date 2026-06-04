import { getSupabase } from "../lib/supabase";
import type { Database } from "../types/database.types";
import { slugify } from "../utils/slugify";

export type TagRow = Database["public"]["Tables"]["tags"]["Row"];

type TagNameSlug = { name: string; slug: string };

function dedupeBySlug(items: TagNameSlug[]): TagNameSlug[] {
  const seen = new Set<string>();
  const result: TagNameSlug[] = [];

  for (const item of items) {
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    result.push(item);
  }

  return result;
}

export function parseTagNames(names: string[]): TagNameSlug[] {
  const parsed = names
    .map((name) => name.trim())
    .filter((name) => name.length > 0)
    .map((name) => ({ name, slug: slugify(name) }))
    .filter((item) => item.slug.length > 0);

  return dedupeBySlug(parsed);
}

export const tagsRepository = {
  async findAll(): Promise<{ rows: TagRow[]; error: boolean }> {
    const { data, error } = await getSupabase()
      .from("tags")
      .select("id, name, slug")
      .order("name", { ascending: true });

    return { rows: (data ?? []) as TagRow[], error: Boolean(error) };
  },

  async findIdBySlug(slug: string): Promise<{
    id: string | null;
    error: boolean;
  }> {
    const { data, error } = await getSupabase()
      .from("tags")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (error) return { id: null, error: true };
    return { id: data?.id ?? null, error: false };
  },

  async findPostIdsByTagId(tagId: string): Promise<{
    postIds: string[];
    error: boolean;
  }> {
    const { data, error } = await getSupabase()
      .from("blog_post_tags")
      .select("blog_post_id")
      .eq("tag_id", tagId);

    if (error) return { postIds: [], error: true };
    return {
      postIds: data?.map((link) => link.blog_post_id) ?? [],
      error: false,
    };
  },

  async resolveIdsByNames(names: string[]): Promise<{
    tagIds: string[];
    error: boolean;
  }> {
    const items = parseTagNames(names);
    if (items.length === 0) return { tagIds: [], error: false };

    const supabase = getSupabase();
    const tagIds: string[] = [];

    for (const { name, slug } of items) {
      const { data: existing, error: findError } = await supabase
        .from("tags")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (findError) return { tagIds: [], error: true };

      if (existing?.id) {
        tagIds.push(existing.id);
        continue;
      }

      const { data: created, error: insertError } = await supabase
        .from("tags")
        .insert({ name, slug })
        .select("id")
        .single();

      if (insertError) {
        if (insertError.code === "23505") {
          const { data: raced, error: raceError } = await supabase
            .from("tags")
            .select("id")
            .eq("slug", slug)
            .maybeSingle();

          if (raceError || !raced?.id) return { tagIds: [], error: true };
          tagIds.push(raced.id);
          continue;
        }
        return { tagIds: [], error: true };
      }

      if (!created?.id) return { tagIds: [], error: true };
      tagIds.push(created.id);
    }

    return { tagIds, error: false };
  },

  async replacePostTags(
    blogPostId: string,
    tagIds: string[]
  ): Promise<{ error: boolean }> {
    const supabase = getSupabase();

    const { error: deleteError } = await supabase
      .from("blog_post_tags")
      .delete()
      .eq("blog_post_id", blogPostId);

    if (deleteError) return { error: true };

    if (tagIds.length === 0) return { error: false };

    const { error: insertError } = await supabase.from("blog_post_tags").insert(
      tagIds.map((tagId) => ({
        blog_post_id: blogPostId,
        tag_id: tagId,
      }))
    );

    return { error: Boolean(insertError) };
  },
};
