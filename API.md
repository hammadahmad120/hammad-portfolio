# API Reference

Base URL: `http://localhost:4000` (or `NEXT_PUBLIC_API_URL` in production)

## Backend architecture

The Express API uses a layered layout under `backend/src/`:

| Layer | Role |
|---|---|
| **Routes** | Endpoint definitions, middleware (auth, rate limits, multer) |
| **Controllers** | Request/response, Zod validation, HTTP status mapping |
| **Services** | Business logic and orchestration |
| **Repositories** | Supabase/PostgreSQL queries only |

Shared Zod schemas live in `backend/src/schemas/`. Infrastructure (CORS, helmet, Supabase client) stays in `middleware/` and `lib/`.

---

All routes return JSON:

```json
{ "data": <result> }
{ "error": "message" }
```

---

## Health

### `GET /health`

**Response `200`**

```json
{ "data": { "status": "ok" } }
```

---

## Auth (public)

### `POST /api/auth/login`

Admin sign-in via Supabase Auth (email + password). Returns JWTs for use on protected routes (`Authorization: Bearer <access_token>`).

**Request body**

```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Response `200`**

```json
{
  "data": {
    "access_token": "<jwt>",
    "refresh_token": "<jwt>",
    "expires_in": 3600,
    "expires_at": 1710000000,
    "user": {
      "id": "<uuid>",
      "email": "admin@example.com",
      "first_name": "Muhammad",
      "last_name": "Ahmad",
      "date_of_birth": "1995-06-15",
      "phone": "+923244112700",
      "is_admin": true
    }
  }
}
```

`user` is loaded from `public.users` (name, DOB, `is_admin`) plus `phone` from `auth.users`.

### `GET /api/auth/me` (admin, Bearer token)

Returns the signed-in admin profile (same `user` shape as login).

**Response `200`**

```json
{
  "data": {
    "id": "<uuid>",
    "email": "admin@example.com",
    "first_name": "Muhammad",
    "last_name": "Ahmad",
    "date_of_birth": "1995-06-15",
    "phone": "+923244112700",
    "is_admin": true
  }
}
```

**Response `401`** — missing/invalid token  
**Response `403`** — not an admin  
**Response `404`** — no `public.users` row for this auth user

### `PATCH /api/auth/me` (admin, Bearer token)

Updates profile fields. Writes `first_name`, `last_name`, `date_of_birth` to `public.users` and syncs them to Auth `user_metadata`. Writes `phone` only to `auth.users`.

**Request body** (at least one field)

```json
{
  "first_name": "Muhammad",
  "last_name": "Ahmad",
  "date_of_birth": "1995-06-15",
  "phone": "+923244112700"
}
```

`date_of_birth` and `phone` may be `null` to clear.

**Response `200`** — `{ "data": <profile> }` (same shape as `GET /api/auth/me`)  
**Response `400`** — validation failed  
**Response `401`** / **403`** — as above  
**Response `500`** — update failed

**Response `400`** — validation failed

```json
{ "error": "Invalid email or password" }
```

**Response `401`** — wrong credentials

```json
{ "error": "Invalid email or password" }
```

**Response `403`** — credentials valid but admin check failed

```json
{ "error": "Not authorized for admin access" }
```

Or if there is no `public.users` row:

```json
{ "error": "Admin profile not found. Add a public.users row for this account." }
```

Admin access requires a row in `public.users` (linked to `auth.users.id`) with `is_admin = true`. New auth users get a profile row automatically with `is_admin = false`. Promote an admin in the SQL editor:

```sql
UPDATE public.users SET is_admin = true WHERE email = 'your-admin@example.com';
```

For auth users created before this migration, insert the profile first if missing:

```sql
INSERT INTO public.users (id, email, is_admin)
SELECT id, email, true FROM auth.users WHERE email = 'your-admin@example.com'
ON CONFLICT (id) DO UPDATE SET is_admin = true;
```

**Response `429`** — rate limit exceeded

```json
{ "error": "Too many login attempts, please try again later." }
```

---

## Contact (public)

### `POST /api/contact`

Submit a contact message. Stored in `contact_submissions` with `status = 'unread'`. Rate limited to 10 requests per hour per IP.

**Request body**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello, I'd like to work together."
}
```

| Field | Rules |
|---|---|
| `name` | string, 1–200 chars (trimmed before insert) |
| `email` | valid email, max 320 chars (trimmed, lowercased) |
| `message` | string, 1–5000 chars (trimmed before insert) |

**Response `201`**

```json
{ "data": { "ok": true } }
```

**Response `400`** — validation failed

```json
{ "error": "Invalid contact data" }
```

**Response `429`** — rate limit exceeded

```json
{ "error": "Too many contact submissions, please try again later." }
```

**Response `500`** — database insert failed

```json
{ "error": "Failed to submit contact form" }
```

---

## Blogs (public)

No authentication required. Only posts with `published = true` are returned.

### `GET /api/blogs`

Paginated list of published posts, newest `published_at` first.

**Query parameters**

| Param | Default | Notes |
|---|---|---|
| `page` | `1` | 1-based page number |
| `limit` | `10` | Max 100 per page |
| `tag` | — | Filter by tag slug (e.g. `javascript`) |

**Response `200`**

```json
{
  "data": {
    "items": [
      {
        "id": "<uuid>",
        "title": "My post",
        "slug": "my-post",
        "excerpt": "Short summary",
        "cover_url": null,
        "published_at": "2026-06-01T10:00:00.000Z",
        "tags": [{ "name": "JavaScript", "slug": "javascript" }]
      }
    ],
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

**Response `400`** — invalid query parameters  
**Response `500`** — database error

### `GET /api/blogs/:slug`

Single published post by URL slug. Includes Tiptap `content` JSON for rendering.

**Response `200`**

```json
{
  "data": {
    "id": "<uuid>",
    "title": "My post",
    "slug": "my-post",
    "excerpt": "Short summary",
    "cover_url": null,
    "content": { "type": "doc", "content": [] },
    "published_at": "2026-06-01T10:00:00.000Z",
    "tags": [{ "name": "JavaScript", "slug": "javascript" }]
  }
}
```

**Response `400`** — invalid slug  
**Response `404`** — no published post with that slug  
**Response `500`** — database error

---

## Admin contact submissions (admin, Bearer token)

All routes require `Authorization: Bearer <access_token>` from `POST /api/auth/login`. Non-admin users receive **403**.

### `GET /api/admin/contact-submissions`

Paginated list of contact form submissions from the last N calendar days (rolling window from request time), newest `created_at` first.

**Query parameters**

| Param | Required | Default | Notes |
|---|---|---|---|
| `days` | yes | — | Integer 1–365 (e.g. `7`, `30`, `90`) |
| `page` | no | `1` | 1-based page number |
| `limit` | no | `10` | Max 100 per page |

**Response `200`**

```json
{
  "data": {
    "items": [
      {
        "id": "<uuid>",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "message": "Hello, I'd like to work together.",
        "status": "unread",
        "created_at": "2026-06-04T12:00:00.000Z"
      }
    ],
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "days": 30
  }
}
```

**Response `400`** — invalid or missing query parameters (e.g. missing `days`)

```json
{ "error": "Invalid query parameters" }
```

**Response `401`** — missing or invalid token  
**Response `403`** — authenticated but not admin  
**Response `500`** — database error

```json
{ "error": "Failed to list contact submissions" }
```

---

## Admin posts (admin, Bearer token)

All routes require `Authorization: Bearer <access_token>` from `POST /api/auth/login`. Non-admin users receive **403**.

### `GET /api/admin/posts`

List all posts (drafts and published), newest `updated_at` first.

**Response `200`**

```json
{
  "data": [
    {
      "id": "<uuid>",
      "title": "My post",
      "slug": "my-post",
      "excerpt": "Short summary",
      "cover_url": null,
      "content": { "type": "doc", "content": [] },
      "published": false,
      "published_at": null,
      "created_at": "2026-06-01T10:00:00.000Z",
      "updated_at": "2026-06-01T10:00:00.000Z"
    }
  ]
}
```

**Response `401`** / **403** — auth failures  
**Response `500`** — database error

### `GET /api/admin/posts/:id`

Fetch a single post by UUID.

**Response `200`** — `{ "data": <post> }` (same shape as list item)  
**Response `400`** — invalid UUID  
**Response `404`** — post not found  
**Response `401`** / **403** / **500** — as above

### `POST /api/admin/posts`

Create a new post.

**Request body**

```json
{
  "title": "My post",
  "slug": "my-post",
  "excerpt": "Optional summary",
  "cover_url": "https://example.com/cover.jpg",
  "content": { "type": "doc", "content": [{ "type": "paragraph" }] },
  "published": false
}
```

| Field | Required | Notes |
|---|---|---|
| `title` | yes | 1–300 chars |
| `slug` | yes | unique, 1–300 chars |
| `content` | yes | Tiptap JSON doc |
| `excerpt` | no | max 500 chars |
| `cover_url` | no | valid URL or `null` |
| `published` | no | default `false`; sets `published_at` when `true` |

**Response `201`** — `{ "data": <post> }`  
**Response `400`** — validation failed  
**Response `409`** — duplicate slug  
**Response `401`** / **403** / **500** — as above

### `PATCH /api/admin/posts/:id`

Update any subset of fields. At least one field required.

**Request body** (partial)

```json
{
  "title": "Updated title",
  "published": true
}
```

Setting `published` from `false` to `true` sets `published_at` to now. Setting `published` to `false` clears `published_at`.

**Response `200`** — `{ "data": <post> }`  
**Response `400`** — invalid id or body  
**Response `404`** — post not found  
**Response `409`** — duplicate slug  
**Response `401`** / **403** / **500** — as above

### `DELETE /api/admin/posts/:id`

**Response `200`**

```json
{ "data": { "id": "<uuid>" } }
```

**Response `400`** — invalid UUID  
**Response `404`** — post not found  
**Response `401`** / **403** / **500** — as above

---

## Blogs (legacy admin stubs on `/api/blogs`)

These remain unimplemented; use `/api/admin/posts` instead.

### `POST /api/blogs` · `PATCH /api/blogs/:id` · `DELETE /api/blogs/:id`

**Response `501`** — not implemented (scaffold)

---

## Upload (admin)

### `POST /api/upload` (Bearer token)

Upload an image to the public Supabase Storage bucket `blog-images`.

**Content-Type:** `multipart/form-data`  
**Field name:** `file` (required)

**Constraints**

| Rule | Value |
|---|---|
| Max size | 5 MB |
| Allowed types | JPEG, PNG, GIF, WebP |

**Response `200`**

```json
{
  "data": {
    "url": "https://<ref>.supabase.co/storage/v1/object/public/blog-images/<uuid>.jpg"
  }
}
```

**Response `400`** — missing file, wrong field name, unsupported type, or file too large

```json
{ "error": "Invalid file. Allowed types: JPEG, PNG, GIF, WebP (max 5 MB)." }
```

**Response `401`** / **403** — auth failures (same as admin posts)  
**Response `500`** — storage upload failed
