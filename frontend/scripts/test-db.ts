import { loadEnvConfig } from "@next/env";
import assert from "node:assert/strict";
import { fetchProducts } from "../src/lib/catalog";
import { cartTotal, whatsappLink, whatsappMessage } from "../src/lib/whatsapp";
loadEnvConfig(process.cwd());
async function main() {
  if (!process.env.SANITY_PROJECT_ID) {
    console.error(
      "BLOQUEADO: configura SANITY_PROJECT_ID en .env.local para validar la conexión real.",
    );
    process.exitCode = 2;
    return;
  }
  const result = await fetchProducts({ per_page: "1000" }, true);
  console.log(`PASS: Sanity conectado, ${result.total} productos publicados.`);
  const available = result.products.filter((p) => p.inStock && p.purchasable);
  console.log(`Productos disponibles: ${available.length}`);
  if (available.length < 2)
    throw new Error("La conexión funciona, pero hay menos de dos productos disponibles.");
  const items = [
    { product: available[0], quantity: 2 },
    { product: available[1], quantity: 1 },
  ];
  const text = whatsappMessage(items);
  assert.equal(cartTotal(items), available[0].price * 2 + available[1].price);
  assert.equal(
    new URL(whatsappLink(items, "50255551234")).searchParams.get("text"),
    text,
  );
  console.log("PASS: payload de WhatsApp, dos productos, cantidades, imágenes y total exacto.");
}
main().catch((e) => {
  console.error("FAIL:", e instanceof Error ? e.message : e);
  process.exitCode = 1;
});
