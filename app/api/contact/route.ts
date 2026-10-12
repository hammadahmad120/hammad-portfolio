import { NextResponse } from "next/server";
import { isContactFormConfigured } from "@/lib/contact";
import { ContactSchema } from "@/lib/schemas";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>";

export async function POST(request: Request) {
  if (!isContactFormConfigured()) {
    return NextResponse.json(
      { error: "The contact form is not configured. Please email me directly." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot filled in: almost certainly a bot. Pretend it worked.
  if (company) {
    return NextResponse.json({ data: { ok: true } });
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(`Resend request failed (${res.status}): ${detail}`);
    return NextResponse.json(
      { error: "Failed to send message. Please email me directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ data: { ok: true } });
}
