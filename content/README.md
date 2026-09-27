# Content

Everything the website shows from Markdown lives here.

```
content/
├── posts/     published on floriandemel.de/blog/<slug>
└── notes/     private notes (values, prompts), never published
```

Only `content/posts/*/index.md` is read by the website (see `velite.config.ts`).
Everything else in this folder stays in the repo only.

## Write a new post

1. Create a folder `content/posts/YYYY-MM-DD-my-post-slug/` with an `index.md`.
   The part after the date becomes the URL: `/blog/my-post-slug`.
2. Start the file with this header:

   ```md
   ---
   title: "My Post Title"
   date: 2026-01-15
   description: "One or two sentences, shown in search results and link previews."
   tags: [azure]
   draft: true
   ---

   ## TL;DR
   ...
   ```

3. Put images next to `index.md` and reference them relatively:
   `![Deployment slots overview](./slots.png)`. They are copied and hashed at build time.
4. Run `npm run dev` and open http://localhost:3000. Drafts are visible in dev only.
5. When done, set `draft: false`, commit and deploy.

A missing title, a bad date or a too long description fails the build with a clear
error, so broken posts never go live.
