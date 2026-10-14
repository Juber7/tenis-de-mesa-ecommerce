import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { money } from "@/lib/utils";
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="product-card group">
      <Link
        href={`/producto/${p.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-sand"
      >
        {p.image ? (
          <img
            src={p.image}
            alt={p.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm">
            Imagen no disponible
          </div>
        )}
        {p.onSale && (
          <span className="absolute left-3 top-3 bg-paddle px-3 py-1 text-[10px] font-semibold text-white">
            OFERTA
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-cream p-2">
          <ArrowUpRight size={18} />
        </span>
      </Link>
      <div className="p-4 md:p-5">
        <p className="text-[10px] uppercase tracking-[.15em] text-petroleum">
          {p.categories.map((c) => c.name).join(" · ")}
        </p>
        <Link href={`/producto/${p.slug}`}>
          <h3 className="mt-1 font-display text-2xl font-semibold">{p.name}</h3>
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <span className="font-display text-2xl font-semibold">
            {p.hasOptions ? "Desde " : ""}
            {money(p.price, p.currency, p.minorUnit)}
          </span>
          {p.onSale && p.regularPrice > p.price && (
            <del className="text-xs text-muted">
              {money(p.regularPrice, p.currency, p.minorUnit)}
            </del>
          )}
        </div>
        <p
          className={`mt-2 text-xs ${p.inStock ? "text-forest" : "text-paddle"}`}
        >
          {p.inStock ? "● Disponible" : "Sin existencias"}
        </p>
      </div>
    </article>
  );
}
