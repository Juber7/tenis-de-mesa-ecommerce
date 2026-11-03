import type { CartItem } from "@/types/product";
import { fetchProducts } from "./catalog";
import { CONTACT_NUMBER } from "./contact";
import { whatsappLink } from "./whatsapp";
export async function prepareCheckout(
  lines: { id: string; quantity: number }[],
) {
  const { products } = await fetchProducts(
    { include: lines.map((l) => l.id).join(","), per_page: "1000" },
    true,
  );
  const items: CartItem[] = lines.map((line) => {
    const p = products.find((p) => p.id === line.id);
    if (!p || !p.inStock || !p.purchasable || p.hasOptions)
      throw new Error(
        "Un producto ya no está disponible. Actualiza tu carrito.",
      );
    if (line.quantity > p.maxQuantity)
      throw new Error(
        `La cantidad disponible de ${p.name} cambió. Ajusta el carrito.`,
      );
    return { product: p, quantity: line.quantity };
  });
  return {
    items,
    url: whatsappLink(items, CONTACT_NUMBER),
  };
}
