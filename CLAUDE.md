# Hammad Ahmad — Portfolio

Personal developer portfolio. **Single Next.js 14 (App Router) app, no database, no
separate backend.** Deploys straight to Vercel on the owner's custom domain.

History: this started as a monorepo (Next.js + Express + Supabase + Tiptap admin CMS
+ blog). On 2026-10-12 it was collapsed to Next.js only; the blog and admin were
removed deliberately. Do not reintroduce a backend, database, or blog unless asked.
See `CHANGELOG.md`.

## Stack

Next.js 14.2 · React 18 · TypeScript (strict) · Tailwind CSS 3 · Framer Motion ·
next-themes (dark mode) · react-hook-form + Zod 4 (contact form) · sonner (toasts) ·
lucide-react (icons) · class-variance-authority + tailwind-merge (`cn()` helper).

## Layout

```
app/
  layout.tsx            Root layout: Inter font, metadataBase, Providers
  (public)/layout.tsx   Navbar + <main> container
  (public)/page.tsx     Home (renders components/home/HomePage.tsx)
  (public)/projects/    Projects grid
  (public)/contact/     Email link; ContactForm only when email is configured
  api/contact/route.ts  POST → sends email via Resend REST API (no SDK)
  sitemap.ts, robots.ts, not-found.tsx
components/
  home/                 HomePage, SectionHeading
  ui/                   badge, button (cva + buttonVariants), card, input, label, textarea
  ContactForm.tsx, Navbar.tsx, ProjectCard.tsx, providers.tsx
lib/
  site.ts               ALL profile content (name, skills, experience, education,
                        projects, social links) + getSiteUrl()
  schemas.ts            ContactSchema (Zod) — shared by form and API route
  contact.ts            isContactFormConfigured()
  motion.ts             Framer Motion variants: fadeUp, staggerContainer, sectionTransition
  utils.ts              cn()
```

## Commands

```bash
npm run dev         # http://localhost:3000
npm run build       # must pass before committing
npm run lint
npm run typecheck   # tsc --noEmit
```

If `tsc` reports errors under `.next/types/` for routes that no longer exist, delete
`.next/` and re-run (stale generated types).

## Environment (all optional, see .env.example)

- `NEXT_PUBLIC_SITE_URL` — site origin for metadata/sitemap/robots; falls back to `VERCEL_URL`.
- `RESEND_API_KEY` + `CONTACT_TO_EMAIL` — when both set, `/contact` shows the form and
  `/api/contact` sends email. Otherwise the page shows only the mailto button and the
  route returns 503. `CONTACT_FROM_EMAIL` must be on a Resend-verified domain.
- Never commit `.env` or `.env*.local`.

## Conventions

- **Content lives in `lib/site.ts`.** To change profile text, skills, experience, or
  projects, edit that file; do not hardcode copy in components.
- App Router only. Server components by default; add `"use client"` only for hooks or
  browser APIs. Keep `metadata` exports on every page.
- Use `next/link` for internal links and `next/image` for images. External links use
  `target="_blank" rel="noopener noreferrer"`.
- Tailwind only: no inline styles, no CSS modules, no hardcoded hex. Mobile-first.
  Every color utility needs a `dark:` counterpart (zinc palette throughout).
- Framer Motion: reuse variants from `lib/motion.ts`; always honor `useReducedMotion()`.
  Page-level sections use `initial={false}` so content is visible before hydration.
- Forms: react-hook-form + Zod schema in `lib/schemas.ts`; validate on the server too.
- API routes return `{ data }` on success and `{ error: string }` on failure with
  semantic status codes (400 validation, 502 upstream failure, 503 not configured).
- Naming: components PascalCase, hooks `useX`, Zod schemas `XSchema`, `type` over
  `interface`, explicit return types on exported functions.
- Keep dependencies minimal. Prefer plain `fetch` over SDKs for one-off HTTP calls.

## Git

Commit only when asked. Run `npm run build` first. Keep `CHANGELOG.md` updated for
structural changes.
