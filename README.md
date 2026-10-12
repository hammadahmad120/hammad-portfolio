# Hammad Ahmad — Portfolio

Personal developer portfolio built with Next.js 14 (App Router) and Tailwind CSS.
No database, no separate backend: the whole site is one Next.js app that deploys
straight to Vercel.

## Pages

| Route | Description |
| --- | --- |
| `/` | Home — hero, about, skills, experience, education, featured projects |
| `/projects` | Project grid (content in `lib/site.ts`) |
| `/contact` | Email link, plus a contact form when email delivery is configured |
| `/api/contact` | `POST` — sends the contact form by email via Resend |
| `/sitemap.xml`, `/robots.txt` | Generated from the site URL |

Dark mode (`next-themes`), Framer Motion with `prefers-reduced-motion`, and per-page
metadata are in place.

## Project layout

```
app/
  (public)/          Pages: home, projects, contact
  api/contact/       Route handler for the contact form
  layout.tsx         Root layout, fonts, metadata
  sitemap.ts         Sitemap
  robots.ts          robots.txt
components/          UI components (home, ui primitives)
lib/
  site.ts            All profile content: name, skills, experience, projects
  schemas.ts         Zod schema for the contact form
```

## Editing content

- **Profile, skills, experience, projects** — edit `lib/site.ts`.

## Development

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Environment variables

All are optional. See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public origin of the site, e.g. `https://your-domain.com`. Used for metadata, sitemap and robots. Falls back to `VERCEL_URL`. |
| `RESEND_API_KEY` | API key from [Resend](https://resend.com). Enables the contact form. |
| `CONTACT_TO_EMAIL` | Where contact messages are delivered. |
| `CONTACT_FROM_EMAIL` | Sender address on a domain verified in Resend. Defaults to Resend's test sender, which only delivers to your own Resend account email. |

When `RESEND_API_KEY` or `CONTACT_TO_EMAIL` is missing, `/contact` shows only the
email link and `/api/contact` responds with `503`.

## Deploying to Vercel

1. Push the repository to GitHub and import it at <https://vercel.com/new>.
   Vercel detects Next.js; no build settings are needed.
2. In the project's **Settings → Environment Variables**, add the variables above
   (at least `NEXT_PUBLIC_SITE_URL` set to your domain).
3. In **Settings → Domains**, add your domain and update DNS as instructed
   (an `A` record to Vercel's IP for the apex, a `CNAME` to `cname.vercel-dns.com`
   for `www`).
4. For the contact form, verify the same domain in Resend and set
   `CONTACT_FROM_EMAIL` to an address on it.

Every push to `main` triggers a new deployment.
