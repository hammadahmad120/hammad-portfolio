import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description: `${site.shortName} — ${site.title}. ${site.tagline}`,
  openGraph: {
    title: `${site.shortName} | Senior Full Stack Engineer`,
    description: site.tagline,
    type: "website",
  },
};

export default function Page() {
  return <HomePage />;
}
