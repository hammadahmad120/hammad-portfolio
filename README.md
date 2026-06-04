# Portfolio

Personal developer portfolio: public site (Next.js 14), admin CMS (Tiptap + Supabase Auth), and Express API backed by Supabase (PostgreSQL, Storage).

Architecture, schema details, and conventions: [PROJECT.md](./PROJECT.md)

## What's implemented

### Public site (`frontend`, port **3001**)

| Route | Description |
| --- | --- |
| `/` | Home — hero, skills, experience, education, projects preview |
| `/projects` | Project grid (content from `frontend/lib/site.ts`) |
| `/blog` | Published posts with infinite scroll and tag filter (`?tag=<slug>`) |
| `/blog/[slug]` | Single post — Tiptap JSON rendered via `BlogRenderer`, SEO metadata |
| `/contact` | Contact form → `POST /api/contact` |

Dark mode (`next-themes`), Framer Motion (with `prefers-reduced-motion`), and per-page metadata are in place.

Blog tags: assign labels in the admin editor; the public `/blog` page loads tags from `GET /api/tags` and filters posts via chip buttons (URL `?tag=<slug>` → `GET /api/blogs?tag=…`).

### Admin (`/admin`)

| Route | Description |
| --- | --- |
| `/admin/login` | Email/password via `POST /api/auth/login` (Supabase Auth + `is_admin` check) |
| `/admin/blogs` | List, publish toggle, delete posts |
| `/admin/blogs/[id]` | Create/edit with Tiptap (`Editor.tsx`), cover upload, slug, excerpt, and comma-separated tags |
| `/admin/contact` | Paginated contact submissions (filter by last N days) |

Protected routes use `AdminGuard` and a JWT stored in the browser session. Public pages talk to the **Express API only**; Supabase anon client is used for admin login/session, not for public blog reads.

### Backend (`backend`, port **4000**)

Layered layout: `routes` → `controllers` → `services` → `repositories`, Zod validation in `schemas/`, `{ data }` / `{ error }` responses.

| Method | Endpoint | Auth | Status |
| --- | --- | --- | --- |
| `GET` | `/health` | — | Live |
| `POST` | `/api/contact` | — | Live |
| `GET` | `/api/blogs` | — | Live (`?page=&limit=&tag=`) |
| `GET` | `/api/blogs/:slug` | — | Live |
| `GET` | `/api/tags` | — | Live |
| `POST` | `/api/auth/login` | — | Live |
| `GET` | `/api/auth/me` | Admin JWT | Live |
| `PATCH` | `/api/auth/me` | Admin JWT | Live |
| `GET` | `/api/admin/posts` | Admin JWT | Live |
| `GET` | `/api/admin/posts/:id` | Admin JWT | Live |
| `POST` | `/api/admin/posts` | Admin JWT | Live (optional `tags[]` on create) |
| `PATCH` | `/api/admin/posts/:id` | Admin JWT | Live (optional `tags[]` replaces post tags) |
| `DELETE` | `/api/admin/posts/:id` | Admin JWT | Live |
| `GET` | `/api/admin/contact-submissions` | Admin JWT | Live (`?days=&page=&limit=`) |
| `POST` | `/api/upload` | Admin JWT | Live → `blog-images` bucket |
| `POST` / `PATCH` / `DELETE` | `/api/blogs` | Admin JWT | Stubs (`501`) — use `/api/admin/posts` instead |

### Database (`supabase/migrations/`)

Tables: `contact_submissions`, `blog_posts`, `tags`, `blog_post_tags`, `email_queue`, `users` (profile + `is_admin`). RLS enabled; public read on published posts and tags. Storage bucket `blog-images` (public).

## Repo layout

```
frontend/          Next.js App Router — (public) pages + /admin CMS
backend/           Express API
supabase/          SQL migrations
PROJECT.md         Full API contract & schema reference
```

```
backend/src/
  controllers/     HTTP handlers
  services/        Business logic
  repositories/    Supabase queries
  routes/          Public routers (+ routes/admin/)
  schemas/         Zod (Zod 4)
  middleware/      auth, rate limiting
  lib/             Supabase service-role client
  types/           database.types.ts (generated)
```

## Prerequisites

- Node.js 20+
- Supabase project with migrations applied (`supabase/migrations/`)
- Admin user in Supabase Auth with `public.users.is_admin = true` (see [PROJECT.md](./PROJECT.md#users-app-profile--extends-supabase-auth))

## Environment

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

**frontend/.env.local**

- `NEXT_PUBLIC_API_URL` — e.g. `http://localhost:4000`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — admin auth only

**backend/.env**

- `PORT` — default `4000`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- `ALLOWED_ORIGIN` — e.g. `http://localhost:3001`

Never commit `.env` or `.env.local`.

## Development

From the repo root (optional shortcuts):

```bash
npm run dev:backend    # http://localhost:4000
npm run dev:frontend   # http://localhost:3001
```

Or run each app directly:

```bash
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
```

Health check: `GET http://localhost:4000/health`

Production builds:

```bash
npm run build:backend   # outputs backend/dist
npm run build:frontend  # next build
```

## Regenerate DB types

After schema changes:

```bash
npx supabase gen types typescript --project-id <ref> > frontend/types/database.types.ts
cp frontend/types/database.types.ts backend/src/types/database.types.ts
```

## Not yet / partial

- **Deployment** — Vercel (frontend) + Railway/Render (backend) not configured in-repo
- **Email** — `email_queue` table reserved; no Resend integration

For the full feature checklist and build history, see **Current Status** in [PROJECT.md](./PROJECT.md).
