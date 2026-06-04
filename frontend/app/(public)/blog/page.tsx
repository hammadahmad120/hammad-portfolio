import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogList, BlogListSkeleton } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on engineering, projects, and learning by Hammad Ahmad.",
};

export default function BlogListPage() {
  return (
    <Suspense fallback={<BlogListSkeleton />}>
      <BlogList />
    </Suspense>
  );
}
