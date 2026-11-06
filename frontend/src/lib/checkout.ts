import type { CartItem } from "@/types/product";
import { fetchProducts } from "./catalog";
import { CONTACT_NUMBER } from "./contact";
import { cartTotal, whatsappLink } from "./whatsapp";
import { createReference } from "./reference";

/** A cart problem the shopper can fix (unavailable product or quantity). */
export class CheckoutError extends Error {
  constructor(
    message: string,
    readonly problems: { id: string; maxQuantity: number | null }[],
  ) {
    super(message);
    this.name = "CheckoutError";
  }
}

/**
 * Reloads every product from Sanity without cache and builds the WhatsApp
 * order from those prices. Cart contents stored in the browser are never
 * trusted for prices, names or availability.
 */
export async function prepareCheckout(
  lines: { id: string; quantity: number }[],
) {
  const { products } = await fetchProducts(
    { include: lines.map((l) => l.id).join(","), per_page: "1000" },
    true,
  );
  const problems: { id: string; maxQuantity: number | null }[] = [];
  const items: CartItem[] = [];
  for (const line of lines) {
    const p = products.find((product) => product.id === line.id);
    if (!p || !p.inStock || !p.purchasable || p.hasOptions) {
      problems.push({ id: line.id, maxQuantity: null });
    } else if (line.quantity > p.maxQuantity) {
      problems.push({ id: line.id, maxQuantity: p.maxQuantity });
    } else {
      items.push({ product: p, quantity: line.quantity });
    }
  }
  if (problems.length) {
    throw new CheckoutError(
      problems.some((p) => p.maxQuantity === null)
        ? "Algunos productos ya no están disponibles. Retíralos del carrito para continuar."
        : "La cantidad disponible de algunos productos cambió. Ajusta el carrito para continuar.",
      problems,
    );
  }
  const reference = createReference("P");
  return {
    items,
    reference,
    total: cartTotal(items),
    url: whatsappLink(items, CONTACT_NUMBER, reference),
  };
}
