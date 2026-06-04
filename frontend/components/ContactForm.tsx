"use client";

import { useForm } from "react-hook-form";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/lib/api";
import { fadeUp, sectionTransition } from "@/lib/motion";
import { ContactSchema, type ContactInput } from "@/lib/schemas";

const MESSAGE_MAX = 5000;

export function ContactForm() {
  const submitContact = useSubmitContact();
  const prefersReducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    defaultValues: { name: "", email: "", message: "" },
  });

  const messageLength = watch("message").length;

  const onSubmit = handleSubmit(async (values) => {
    const parsed = ContactSchema.safeParse({
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      message: values.message.trim(),
    });

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field === "name" || field === "email" || field === "message") {
          setError(field, { message: issue.message });
        }
      }
      return;
    }

    try {
      await submitContact.mutateAsync(parsed.data);
      reset();
      toast.success("Message sent — I'll get back to you soon.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to send message";
      toast.error(message);
    }
  });

  const busy = isSubmitting || submitContact.isPending;

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-4"
      noValidate
      initial={prefersReducedMotion ? false : "hidden"}
      animate={prefersReducedMotion ? undefined : "visible"}
      variants={fadeUp}
      transition={sectionTransition}
    >
      <div className="space-y-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          disabled={busy}
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
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
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="contact-message">Message</Label>
          <span
            className="text-xs text-zinc-500 dark:text-zinc-400"
            aria-live="polite"
          >
            {messageLength}/{MESSAGE_MAX}
          </span>
        </div>
        <Textarea
          id="contact-message"
          rows={6}
          placeholder="What would you like to discuss?"
          disabled={busy}
          aria-invalid={Boolean(errors.message)}
          className="min-h-[140px] resize-y"
          {...register("message")}
        />
        {errors.message ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" className="w-full sm:w-auto" disabled={busy}>
        {busy ? "Sending…" : "Send message"}
      </Button>
    </motion.form>
  );
}
