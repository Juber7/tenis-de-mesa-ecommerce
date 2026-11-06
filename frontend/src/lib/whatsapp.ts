import type { CartItem } from "@/types/product";
import { money } from "./utils";
import { describeRate } from "./exchange-rate";
export function cartTotal(items: CartItem[]): number {
  if (!items.length) throw new Error("El carrito está vacío.");
  const first = items[0].product;
  for (const { product: p, quantity: q } of items) {
    if (!Number.isInteger(q) || q < 1 || q > p.maxQuantity)
      throw new Error("Cantidad inválida.");
    if (!Number.isSafeInteger(p.price) || p.price < 0)
      throw new Error("Precio inválido.");
    if (p.currency !== first.currency || p.minorUnit !== first.minorUnit)
      throw new Error("No se pueden mezclar monedas.");
  }
  const total = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );
  if (!Number.isSafeInteger(total))
    throw new Error("El total excede el límite permitido.");
  return total;
}
export function whatsappMessage(items: CartItem[], reference?: string): string {
  const total = cartTotal(items);
  const fx = items[0].product.fx;
  const lines = items.map(({ product: p, quantity }) => {
    const fields = [
      p.name.replace(/[\r\n]+/g, " "),
      `Precio unitario: ${money(p.price, p.currency, p.minorUnit)}`,
      `Cantidad: ${quantity}`,
    ];
    // Products without a photo are still orderable; the image line is omitted.
    if (p.image) {
      const image = new URL(p.image);
      if (!["https:", "http:"].includes(image.protocol))
        throw new Error("La imagen debe tener una URL pública HTTP(S).");
      fields.push(`Imagen: ${image.href}`);
    }
    return fields.join("\n");
  });
  return [
    "¡Hola Leandro! Quisiera realizar el siguiente pedido desde la página web:",
    ...(reference ? [`Referencia del pedido: ${reference}`] : []),
    ...lines,
    [
      `Total Calculado: ${money(total, items[0].product.currency, items[0].product.minorUnit)}`,
      // The merchant can check the córdoba amounts against the dollar prices.
      ...(fx ? [`Tipo de cambio: ${describeRate(fx)}`] : []),
    ].join("\n"),
  ].join("\n\n");
}
export function whatsappLink(
  items: CartItem[],
  phone: string,
  reference?: string,
): string {
  if (!/^[1-9]\d{7,14}$/.test(phone))
    throw new Error(
      "Configura el número de WhatsApp con código de país y solo dígitos.",
    );
  return `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage(items, reference))}`;
}
