import type { MetadataRoute } from "next";
import { getTags } from "@/lib/gallery";
import { getNavItems, getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const pages = getNavItems().map((item) => item.href);
  const tagPages = getTags().map((tag) => `/moments/${tag.id}`);
  return [...pages, ...tagPages].map((path) => ({ url: `${base}${path === "/" ? "" : path}` }));
}
