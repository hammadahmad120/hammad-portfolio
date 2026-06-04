/**
 * Re-exports admin blog hooks from api.ts.
 * Prefer importing from `@/lib/api` directly.
 */

export {
  ADMIN_BLOGS_QUERY_KEY,
  useAdminBlog,
  useAdminBlogs,
  useCreateAdminBlog,
  useDeleteAdminBlog,
  useUpdateAdminBlog,
  type AdminBlogPost,
} from "./api";
