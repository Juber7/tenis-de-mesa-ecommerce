import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeProduct } from "../src/lib/woocommerce";
const raw = {
  id: 1,
  slug: "paleta",
  name: "Paleta &amp; control",
  description: "<p>Buena <b>paleta</b></p>",
  prices: {
    price: "12995",
    regular_price: "15000",
    currency_code: "GTQ",
    currency_minor_unit: 2,
  },
  images: [],
  is_in_stock: true,
  is_purchasable: true,
  on_sale: true,
};
test("normaliza precios menores, entidades y texto sin HTML", () => {
  const p = normalizeProduct(raw);
  assert.equal(p.price, 12995);
  assert.equal(p.name, "Paleta & control");
  assert.ok(!p.description.includes("<"));
  assert.equal(p.image, "");
});
test("rechaza respuesta de API malformada", () => {
  assert.throws(() =>
    normalizeProduct({ ...raw, prices: { ...raw.prices, price: "12.95" } }),
  );
  assert.throws(() => normalizeProduct({}));
});
