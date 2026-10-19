import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { CategoryArt } from "@/components/products/category-art";
import { productCategories } from "@/lib/categories";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <div className="shell">
        <section
          id="categorias"
          className="py-12 md:py-20"
          aria-labelledby="categories-title"
        >
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2
                id="categories-title"
                className="font-display text-4xl font-semibold uppercase md:text-5xl"
              >
                Equípate para ganar.
              </h2>
            </div>
            <Link
              href="/tienda"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-4"
            >
              Ver todo <ArrowRight size={16} />
            </Link>
          </div>
          <div className="category-grid">
            {productCategories.map((category) => (
              <Link
                key={category.value}
                href={`/tienda?categoria=${category.value}`}
                className="category-card group overflow-hidden rounded-[24px] text-white"
                style={{ background: "linear-gradient(180deg, #0A1F44 0%, #081835 100%)" }}
              >
                <div className="aspect-square overflow-hidden p-2">
                  <CategoryArt
                    category={category.value}
                    className="category-art h-full w-full object-contain"
                  />
                </div>
                <div className="flex min-h-20 items-center justify-between gap-2 px-4 pb-5 pt-2 md:px-5">
                  <h3 className="font-display text-2xl font-semibold leading-tight">
                    {category.label}
                  </h3>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-[#A9CFFF] transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section
          id="como-comprar"
          className="grid gap-10 rounded-2xl bg-banner p-7 text-white md:grid-cols-2 md:p-12"
        >
          <div>
            <h2 className="font-display text-4xl font-semibold uppercase md:text-5xl">
              Tú eliges el equipo.
              <br />
              Nosotros te acompañamos.
            </h2>
            <Link
              href="/tienda"
              className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-banner transition-colors hover:bg-[#EAF3FF]"
            >
              Explorar la tienda <ArrowRight size={17} />
            </Link>
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
              <li
                key={n}
                className="flex gap-5 border-b border-white/20 pb-6 last:border-0 last:pb-0"
              >
                <span className="font-display text-3xl text-white/65">{n}</span>
                <div>
                  <h3 className="font-semibold">{t}</h3>
                  <p className="mt-1 text-base leading-6 text-white/85">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
