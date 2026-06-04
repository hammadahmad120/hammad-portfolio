import type { Metadata } from "next";
import { BlogEditorForm } from "@/components/admin/BlogEditorForm";

type EditorPageProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: EditorPageProps): Promise<Metadata> {
  return { title: params.id === "new" ? "New Blog" : "Edit Blog" };
}

export default function AdminBlogEditorPage({ params }: EditorPageProps) {
  return <BlogEditorForm blogId={params.id} />;
}
