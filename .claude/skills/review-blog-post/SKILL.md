---
name: review-blog-post
description: Review a blog post in content/posts against Florian's writing guidelines and return a numbered list of improvement ideas. Never edits the post. Use when asked to review, proofread or give feedback on a blog post or draft.
argument-hint: "[post slug or path, defaults to the newest post]"
allowed-tools: Read, Glob, Grep
---

# Review a blog post

Act as a co-author for Florian's blog. Read the post carefully and give clear ideas for
what to improve. **Do not change the post.** Do not edit, rewrite, extend or create
files. Only change text if Florian explicitly asks for it in a follow-up message.
Stick to the guidelines below and do not add content outside of them.

## Find the post

- If an argument is given, it is a slug (`move-resources-in-azure`), a folder name or a
  path. Resolve it to `content/posts/<YYYY-MM-DD>-<slug>/index.md`.
- Without an argument, review the post with the newest date in `content/posts/`.
- Read the whole post, including the frontmatter, before giving feedback.

## Output

Return exactly **one numbered list** with all issues (1, 2, 3, …), and nothing else
besides one short opening line naming the post. Each item:

- quotes or names the exact place (heading, paragraph, sentence),
- says what the problem is and which guideline it breaks,
- says concretely what to change (a suggested wording is fine, but as a suggestion).

Order the list by impact: content and structure first, then clarity, then formatting,
then spelling. Skip guidelines the post already meets. Do not pad the list.

## Guidelines

The posts follow the "Cs": Clarity, Conciseness, Coherence and Correctness/Credibility.

### 1. Tone and writing style

- Friendly and educational narrative voice, not overly conventional.
- "I" and "you" perspective where natural and engaging.
- Humor and informal language where appropriate, to keep it approachable and entertaining.
- Balance technical accuracy with accessibility.

### 2. Audience and content type

- Audience: beginner to professional developers, all tech-focused. Flag sections that
  are too technical or too shallow.
- Blog type varies (tutorial, opinion piece, technical deep dive, how-to guide, case
  study). Check that the post is consistent with the type it chose.
- Each post has **one main topic or meaning** the reader takes away.

### 3. Clarity and simple sentences

- The reader understands the message instantly, without confusion.
- Simple language: avoid jargon unless the audience needs it. Plain English.
- Concise: no filler phrases, redundant modifiers or words that add no meaning.
- Average sentence length 12–25 words. Flag weird or overloaded sentences.
- Active voice where possible ("The team launched the product", not "The product was
  launched by the team").
- One idea per paragraph, supported by specific details and examples.

### 4. Structure and storyline

- A clear structure guides the reader from beginning to end, with a logical
  progression of ideas and argumentative consistency throughout.
- Descriptive headings and subheadings that work as signposts for skimming.
- **Beginning:** the post starts with a **TL;DR** section. Inverted pyramid: the most
  important information (the answer or conclusion) first, then supporting details,
  then background.
- Transitions (however, therefore, in addition, for example) connect ideas.
- **End:** a very short **Wrap up** that sums up the whole post and outlines the result
  for the reader.

### 5. Content depth and reasoning

- **New point of view:** the post creates value by adding a new perspective or personal
  experience, not a rehash of the docs. Say so if it does not.
- **Obvious details:** flag sections that explain things that are obvious to the readers.
- **Clear reasoning:** flag places where details or explanations are missing to make a
  point clear, and places with unneeded detail.
- **Examples:** abstract parts are made understandable with practical examples,
  anecdotes or case studies. Flag abstract sections without an example.
- **Technical accuracy:** all technical claims are accurate and verified. Flag anything
  that looks wrong, outdated or unproven.
- **Relevance:** the post has one clear purpose (inform, persuade, entertain). Flag
  parts that do not serve it.

### 6. Readability

- Short paragraphs: **at most 3 sentences**. The article concludes quickly and is a
  nice reading experience.
- Built for skimming: bold, italics, bullet points and numbered lists highlight key
  information.
- Lists of **more than 3 items** use bullet points.
- **Graphics:** point out places where a graphic or diagram would really help. Florian
  marks planned graphics with `<GRAPHIC>`; check that those spots make sense.
- Visual content of all kinds is welcome: code snippets, screenshots, technical examples.

### 7. Text and Markdown

- Grammar and spelling are correct.
- "e.g." is always written in italics: *e.g.*
- No contracted "not": "is not" instead of "isn't", "do not" instead of "don't", etc.
- Important words are **bold**, and bold is used consistently.

### 8. Website and SEO

- Frontmatter has `title`, `date`, `description` and `tags`.
- `description` is 1–2 sentences and under ~160 characters, since it is the search
  result snippet.
- SEO wording: the title and headings use the words people would search for on this
  topic. Suggest which words to adjust.
- The post has no `# H1` heading in the body (the title comes from the frontmatter),
  and headings go in order (`##`, then `###`).
- Images have meaningful alt text and are stored next to `index.md`.
