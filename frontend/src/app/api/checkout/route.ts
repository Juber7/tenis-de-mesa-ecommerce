import { NextResponse } from "next/server";
import { z } from "zod";
import { prepareCheckout } from "@/lib/checkout";
const schema = z
  .array(
    z.object({
      id: z.number().int().positive(),
      quantity: z.number().int().min(1).max(99),
    }),
  )
  .min(1)
  .max(50)
  .refine((lines) => new Set(lines.map((l) => l.id)).size === lines.length);
export async function POST(request: Request) {
  try {
    const text = await request.text();
    if (text.length > 10000)
      return NextResponse.json(
        { error: "Carrito demasiado grande." },
        { status: 413 },
      );
    const body = schema.safeParse(JSON.parse(text));
    if (!body.success)
      return NextResponse.json(
        { error: "El carrito no es válido." },
        { status: 400 },
      );
    return NextResponse.json(await prepareCheckout(body.data), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(
      "No se pudo preparar el pedido:",
      error instanceof Error ? error.message : "Error desconocido",
    );
    const message =
      error instanceof Error &&
      /demostración|disponible|cantidad|monedas|WhatsApp|imagen/i.test(
        error.message,
      )
        ? error.message
        : "No pudimos verificar el catálogo. Inténtalo de nuevo en unos minutos.";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
