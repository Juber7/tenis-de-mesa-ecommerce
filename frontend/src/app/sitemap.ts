import type { MetadataRoute } from "next";
import { fetchProducts } from "@/lib/catalog";
import { productCategories } from "@/lib/categories";
import { absoluteUrl, LEGAL_PAGES, LEGAL_UPDATED_AT } from "@/lib/site";

// Regenerated at most every hour so new Sanity products appear without a deploy.
export const revalidate = 3600;

// Next.js writes these URLs into the XML as-is, so a raw "&" (Sanity image
// URLs carry "?w=1200&fit=max&auto=format") makes Google reject the whole
// sitemap with a parse error.
const XML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};
const xmlUrl = (url: string) => url.replace(/[&<>"']/g, (c) => XML_ENTITIES[c]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchProducts({ per_page: "1000" })
    .then((r) => r.products)
    .catch(() => []);
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/tienda"), changeFrequency: "daily", priority: 0.9 },
    ...productCategories.map((c) => ({
      url: xmlUrl(absoluteUrl(`/tienda?categoria=${c.value}`)),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: xmlUrl(absoluteUrl(`/producto/${p.slug}`)),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      ...(p.image ? { images: [xmlUrl(p.image)] } : {}),
    })),
    { url: absoluteUrl("/contacto"), changeFrequency: "yearly", priority: 0.4 },
    ...LEGAL_PAGES.map((page) => ({
      url: absoluteUrl(page.href),
      lastModified: LEGAL_UPDATED_AT,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
