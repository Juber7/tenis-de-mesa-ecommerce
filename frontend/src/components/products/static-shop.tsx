"use client";

import { useSearchParams } from "next/navigation";
import { ShopView } from "@/components/products/shop-view";
import { demoProducts } from "@/lib/demo";
import { filterProducts, shopQuery, type ShopParams } from "@/lib/product-filters";

// GitHub Pages has no server to read searchParams. Keep the demo filters in the URL.
export function StaticShop() {
  const searchParams = useSearchParams();
  const params: ShopParams = Object.fromEntries(searchParams.entries());
  const data = filterProducts(demoProducts, shopQuery(params));
  return <ShopView params={params} data={data} />;
}
