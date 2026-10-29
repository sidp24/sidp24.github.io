import fs from "node:fs";
import path from "node:path";

export type NoteMeta = {
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  draft?: boolean;
};

export type Note = NoteMeta & { slug: string };

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

// Drafts are listed in `next dev` (or with SHOW_DRAFTS=1). In production they
// are still built, so static export always has at least one /notes/[slug] page,
// but they stay out of every listing and are marked noindex. The MDX is public in
// the repo anyway, so there's nothing to hide by not building them.
const showDrafts = process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "1";

export async function getNotes({ includeDrafts = showDrafts } = {}): Promise<Note[]> {
  const slugs = fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  const notes = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = (await import(`@/content/notes/${slug}.mdx`)) as { metadata: NoteMeta };
      return { slug, ...metadata };
    }),
  );

  return notes.filter((n) => includeDrafts || !n.draft).sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
