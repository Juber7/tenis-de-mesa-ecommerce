import { test } from "node:test";
import assert from "node:assert/strict";
import { filterProducts, shopQuery } from "../src/lib/product-filters";
import { testProducts } from "./fixtures";
import { productCategories } from "../src/lib/categories";

const ids = (query: Record<string, string>) =>
  filterProducts(testProducts, query).products.map((p) => p.id);

test("búsqueda ignora mayúsculas, espacios y acentos", () => {
  assert.deepEqual(ids({ search: "  DIGNICS  " }), ["101"]);
  assert.deepEqual(ids({ search: "inexistente" }), []);
});
test("cada categoría incluye únicamente productos de esa categoría", () => {
  for (const category of productCategories) {
    assert.deepEqual(
      ids({ category: category.value }),
      testProducts
        .filter((p) => p.categories.some((c) => c.slug === category.value))
        .map((p) => p.id),
    );
  }
  assert.deepEqual(ids({ category: "all" }), testProducts.map((p) => p.id));
});
test("ofertas y combinaciones de filtros", () => {
  assert.deepEqual(ids({ on_sale: "true" }), []);
  assert.deepEqual(
    ids({ search: "butterfly", category: "paletas", on_sale: "true" }),
    [],
  );
  assert.deepEqual(ids({ category: "pelotas", on_sale: "true" }), []);
});
test("precio en ambos sentidos y restauración del orden inicial", () => {
  const ascending = [...testProducts].sort((a, b) => a.price - b.price).map((p) => p.id);
  const descending = [...testProducts].sort((a, b) => b.price - a.price).map((p) => p.id);
  assert.deepEqual(ids({ orderby: "price", order: "asc" }), ascending);
  assert.deepEqual(ids({ orderby: "price", order: "desc" }), descending);
  assert.deepEqual(ids({}), testProducts.map((p) => p.id));
});
test("filtra y ordena antes de paginar, conservando totales", () => {
  const result = filterProducts(testProducts, {
    category: "paletas",
    orderby: "price",
    order: "desc",
    per_page: "1",
    page: "2",
  });
  assert.deepEqual(
    result.products.map((p) => p.id),
    ["107"],
  );
  assert.equal(result.total, 4);
  assert.equal(result.totalPages, 4);
  assert.deepEqual(ids({ page: "2" }), []);
});
test("URL traduce todos los filtros y normaliza valores predeterminados", () => {
  assert.deepEqual(
    shopQuery({
      q: " paleta ",
      categoria: "paletas",
      ofertas: "si",
      orden: "price-desc",
      pagina: "2",
    }),
    {
      page: "2",
      search: "paleta",
      category: "paletas",
      on_sale: "true",
      orderby: "price",
      order: "desc",
    },
  );
  assert.deepEqual(
    shopQuery({ categoria: "all", orden: "all", pagina: "-1" }),
    { page: "1" },
  );
  assert.deepEqual(shopQuery({ orden: "invalid", q: ["a", "b"] }), {
    page: "1",
  });
});
