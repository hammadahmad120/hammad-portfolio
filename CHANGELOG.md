# Changelog

## 2026-11-02 — In-page navigation with scroll spy

- Navbar links are now Home, About, Work, Experience, Stack, Contact, all anchors on
  the home page (`/#about` etc.). `components/useActiveSection.ts` highlights the
  section in view; nothing is highlighted on other pages. Section ids added in
  `HomePage.tsx`, `AboutBento.tsx`, `StackMarquee.tsx`; `Reveal` accepts an `id`.

## 2026-11-02 — Success stories (revamp task 3)

- Home "Selected projects" grid replaced by `components/home/SuccessStories.tsx`: five
  stories from `site.stories` (Aqari, Lebara, Mega Cloud, Zerodocs, Educative.io), each
  a composite image beside a tagline, short description, and one highlight result,
  sides alternating. Placed directly under the InstantBot spotlight, which is trimmed to
  a teaser; Experience moves below the stories. The `/projects` page and `ProjectCard`
  are unchanged.
- Composite images in `public/stories/*.webp` (3200×2000) were rendered with headless
  Chrome from an HTML "blueprint" template: dark grid, title block, numbered modules,
  attribute list, stack chips, and cropped screenshots in browser/phone frames with
  solid redaction bars over customer names and IDs. Lebara is an original mock (the
  site geo-blocks screenshots) and is labelled illustrative. Raw screenshots moved to
  `assets/story-sources/` and gitignored.

## 2026-11-02 — Accomplishment-based experience copy (revamp task 4)

- Every experience entry in `lib/site.ts` rewritten as three result-first bullets
  (metrics supplied by the owner); timeline design unchanged.

## 2026-11-02 — Stack marquee (revamp task 2)

- "Skills & tools" cards replaced by `components/home/StackMarquee.tsx`: three looping
  rows of logo pills (Frontend & UI, Backend/data/infra, AI / LLM) driven by
  `site.stackRows`. CSS keyframes, pauses on hover, static under reduced motion.
- 34 brand SVGs added under `public/logos/tech/` (Simple Icons; AWS and Azure from
  Devicon). `SkillGroup`/`site.skills` removed.

## 2026-11-02 — Pinned hero and About bento (revamp task 1)

- Hero pins to the viewport on large, tall screens (`pin:` screen in Tailwind) and
  softly blurs/dims while the About bento, a content-width bordered panel, scrolls
  over it (`components/home/PinnedHero.tsx`). Hero and bento share a pin container,
  so the hero leaves with the panel. Smaller or shorter viewports keep normal flow.
- New About bento (`components/home/AboutBento.tsx`) replaces the separate stats
  strip and "Two tracks" section: stats row, two track tiles, Core stack logos,
  Current focus ring (RAG, Agentic AI, Python, Guardrails, MCP, pgvector, LLMs,
  Evals) and How I work. Content added to `lib/site.ts` (`coreStack`, `focusRing`,
  `howIWork`); stack logos added to `components/icons.tsx` from Simple Icons.
- Page container, navbar and footer widened from `max-w-5xl` to `max-w-7xl`; `body`
  clips horizontal overflow so the hero glow cannot add a horizontal scrollbar.
- `SectionHeading` accepts an `id`.

## 2026-10-12 — Visual redesign

- Teal accent colour, Geist display font, dot-grid and glow backgrounds.
- New hero: availability pill, headline, résumé download, social icon buttons,
  stats strip. CSS keyframe entrance so it paints without JavaScript.
- Sticky navbar with theme toggle and mobile menu; new footer.
- InstantBot spotlight section with a mock chat UI, and a dedicated case study page
  at `/projects/instantbot`.
- Skills as grouped cards, experience as a timeline with a "Current" marker,
  project cards with Live/Code links, restyled education and CTA sections.
- Scroll-in reveals (`whileInView`), generated Open Graph image and favicons.
- Content updated from the October 2026 résumé.

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
