import Link from "next/link";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { site } from "@/lib/site";

const pages = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

const connect = [
  { label: "GitHub", href: site.social[0].href, Icon: GitHubIcon },
  { label: "LinkedIn", href: site.social[1].href, Icon: LinkedInIcon },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="font-display text-base font-semibold">{site.name}</p>
            <p className="max-w-xs text-sm text-zinc-600 dark:text-zinc-400">
              {site.title}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">{site.location}</p>
          </div>

          <div className="flex gap-16">
            <nav aria-label="Footer">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Pages
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {pages.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={site.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    Résumé
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Connect
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {connect.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="inline-flex items-center gap-2 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
