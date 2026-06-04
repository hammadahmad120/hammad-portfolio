import { generateHTML } from "@tiptap/html";
import type { JSONContent } from "@tiptap/core";
import type { Json } from "@/types/database.types";
import { getTiptapContentExtensions } from "@/lib/tiptapExtensions";

type BlogRendererProps = {
  content: Json;
};

export function BlogRenderer({ content }: BlogRendererProps) {
  const html = generateHTML(content as JSONContent, getTiptapContentExtensions());

  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
