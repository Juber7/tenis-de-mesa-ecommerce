import { z } from "zod";
import type { Product } from "@/types/product";
import { productCategories } from "./categories";
import { filterProducts } from "./product-filters";

const apiVersion = "2025-02-19";
const productsQuery = `*[_type == "product" && defined(slug.current) && defined(price)] | order(_createdAt desc, name asc) {
  _id, name, "slug": slug.current, price, salePrice, category, description,
  inStock, maxQuantity, "images": images[defined(asset)]{ "url": asset->url, alt }
}`;
const amount = z.number().finite().nonnegative();
const schema = z.object({
  _id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  price: amount,
  salePrice: amount.nullish(),
  category: z.string().nullish(),
  description: z.string().nullish(),
  inStock: z.boolean().nullish(),
  maxQuantity: z.number().int().nullish(),
  images: z
    .array(z.object({ url: z.string().url(), alt: z.string().nullish() }))
    .nullish(),
});
// Prices are edited in dollars and stored in cents to keep totals exact.
const toMinor = (value: number) => {
  const minor = Math.round(value * 100);
  if (!Number.isSafeInteger(minor)) throw new Error("Precio inválido en Sanity.");
  return minor;
};
export function normalizeProduct(raw: unknown): Product {
  const p = schema.parse(raw);
  const regularPrice = toMinor(p.price);
  const salePrice = p.salePrice == null ? null : toMinor(p.salePrice);
  const onSale = salePrice !== null && salePrice < regularPrice;
  const category = productCategories.find((c) => c.value === p.category);
  const gallery = (p.images ?? []).map((image) => ({
    src: image.url + "?w=1200&fit=max&auto=format",
    thumb: image.url + "?w=200&fit=max&auto=format",
    alt: image.alt || p.name,
  }));
  return {
    id: p._id,
    slug: p.slug,
    name: p.name,
    description: p.description ?? "",
    image: gallery[0]?.src ?? "",
    imageAlt: gallery[0]?.alt ?? p.name,
    gallery,
    price: onSale ? salePrice : regularPrice,
    regularPrice,
    currency: "USD",
    minorUnit: 2,
    categories: category ? [{ name: category.label, slug: category.value }] : [],
    inStock: p.inStock ?? true,
    purchasable: true,
    hasOptions: false,
    maxQuantity: Math.min(99, Math.max(1, p.maxQuantity ?? 10)),
    onSale,
  };
}
async function fetchCatalog(fresh: boolean): Promise<Product[]> {
  const projectId = process.env.SANITY_PROJECT_ID ?? "";
  const dataset = process.env.SANITY_DATASET || "production";
  if (!/^[a-z0-9]+$/.test(projectId) || !/^[a-z0-9_-]+$/.test(dataset))
    throw new Error("Configura SANITY_PROJECT_ID y SANITY_DATASET.");
  // The CDN host is cached; checkout uses the live API to see current prices.
  const url = new URL(
    `https://${projectId}.${fresh ? "api" : "apicdn"}.sanity.io/v${apiVersion}/data/query/${dataset}`,
  );
  url.searchParams.set("query", productsQuery);
  url.searchParams.set("perspective", "published");
  const response = await fetch(url, {
    signal: AbortSignal.timeout(12000),
    ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: 60 } }),
  });
  if (!response.ok) throw new Error(`Sanity respondió HTTP ${response.status}`);
  const body = (await response.json()) as { result?: unknown };
  if (!Array.isArray(body.result))
    throw new Error("Sanity no devolvió una lista de productos.");
  return body.result.map(normalizeProduct);
}
export async function fetchProducts(
  query: Record<string, string> = {},
  fresh = false,
): Promise<{ products: Product[]; totalPages: number; total: number }> {
  return filterProducts(await fetchCatalog(fresh), query);
}
export async function getProduct(slug: string) {
  return (await fetchProducts({ slug })).products[0] ?? null;
}
