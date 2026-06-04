import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section className="max-w-lg space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Reach me at{" "}
          <a
            href="mailto:hammad.shahid120@gmail.com"
            className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            hammad.shahid120@gmail.com
          </a>{" "}
          or use the form below.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
