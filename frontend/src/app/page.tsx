import Link from "next/link";
import { Hero } from "@/components/hero";
import { CategoryArt } from "@/components/products/category-art";
import { productCategories } from "@/lib/categories";
import { contactLink } from "@/lib/contact";
import { HomeSideRail } from "@/components/home-side-rail";

export default function Home() {
  return (
    <div className="home-page">
      <HomeSideRail />
      <Hero />
      <section id="categorias" className="home-categories shell" aria-labelledby="categories-title">
        <div className="home-section-heading">
          <h2 id="categories-title">CATEGORÍAS</h2>
          <Link href="/tienda" className="home-text-link">VER TODO <span aria-hidden="true">→</span></Link>
        </div>
        <div className="home-category-grid">
          {productCategories.map((category) => (
            <Link
              key={category.value}
              href={`/tienda?categoria=${category.value}`}
              className="home-category-card"
            >
              <CategoryArt category={category.value} className="home-category-art" />
              <span className="home-category-label">{category.label}</span>
            </Link>
          ))}
        </div>
      </section>
      <section id="contacto" className="home-contact" aria-labelledby="contact-title">
        <div className="shell home-contact-inner">
          <div>
            <p className="home-contact-kicker">JUGUEMOS EN EQUIPO</p>
            <h2 id="contact-title">¿NO PUEDES<br />DECIDIRTE?</h2>
          </div>
          <a className="poster-action" href={contactLink()} target="_blank" rel="noopener noreferrer">
            CONTÁCTATE CONMIGO <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
