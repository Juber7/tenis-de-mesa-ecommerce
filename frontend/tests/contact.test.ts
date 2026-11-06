import { test } from "node:test";
import assert from "node:assert/strict";
import { contactMessage, contactLink } from "../src/lib/contact";
import { money } from "../src/lib/utils";
test("saludo usa la hora de Nicaragua y codifica el mensaje en WhatsApp", () => {
  assert.match(contactMessage(new Date("2026-10-14T14:00:00Z")), /buenos días/);
  assert.match(
    contactMessage(new Date("2026-10-14T20:00:00Z")),
    /buenas tardes/,
  );
  assert.match(
    contactMessage(new Date("2026-10-15T02:00:00Z")),
    /buenas noches/,
  );
  const now = new Date("2026-10-14T14:00:00Z");
  const url = new URL(contactLink(now));
  assert.equal(url.pathname, "/50588174072");
  assert.equal(url.searchParams.get("text"), contactMessage(now));
});
test("precios en córdobas conservan unidades menores y usan el prefijo C$", () => {
  assert.equal(money(45000), "C$ 450.00");
  assert.equal(money(123456789, "NIO", 2), "C$ 1,234,567.89");
  assert.equal(money(45000, "USD", 2), "US$ 450.00");
});
