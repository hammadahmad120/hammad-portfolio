import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email").max(320),
  message: z.string().min(1, "Message is required").max(5000),
  /** Honeypot. Hidden in the UI; real users leave it empty. */
  company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;
