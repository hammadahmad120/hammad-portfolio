import type { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on engineering, projects, and learning by Hammad Ahmad.",
};

export default function BlogListPage() {
  return <BlogList />;
}
