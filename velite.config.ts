import { defineCollection, defineConfig, s } from "velite";

/**
 * Blog posts live in content/posts/<YYYY-MM-DD>-<slug>/index.md.
 * Images placed next to index.md and referenced relatively are copied
 * to public/blog-assets at build time.
 *
 * Everything else in content/ (e.g. content/notes) is never published.
 */
const posts = defineCollection({
  name: "Post",
  pattern: "posts/*/index.md",
  schema: s
    .object({
      title: s.string().max(120),
      date: s.isodate(),
      description: s.string().max(300),
      tags: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      path: s.path({ removeIndex: false }),
      metadata: s.metadata(),
      content: s.markdown(),
    })
    .transform(({ path, ...post }) => {
      // "posts/2025-10-26-my-post/index" -> "my-post"
      const folder = path.split("/").at(-2) ?? "";
      return { ...post, slug: folder.replace(/^\d{4}-\d{2}-\d{2}-/, "") };
    }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/blog-assets",
    base: "/blog-assets/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
});
