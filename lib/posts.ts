import { posts, type Post } from "#site/content";

export type { Post };

export type PostSummary = Pick<Post, "slug" | "title" | "date" | "description">;

/** Published posts, newest first. Drafts are only listed in `next dev`. */
export function getPosts(): Post[] {
  const showDrafts = process.env.NODE_ENV === "development";
  return posts
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function formatDate(date: string, month: "short" | "long" = "short") {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month,
    day: month === "long" ? "numeric" : undefined,
    timeZone: "UTC",
  });
}
