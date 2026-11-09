import { test } from "node:test";
import assert from "node:assert/strict";
// The same serializer Next.js uses to answer /sitemap.xml.
import { resolveSitemap } from "next/dist/build/webpack/loaders/metadata/resolve-route-data.js";

process.env.NEXT_PUBLIC_SITE_URL = "https://tenisdemesani.com/";
process.env.SANITY_PROJECT_ID = "test1";

test("el sitemap es XML válido aunque las fotos lleven '&' en la URL", async (t) => {
  const product = {
    _id: "product-paleta",
    name: "Paleta",
    slug: "paleta",
    price: 150,
    category: "paletas",
    images: [{ url: "https://cdn.sanity.io/images/abc/production/foto.png", alt: null }],
  };
  // Sanity answers with one product; the exchange-rate service is down, so
  // the catalog uses its fallback rate.
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    if (String(input).includes(".sanity.io/"))
      return new Response(JSON.stringify({ result: [product] }));
    throw new Error("sin red");
  });
  t.mock.method(console, "error", () => {});

  const { default: sitemap } = await import("../src/app/sitemap");
  const xml = resolveSitemap(await sitemap());

  assert.match(xml, /<loc>https:\/\/tenisdemesani\.com\/producto\/paleta<\/loc>/);
  assert.match(xml, /foto\.png\?w=1200&amp;fit=max&amp;auto=format<\/image:loc>/);
  assert.doesNotMatch(xml, /&(?!amp;|lt;|gt;|quot;|apos;)/, "hay un '&' sin escapar");
});
