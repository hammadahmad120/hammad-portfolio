import type { Metadata } from "next";
import { BlogPostView } from "@/components/blog/BlogPostView";
import { fetchPublicBlogOptional } from "@/lib/publicBlog";

type BlogPostPageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const blog = await fetchPublicBlogOptional(params.slug);

  if (!blog) {
    return { title: "Blog" };
  }

  return {
    title: blog.title,
    description: blog.excerpt ?? undefined,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogPostView slug={params.slug} />;
}
