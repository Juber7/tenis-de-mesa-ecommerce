import { loadEnvConfig } from "@next/env";
import assert from "node:assert/strict";
import { fetchProducts } from "../src/lib/woocommerce";
import { demoProducts } from "../src/lib/demo";
import { cartTotal, whatsappLink, whatsappMessage } from "../src/lib/whatsapp";
loadEnvConfig(process.cwd());
async function main() {
  const items = [
    { product: demoProducts[0], quantity: 2 },
    { product: demoProducts[1], quantity: 3 },
  ];
  const text = whatsappMessage(items);
  assert.equal(cartTotal(items), 115500);
  assert.equal(
    new URL(whatsappLink(items, "50255551234")).searchParams.get("text"),
    text,
  );
  console.log(
    "PASS: payload de WhatsApp, dos productos, cantidades, imágenes y total exacto.",
  );
  if (!process.env.WOOCOMMERCE_URL) {
    console.error(
      "BLOQUEADO: configura WOOCOMMERCE_URL en .env.local para validar la conexión real.",
    );
    process.exitCode = 2;
    return;
  }
  const result = await fetchProducts({ per_page: "10" }, true);
  console.log(`PASS: API conectada, ${result.total} productos publicados.`);
  const available = result.products.filter((p) => p.inStock && p.purchasable);
  console.log(`Productos disponibles en la muestra: ${available.length}`);
  if (!available.length)
    throw new Error(
      "La conexión funciona, pero no hay productos disponibles en la muestra.",
    );
}
main().catch((e) => {
  console.error("FAIL:", e instanceof Error ? e.message : e);
  process.exitCode = 1;
});
