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

## Design system

- **Accent colour**: `accent` = Tailwind `teal` (aliased in `tailwind.config.ts`).
  Use `accent-600` on light, `accent-400/500` on dark. Everything else is `zinc`.
- **Fonts**: Inter (`font-sans`, body), Geist (`font-display`, headings; local file
  in `app/fonts/`), Geist Mono (`font-mono`, dates and pipeline labels).
- **Brand icons**: Lucide 1.x has none; GitHub and LinkedIn are inline SVGs in
  `components/icons.tsx`.
- **Motion**: the hero uses CSS keyframes (`animate-fade-up` + `animationDelay`) so it
  paints without JS. Below-the-fold sections use `components/home/Reveal.tsx`
  (Framer `whileInView`, once). Both honour reduced motion.
- **Generated assets**: `app/opengraph-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`
  are rendered with `next/og`; there is no static favicon.
- **Résumé**: `public/Hammad_Ahmad_Resume.pdf`, linked via `site.resumeUrl`. Replace the
  file to update it.

## Layout

```
app/
  layout.tsx            Root layout: Inter font, metadataBase, Providers
  (public)/layout.tsx   Navbar + <main> container
  (public)/page.tsx     Home (renders components/home/HomePage.tsx)
  (public)/projects/    Featured product card + project grid
  (public)/projects/instantbot/  InstantBot case study (content: site.featuredProduct)
  (public)/contact/     Email link; ContactForm only when email is configured
  api/contact/route.ts  POST → sends email via Resend REST API (no SDK)
  sitemap.ts, robots.ts, not-found.tsx, opengraph-image.tsx, icon.tsx, apple-icon.tsx
components/
  home/                 HomePage (server), Hero, InstantBotPreview (mock chat UI),
                        Reveal (scroll-in wrapper), SectionHeading
  ui/                   badge, button (cva + buttonVariants), card, input, label, textarea
  ContactForm.tsx, Navbar.tsx (sticky, theme toggle, mobile menu), Footer.tsx,
  ThemeToggle.tsx, ProjectCard.tsx, icons.tsx, providers.tsx
lib/
  site.ts               ALL profile content: headline, availability, stats, skills
                        (grouped), experience, education, featuredProduct (InstantBot
                        + case study copy), projects, social links, resumeUrl,
                        getSiteUrl()
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

**Never run `next build` or delete `.next/` while the user's `next dev` server may be
running** — dev and build share `.next/`, and clobbering it breaks the dev server
("Cannot find module './NNN.js'") until it is restarted. For verification builds use a
separate output dir:

```bash
NEXT_DIST_DIR=.next-build npm run build
NEXT_DIST_DIR=.next-build npx next start -p 3100
```

If `tsc` reports errors under `.next/types/` for routes that no longer exist, that is
stale generated types; ask the user to restart dev rather than deleting `.next/`.

## Environment (all optional, see .env.example)

- `NEXT_PUBLIC_SITE_URL` — site origin for metadata/sitemap/robots; falls back to `VERCEL_URL`.
- `RESEND_API_KEY` + `CONTACT_TO_EMAIL` — when both set, `/contact` shows the form and
  `/api/contact` sends email. Otherwise the page shows only the mailto button and the
  route returns 503. `CONTACT_FROM_EMAIL` must be on a Resend-verified domain.
- Never commit `.env` or `.env*.local`.

## Positioning (important — settled after three iterations)

Hammad has **7+ years of full-stack web experience** and, **since early 2026**, has
been building **AI-powered products** (InstantBot). The portfolio must work for three
audiences at once: pure web roles, web + AI roles, and AI product roles.

Rejected framings: "I build production AI applications" (reads as pure AI dev);
"web platforms and the AI features that ship with them" (reads as web dev adding AI);
"AI product engineer, end to end" (overstates AI tenure, hides web depth).

Accepted structure (do not collapse it back into a single-identity headline):
- Hero headline: "7+ years shipping production web platforms. Now building AI-powered
  products on top of that." Title: "Senior Full-Stack Engineer · Building AI-powered
  products". AI phrase gets the gradient highlight.
- "Two tracks, one engineer" section (`site.tracks`): Web platforms (7+ years) and
  AI-powered products (Since 2026) as equal cards, each with proof and a link.
- Home order: Hero, Two tracks, InstantBot spotlight, Experience (`#experience`),
  Skills, Projects, Education, CTA.
- Skills order: Frontend, Backend & Data, AI / LLM (badge "Current focus"), Tools.
- Projects page groups: "AI-powered products" (featured InstantBot) then "Web
  platforms & tools" (Aqari first). `ProjectEntry.category` drives the grouping.
- Describe AI tenure honestly ("since 2026"); never claim it as the job title.

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
