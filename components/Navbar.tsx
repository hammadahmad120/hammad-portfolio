"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <nav
        className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6"
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-xs font-bold text-white dark:bg-accent-500 dark:text-zinc-950"
            aria-hidden="true"
          >
            HA
          </span>
          <span>{site.shortName}</span>
        </Link>

        <ul className="hidden items-center gap-1 sm:flex">
          {links.map(({ href, label }) => {
            const isActive = isActivePath(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
                    isActive &&
                      "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "hidden gap-1.5 sm:inline-flex"
            )}
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            Résumé
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 sm:hidden dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-zinc-200 sm:hidden dark:border-zinc-800"
        >
          <ul className="mx-auto max-w-5xl space-y-1 px-4 py-3">
            {links.map(({ href, label }) => {
              const isActive = isActivePath(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900",
                      isActive &&
                        "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Résumé
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
