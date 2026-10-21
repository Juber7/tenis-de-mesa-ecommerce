import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductShowcase } from "@/components/category-showcase";

const floatingCards = [
  { name: "Raquetas", slug: "paletas", showcase: "raquetas", className: "hero-card-racket" },
  { name: "Gomas", slug: "gomas", showcase: "gomas", className: "hero-card-rubbers" },
  { name: "Pelotas", slug: "pelotas", showcase: "pelotas", className: "hero-card-balls" },
] as const;

export function Hero() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero-band" aria-hidden="true" />
      <div className="home-hero-stripe" aria-hidden="true" />
      <div className="home-hero-disc" aria-hidden="true" />
      <div className="home-hero-halftone" aria-hidden="true" />
      <div className="shell home-hero-inner">
        <div className="home-hero-copy">
          <h1 id="home-title">EQUÍPATE<br />PARA GANAR.</h1>
          <p className="home-hero-label">TENIS DE MESA · NICARAGUA</p>
          <Link className="poster-action" href="/tienda">
            VER CATÁLOGO <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="home-hero-cards" aria-label="Explora nuestro equipo">
          {floatingCards.map((card) => (
            <Link
              key={card.slug}
              href={`/tienda?categoria=${card.slug}`}
              className={`hero-product-card ${card.className}`}
            >
              <div className="hero-product-art">
                <ProductShowcase category={card.showcase} label={card.name} />
              </div>
              <span>{card.name}<ArrowUpRight size={16} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
