import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const floatingCards = [
  { name: "Raquetas", slug: "paletas", image: "raquetas", className: "hero-card-racket" },
  { name: "Gomas", slug: "gomas", image: "gomas", className: "hero-card-rubbers" },
  { name: "Pelotas", slug: "pelotas", image: "pelotas", className: "hero-card-balls" },
];

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
                <Image
                  src={`/category-art/${card.image}.png`}
                  alt=""
                  width={1024}
                  height={1024}
                  sizes="(max-width: 767px) 38vw, 230px"
                  priority={card.slug === "paletas"}
                />
              </div>
              <span>{card.name}<ArrowUpRight size={16} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
