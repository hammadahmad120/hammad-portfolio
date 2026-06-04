import type { PostTagJoin, TagJoin } from "../types/blog.types";

export function normalizeTags(
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
