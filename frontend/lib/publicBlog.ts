import type { Json } from "@/types/database.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export type PublicBlogTag = {
  name: string;
  slug: string;
};

export type PublicBlogListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_url: string | null;
  published_at: string | null;
  tags: PublicBlogTag[];
};

export type PublicBlogDetail = PublicBlogListItem & {
  content: Json;
};

export type BlogsListResult = {
  items: PublicBlogListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type ApiResponse<T> = { data: T };
type ApiError = { error: string };

async function publicApiFetch<T>(path: string): Promise<T> {
  if (!API_URL) {
    throw new Error("API URL is not configured");
  }

  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 60 },
  });

  const json = (await res.json()) as ApiResponse<T> | ApiError;

  if (!res.ok) {
    const message = "error" in json ? json.error : "Request failed";
    throw new Error(message);
  }

  return (json as ApiResponse<T>).data;
}

export function fetchBlogsPage(
  page: number,
  limit: number,
  tag?: string
): Promise<BlogsListResult> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (tag) params.set("tag", tag);
  return publicApiFetch<BlogsListResult>(`/api/blogs?${params}`);
}

export function fetchPublicBlog(slug: string): Promise<PublicBlogDetail> {
  return publicApiFetch<PublicBlogDetail>(`/api/blogs/${encodeURIComponent(slug)}`);
}

/** For server metadata — returns null when missing or API unavailable. */
export async function fetchPublicBlogOptional(
  slug: string
): Promise<PublicBlogDetail | null> {
  if (!API_URL || !slug) return null;

  try {
    const res = await fetch(`${API_URL}/api/blogs/${encodeURIComponent(slug)}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = (await res.json()) as ApiResponse<PublicBlogDetail>;
    return json.data;
  } catch {
    return null;
  }
}
