# Portfolio

Full-stack developer portfolio: Next.js 14 (public site + admin), Express API, Supabase (PostgreSQL, Auth, Storage).

See [PROJECT.md](./PROJECT.md) for architecture, API contract, and build order.

## Structure

```
frontend/     Next.js App Router — visitor pages + /admin CMS
backend/      Express API — blogs, contact, uploads
supabase/     SQL migrations (also applied to linked remote project)
```

## Prerequisites

- Node.js 20+
- Supabase project with schema applied (see `supabase/migrations/`)

## Environment

Copy examples and fill in your Supabase + API values:

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

## Development

```bash
# Terminal 1 — API (http://localhost:4000)
cd backend && npm install && npm run dev

# Terminal 2 — site (http://localhost:3001)
cd frontend && npm install && npm run dev
```

Health check: `GET http://localhost:4000/health`

## Regenerate DB types

After schema changes:

```bash
npx supabase gen types typescript --project-id <ref> > frontend/types/database.types.ts
cp frontend/types/database.types.ts backend/src/types/database.types.ts
```

## Current phase

Project structure and dependencies are scaffolded. API routes and UI features return placeholders (`501` / “implementation pending”) until you start the build order in PROJECT.md.
