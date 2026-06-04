"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminLogin, verifyAdminSession } from "@/lib/api";
import { setAdminSession } from "@/lib/auth";
import { LoginSchema, type LoginInput } from "@/lib/schemas";

export function AdminLoginForm() {
  const router = useRouter();
  const login = useAdminLogin();
  const [checkingSession, setCheckingSession] = useState(true);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const session = await verifyAdminSession();
      if (cancelled) return;
      if (session) {
        router.replace("/admin/blogs");
        return;
      }
      setCheckingSession(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const onSubmit = handleSubmit(async (values) => {
    const parsed = LoginSchema.safeParse(values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field === "email" || field === "password") {
          setError(field, { message: issue.message });
        }
      }
      return;
    }

    try {
      const session = await login.mutateAsync(parsed.data);
      setAdminSession(session);
      toast.success("Signed in successfully");
      router.replace("/admin/blogs");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign in failed";
      toast.error(message);
    }
  });

  if (checkingSession) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Checking session…</p>
      </div>
    );
  }

  const busy = isSubmitting || login.isPending;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center py-8">
      <Card className="shadow-md">
        <div className="space-y-1">
          <CardTitle>Admin sign in</CardTitle>
          <CardDescription>
            Sign in with your Supabase admin account to manage blogs.
          </CardDescription>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="admin@example.com"
              disabled={busy}
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              disabled={busy}
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <Link
            href="/"
            className="font-medium text-zinc-700 hover:underline dark:text-zinc-300"
          >
            Back to site
          </Link>
        </p>
      </Card>
    </div>
  );
}
