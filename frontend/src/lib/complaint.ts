/**
 * Complaint ("reclamo") data required for the receipt by articles 51-52 of
 * the regulation of Ley 842: number and date, merchant, customer's name,
 * ID, address and phone, reason and invoice number.
 */
export const COMPLAINT_REASONS = [
  "Producto con defecto (garantía)",
  "Producto distinto al ofrecido",
  "Retracto de la compra",
  "Entrega: retraso, daño o pérdida",
  "Precio o cobro",
  "Atención recibida",
  "Otro",
] as const;

export type ComplaintInput = {
  name: string;
  idNumber: string;
  address: string;
  phone: string;
  invoice: string;
  reason: string;
  description: string;
  request: string;
};
export type ComplaintErrors = Partial<Record<keyof ComplaintInput | "privacy", string>>;

const clean = (value: string) =>
  value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();

export function normalizeComplaint(input: ComplaintInput): ComplaintInput {
  return {
    name: clean(input.name).replace(/\s+/g, " "),
    idNumber: clean(input.idNumber).toUpperCase().replace(/\s+/g, ""),
    address: clean(input.address).replace(/\s+/g, " "),
    phone: clean(input.phone).replace(/[^\d+]/g, ""),
    invoice: clean(input.invoice).replace(/\s+/g, " "),
    reason: clean(input.reason),
    description: clean(input.description).replace(/\n{3,}/g, "\n\n"),
    request: clean(input.request).replace(/\n{3,}/g, "\n\n"),
  };
}

export function validateComplaint(
  raw: ComplaintInput,
  privacyAccepted: boolean,
): { data: ComplaintInput; errors: ComplaintErrors } {
  const data = normalizeComplaint(raw);
  const errors: ComplaintErrors = {};
  if (data.name.length < 3 || data.name.length > 100 || !/\p{L}/u.test(data.name))
    errors.name = "Escribe tu nombre completo (3 a 100 caracteres).";
  // Nicaraguan cédula (001-010190-0001A) or another ID document.
  if (!/^[A-Z0-9-]{5,20}$/.test(data.idNumber))
    errors.idNumber = "Escribe tu cédula (por ejemplo 001-010190-0001A) u otro documento de identidad.";
  if (data.address.length < 5 || data.address.length > 200)
    errors.address = "Escribe tu domicilio (5 a 200 caracteres).";
  const digits = data.phone.replace(/\D/g, "");
  if (!/^\+?\d+$/.test(data.phone) || digits.length < 8 || digits.length > 15)
    errors.phone = "Escribe un teléfono válido de 8 a 15 dígitos.";
  if (data.invoice.length > 40) errors.invoice = "Máximo 40 caracteres.";
  if (!(COMPLAINT_REASONS as readonly string[]).includes(data.reason))
    errors.reason = "Elige el motivo del reclamo.";
  if (data.description.length < 20 || data.description.length > 1500)
    errors.description = "Describe lo ocurrido (20 a 1500 caracteres).";
  if (data.request.length > 500) errors.request = "Máximo 500 caracteres.";
  if (!privacyAccepted)
    errors.privacy = "Confirma que leíste cómo usaremos tus datos.";
  return { data, errors };
}

export function complaintMessage(
  data: ComplaintInput,
  reference: string,
  date: string,
  merchant: string,
) {
  return [
    `RECLAMO ${reference}`,
    `Fecha: ${date}`,
    `Comerciante: ${merchant}`,
    `Nombre: ${data.name}`,
    `Cédula o documento: ${data.idNumber}`,
    `Domicilio: ${data.address}`,
    `Teléfono: ${data.phone}`,
    `Factura o referencia del pedido: ${data.invoice || "No indicada"}`,
    `Motivo: ${data.reason}`,
    `Descripción: ${data.description}`,
    ...(data.request ? [`Solución que solicito: ${data.request}`] : []),
  ].join("\n");
}
