import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { CategoryArt } from "@/components/products/category-art";
import { ContactLink } from "@/components/contact-link";
import { JsonLd } from "@/components/json-ld";
import { productCategories } from "@/lib/categories";
import { CONTACT_NUMBER } from "@/lib/contact";
import { absoluteUrl, BUSINESS } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const storeLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: BUSINESS.storeName,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/social-preview.png"),
  image: absoluteUrl("/social-preview.png"),
  telephone: `+${CONTACT_NUMBER}`,
  currenciesAccepted: "NIO",
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.city,
    addressCountry: "NI",
    postalCode: BUSINESS.postalCode,
  },
  sameAs: BUSINESS.social.map((s) => s.href),
};

export default function Home() {
  return (
    <div className="home-page">
      <JsonLd data={storeLd} />
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
          <ContactLink className="poster-action">
            CONTÁCTATE CONMIGO <span aria-hidden="true">→</span>
          </ContactLink>
        </div>
        <span className="home-contact-ni" aria-hidden="true">NI</span>
      </section>
    </div>
  );
}
