"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { money } from "@/lib/utils";
import { cartTotal, whatsappLink } from "@/lib/whatsapp";
import { CONTACT_NUMBER } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { Button } from "@/components/ui/button";
export function CartView() {
  const { items, setQuantity, remove } = useCart();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready)
    return (
      <p className="py-16" role="status">
        Cargando tu carrito…
      </p>
    );
  if (!items.length)
    return (
      <div className="py-20 text-center">
        <ShoppingBag className="mx-auto mb-6" size={40} />
        <h1 className="font-display text-5xl">
          Tu próximo punto empieza aquí.
        </h1>
        <p className="my-5 text-sm">Aún no tienes productos en tu carrito.</p>
        <Button asChild>
          <Link href="/tienda">Explorar la tienda</Link>
        </Button>
      </div>
    );
  let total = 0;
  let invalid = "";
  try {
    total = cartTotal(items);
  } catch (e) {
    invalid = e instanceof Error ? e.message : "Carrito inválido";
  }
  let purchaseUrl = "";
  if (!invalid) {
    try {
      purchaseUrl = whatsappLink(items, CONTACT_NUMBER);
    } catch (e) {
      invalid =
        e instanceof Error ? e.message : "No se pudo preparar el mensaje.";
    }
  }
  return (
    <>
      <div className="mb-9 flex items-center justify-between">
        <h1 className="font-display text-5xl font-semibold uppercase">
          Tu carrito.
        </h1>
      </div>
      <div className="cart-content-grid min-w-0">
        <div className="min-w-0 divide-y divide-sand">
          {items.map(({ product: p, quantity: q }) => (
            <article key={p.id} className="flex flex-wrap gap-4 py-6 first:pt-0">
              {p.image && (
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  className="h-24 w-24 rounded-xl bg-[#F4F8FC] object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <Link
                  href={`/producto/${p.slug}`}
                  className="font-display text-2xl font-semibold"
                >
                  {p.name}
                </Link>
                <p className="mt-2 text-sm">
                  {money(p.price, p.currency, p.minorUnit)} / unidad
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center rounded-xl border border-sand">
                    <button
                      aria-label={`Reducir cantidad de ${p.name}`}
                      disabled={q <= 1}
                      onClick={() => setQuantity(p.id, q - 1)}
                      className="inline-flex min-h-11 min-w-11 items-center justify-center disabled:opacity-30"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="min-w-6 text-center text-sm">{q}</span>
                    <button
                      aria-label={`Aumentar cantidad de ${p.name}`}
                      disabled={q >= p.maxQuantity}
                      onClick={() => setQuantity(p.id, q + 1)}
                      className="inline-flex min-h-11 min-w-11 items-center justify-center disabled:opacity-30"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <button
                    aria-label={`Eliminar ${p.name}`}
                    onClick={() => remove(p.id)}
                    className="remove-item"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
              <p className="w-full text-right font-display text-xl sm:w-auto">
                {money(p.price * q, p.currency, p.minorUnit)}
              </p>
            </article>
          ))}
        </div>
        <aside className="h-fit rounded-2xl bg-[#F4F8FC] p-5 md:p-7">
          <h2 className="font-display text-3xl">Resumen del pedido</h2>
          <div className="my-6 flex flex-wrap items-center justify-between gap-3 border-y border-sand py-5">
            <span>Total calculado</span>
            <strong className="font-display text-3xl">
              {money(
                total,
                items[0].product.currency,
                items[0].product.minorUnit,
              )}
            </strong>
          </div>
          <p className="mb-6 text-sm leading-6 text-charcoal/75">
            Entrega y disponibilidad se confirman con Leandro. El total
            corresponde a los productos y no incluye costos adicionales de
            envío.
          </p>
          {invalid && (
            <p role="alert" className="mb-4 text-sm font-medium text-banner">
              {invalid}
            </p>
          )}
          {purchaseUrl && (
            <Button asChild variant="whatsapp" className="w-full min-h-12">
              <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" /> Realizar compra
              </a>
            </Button>
          )}
          <Button asChild variant="outline" className="mt-3 w-full min-h-12">
            <Link href="/tienda">
              <ArrowLeft size={18} /> Volver a la tienda
            </Link>
          </Button>
        </aside>
      </div>
    </>
  );
}
