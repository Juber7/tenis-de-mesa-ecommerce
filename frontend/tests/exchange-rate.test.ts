import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  FALLBACK_RATE,
  describeRate,
  getExchangeRate,
  managuaDateParts,
  parseBcnResponse,
  usdCentsToNio,
} from "../src/lib/exchange-rate";
import { normalizeProduct } from "../src/lib/catalog";
import { money } from "../src/lib/utils";

const soap = (rate: string) =>
  `<?xml version="1.0"?><soap:Envelope><soap:Body><RecuperaTC_DiaResponse xmlns="http://servicios.bcn.gob.ni/"><RecuperaTC_DiaResult>${rate}</RecuperaTC_DiaResult></RecuperaTC_DiaResponse></soap:Body></soap:Envelope>`;
const realFetch = globalThis.fetch;
const realError = console.error;
afterEach(() => {
  globalThis.fetch = realFetch;
  console.error = realError;
});

test("lee la respuesta del BCN y rechaza valores imposibles", () => {
  assert.equal(parseBcnResponse(soap("36.6243")), 36.6243);
  assert.equal(parseBcnResponse(soap("0")), null);
  assert.equal(parseBcnResponse(soap("abc")), null);
  assert.equal(parseBcnResponse("<html>Runtime Error</html>"), null);
});

test("convierte centavos de dólar a centavos de córdoba con redondeo", () => {
  assert.equal(usdCentsToNio(3449, 36.6243), 126317); // US$ 34.49 → C$ 1,263.17
  assert.equal(usdCentsToNio(149, 36.6243), 5457); // US$ 1.49 → C$ 54.57
  const p = normalizeProduct(
    { _id: "x", name: "Goma", slug: "goma", price: 39.99, salePrice: 34.49 },
    { rate: 36.6243, date: "2026-11-06", source: "bcn" },
  );
  assert.equal(money(p.regularPrice), "C$ 1,464.61");
  assert.equal(money(p.price), "C$ 1,263.17");
  assert.equal(p.onSale, true);
});

test("consulta la fecha de hoy en Managua", async () => {
  // 03:00 UTC on Nov 7 is still Nov 6 in Managua.
  assert.deepEqual(managuaDateParts(new Date("2026-11-07T03:00:00Z")), { year: 2026, month: 11, day: 6 });
  const bodies: string[] = [];
  globalThis.fetch = (async (_url: RequestInfo | URL, init?: RequestInit) => {
    bodies.push(String(init?.body));
    return new Response(soap("36.7"), { status: 200 });
  }) as typeof fetch;
  const fx = await getExchangeRate(new Date("2026-11-07T03:00:00Z"));
  assert.deepEqual(fx, { rate: 36.7, date: "2026-11-06", source: "bcn" });
  assert.match(bodies[0], /<Ano>2026<\/Ano><Mes>11<\/Mes><Dia>6<\/Dia>/);
});

test("si hoy falla usa el día anterior y, si todo falla, el respaldo", async () => {
  console.error = () => {};
  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    return calls === 1 ? new Response("error", { status: 500 }) : new Response(soap("36.6243"), { status: 200 });
  }) as typeof fetch;
  assert.deepEqual(await getExchangeRate(new Date("2026-11-06T18:00:00Z")), {
    rate: 36.6243,
    date: "2026-11-05",
    source: "bcn",
  });
  globalThis.fetch = (async () => {
    throw new Error("sin red");
  }) as typeof fetch;
  const fx = await getExchangeRate(new Date("2026-11-06T18:00:00Z"));
  assert.equal(fx.source, "fallback");
  assert.equal(fx.rate, FALLBACK_RATE);
  assert.match(describeRate(fx), /referencia/);
});
