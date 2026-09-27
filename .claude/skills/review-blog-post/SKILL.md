---
name: review-blog-post
description: Review a blog post in content/posts against Florian's writing guidelines and return a numbered list of improvement ideas. Never edits the post. Use when asked to review, proofread or give feedback on a blog post or draft.
argument-hint: "[post slug or path, defaults to the newest post]"
allowed-tools: Read, Glob, Grep
---

# Review a blog post

Review one blog post and return improvement ideas. **Do not change the post.** Do not
edit, rewrite or create files. Only read and answer.

## Find the post

- If an argument is given, it is a slug (`move-resources-in-azure`), a folder name or a
  path. Resolve it to `content/posts/<YYYY-MM-DD>-<slug>/index.md`.
- Without an argument, review the post with the newest date in `content/posts/`.
- Read the whole post, including the frontmatter, before giving feedback.

## Output

Return exactly **one numbered list**, nothing else besides one short opening line naming
the post. Each item:

- quotes or names the exact place (heading, paragraph, sentence),
- says what the problem is and which guideline it breaks,
- says concretely what to change (a suggested wording is fine, but as a suggestion).

Order the list by impact: content and structure first, then clarity, then formatting,
then spelling. Skip guidelines the post already meets. If the post has no issues for a
guideline, do not mention it. Do not pad the list.

## Guidelines

The posts follow the "Cs": Clarity, Conciseness, Coherence and Correctness/Credibility.

### 1. Clarity and simple sentences

- The reader understands the message instantly, without confusion.
- Simple language: avoid jargon unless the audience needs it. Plain English.
- Concise: no filler phrases, redundant modifiers or words that add no meaning.
- Average sentence length 12–25 words. Flag overloaded or oddly built sentences.
- Active voice where possible ("The team launched the product", not "The product was
  launched by the team").
- One idea per paragraph, supported by specific details and examples.

### 2. Storyline and structure

- A clear structure guides the reader from beginning to end.
- Logical outline with a clear progression of ideas.
- Descriptive headings and subheadings that work as signposts for skimming.
- Inverted pyramid: the most important information (the answer or conclusion) first,
  then supporting details, then background. The post starts with a **TL;DR**.
- Transitions (however, therefore, in addition, for example) connect ideas.
- The post ends with a short **wrap up** summarizing the result for the reader.

### 3. Focus on the reader

- Written for the audience: beginner to professional developers. Flag sections that
  are too technical or too shallow, and sections that explain the obvious.
- One clear purpose (inform, persuade, entertain). Flag parts that do not serve it.
- Adds a new point of view or personal experience, not a rehash of the docs.
- Stories, anecdotes, case studies or real examples make abstract parts concrete.
  Flag abstract sections without an example.
- Technical claims are accurate. Flag anything that looks wrong or outdated.

### 4. Readability

- Short paragraphs: at most 3 sentences.
- Built for skimming: bold, italics, bullet points and numbered lists highlight key
  information. Lists of more than 3 items use bullet points.
- Point out places where a graphic or diagram would really help.

### 5. Text and Markdown

- Grammar and spelling are correct.
- "e.g." is always written in italics: *e.g.*
- No contracted "not": "is not" instead of "isn't", "do not" instead of "don't", etc.
- Important words are **bold**, and bold is used consistently.

### 6. Website and SEO

- Frontmatter has `title`, `date`, `description` and `tags`.
- `description` is 1–2 sentences and under ~160 characters, since it is the search
  result snippet.
- The title and headings use the words people would search for on this topic.
  Suggest better keywords where it helps.
- The post has no `# H1` heading in the body (the title comes from the frontmatter),
  and headings go in order (`##`, then `###`).
- Images have meaningful alt text and are stored next to `index.md`.
