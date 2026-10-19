import { test } from "node:test";
import assert from "node:assert/strict";
import { filterProducts, shopQuery } from "../src/lib/product-filters";
import { demoProducts } from "../src/lib/demo";
import { productCategories } from "../src/lib/categories";

const ids = (query: Record<string, string>) =>
  filterProducts(demoProducts, query).products.map((p) => p.id);

test("búsqueda ignora mayúsculas, espacios y acentos", () => {
  assert.deepEqual(ids({ search: "  COMPETICION  " }), [2]);
  assert.deepEqual(ids({ search: "inexistente" }), []);
});
test("cada categoría incluye únicamente productos de esa categoría", () => {
  for (const category of productCategories) {
    assert.deepEqual(
      ids({ category: category.value }),
      demoProducts
        .filter((p) => p.categories.some((c) => c.slug === category.value))
        .map((p) => p.id),
    );
  }
  assert.deepEqual(ids({ category: "all" }), [1, 2, 3, 4]);
});
test("ofertas y combinaciones de filtros", () => {
  assert.deepEqual(ids({ on_sale: "true" }), [1, 4]);
  assert.deepEqual(
    ids({ search: "paleta", category: "paletas", on_sale: "true" }),
    [1],
  );
  assert.deepEqual(ids({ category: "pelotas", on_sale: "true" }), []);
});
test("precio en ambos sentidos y restauración del orden inicial", () => {
  assert.deepEqual(ids({ orderby: "price", order: "asc" }), [2, 1, 4, 3]);
  assert.deepEqual(ids({ orderby: "price", order: "desc" }), [3, 4, 1, 2]);
  assert.deepEqual(ids({}), [1, 2, 3, 4]);
});
test("filtra y ordena antes de paginar, conservando totales", () => {
  const result = filterProducts(demoProducts, {
    category: "paletas",
    orderby: "price",
    order: "desc",
    per_page: "1",
    page: "2",
  });
  assert.deepEqual(
    result.products.map((p) => p.id),
    [1],
  );
  assert.equal(result.total, 2);
  assert.equal(result.totalPages, 2);
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

test("fetchProducts aplica los filtros también al catálogo de demostración", async () => {
  const { fetchProducts } = await import("../src/lib/woocommerce");
  const previous = process.env.WOOCOMMERCE_URL;
  delete process.env.WOOCOMMERCE_URL;
  try {
    const result = await fetchProducts({
      category: "paletas",
      on_sale: "true",
    });
    assert.deepEqual(
      result.products.map((p) => p.id),
      [1],
    );
    assert.equal(result.total, 1);
  } finally {
    if (previous === undefined) delete process.env.WOOCOMMERCE_URL;
    else process.env.WOOCOMMERCE_URL = previous;
  }
});
