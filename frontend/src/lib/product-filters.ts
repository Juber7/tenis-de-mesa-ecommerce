import type { Product } from "@/types/product";

export type ShopParams = Record<string, string | string[] | undefined>;
export function shopQuery(params: ShopParams) {
  const val = (key: string) =>
    typeof params[key] === "string" ? params[key].trim() : "";
  const query: Record<string, string> = {
    page: String(Math.max(1, Number.parseInt(val("pagina")) || 1)),
  };
  if (val("q")) query.search = val("q");
  if (val("categoria") && val("categoria") !== "all")
    query.category = val("categoria");
  if (val("ofertas") === "si") query.on_sale = "true";
  if (["price-asc", "price-desc"].includes(val("orden"))) {
    query.orderby = "price";
    query.order = val("orden") === "price-asc" ? "asc" : "desc";
  }
  return query;
}

export function filterProducts(
  catalog: Product[],
  query: Record<string, string> = {},
) {
  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const search = normalize(query.search?.trim() || "");
  const products = catalog.filter(
    (p) =>
      (!query.slug || p.slug === query.slug) &&
      (!query.include || query.include.split(",").includes(String(p.id))) &&
      (!search || normalize(`${p.name} ${p.description}`).includes(search)) &&
      (!query.category ||
        query.category === "all" ||
        p.categories.some(
          (c) => c.slug === query.category || String(c.id) === query.category,
        )) &&
      (query.on_sale !== "true" || p.onSale),
  );
  if (query.orderby === "price") {
    products.sort(
      (a, b) =>
        (a.price / 10 ** a.minorUnit - b.price / 10 ** b.minorUnit) *
        (query.order === "desc" ? -1 : 1),
    );
  }
  const perPage = Math.max(1, Number.parseInt(query.per_page || "24") || 24);
  const page = Math.max(1, Number.parseInt(query.page || "1") || 1);
  return {
    products: products.slice((page - 1) * perPage, page * perPage),
    total: products.length,
    totalPages: Math.ceil(products.length / perPage),
  };
}
