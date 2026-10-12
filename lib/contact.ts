/** Server-side check: the contact form is enabled only when email delivery is configured. */
export function isContactFormConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
}
