import type { Metadata } from "next";
import Link from "next/link";
import { ShopView } from "@/components/products/shop-view";
import { shopQuery, type ShopParams } from "@/lib/product-filters";
import { fetchProducts } from "@/lib/catalog";
import { productCategories } from "@/lib/categories";
import { OG_BASE } from "@/lib/site";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<ShopParams>;
}): Promise<Metadata> {
  const query = shopQuery(await searchParams);
  const category = productCategories.find((c) => c.value === query.category);
  // Only the full catalog and each category's first page are indexable;
  // searches, sorting, offers and later pages are variations of them.
  const variation =
    query.search || query.orderby || query.on_sale || query.page !== "1";
  const canonical = category ? `/tienda?categoria=${category.value}` : "/tienda";
  const title = category ? `${category.label} de tenis de mesa` : "Tienda de tenis de mesa en Managua";
  const description = category
    ? `${category.label} de tenis de mesa disponibles en Managua, Nicaragua. Consulta precios y haz tu pedido por WhatsApp.`
    : "Catálogo de raquetas, gomas, pelotas y accesorios de tenis de mesa en Managua, Nicaragua. Haz tu pedido por WhatsApp.";
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { ...OG_BASE, title, description, url: canonical },
    robots: variation ? { index: false, follow: true } : undefined,
  };
}

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<ShopParams>;
}) {
  const params = await searchParams;
  const data = await fetchProducts(shopQuery(params)).catch(() => null);
  if (data) return <ShopView params={params} data={data} />;
  return (
    <section className="commerce-page">
      <div className="shell py-20">
        <h1 className="font-display text-5xl">
          El catálogo no está disponible
        </h1>
        <p className="my-6">
          No pudimos conectar con la tienda. Por favor, inténtalo de nuevo.
        </p>
        <Link href="/tienda" className="underline">
          Reintentar
        </Link>
      </div>
    </section>
  );
}
