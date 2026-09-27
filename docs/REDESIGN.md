# Redesign sketch: profile + blog in one repo

Status: idea collection. No code changes yet beyond removing the project pages.

## 1. Goals

- A white, minimal page: short profile at the top, then a list of blog articles.
- No hero image, no typewriter animation, no editor/explorer chrome.
- One repository for the website **and** the blog posts (merge `FlrnDml/blog` into this repo).
- Articles are rendered on floriandemel.de itself, typed end to end with TypeScript.
- Keep the current hosting: Next.js static export (`output: 'export'`) on GitHub Pages.

## 2. Page sketch

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│   Florian Demel                                      │
│   Platform Engineer. Cloud, architecture, Azure.     │
│   Email · LinkedIn · GitHub                          │
│                                                      │
│   ──────────────────────────────────────────────     │
│                                                      │
│   Writing                                            │
│                                                      │
│   Nov 2025   How to Dockerize a Next.js App (2025)   │
│   Nov 2025   How to move resources between subs...   │
│   Nov 2025   How to use App Service Deployment Slots │
│   Oct 2025   How to Pass AZ-104 or Any Other Azure…  │
│                                                      │
│   ──────────────────────────────────────────────     │
│   Impressum · Datenschutz                            │
└──────────────────────────────────────────────────────┘

/blog/<slug>   one column, ~680px wide, same header name as a back link
```

Design notes:

- Single centered column, `max-width: ~680px`, generous line height (1.6–1.7).
- Colors: white background, near-black text (`#111`), one grey (`#6b6b6b`) for dates/meta,
  one accent only for links (or none, just underline).
- Normal page scrolling (drop `overflow: hidden` on `body`).
- Optional later: dark mode via `prefers-color-scheme`, same two tokens inverted.

## 3. Font ideas (all SIL Open Font License, free for commercial use)

| Option | Feel | Pairing for code blocks |
| --- | --- | --- |
| **Inter** | Neutral, very clean, safe default | JetBrains Mono |
| **Geist** (Vercel) | Modern, sleek, slightly technical | Geist Mono |
| **IBM Plex Sans** | Engineering look, a bit of character | IBM Plex Mono |
| **Source Serif 4** (body) + Inter (headings) | Editorial, great for long reads | JetBrains Mono |

Load them with `next/font` (`next/font/google` or the `geist` package). The font files are
downloaded at build time and served from floriandemel.de, so visitors never hit Google's
servers. That keeps the Datenschutz page simple (no Google Fonts disclosure).

Suggestion: **Geist + Geist Mono** for the sleek look, or **Inter** if you want it plainer.

## 4. Merging the repositories

Target layout:

```
floriandemel.de/
├── content/
│   ├── posts/
│   │   ├── 2025-10-26-how-to-azure-certs/
│   │   │   └── index.md
│   │   ├── 2025-11-02-app-service-staging/
│   │   │   ├── index.md
│   │   │   └── staging-slots.png
│   │   └── ...
│   └── notes/            IDEAS.md, PROCESS.md, VALUES.md, PROMTS.md (not published)
├── components/
├── pages/
│   ├── index.tsx         profile + post list
│   └── blog/[slug].tsx   article page
├── velite.config.ts
└── ...
```

Steps (history of both repos is preserved):

```bash
# in floriandemel.de, on a new branch
git remote add blog https://github.com/FlrnDml/blog
git fetch blog main
git subtree add --prefix=content blog main   # blog history ends up under content/
git remote remove blog
```

Then, in a follow-up commit, tidy the content:

- Give every post its own folder named `YYYY-MM-DD-slug/index.md`
  (today `architecture/25-12-12_…md` has no folder, and `move-resources` has a
  mismatching file name `move-resource`).
- `architecture/25-12-12_know-to-build-a-platform-team.md` is still a brainstorming draft:
  mark it `draft: true` so it is skipped on the site.
- Rename images to something descriptive (`2025-12-29_14-14.png` → `staging-slots.png`).
- Move `IDEAS.md`, `PROCESS.md`, `VALUES.md`, `PROMTS.md` to `content/notes/`.
- **Watch out:** this repo's `.gitignore` ignores `GEMINI.md`, but the blog repo tracks one.
  Decide whether to keep it (remove the ignore rule) or drop it.
- Afterwards archive `FlrnDml/blog` on GitHub (read-only) with a README pointing here.

## 5. Tooling: Velite

[Velite](https://velite.js.org) turns the Markdown folder into typed data. Posts are checked
against a Zod schema at build time, so a missing title or bad date fails the build instead
of the page.

Frontmatter to add at the top of each post (they have none today):

```md
---
title: How to Pass AZ-104 or Any Other Azure Certificate
date: 2025-10-26
description: A pattern-based approach to preparing for Azure exams.
tags: [azure, certification]
devto: https://dev.to/flrndml/...   # optional, link to the cross-post
draft: false                        # true = not published
---
```

`velite.config.ts`:

```ts
import { defineConfig, defineCollection, s } from "velite";

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/index.md",
  schema: s.object({
    title: s.string().max(120),
    date: s.isodate(),
    description: s.string().optional(),
    tags: s.array(s.string()).default([]),
    devto: s.string().url().optional(),
    draft: s.boolean().default(false),
    slug: s.path().transform((p) => p.split("/").at(-2)!.slice(11)),
    content: s.markdown(), // HTML; images are copied to public/static/
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
});
```

Wiring:

- `package.json`: `"dev": "velite --watch & next dev"`, `"build": "velite && next build"`.
- `tsconfig.json`: `"paths": { "#site/content": ["./.velite"] }`, add `.velite` to `.gitignore`.
- `pages/index.tsx`: `import { posts } from "#site/content"`, filter out drafts, sort by date, render the list.
- `pages/blog/[slug].tsx`: `getStaticPaths` / `getStaticProps` from `posts`, render
  `post.content` as HTML. Works with the static export.
- Code highlighting: add `rehype-pretty-code` (Shiki) as a Velite rehype plugin.
  Build-time only, no client JavaScript.

Alternatives considered: **Content Collections** (very similar, also fine), **Contentlayer**
(unmaintained, avoid), **Astro** (great fit for a blog, but a full migration).

## 6. Publishing flow afterwards

Updated `PROCESS.md`:

1. Write the post in `content/posts/<date>-<slug>/index.md`, open a PR.
2. Merge → GitHub Pages deploys floriandemel.de/blog/<slug>.
3. Cross-post to dev.to and Medium with the **canonical URL** set to floriandemel.de,
   so search engines credit your own domain.
4. Short notice on X.

Nice extras for later: RSS feed (`/rss.xml` generated from `posts`), Open Graph tags per post
via the existing `SEO` component, reading time.

## 7. Suggested order of PRs

1. ✅ Remove project pages (this PR).
2. Minimal white design + font: strip Explorer/Editor/Typewriter/hero image, new `index.css`.
3. Merge blog repo via `git subtree`, tidy folders, add frontmatter.
4. Add Velite, post list on the start page, `/blog/[slug]` pages.
5. Extras: RSS, syntax highlighting, dark mode, archive the old blog repo.
