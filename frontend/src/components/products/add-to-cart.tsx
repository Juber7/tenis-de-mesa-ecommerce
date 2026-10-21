"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { whatsappLink } from "@/lib/whatsapp";
import { CONTACT_NUMBER } from "@/lib/contact";
export function AddToCart({ product: p }: { product: Product }) {
  const add = useCart((s) => s.add);
  const items = useCart((s) => s.items);
  const [added, setAdded] = useState(false);
  const existing = items.find((i) => i.product.id === p.id);
  const mixed = items.some(
    (i) =>
      i.product.currency !== p.currency || i.product.minorUnit !== p.minorUnit,
  );
  const maxed = (existing?.quantity ?? 0) >= p.maxQuantity;
  let directUrl = "";
  if (p.inStock && p.purchasable && !p.hasOptions) {
    try {
      directUrl = whatsappLink([{ product: p, quantity: 1 }], CONTACT_NUMBER);
    } catch {
      /* Invalid product data cannot create a purchase link. */
    }
  }
  return (
    <div className="product-actions">
      <Button
        className="w-full"
        disabled={
          !p.inStock || !p.purchasable || p.hasOptions || mixed || maxed
        }
        onClick={() => {
          add(p);
          setAdded(true);
        }}
      >
        <ShoppingBag size={18} />
        {maxed
          ? "Cantidad máxima en carrito"
          : p.hasOptions
            ? "Requiere selección de variante"
            : !p.inStock
              ? "Sin existencias"
              : "Agregar al carrito"}
      </Button>
      {directUrl && (
        <Button asChild variant="direct" className="mt-3 w-full">
          <a href={directUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="h-5 w-5" />
            Comprar directamente
          </a>
        </Button>
      )}
      {p.hasOptions && (
        <p className="mt-3 text-sm">
          Este producto tiene variantes. La compra de variantes aún no está
          habilitada en esta tienda.
        </p>
      )}
      {mixed && (
        <p role="alert" className="mt-3 text-sm">
          Vacía el carrito antes de agregar productos de otra moneda.
        </p>
      )}
      {added && (
        <div className="mt-3">
          <p role="status" className="mb-3 text-sm text-forest">
            Producto agregado.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/carrito">
              <ShoppingBag size={18} />
              Ver carrito
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
