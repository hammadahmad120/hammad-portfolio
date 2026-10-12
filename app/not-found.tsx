import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            The page you are looking for does not exist or has moved.
          </p>
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Back to home
          </Link>
        </div>
      </main>
    </>
  );
}
