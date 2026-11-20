import type { MetadataRoute } from "next";
import { getSceneGroups } from "@/lib/gallery";
import { getNavItems, getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const pages = getNavItems().map((item) => item.href);
  const groupPages = getSceneGroups().map((group) => `/moments/${group.id}`);
  return [...pages, ...groupPages].map((path) => ({ url: `${base}${path === "/" ? "" : path}` }));
}
