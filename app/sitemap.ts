import type { MetadataRoute } from "next";
import { nav, site } from "@/content/site";
import { getNotes } from "@/lib/notes";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await getNotes();
  const pages = notes.length > 0 ? nav : nav.filter((i) => i.href !== "/notes/");
  const routes = ["/", ...pages.map((i) => i.href), ...notes.map((n) => `/notes/${n.slug}/`)];
  return routes.map((path) => ({ url: `${site.url}${path}` }));
}
