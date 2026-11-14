/**
 * Kept apart from lib/posts.ts so page components can format dates without
 * pulling the Velite content into the client bundle. That way, content edits
 * are server-only changes and `next dev` refetches the page props.
 */
export function formatDate(date: string, month: "short" | "long" = "short") {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month,
    day: month === "long" ? "numeric" : undefined,
    timeZone: "UTC",
  });
}
