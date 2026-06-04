import { getSupabase } from "../lib/supabase";

export const tagsRepository = {
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
};
