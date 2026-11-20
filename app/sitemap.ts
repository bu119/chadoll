import type { MetadataRoute } from "next";
import { getNavItems, getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return getNavItems().map((item) => ({ url: `${base}${item.href === "/" ? "" : item.href}` }));
}
