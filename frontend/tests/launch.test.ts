import { test } from "node:test";
import assert from "node:assert/strict";
import { parseConsent, CONSENT_VERSION } from "../src/lib/consent";
import { createReference, managuaDate } from "../src/lib/reference";
import { validateComplaint, complaintMessage, type ComplaintInput } from "../src/lib/complaint";
import { whatsappMessage } from "../src/lib/whatsapp";
import { testProducts } from "./fixtures";

test("consentimiento: acepta solo registros válidos, vigentes y de la versión actual", () => {
  const now = Date.parse("2026-11-05T12:00:00Z");
  const ok = JSON.stringify({ version: CONSENT_VERSION, necessary: true, analytics: false, marketing: true, updatedAt: "2026-06-01T00:00:00Z" });
  assert.deepEqual(parseConsent(ok, now), {
    version: CONSENT_VERSION, necessary: true, analytics: false, marketing: true, updatedAt: "2026-06-01T00:00:00Z",
  });
  assert.equal(parseConsent(null, now), null);
  assert.equal(parseConsent("{malformado", now), null);
  assert.equal(parseConsent(JSON.stringify({ version: 0, analytics: true, marketing: true, updatedAt: "2026-06-01T00:00:00Z" }), now), null);
  assert.equal(parseConsent(JSON.stringify({ version: CONSENT_VERSION, analytics: "sí", marketing: true, updatedAt: "2026-06-01T00:00:00Z" }), now), null);
  // Older than 12 months: ask again.
  assert.equal(parseConsent(JSON.stringify({ version: CONSENT_VERSION, analytics: true, marketing: true, updatedAt: "2025-10-01T00:00:00Z" }), now), null);
});

test("referencias usan la fecha de Managua y caracteres no ambiguos", () => {
  // 03:00 UTC on Nov 6 is still Nov 5 in Managua (UTC-6).
  assert.equal(managuaDate(new Date("2026-11-06T03:00:00Z")), "261105");
  const ref = createReference("P", new Date("2026-11-06T03:00:00Z"), (b) => b.fill(0));
  assert.equal(ref, "P-261105-2222");
  assert.match(createReference("R"), /^R-\d{6}-[2-9A-HJKMNP-Z]{4}$/);
});

const complaint: ComplaintInput = {
  name: "  María   José López ",
  idNumber: "001-010190-0001a",
  address: "Managua, de la rotonda 2 c. al sur",
  phone: "+505 8888-8888",
  invoice: "P-261105-7KQ2",
  reason: "Producto con defecto (garantía)",
  description: "La goma llegó con burbujas en la superficie desde el primer día.",
  request: "",
};

test("reclamo: normaliza y valida los campos que exige el reglamento", () => {
  const { data, errors } = validateComplaint(complaint, true);
  assert.deepEqual(errors, {});
  assert.equal(data.name, "María José López");
  assert.equal(data.idNumber, "001-010190-0001A");
  assert.equal(data.phone, "+50588888888");
  const message = complaintMessage(data, "R-261105-2222", "5 de noviembre de 2026", "Tenis de Mesa");
  for (const field of ["RECLAMO R-261105-2222", "Fecha:", "Comerciante:", "Nombre:", "Cédula o documento:", "Domicilio:", "Teléfono:", "Factura o referencia", "Motivo:", "Descripción:"])
    assert.ok(message.includes(field), field);
});

test("reclamo: rechaza datos vacíos, inválidos o sin aceptar la privacidad", () => {
  const { errors } = validateComplaint(
    { ...complaint, name: "A", idNumber: "<script>", phone: "123", reason: "Inventado", description: "corto", address: "" },
    false,
  );
  assert.deepEqual(Object.keys(errors).sort(), ["address", "description", "idNumber", "name", "phone", "privacy", "reason"]);
  // Control characters are stripped before validation.
  const { data } = validateComplaint({ ...complaint, description: "Texto\u0000 con\u0007 control y más de veinte letras" }, true);
  assert.equal(data.description, "Texto con control y más de veinte letras");
});

test("pedido con referencia: la referencia va después del encabezado", () => {
  const blocks = whatsappMessage([{ product: testProducts[0], quantity: 1 }], "P-261105-2222").split("\n\n");
  assert.equal(blocks[1], "Referencia del pedido: P-261105-2222");
  assert.ok(blocks.at(-1)!.startsWith("Total Calculado:"));
});

test("pedido sin foto: omite la línea de imagen", () => {
  const message = whatsappMessage([{ product: { ...testProducts[0], image: "" }, quantity: 1 }]);
  assert.ok(!message.includes("Imagen:"));
});
