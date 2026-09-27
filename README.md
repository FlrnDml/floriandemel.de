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
