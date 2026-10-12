import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { buttonVariants } from "@/components/ui/button";
import { isContactFormConfigured } from "@/lib/contact";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.shortName}.`,
};

export default function ContactPage() {
  const formEnabled = isContactFormConfigured();

  return (
    <section className="max-w-lg space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Reach me at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            {site.email}
          </a>
          {formEnabled ? " or use the form below." : "."}
        </p>
      </div>

      {formEnabled ? (
        <ContactForm />
      ) : (
        <a
          href={`mailto:${site.email}`}
          className={cn(buttonVariants({ size: "lg" }), "gap-2")}
        >
          <Mail className="h-4 w-4" aria-hidden />
          Send an email
        </a>
      )}
    </section>
  );
}
