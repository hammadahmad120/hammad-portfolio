"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAdminSession } from "@/lib/api";

type GuardStatus = "loading" | "allowed" | "denied";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<GuardStatus>("loading");

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const session = await verifyAdminSession();
      if (cancelled) return;

      if (!session) {
        setStatus("denied");
        router.replace("/admin/login");
        return;
      }

      setStatus("allowed");
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Verifying admin access…
        </p>
      </div>
    );
  }

  if (status === "denied") {
    return null;
  }

  return <>{children}</>;
}
