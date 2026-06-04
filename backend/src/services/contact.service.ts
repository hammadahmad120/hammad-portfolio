import { contactSubmissionsRepository } from "../repositories/contactSubmissions.repository";
import type { ContactInput } from "../schemas/contact.schema";
import { AppError } from "../utils/AppError";

function normalizeInput(input: ContactInput): ContactInput {
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    message: input.message.trim(),
  };
}

export const contactService = {
  async submit(input: ContactInput): Promise<void> {
    const normalized = normalizeInput(input);

    const result = await contactSubmissionsRepository.insert({
      name: normalized.name,
      email: normalized.email,
      message: normalized.message,
    });

    if ("error" in result) {
      throw new AppError(500, "Failed to submit contact form");
    }
  },
};
