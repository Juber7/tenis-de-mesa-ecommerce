import type { CartItem } from "@/types/product";
import { money } from "./utils";
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
export function whatsappMessage(items: CartItem[]): string {
  const total = cartTotal(items);
  const lines = items.map(({ product: p, quantity }) => {
    const image = new URL(p.image);
    if (!["https:", "http:"].includes(image.protocol))
      throw new Error("La imagen debe tener una URL pública HTTP(S).");
    return `${p.name.replace(/[\r\n]+/g, " ")}\nPrecio unitario: ${money(p.price, p.currency, p.minorUnit)}\nCantidad: ${quantity}\nImagen: ${image.href}`;
  });
  return [
    "¡Hola Leandro! Quisiera realizar el siguiente pedido desde la página web:",
    ...lines,
    `Total Calculado: ${money(total, items[0].product.currency, items[0].product.minorUnit)}`,
  ].join("\n\n");
}
export function whatsappLink(items: CartItem[], phone: string): string {
  if (!/^[1-9]\d{7,14}$/.test(phone))
    throw new Error(
      "Configura el número de WhatsApp con código de país y solo dígitos.",
    );
  return `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage(items))}`;
}
