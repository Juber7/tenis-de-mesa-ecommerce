import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../src/app/api/checkout/route";

// Simulated Sanity response: one available product, one sold out.
const sanity = [
  {
    _id: "goma-1", name: "Goma Uno", slug: "goma-uno", price: 24.49, salePrice: null,
    category: "gomas", description: "", inStock: true, maxQuantity: 3,
    images: [{ url: "https://cdn.sanity.io/images/x/production/a.png", alt: null }],
  },
  {
    _id: "goma-2", name: "Goma Dos", slug: "goma-dos", price: 10, salePrice: null,
    category: "gomas", description: "", inStock: false, maxQuantity: 5, images: [],
  },
];
const realFetch = globalThis.fetch;
let sanityCalls = 0;
beforeEach(() => {
  process.env.SANITY_PROJECT_ID = "testproject";
  process.env.SANITY_DATASET = "production";
  sanityCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input).includes("bcn.gob.ni"))
      return new Response(
        "<soap:Envelope><soap:Body><RecuperaTC_DiaResponse><RecuperaTC_DiaResult>36.6243</RecuperaTC_DiaResult></RecuperaTC_DiaResponse></soap:Body></soap:Envelope>",
        { status: 200 },
      );
    sanityCalls++;
    return new Response(JSON.stringify({ result: sanity }), { status: 200 });
  }) as typeof fetch;
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

const call = (body: string, contentType = "application/json") =>
  POST(new Request("http://localhost/api/checkout", {
    method: "POST",
    headers: { "content-type": contentType },
    body,
  }));

test("checkout usa precios del servidor en córdobas al tipo de cambio del BCN", async () => {
  const res = await call(JSON.stringify([{ id: "goma-1", quantity: 2 }]));
  assert.equal(res.status, 200);
  const body = await res.json();
  // US$ 24.49 × 36.6243 = C$ 896.93 por unidad.
  assert.equal(body.total, 179386);
  assert.match(body.reference, /^P-\d{6}-/);
  const text = new URL(body.url).searchParams.get("text")!;
  assert.match(text, /Precio unitario: C\$ 896\.93/);
  assert.match(text, /Total Calculado: C\$ 1,793\.86/);
  assert.match(text, /Tipo de cambio: C\$ 36\.6243 por US\$ 1 \(tipo de cambio oficial del BCN/);
  assert.ok(text.includes(body.reference));
  assert.equal(res.headers.get("cache-control"), "no-store");
});

test("checkout informa cada producto agotado o con cantidad excesiva", async () => {
  const res = await call(JSON.stringify([
    { id: "goma-1", quantity: 5 },
    { id: "goma-2", quantity: 1 },
    { id: "no-existe", quantity: 1 },
  ]));
  assert.equal(res.status, 409);
  const body = await res.json();
  assert.deepEqual(body.problems, [
    { id: "goma-1", maxQuantity: 3 },
    { id: "goma-2", maxQuantity: null },
    { id: "no-existe", maxQuantity: null },
  ]);
});

test("checkout rechaza formatos, JSON y tamaños inválidos sin consultar Sanity", async () => {
  assert.equal((await call("[]", "text/plain")).status, 415);
  assert.equal((await call("no es json")).status, 400);
  assert.equal((await call(JSON.stringify([{ id: "<script>", quantity: 1 }]))).status, 400);
  assert.equal((await call(JSON.stringify([{ id: "a", quantity: 100 }]))).status, 400);
  assert.equal((await call(JSON.stringify([{ id: "a", quantity: 1 }, { id: "a", quantity: 1 }]))).status, 400);
  assert.equal((await call("x".repeat(20_000))).status, 413);
  assert.equal(sanityCalls, 0);
});

test("checkout devuelve 503 genérico si Sanity falla, sin filtrar detalles", async () => {
  globalThis.fetch = (async () => new Response("boom", { status: 500 })) as typeof fetch;
  const original = console.error;
  console.error = () => {};
  try {
    const res = await call(JSON.stringify([{ id: "goma-1", quantity: 1 }]));
    assert.equal(res.status, 503);
    const body = await res.json();
    assert.ok(!JSON.stringify(body).includes("500"));
  } finally {
    console.error = original;
  }
});
