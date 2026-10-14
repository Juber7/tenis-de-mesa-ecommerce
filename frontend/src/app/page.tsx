import Link from "next/link";
import { ArrowRight, MessageCircle, PackageCheck, Target } from "lucide-react";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/products/product-card";
import { fetchProducts } from "@/lib/woocommerce";
export const dynamic = "force-dynamic";
export default async function Home() {
  let products;
  try {
    products = (await fetchProducts({ per_page: "4" })).products;
  } catch {
    products = null;
  }
  return (
    <>
      <Hero />
      <div className="shell">
        <div className="grid gap-6 border-y border-sand py-6 md:grid-cols-3">
          {[
            [
              Target,
              "Equipo para tu estilo",
              "Desde tu primer saque hasta la competición.",
            ],
            [
              MessageCircle,
              "Asesoría de verdad",
              "Resuelve tus dudas con nuestro equipo.",
            ],
            [
              PackageCheck,
              "Compra a tu manera",
              "Coordina tu entrega por WhatsApp.",
            ],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof Target;
            return (
              <div key={String(title)} className="flex items-center gap-4">
                <I className="shrink-0 text-petroleum" size={25} />
                <div>
                  <h2 className="text-sm font-semibold">{String(title)}</h2>
                  <p className="mt-1 text-xs text-charcoal/65">
                    {String(text)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <section className="py-14">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">EQUÍPATE PARA GANAR</p>
              <h2 className="mt-2 font-display text-4xl font-semibold uppercase md:text-5xl">
                Tu próximo favorito.
              </h2>
            </div>
            <Link
              href="/tienda"
              className="flex items-center gap-2 text-xs underline underline-offset-4"
            >
              Ver todo <ArrowRight size={16} />
            </Link>
          </div>
          {products ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
              {!products.length && <p>No hay productos publicados todavía.</p>}
            </div>
          ) : (
            <p role="alert">
              No pudimos cargar el catálogo.{" "}
              <Link href="/tienda" className="underline">
                Volver a intentarlo
              </Link>
            </p>
          )}
        </section>
        <section
          id="como-comprar"
          className="grid gap-10 bg-sand p-7 md:grid-cols-2 md:p-12"
        >
          <div>
            <p className="eyebrow">SIN COMPLICACIONES</p>
            <h2 className="mt-4 font-display text-5xl font-semibold uppercase">
              Tú eliges el equipo.
              <br />
              Nosotros te acompañamos.
            </h2>
          </div>
          <ol className="space-y-6">
            {[
              [
                "01",
                "Explora y elige",
                "Encuentra el equipo que se adapta a tu juego.",
              ],
              [
                "02",
                "Arma tu carrito",
                "Agrega tus favoritos y ajusta las cantidades.",
              ],
              [
                "03",
                "Conversemos por WhatsApp",
                "Envía tu pedido y confirma disponibilidad, pago y entrega por WhatsApp.",
              ],
            ].map(([n, t, d]) => (
              <li className="flex gap-5" key={n}>
                <span className="font-display text-3xl text-paddle">{n}</span>
                <div>
                  <h3 className="font-semibold">{t}</h3>
                  <p className="mt-1 text-sm leading-6 text-charcoal/70">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
