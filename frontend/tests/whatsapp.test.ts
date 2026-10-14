import { test } from "node:test";
import assert from "node:assert/strict";
import { demoProducts } from "../src/lib/demo";
import { cartTotal, whatsappLink, whatsappMessage } from "../src/lib/whatsapp";
const items = [
  { product: demoProducts[0], quantity: 2 },
  { product: demoProducts[1], quantity: 3 },
];
test("total exacto, dos productos, cuatro campos y encabezado solicitado", () => {
  assert.equal(cartTotal(items), 115500);
  const message = whatsappMessage(items);
  const blocks = message.split("\n\n");
  assert.equal(
    blocks[0],
    "¡Hola Leandro! Quisiera realizar el siguiente pedido desde la página web:",
  );
  assert.equal(blocks.length, 4);
  assert.equal(blocks[1].split("\n").length, 4);
  assert.match(blocks[1], /Cantidad: 2/);
  assert.match(blocks[2], /Cantidad: 3/);
  assert.ok(blocks[3].startsWith("Total Calculado:"));
  const url = new URL(whatsappLink(items, "50255551234"));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.searchParams.get("text"), message);
});
test("rechaza carrito vacío, cantidades inválidas, moneda mixta y teléfono inválido", () => {
  assert.throws(() => cartTotal([]));
  assert.throws(() => cartTotal([{ product: demoProducts[0], quantity: -1 }]));
  assert.throws(() => cartTotal([{ product: demoProducts[0], quantity: 1.5 }]));
  assert.throws(() =>
    cartTotal([
      items[0],
      { product: { ...demoProducts[1], currency: "USD" }, quantity: 1 },
    ]),
  );
  assert.throws(() => whatsappLink(items, "+502 invalid"));
});
test("respeta monedas sin decimales y rechaza imágenes no HTTP", () => {
  const item = {
    product: { ...demoProducts[0], currency: "JPY", minorUnit: 0, price: 1200 },
    quantity: 2,
  };
  assert.equal(cartTotal([item]), 2400);
  assert.match(whatsappMessage([item]), /2,400/);
  assert.throws(() =>
    whatsappMessage([
      {
        product: { ...demoProducts[0], image: "javascript:alert(1)" },
        quantity: 1,
      },
    ]),
  );
});
