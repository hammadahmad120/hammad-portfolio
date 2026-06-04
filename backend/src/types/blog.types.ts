import type { Json } from "./database.types";

export type TagJoin = { name: string; slug: string };
export type PostTagJoin = { tags: TagJoin | TagJoin[] | null };

export type RawListRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_url: string | null;
  published_at: string | null;
  blog_post_tags: PostTagJoin[] | null;
};

export type RawDetailRow = RawListRow & {
  content: Json;
};

export type PublicBlogListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_url: string | null;
  published_at: string | null;
  tags: TagJoin[];
};

export type PublicBlogDetail = PublicBlogListItem & {
  content: Json;
};

export type PaginatedBlogs = {
  items: PublicBlogListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type AdminBlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_url: string | null;
  content: Json;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  tags: TagJoin[];
};

export type RawAdminPostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_url: string | null;
  content: Json;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  blog_post_tags: PostTagJoin[] | null;
};
