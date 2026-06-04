# Portfolio Project

## Overview
A full-stack personal developer portfolio with a public-facing website, a database-driven blog with a rich-text editor, and a contact form. Built to showcase projects, writing, and skills.

**Live URL:** (add after deployment)  
**Repo:** (add GitHub URL)  
**Last updated:** June 2026

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Data fetching | React Query (@tanstack/react-query) |
| Form handling | react-hook-form + zod |
| Dark mode | next-themes |
| Toasts | sonner |
| Blog editor | Tiptap |
| Backend | Node.js + Express |
| Validation | zod |
| Security | helmet, cors, express-rate-limit |
| File uploads | multer |
| Database | Supabase (PostgreSQL) |
| File storage | Supabase Storage |
| Auth | Supabase Auth |
| Deployment | Vercel (frontend) + Railway or Render (backend) |

---

## Folder Structure

```
portfolio/
├── .cursorrules
├── PROJECT.md
│
├── frontend/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx                  # Home / hero section
│   │   │   ├── projects/
│   │   │   │   └── page.tsx              # Projects grid
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx              # Blog list with pagination
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx          # Single blog post
│   │   │   └── contact/
│   │   │       └── page.tsx              # Contact form
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.tsx              # Supabase Auth login
│   │   │   └── blogs/
│   │   │       ├── page.tsx              # Manage all blogs
│   │   │       └── [id]/
│   │   │           └── page.tsx          # Tiptap editor for a blog
│   │   ├── layout.tsx                    # Root layout, ThemeProvider, QueryProvider
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                           # Shared primitives (Button, Badge, Card etc.)
│   │   ├── Editor.tsx                    # Tiptap editor wrapper (admin only)
│   │   ├── BlogRenderer.tsx              # Renders Tiptap JSON on public blog pages
│   │   ├── ContactForm.tsx               # Contact form with react-hook-form
│   │   ├── ProjectCard.tsx               # Single project card
│   │   ├── BlogCard.tsx                  # Single blog post card
│   │   └── Navbar.tsx                    # Site navigation
│   ├── lib/
│   │   ├── api.ts                        # All React Query hooks
│   │   ├── schemas.ts                    # Zod schemas (ContactSchema, BlogPostSchema)
│   │   └── supabaseClient.ts             # Supabase browser client (anon key only)
│   ├── types/
│   │   └── database.types.ts             # Auto-generated — never edit manually
│   ├── public/
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── .env.local
│
└── backend/
    └── src/
        ├── index.ts                      # Entry point — middleware + routers
        ├── routes/
        │   ├── contact.ts                # POST /api/contact
        │   ├── blogs.ts                  # GET, POST, PATCH, DELETE /api/blogs
        │   └── upload.ts                 # POST /api/upload
        ├── middleware/
        │   ├── auth.ts                   # Supabase JWT verification
        │   └── rateLimiter.ts            # express-rate-limit config
        ├── lib/
        │   └── supabase.ts               # Service role client — backend only
        ├── types/
        │   └── database.types.ts         # Same generated types as frontend
        ├── tsconfig.json
        ├── package.json
        └── .env
```

---

## Environment Variables

### frontend/.env.local
```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

### backend/.env
```
PORT=4000
SUPABASE_URL=https://<ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
ALLOWED_ORIGIN=http://localhost:3001
```

> Never commit either .env file. Both are in .gitignore.

---

## Database Schema

### contact_submissions
```sql
id          uuid primary key default gen_random_uuid()
name        text not null
email       text not null
message     text not null
status      text default 'unread'       -- unread | read | replied
created_at  timestamptz default now()
```

### blog_posts
```sql
id            uuid primary key default gen_random_uuid()
title         text not null
slug          text unique not null
excerpt       text
cover_url     text                        -- Supabase Storage CDN URL
content       jsonb not null             -- Tiptap JSON doc node
published     boolean default false
published_at  timestamptz
created_at    timestamptz default now()
updated_at    timestamptz default now()
```

### tags
```sql
id    uuid primary key default gen_random_uuid()
name  text not null
slug  text unique not null
```

### blog_post_tags (join table)
```sql
blog_post_id  uuid references blog_posts(id) on delete cascade
tag_id        uuid references tags(id) on delete cascade
primary key (blog_post_id, tag_id)
```

### users (app profile — extends Supabase Auth)
```sql
id              uuid primary key references auth.users(id) on delete cascade
email           text not null
first_name      text
last_name       text
date_of_birth   date
is_admin        boolean not null default false
created_at      timestamptz default now()
updated_at      timestamptz default now()
```

**Where data lives**

| Field | `public.users` (query in app) | `auth.users` (Supabase Auth) |
|---|---|---|
| first_name, last_name, date_of_birth | columns | `raw_user_meta_data` JSON (`first_name`, `last_name`, `date_of_birth`) |
| phone | — | built-in `phone` column (edit in Dashboard → Authentication → Users) |
| email, password | mirrored `email` | Auth only |

You cannot add custom columns to `auth.users`; use `user_metadata` for name/DOB on Auth and `public.users` for SQL/API. New sign-ups copy metadata into `public.users` via trigger (not phone).

Admin login requires `is_admin = true`. Set via SQL after creating the user in Supabase Auth.

### email_queue (reserved — future Resend integration)
```sql
id          uuid primary key default gen_random_uuid()
to_email    text not null
subject     text not null
template    text not null
payload     jsonb
status      text default 'pending'      -- pending | sent | failed
created_at  timestamptz default now()
```

### Supabase Storage
- Bucket name: `blog-images`
- Access: public
- Used for: blog cover images and inline post images uploaded via Tiptap

---

## API Reference

### Public routes (no auth)

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/blogs | List published posts. Query params: `?page=1&limit=10&tag=javascript` |
| GET | /api/blogs/:slug | Single post by slug |
| POST | /api/contact | Submit contact form |

### Admin routes (requires Supabase JWT)

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/blogs | Create new blog post |
| PATCH | /api/blogs/:id | Update post (any field) |
| DELETE | /api/blogs/:id | Delete post |
| POST | /api/upload | Upload image → Supabase Storage → returns `{ url }` |

### Request / response shape

All routes return:
```json
{ "data": <result> }       // success
{ "error": "message" }     // failure
```

HTTP status codes:
- `200` — success (GET, PATCH)
- `201` — created (POST)
- `400` — validation error
- `401` — missing or invalid auth token
- `404` — resource not found
- `500` — server error

---

## React Query Hooks (frontend/lib/api.ts)

| Hook | Method | Endpoint |
|---|---|---|
| `useBlogs(page, tag)` | GET | /api/blogs |
| `useBlog(slug)` | GET | /api/blogs/:slug |
| `useCreateBlog()` | POST | /api/blogs |
| `useUpdateBlog()` | PATCH | /api/blogs/:id |
| `useDeleteBlog()` | DELETE | /api/blogs/:id |
| `useSubmitContact()` | POST | /api/contact |
| `useUploadImage()` | POST | /api/upload |

---

## Zod Schemas (frontend/lib/schemas.ts)

| Schema | Used in |
|---|---|
| `ContactSchema` | ContactForm.tsx + POST /api/contact route |
| `BlogPostSchema` | Tiptap editor form + POST /api/blogs route |
| `UploadSchema` | POST /api/upload route |

---

## Key Decisions & Reasons

- **Tiptap over a CMS** — content stored as jsonb in Supabase, no third-party CMS cost or dependency
- **Separate Express backend** — more control over middleware, rate limiting, and future email queue processing than Next.js API routes
- **Service role key only in backend** — anon key in frontend, service role key never leaves the server
- **React Query over SWR** — better devtools, more control over cache invalidation
- **Supabase Auth for admin** — no separate auth system needed, JWT verified in Express middleware
- **email_queue table added now** — schema is ready for Resend integration later, no migration needed

---

## Development Commands

```bash
# Frontend
cd frontend
npm install
npm run dev          # http://localhost:3001

# Backend
cd backend
npm install
npm run dev          # http://localhost:4000

# Generate Supabase types (run after any schema change)
npx supabase gen types typescript --project-id <ref> > frontend/types/database.types.ts
cp frontend/types/database.types.ts backend/types/database.types.ts
```

---

## Build Order (recommended)

1. Supabase — create tables, storage bucket, enable RLS
2. Generate database.types.ts and copy to both frontend and backend
3. Express backend — index.ts scaffold, then one route at a time
4. Next.js frontend — layout, then one page at a time
5. Tiptap admin editor — last, after all API routes are working

---

## Current Status

| Feature | Status |
|---|---|
| Project setup & folder structure | [x] |
| Supabase schema + RLS | [x] |
| Express server scaffold | [x] |
| POST /api/contact | [x] |
| GET /api/blogs | [ ] |
| GET /api/blogs/:slug | [ ] |
| POST /api/blogs (admin) | [ ] |
| PATCH /api/blogs/:id (admin) | [ ] |
| DELETE /api/blogs/:id (admin) | [ ] |
| POST /api/upload | [ ] |
| Next.js layout + dark mode | [ ] |
| Home page | [ ] |
| Projects page | [ ] |
| Blog list page | [ ] |
| Blog post page | [ ] |
| Contact page | [ ] |
| Admin login page | [ ] |
| Admin blogs list page | [ ] |
| Tiptap editor page | [ ] |
| Framer Motion animations | [ ] |
| SEO + metadata | [ ] |
| Vercel + backend deployment | [ ] |