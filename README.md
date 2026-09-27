# floriandemel.de

Personal website for Florian Demel.

## Overview

This repository contains the source code for [floriandemel.de](https://floriandemel.de), a personal website with a short profile and my blog.

## Content with Velite

Blog posts are Markdown files in [`content/posts`](content/README.md).
[Velite](https://velite.js.org) (`velite.config.ts`) reads them at build time, checks the
frontmatter against a schema, converts the Markdown to HTML and writes typed data to
`.velite/`. Pages import it via `#site/content`. `npm run dev` and `npm run build` run
Velite automatically.

## Analytics with Umami

The site uses [Umami](https://umami.is) (Umami Cloud) for privacy-friendly, cookieless
analytics. No cookies, no personal data, no cookie banner needed; it is listed in the
Datenschutzerklärung. The script is loaded in `pages/_app.tsx` and only counts visits on
`floriandemel.de`, so local development does not show up in the stats.

Umami counts page views automatically, including client-side navigation. On top of that,
`lib/analytics.ts` sends a few custom events (see *Events* in the Umami dashboard):

| Event           | Data               | Meaning                                                              |
| --------------- | ------------------ | -------------------------------------------------------------------- |
| `time-on-page`  | `path`, `seconds`  | How long the page was visible, sent once when leaving or hiding it   |
| `read-article`  | `path`             | The reader scrolled to the end of a blog post                        |
| `outbound-link` | `url`, `from`      | A link to another website was clicked                                |

Visitors from LinkedIn and other sites appear under *Referrers*; add UTM parameters
(e.g. `?utm_source=linkedin&utm_campaign=<slug>`) to shared links to tell posts apart.

## Development

### Prerequisites

- Node.js (v20.16)
- NPM

### Setup

```bash
# Clone the repository
git clone https://github.com/username/floriandemel.de.git

# Change into the project directory
cd floriandemel.de

# Install dependencies
npm install

# Start the development server
npm run dev
```

See [content/README.md](content/README.md) for how to write a new post.
