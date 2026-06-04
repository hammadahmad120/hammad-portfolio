import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export type BlogCardPost = {
  slug: string;
  title: string;
  excerpt?: string | null;
  cover_url?: string | null;
  publishedAt?: string | null;
  tags?: string[];
};

function formatPublishedDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(
    new Date(value)
  );
}

export function BlogCard({
  slug,
  title,
  excerpt,
  cover_url,
  publishedAt,
  tags,
}: BlogCardPost) {
  return (
    <Card className="overflow-hidden p-0">
      <Link href={`/blog/${slug}`} className="block">
        {cover_url ? (
          <div className="relative aspect-[16/9] w-full bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={cover_url}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        ) : null}
        <div className="space-y-2 p-6">
          {publishedAt ? (
            <time
              dateTime={publishedAt}
              className="text-xs text-zinc-500 dark:text-zinc-400"
            >
              {formatPublishedDate(publishedAt)}
            </time>
          ) : null}
          <CardTitle>{title}</CardTitle>
          {excerpt ? <CardDescription>{excerpt}</CardDescription> : null}
          {tags && tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </Card>
  );
}
