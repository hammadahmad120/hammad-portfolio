import type { Metadata } from "next";
import { BlogsList } from "@/components/admin/BlogsList";

export const metadata: Metadata = {
  title: "Manage Blogs",
};

export default function AdminBlogsPage() {
  return <BlogsList />;
}
