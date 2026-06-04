"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  clearAdminSession,
  getAdminSession,
  isAdminProfile,
  setAdminSession,
  type AdminProfile,
  type AdminSession,
} from "./auth";
import { getAccessToken } from "./auth";
import type {
  BlogPostInput,
  BlogPostUpdateInput,
  ContactInput,
  LoginInput,
} from "./schemas";
import type { Database } from "@/types/database.types";
import type {
  BlogsListResult,
  PublicBlogDetail,
  PublicBlogListItem,
  PublicBlogTag,
} from "./publicBlog";

export type AdminBlogPost =
  Database["public"]["Tables"]["blog_posts"]["Row"] & {
    tags: PublicBlogTag[];
  };

export type AdminContactSubmission =
  Database["public"]["Tables"]["contact_submissions"]["Row"];

export type AdminContactSubmissionsResult = {
  items: AdminContactSubmission[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  days: number;
};

export type {
  BlogsListResult,
  PublicBlogDetail,
  PublicBlogListItem,
  PublicBlogTag,
};

export const ADMIN_BLOGS_QUERY_KEY = ["admin", "blogs"] as const;
export const ADMIN_CONTACT_SUBMISSIONS_QUERY_KEY = [
  "admin",
  "contact-submissions",
] as const;

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type ApiResponse<T> = { data: T };
type ApiError = { error: string };

async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const json = (await res.json()) as ApiResponse<T> | ApiError;

  if (!res.ok) {
    const message = "error" in json ? json.error : "Request failed";
    throw new Error(message);
  }

  return (json as ApiResponse<T>).data;
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

function requireAccessToken(): string {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Not signed in");
  }
  return token;
}

async function fetchBlogsPageClient(
  page: number,
  limit: number,
  tag?: string
): Promise<BlogsListResult> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (tag) params.set("tag", tag);
  return apiFetch<BlogsListResult>(`/api/blogs?${params}`);
}

export function useBlogs(page = 1, limit = 12, tag?: string) {
  return useQuery({
    queryKey: ["blogs", page, limit, tag],
    queryFn: () => fetchBlogsPageClient(page, limit, tag),
    enabled: Boolean(API_URL),
  });
}

export function useBlogsInfinite(limit = 12, tag?: string) {
  return useInfiniteQuery({
    queryKey: ["blogs", "infinite", limit, tag],
    queryFn: ({ pageParam }) => fetchBlogsPageClient(pageParam, limit, tag),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.page < last.totalPages ? last.page + 1 : undefined,
    enabled: Boolean(API_URL),
  });
}

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => apiFetch<PublicBlogTag[]>("/api/tags"),
    enabled: Boolean(API_URL),
  });
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () =>
      apiFetch<PublicBlogDetail>(`/api/blogs/${encodeURIComponent(slug)}`),
    enabled: Boolean(API_URL) && Boolean(slug),
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message === "Blog not found") {
        return false;
      }
      return failureCount < 2;
    },
  });
}

export { fetchBlogsPage, fetchPublicBlog } from "./publicBlog";

export function fetchAdminBlogs(token: string): Promise<AdminBlogPost[]> {
  if (!API_URL) {
    return Promise.reject(new Error("API URL is not configured"));
  }
  return apiFetch<AdminBlogPost[]>("/api/admin/posts", {
    headers: authHeaders(token),
  });
}

export function fetchAdminBlog(token: string, id: string): Promise<AdminBlogPost> {
  if (!API_URL) {
    return Promise.reject(new Error("API URL is not configured"));
  }
  return apiFetch<AdminBlogPost>(`/api/admin/posts/${id}`, {
    headers: authHeaders(token),
  });
}

export function useAdminBlogs() {
  const token = getAccessToken();

  return useQuery({
    queryKey: ADMIN_BLOGS_QUERY_KEY,
    queryFn: () => fetchAdminBlogs(requireAccessToken()),
    enabled: Boolean(API_URL && token),
  });
}

export function useAdminBlog(id: string | null) {
  const token = getAccessToken();

  return useQuery({
    queryKey: [...ADMIN_BLOGS_QUERY_KEY, id],
    queryFn: () => fetchAdminBlog(requireAccessToken(), id!),
    enabled: Boolean(API_URL && token && id && id !== "new"),
  });
}

export function useCreateAdminBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: BlogPostInput) =>
      apiFetch<AdminBlogPost>("/api/admin/posts", {
        method: "POST",
        headers: authHeaders(requireAccessToken()),
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ADMIN_BLOGS_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useUpdateAdminBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...body }: BlogPostUpdateInput & { id: string }) =>
      apiFetch<AdminBlogPost>(`/api/admin/posts/${id}`, {
        method: "PATCH",
        headers: authHeaders(requireAccessToken()),
        body: JSON.stringify(body),
      }),
    onSuccess: (blog) => {
      void queryClient.invalidateQueries({ queryKey: ADMIN_BLOGS_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: [...ADMIN_BLOGS_QUERY_KEY, blog.id],
      });
      void queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useDeleteAdminBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ id: string }>(`/api/admin/posts/${id}`, {
        method: "DELETE",
        headers: authHeaders(requireAccessToken()),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ADMIN_BLOGS_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function fetchAdminMe(token: string): Promise<AdminProfile> {
  if (!API_URL) {
    return Promise.reject(new Error("API URL is not configured"));
  }
  return apiFetch<AdminProfile>("/api/auth/me", {
    headers: authHeaders(token),
  });
}

/** Validates token with GET /api/auth/me and refreshes stored profile. */
export async function verifyAdminSession(): Promise<AdminSession | null> {
  const session = getAdminSession();
  if (!session) return null;

  try {
    const profile = await fetchAdminMe(session.access_token);
    if (!isAdminProfile(profile)) {
      clearAdminSession();
      return null;
    }
    const updated: AdminSession = { ...session, user: profile };
    setAdminSession(updated);
    return updated;
  } catch {
    clearAdminSession();
    return null;
  }
}

export function useAdminMe(token: string | null) {
  return useQuery({
    queryKey: ["admin", "me", token],
    queryFn: () => fetchAdminMe(token!),
    enabled: Boolean(API_URL && token),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAdminLogin() {
  return useMutation({
    mutationFn: async (body: LoginInput) => {
      if (!API_URL) {
        throw new Error("API URL is not configured");
      }
      const session = await apiFetch<AdminSession>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (!isAdminProfile(session.user)) {
        throw new Error("Not authorized for admin access");
      }
      return session;
    },
  });
}

export function fetchAdminContactSubmissions(
  token: string,
  days: number,
  page: number,
  limit: number
): Promise<AdminContactSubmissionsResult> {
  if (!API_URL) {
    return Promise.reject(new Error("API URL is not configured"));
  }
  const params = new URLSearchParams({
    days: String(days),
    page: String(page),
    limit: String(limit),
  });
  return apiFetch<AdminContactSubmissionsResult>(
    `/api/admin/contact-submissions?${params}`,
    { headers: authHeaders(token) }
  );
}

export function useAdminContactSubmissions(
  days: number,
  page = 1,
  limit = 10
) {
  const token = getAccessToken();

  return useQuery({
    queryKey: [...ADMIN_CONTACT_SUBMISSIONS_QUERY_KEY, days, page, limit],
    queryFn: () =>
      fetchAdminContactSubmissions(requireAccessToken(), days, page, limit),
    enabled: Boolean(API_URL && token && days >= 1 && days <= 365),
  });
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: (body: ContactInput) => {
      if (!API_URL) {
        return Promise.reject(new Error("API URL is not configured"));
      }
      return apiFetch<{ ok: true }>("/api/contact", {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
  });
}

export function useUploadImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      if (!API_URL) {
        throw new Error("API URL is not configured");
      }

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: authHeaders(requireAccessToken()),
        body: formData,
      });

      const json = (await res.json()) as ApiResponse<{ url: string }> | ApiError;

      if (!res.ok) {
        const message = "error" in json ? json.error : "Upload failed";
        throw new Error(message);
      }

      return (json as ApiResponse<{ url: string }>).data;
    },
  });
}
