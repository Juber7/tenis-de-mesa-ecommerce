import { test } from "node:test";
import assert from "node:assert/strict";

// Each test file runs in its own process, so the site URL can be set before
// the modules that read it are loaded.
process.env.NEXT_PUBLIC_SITE_URL = "https://tenisdemesani.com/";

test("robots en producción HTTPS permite indexar y publica el sitemap", async () => {
  const { default: robots } = await import("../src/app/robots");
  const result = robots();
  const rules = Array.isArray(result.rules) ? result.rules[0] : result.rules;
  assert.equal(rules.allow, "/");
  assert.deepEqual(rules.disallow, ["/api/", "/carrito"]);
  assert.equal(result.sitemap, "https://tenisdemesani.com/sitemap.xml");
});

test("URLs absolutas sin barra final duplicada", async () => {
  const { absoluteUrl, SITE_URL } = await import("../src/lib/site");
  assert.equal(SITE_URL, "https://tenisdemesani.com");
  assert.equal(absoluteUrl("/producto/x"), "https://tenisdemesani.com/producto/x");
});
