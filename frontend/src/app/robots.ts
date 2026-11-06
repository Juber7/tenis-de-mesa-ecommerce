import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Only the public HTTPS domain is indexable; local and preview builds are not.
  if (!SITE_URL.startsWith("https://"))
    return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Searches, sorting and pagination stay crawlable so crawlers can read
      // their `noindex, follow` tag; they are not indexed.
      disallow: ["/api/", "/carrito"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
