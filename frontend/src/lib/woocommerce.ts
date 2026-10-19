import { z } from "zod";
import { decode } from "he";
import type { Product } from "@/types/product";
import { demoProducts } from "./demo";
import { filterProducts } from "./product-filters";

const integerPrice = z
  .string()
  .regex(/^\d+$/)
  .transform(Number)
  .refine(Number.isSafeInteger);
const schema = z.object({
  id: z.number().int(),
  slug: z.string(),
  name: z.string(),
  description: z.string().default(""),
  prices: z.object({
    price: integerPrice,
    regular_price: integerPrice,
    currency_code: z.string().regex(/^[A-Z]{3}$/),
    currency_minor_unit: z.number().int().min(0).max(6),
  }),
  images: z.array(
    z.object({ src: z.string().url(), alt: z.string().default("") }),
  ),
  categories: z
    .array(z.object({ id: z.number(), name: z.string(), slug: z.string() }))
    .default([]),
  is_in_stock: z.boolean(),
  is_purchasable: z.boolean(),
  has_options: z.boolean().default(false),
  on_sale: z.boolean(),
  add_to_cart: z.object({ maximum: z.number().optional() }).optional(),
});
export const isDemo = () => !process.env.WOOCOMMERCE_URL;
export function normalizeProduct(raw: unknown): Product {
  const p = schema.parse(raw);
  return {
    id: p.id,
    slug: p.slug,
    name: decode(p.name),
    description: decode(p.description.replace(/<[^>]*>/g, " ")),
    image: p.images[0]?.src ?? "",
    imageAlt: decode(p.images[0]?.alt || p.name),
    price: p.prices.price,
    regularPrice: p.prices.regular_price,
    currency: p.prices.currency_code,
    minorUnit: p.prices.currency_minor_unit,
    categories: p.categories,
    inStock: p.is_in_stock,
    purchasable: p.is_purchasable,
    hasOptions: p.has_options,
    maxQuantity: Math.min(99, Math.max(1, p.add_to_cart?.maximum ?? 99)),
    onSale: p.on_sale,
  };
}
export async function fetchProducts(
  query: Record<string, string> = {},
  fresh = false,
): Promise<{ products: Product[]; totalPages: number; total: number }> {
  const base = process.env.WOOCOMMERCE_URL;
  if (!base) {
    return filterProducts(demoProducts, query);
  }
  const url = new URL(
    `${base.replace(/\/$/, "")}/wp-json/wc/store/v1/products`,
  );
  if (!["https:", "http:"].includes(url.protocol))
    throw new Error("URL de WooCommerce inválida.");
  Object.entries({ per_page: "24", ...query }).forEach(([k, v]) =>
    url.searchParams.set(k, v),
  );
  const response = await fetch(url, {
    signal: AbortSignal.timeout(12000),
    ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: 60 } }),
  });
  if (!response.ok)
    throw new Error(`WooCommerce respondió HTTP ${response.status}`);
  const body: unknown = await response.json();
  if (!Array.isArray(body))
    throw new Error("WooCommerce no devolvió una lista de productos.");
  return {
    products: body.map(normalizeProduct),
    totalPages: Number(response.headers.get("x-wp-totalpages") || 1),
    total: Number(response.headers.get("x-wp-total") || body.length),
  };
}
export async function getProduct(slug: string) {
  return (await fetchProducts({ slug })).products[0] ?? null;
}
