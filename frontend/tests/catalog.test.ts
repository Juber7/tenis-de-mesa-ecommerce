import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeProduct } from "../src/lib/catalog";
import { money } from "../src/lib/utils";
import type { ExchangeRate } from "../src/lib/exchange-rate";
// Rate 1 keeps the normalization tests independent from the conversion,
// which is covered in exchange-rate.test.ts.
const fx1: ExchangeRate = { rate: 1, date: "2026-11-06", source: "bcn" };
const url = "https://cdn.sanity.io/images/abc/production/foto.png";
const raw = {
  _id: "product-paleta",
  name: "Paleta & control",
  slug: "paleta",
  price: 150,
  salePrice: 129.95,
  category: "paletas",
  description: "Buena paleta",
  inStock: true,
  maxQuantity: 5,
  images: [{ url, alt: null }, { url: url + "2", alt: "Mango" }],
};
test("convierte córdobas a centavos y detecta ofertas", () => {
  const p = normalizeProduct(raw, fx1);
  assert.equal(p.price, 12995);
  assert.equal(p.regularPrice, 15000);
  assert.equal(p.onSale, true);
  assert.equal(p.currency, "NIO");
  assert.equal(p.maxQuantity, 5);
  assert.deepEqual(p.categories, [{ name: "Raquetas", slug: "paletas" }]);
  assert.equal(money(p.price, p.currency, p.minorUnit), "C$ 129.95");
});
test("usa la primera foto como principal y conserva la galería", () => {
  const p = normalizeProduct(raw, fx1);
  assert.ok(p.image.startsWith(url + "?"));
  assert.equal(p.imageAlt, "Paleta & control");
  assert.equal(p.gallery.length, 2);
  assert.equal(p.gallery[1].alt, "Mango");
  assert.ok(p.gallery[1].thumb.includes("w=200"));
});
test("aplica valores predeterminados a campos opcionales", () => {
  const p = normalizeProduct({ _id: "x", name: "Pelota", slug: "pelota", price: 45 }, fx1);
  assert.equal(p.price, 4500);
  assert.equal(p.onSale, false);
  assert.equal(p.inStock, true);
  assert.equal(p.maxQuantity, 10);
  assert.equal(p.image, "");
  assert.deepEqual(p.gallery, []);
  assert.deepEqual(p.categories, []);
});
test("ignora una oferta que no es menor que el precio normal", () => {
  const p = normalizeProduct({ ...raw, salePrice: 150 }, fx1);
  assert.equal(p.onSale, false);
  assert.equal(p.price, 15000);
});
test("rechaza documentos malformados", () => {
  assert.throws(() => normalizeProduct({ ...raw, price: -1 }, fx1));
  assert.throws(() => normalizeProduct({ ...raw, price: "150" }, fx1));
  assert.throws(() => normalizeProduct({}, fx1));
});
