"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ADMIN_SESSION_EVENT,
  clearAdminSession,
  getAdminDisplayName,
  getAdminSession,
  type AdminSession,
} from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [session, setSession] = useState<AdminSession | null>(null);

  useEffect(() => {
    if (isLoginPage) {
      setSession(null);
      return;
    }

    const syncSession = () => setSession(getAdminSession());
    syncSession();
    window.addEventListener(ADMIN_SESSION_EVENT, syncSession);
    return () => window.removeEventListener(ADMIN_SESSION_EVENT, syncSession);
  }, [isLoginPage, pathname]);

  const handleSignOut = () => {
    clearAdminSession();
    router.replace("/admin/login");
  };

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Admin
          </span>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href="/admin/blogs"
              className={
                pathname.startsWith("/admin/blogs")
                  ? "font-medium text-zinc-900 dark:text-zinc-50"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              }
            >
              Blogs
            </Link>
            <Link
              href="/admin/contact"
              className={
                pathname.startsWith("/admin/contact")
                  ? "font-medium text-zinc-900 dark:text-zinc-50"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              }
            >
              Contact
            </Link>
            <Link
              href="/"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              View site
            </Link>
            {session ? (
              <>
                <span className="hidden text-zinc-400 sm:inline dark:text-zinc-500">
                  {getAdminDisplayName(session.user)}
                </span>
                <Button type="button" variant="outline" size="sm" onClick={handleSignOut}>
                  Sign out
                </Button>
              </>
            ) : (
              <Link
                href="/admin/login"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
