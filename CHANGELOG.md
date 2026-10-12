# Changelog

## 2026-10-12 — Next.js-only rewrite

Restructured the project from a monorepo (Next.js frontend + Express API +
Supabase) into a single Next.js app that deploys directly to Vercel.

### Removed
- Express backend (`backend/`) and all `/api/*` calls to it.
- Supabase: database migrations (`supabase/`), generated types, browser client,
  storage bucket usage and Auth.
- Admin CMS (`/admin/*`): login, blog editor (Tiptap), contact submissions list.
- Blog (`/blog`, `/blog/[slug]`) and its tag filtering. Can be re-added later as
  Markdown files or a CMS if needed.
- React Query data layer.
- `PROJECT.md` and `API.md` (described the old architecture).

### Changed
- Next.js app moved from `frontend/` to the repository root.
- Contact form posts to a Next.js Route Handler (`/api/contact`) that sends email
  through Resend's REST API. The form is only shown when `RESEND_API_KEY` and
  `CONTACT_TO_EMAIL` are set; otherwise the page shows the email link.
- Dates are formatted with a fixed locale and time zone to avoid hydration
  mismatches.

### Added
- `sitemap.xml` and `robots.txt` generated from `NEXT_PUBLIC_SITE_URL`.
- `metadataBase` and default Open Graph metadata.
- Custom 404 page.
