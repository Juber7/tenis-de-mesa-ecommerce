"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, RotateCw } from "lucide-react";
import { useCart } from "@/store/cart";
import { useCartHydrated } from "@/store/use-cart-hydrated";
import { money } from "@/lib/utils";
import { describeRate } from "@/lib/exchange-rate";
import type { CartItem } from "@/types/product";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { ContactLink } from "@/components/contact-link";

type Problem = { id: string; maxQuantity: number | null };
type Verification = {
  key: string;
  items?: CartItem[];
  total?: number;
  url?: string;
  error?: string;
  problems?: Problem[];
};

/**
 * Asks the server to reload prices and availability from Sanity. The cart in
 * localStorage is only a list of products and quantities: prices shown before
 * verification are provisional and the WhatsApp order is built server-side.
 */
function useVerifiedCart(lines: { id: string; quantity: number }[], retry: number) {
  const key = JSON.stringify(lines);
  const [result, setResult] = useState<Verification | null>(null);
  useEffect(() => {
    if (!lines.length) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: key,
          signal: controller.signal,
        });
        const body = (await response.json().catch(() => ({}))) as Omit<Verification, "key">;
        if (response.ok && body.url && body.items) setResult({ key, ...body });
        else
          setResult({
            key,
            error: body.error || "No pudimos verificar tu pedido. Inténtalo de nuevo.",
            problems: body.problems,
          });
      } catch {
        if (controller.signal.aborted) return;
        setResult({
          key,
          error: "No pudimos verificar los precios. Revisa tu conexión e inténtalo de nuevo.",
        });
      }
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
    // `key` serializes `lines`; `retry` forces a new verification.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, retry]);
  return result?.key === key ? result : null;
}

export function CartView() {
  const { items, setQuantity, remove, sync } = useCart();
  const hydrated = useCartHydrated();
  const [retry, setRetry] = useState(0);
  const lines = useMemo(
    () => items.map((i) => ({ id: i.product.id, quantity: i.quantity })),
    [items],
  );
  const verification = useVerifiedCart(lines, retry);
  const verified = verification?.items;
  useEffect(() => {
    if (verified) sync(verified.map((i) => i.product));
  }, [verified, sync]);

  if (!hydrated)
    return (
      <p className="py-16" role="status">
        Cargando tu carrito…
      </p>
    );
  if (!items.length)
    return (
      <div className="cart-empty text-center">
        <ShoppingBag className="mx-auto mb-6" size={40} />
        <h1 className="font-display text-5xl">
          Tu próximo punto empieza aquí.
        </h1>
        <p className="my-5 text-sm">Aún no tienes productos en tu carrito.</p>
        <Button asChild className="mt-2">
          <Link href="/tienda">Explorar la tienda</Link>
        </Button>
      </div>
    );

  const verifying = !verification;
  const problems = new Map(
    (verification?.problems ?? []).map((p) => [p.id, p.maxQuantity]),
  );
  const shown = items.map((item) => {
    const fresh = verified?.find((v) => v.product.id === item.product.id);
    return fresh ? { ...item, product: fresh.product } : item;
  });
  const provisionalTotal = shown.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );
  const total = verification?.total ?? provisionalTotal;
  const { currency, minorUnit } = shown[0].product;

  return (
    <>
      <div className="cart-intro">
        <p className="cart-kicker">TU SELECCIÓN · NICARAGUA</p>
        <h1 className="cart-title">
          Tu carrito.
        </h1>
        <p className="cart-subtitle">Revisa tus productos y envía tu pedido cuando estés listo.</p>
      </div>
      <div className="cart-content-grid min-w-0">
        <div className="cart-list min-w-0 divide-y divide-sand">
          {shown.map(({ product: p, quantity: q }) => {
            const problem = problems.has(p.id);
            const max = problems.get(p.id);
            return (
              <article key={p.id} className="flex flex-wrap gap-4 py-6 first:pt-0">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    width={96}
                    height={96}
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
                  {problem && (
                    <p role="alert" className="cart-line-problem">
                      {max == null
                        ? "Este producto ya no está disponible."
                        : `Cantidad máxima disponible: ${max}.`}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-4">
                    <div className="cart-quantity flex items-center rounded-xl">
                      <button
                        aria-label={`Reducir cantidad de ${p.name}`}
                        disabled={q <= 1}
                        onClick={() => setQuantity(p.id, q - 1)}
                        className="inline-flex min-h-11 min-w-11 items-center justify-center disabled:opacity-30"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="min-w-6 text-center text-sm" aria-live="polite">{q}</span>
                      <button
                        aria-label={`Aumentar cantidad de ${p.name}`}
                        disabled={q >= (max ?? p.maxQuantity)}
                        onClick={() => setQuantity(p.id, q + 1)}
                        className="inline-flex min-h-11 min-w-11 items-center justify-center disabled:opacity-30"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    {max != null && q > max && (
                      <button
                        className="cart-line-fix"
                        onClick={() => setQuantity(p.id, max)}
                      >
                        Ajustar a {max}
                      </button>
                    )}
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
            );
          })}
        </div>
        <aside className="cart-summary h-fit p-5 md:p-7">
          <h2 className="font-display text-3xl">Resumen del pedido</h2>
          <div className="my-6 flex flex-wrap items-center justify-between gap-3 border-y border-sand py-5">
            <span>
              Total de productos
              {verifying && (
                <small className="block text-xs" role="status">
                  Verificando precios y disponibilidad…
                </small>
              )}
            </span>
            <strong className="font-display text-3xl" aria-busy={verifying}>
              {money(total, currency, minorUnit)}
            </strong>
          </div>
          <p className="mb-6 text-sm leading-6 text-charcoal/75">
            {verified?.[0]?.product.fx && (
              <>Precios en córdobas calculados a {describeRate(verified[0].product.fx)}. </>
            )}
            El total no incluye el envío cuando este tenga costo. Disponibilidad,
            envío y forma de pago se confirman por WhatsApp.
          </p>
          {verification?.error && (
            <div role="alert" className="mb-4 text-sm font-medium text-banner">
              <p>{verification.error}</p>
              {!verification.problems?.length && (
                <button
                  className="cart-line-fix mt-3"
                  onClick={() => setRetry((n) => n + 1)}
                >
                  <RotateCw size={14} aria-hidden="true" /> Reintentar
                </button>
              )}
            </div>
          )}
          {verification?.url ? (
            <Button asChild variant="whatsapp" className="w-full min-h-12">
              <a href={verification.url} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" /> Enviar pedido por WhatsApp
              </a>
            </Button>
          ) : (
            <Button variant="whatsapp" className="w-full min-h-12" disabled>
              <WhatsAppIcon className="h-5 w-5" />
              {verifying ? "Verificando pedido…" : "Revisa tu carrito"}
            </Button>
          )}
          <p className="cart-legal-note">
            Enviar el mensaje es una solicitud de pedido: la compra queda
            confirmada cuando te respondamos por WhatsApp confirmando
            disponibilidad, precio final, envío y forma de pago. Consulta los{" "}
            <Link href="/legal/terminos">términos</Link>, la{" "}
            <Link href="/legal/envios">política de envíos</Link> y la{" "}
            <Link href="/legal/garantia">garantía</Link>.
          </p>
          {verification?.error && !verification.problems?.length && (
            <p className="mt-3 text-sm">
              ¿Prefieres escribirnos directamente?{" "}
              <ContactLink className="underline underline-offset-4">
                Abrir WhatsApp
              </ContactLink>
            </p>
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
