import type { MetadataRoute } from "next";
import { fetchProducts } from "@/lib/catalog";
import { productCategories } from "@/lib/categories";
import { absoluteUrl, LEGAL_PAGES, LEGAL_UPDATED_AT } from "@/lib/site";

// Regenerated at most every hour so new Sanity products appear without a deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetchProducts({ per_page: "1000" })
    .then((r) => r.products)
    .catch(() => []);
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/tienda"), changeFrequency: "daily", priority: 0.9 },
    ...productCategories.map((c) => ({
      url: absoluteUrl(`/tienda?categoria=${c.value}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: absoluteUrl(`/producto/${p.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      ...(p.image ? { images: [p.image] } : {}),
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
