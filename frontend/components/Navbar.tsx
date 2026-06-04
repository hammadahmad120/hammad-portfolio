"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_SESSION_EVENT, getAdminSession } from "@/lib/auth";
import { cn } from "@/lib/utils";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const adminLink = { href: "/admin/blogs", label: "Admin" } as const;

function navLinkClassName(isActive: boolean): string {
  return cn(
    "text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
    isActive && "font-medium text-zinc-900 dark:text-zinc-50"
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [showAdminLink, setShowAdminLink] = useState(false);

  useEffect(() => {
    const sync = () => setShowAdminLink(Boolean(getAdminSession()));
    sync();
    window.addEventListener(ADMIN_SESSION_EVENT, sync);
    return () => window.removeEventListener(ADMIN_SESSION_EVENT, sync);
  }, []);

  const links = showAdminLink ? [...publicLinks, adminLink] : publicLinks;

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Hammad Ahmad
        </Link>
        <ul className="flex flex-wrap items-center gap-4 text-sm">
          {links.map(({ href, label }) => {
            const isActive =
              href === "/admin/blogs"
                ? pathname.startsWith("/admin")
                : pathname === href;

            return (
              <li key={href}>
                <Link href={href} className={navLinkClassName(isActive)}>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
