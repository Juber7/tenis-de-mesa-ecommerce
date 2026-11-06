import { NextResponse } from "next/server";
import { z } from "zod";
import { CheckoutError, prepareCheckout } from "@/lib/checkout";

const MAX_BODY_BYTES = 10_000;
const schema = z
  .array(
    z.object({
      id: z.string().regex(/^[A-Za-z0-9._-]{1,128}$/),
      quantity: z.number().int().min(1).max(99),
    }),
  )
  .min(1)
  .max(50)
  .refine((lines) => new Set(lines.map((l) => l.id)).size === lines.length);

const noStore = { "Cache-Control": "no-store" };
const fail = (error: string, status: number, extra: object = {}) =>
  NextResponse.json({ error, ...extra }, { status, headers: noStore });

/** Reads at most `limit` bytes; returns null when the body is larger. */
async function readLimited(request: Request, limit: number) {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > limit) return null;
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

export async function POST(request: Request) {
  // Requiring JSON makes cross-site browser requests need a CORS preflight,
  // which this route never grants.
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return fail("Formato no admitido.", 415);
  const text = await readLimited(request, MAX_BODY_BYTES);
  if (text === null) return fail("Carrito demasiado grande.", 413);
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    return fail("El carrito no es válido.", 400);
  }
  const body = schema.safeParse(json);
  if (!body.success) return fail("El carrito no es válido.", 400);
  try {
    return NextResponse.json(await prepareCheckout(body.data), {
      headers: noStore,
    });
  } catch (error) {
    if (error instanceof CheckoutError)
      return fail(error.message, 409, { problems: error.problems });
    console.error(
      "No se pudo preparar el pedido:",
      error instanceof Error ? error.message : "Error desconocido",
    );
    return fail(
      "No pudimos verificar el catálogo. Inténtalo de nuevo en unos minutos.",
      503,
    );
  }
}
