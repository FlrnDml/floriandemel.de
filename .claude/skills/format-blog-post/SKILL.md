---
name: format-blog-post
description: Format a blog post in content/posts so it follows one standard Markdown rule set (markdownlint defaults, CommonMark/GFM). Fixes links, images, headings, lists, emphasis, code blocks and whitespace in place, adds verified links to mentioned books, articles and tools, never changes the wording, then reports briefly what changed. Use when asked to format, lint, clean up or tidy the Markdown of a blog post.
argument-hint: "[post slug or path to index.md]"
allowed-tools: Read, Edit, Glob, Grep, AskUserQuestion, WebSearch, WebFetch, Bash(npx --yes markdownlint-cli2:*), Bash(npm run build)
---

# Format a blog post

Bring the Markdown of one blog post in line with the rule set below. This skill changes
**form, not content**: the posts are hand-written by Florian, so never rephrase
sentences, fix the argument, add or remove content, or "improve" wording. The only exception is references to mentioned works (links,
official title and author spelling, "by <author>"), see below. Spelling,
grammar and style feedback belong to `/review-blog-post`, not here.

## 1. Find the post

- If an argument is given, it is a slug (`move-resources-in-azure`), a folder name or a
  path. Resolve it to `content/posts/<YYYY-MM-DD>-<slug>/index.md`.
- Without an argument, **ask** which post to format (use AskUserQuestion with the newest
  posts in `content/posts/` as options). Do not guess.
- Only files under `content/posts/` are formatted. Never touch `content/notes/`.
- Read the whole file, including the frontmatter, and list the files in the post folder
  (images) before changing anything.

## 2. Apply the rule set

The rule set is markdownlint with its default rules, configured in
[.markdownlint.jsonc](.markdownlint.jsonc) next to this file. In short:

### Links

- **Inline style only:** `[link text](https://example.com/path)`. Convert reference
  links (`[text][1]` + `[1]: url`), autolinks (`<https://…>`) and bare URLs to inline
  links (MD034, MD054).
- **Bare URLs:** turn the words right before or around the URL that name the target into
  the link text, and remove the URL and its brackets. Example:
  `the Staff Engineer's Path (https://…) by …` → `[the Staff Engineer's Path](https://…) by …`.
  If no words name the target, report it instead of inventing text.
- **No angle brackets** around the URL (`(<url>)` → `(url)`), unless it contains spaces.
- **Link text is trimmed** (MD039) and does not contain the sentence's closing
  punctuation: `[Read the docs.](url)` → `[Read the docs](url).`
- **URLs:** use `https://` when the site supports it, remove tracking parameters
  (`utm_*`, `fbclid`, `gclid`), keep everything else as it is (paths, `?tabs=…`,
  `#anchors`, locale like `en-us`).
- **Internal links** to other posts use the root-relative path `/blog/<slug>`, never the
  full `https://floriandemel.de/…` URL or the folder name with the date.
- **Empty or broken syntax** (`[text]()`, `[](url)`, missing bracket) is fixed if the
  intent is clear, otherwise reported (MD042, MD011).
- **Non-descriptive link text** ("here", "this", "link", "read more", MD059) is
  **reported, not reworded**, since that would change the text.

### Mentioned books, articles, talks and tools

Every named work in the text gets a valid link and one consistent reference style, even
if the post has no link for it yet.

- **Find them:** books, articles, papers, talks, podcasts, courses, tools and
  services mentioned by name. Generic mentions ("a great book about DDD") are reported,
  not guessed.
- **Find the link:** use WebSearch, then open the page with WebFetch to make sure it
  loads and is about exactly that work. Prefer, in this order:
  1. the official page (publisher or author website, official docs, the talk
     recording on the conference channel),
  2. a neutral catalog page (*e.g.* O'Reilly, the publisher's shop page).

  Never use affiliate links, link shorteners, pirated copies or paywalled mirrors.
  If no page can be verified, leave the text unlinked and report it.
- **Check existing links** to such works the same way and replace dead links (report
  the old and new URL).
- **Reference style:**
  - Books, papers and courses: title in italics as the link text, followed by the author:
    `[*The Staff Engineer's Path*](https://…) by Tanya Reilly`
  - Articles, blog posts and talks: title in double quotes as the link text, followed by the
    author: `["Continuous Integration"](https://…) by Martin Fowler`
  - Tools and services: the plain name as link text: `[Kudu](https://…)`
- **Title and author** use the official spelling and capitalization from the verified
  page. Add the author with "by …" if the post does not name one yet, and remove the
  then redundant brackets or URL. List every such correction in the report.
- Link a work only at its **first mention** in the post; later mentions stay plain text
  (titles still in italics or quotes).

### Images

All images are part of the repository and are uploaded as they are; never resize,
convert, rename or move image files.

- **Syntax:** `![Alt text](./file-name.png)`. Fix image references written as normal
  links (`[alt](<file.png>)` → `![alt](./file.png)`) and add the `./` prefix.
- **Location:** the file must exist next to `index.md`. Check it with Glob, matching
  the exact file name and case. Report missing files; do not create or download any.
- **Alt text** is required (MD045). If it is empty or a file name
  (`tl-devs-corporate`), write a short, plain description based on the file name and
  the surrounding text and mention it in the report so Florian can adjust it.
- An image stands in its own paragraph, with a blank line before and after.
- Image files in the folder that are not referenced anywhere are **reported**, not
  deleted.

### Frontmatter

- Keep the order `title`, `date`, `description`, `tags`, `draft`.
- `title` and `description` in double quotes, `date` as `YYYY-MM-DD` without quotes,
  `tags` as an inline list in lowercase: `tags: [azure, devops]`.
- Do not change values (title, description text, `draft` status). Only report when the
  description is longer than ~160 characters or a required field is missing.

### Headings

- ATX style only (`## Heading`), one space after the `#`, no closing `#` (MD003,
  MD018–MD021).
- No `# H1` in the body; the title comes from the frontmatter. Body headings start at
  `##` and never skip a level (MD001, MD025). Fix the level, not the words.
- No trailing punctuation like `:` or `.` (MD026). Question marks are fine.
- Blank line before and after every heading (MD022), no indentation (MD023).

### Lists

- Unordered lists use `-` (MD004). Ordered lists use `1.`, `2.`, `3.` in order (MD029).
- One space after the marker (MD030), nested lists indented by 2 spaces for `-` and by
  3 spaces under `1.` (MD007).
- Blank line before and after a list (MD032). No blank lines between items of a tight
  list.

### Emphasis

- Bold is `**text**`, italics `*text*` (MD049, MD050). No spaces inside the markers
  (MD037).
- *e.g.* and *i.e.* are always written in italics.
- A line that is only bold text and acts as a heading is **reported** (MD036), not
  converted, since it changes the structure.

### Code

- Code blocks are fenced with three backticks and always have a language
  (`bash`, `yaml`, `json`, `ts`, `dockerfile`, `text`, …) (MD040, MD046, MD048).
- Blank line before and after a code block (MD031).
- Commands, file names, paths, CLI flags, environment variables and resource names in
  running text are inline code: `npm run build`, `next.config.js`. Only wrap clear
  cases; never change the code itself.
- No `$ ` prompt in front of commands without output (MD014).

### Tables and other blocks

- Tables have a header row, leading and trailing pipes, and a blank line around them
  (MD055, MD056, MD058).
- Block quotes use `> ` on every line, without blank lines inside (MD027, MD028).
- Horizontal rules are `---` (MD035).
- Placeholders like `<GRAPHIC>` stay where they are.

### Whitespace

- No trailing spaces (MD009), no hard tabs outside code (MD010).
- At most one blank line in a row (MD012). The file ends with exactly one newline (MD047).
- One paragraph per line; do not hard-wrap prose.
- Straight quotes inside code; leave typographic quotes and apostrophes in prose as they
  are.

## 3. Check

1. Optionally lint the post with the rule set. If the command is not allowed or fails to
   run, skip it and say so in the report:
   `npx --yes markdownlint-cli2 --config .claude/skills/format-blog-post/.markdownlint.jsonc <path>`
   Fix the remaining findings that are formatting; report the rest.
2. Run `npm run build` to make sure the post (frontmatter and images) still builds.
3. Diff your changes mentally against the original: if any sentence reads differently
   than before, undo that change.

## 4. Report

Keep it short. One opening line naming the post, then:

- **Changed:** a grouped list of what was fixed, with counts
  (*e.g.* "Links: converted 2 bare URLs to inline links, moved punctuation out of 3
  link texts").
- **References:** each added or replaced link to a book, article, talk or tool, with
  the URL and any corrected title or author spelling.
- **Please check:** things that need Florian's decision, each with the line or heading
  (generated alt texts, works that could not be linked, non-descriptive link texts, missing images, unused images,
  bold lines used as headings, long description).
- **Build:** passed or failed (with the error), and whether the lint ran.

Skip empty groups. Do not commit.
