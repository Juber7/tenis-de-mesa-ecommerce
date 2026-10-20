import Link from "next/link";
import { ShopView } from "@/components/products/shop-view";
import { shopQuery, type ShopParams } from "@/lib/product-filters";
import { fetchProducts } from "@/lib/woocommerce";

export const metadata = { title: "Tienda" };

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<ShopParams>;
}) {
  const params = await searchParams;
  try {
    const data = await fetchProducts(shopQuery(params));
    return <ShopView params={params} data={data} />;
  } catch {
    return (
      <section className="shell py-20">
        <h1 className="font-display text-5xl">
          El catálogo no está disponible
        </h1>
        <p className="my-6">
          No pudimos conectar con la tienda. Por favor, inténtalo de nuevo.
        </p>
        <Link href="/tienda" className="underline">
          Reintentar
        </Link>
      </section>
    );
  }
}
