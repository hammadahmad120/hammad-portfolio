# Frontend

Next.js 14 (App Router) for the portfolio monorepo. Setup, API routes, and admin auth are documented in the [root README](../README.md).

```bash
npm install
npm run dev    # http://localhost:3001
```

Copy `frontend/.env.example` → `.env.local` before running. Public pages use the Express API (`NEXT_PUBLIC_API_URL`); Supabase env vars are for `/admin` login only.
