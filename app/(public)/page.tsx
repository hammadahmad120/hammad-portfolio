import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${site.shortName} — ${site.title}`,
  },
  description: `${site.headline} ${site.tagline}`,
  openGraph: {
    title: `${site.shortName} — ${site.title}`,
    description: site.headline,
    type: "website",
    images: ["/opengraph-image"],
  },
};

export default function Page() {
  return <HomePage />;
}
