import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { CategoryArt } from "@/components/products/category-art";
import { ContactLink } from "@/components/contact-link";
import { JsonLd } from "@/components/json-ld";
import { ComicCarousel, type ComicPanel } from "@/components/comic-carousel";
import { fetchProducts } from "@/lib/catalog";
import { featuredByCategory } from "@/lib/product-filters";
import { money } from "@/lib/utils";
import { productCategories } from "@/lib/categories";
import { CONTACT_NUMBER } from "@/lib/contact";
import { absoluteUrl, BUSINESS, SEARCH_TERMS } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const storeLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: BUSINESS.storeName,
  url: absoluteUrl("/"),
  alternateName: ["TTN Shop", "Tenis de Mesa Nicaragua"],
  description:
    "Tienda de ping pong y tenis de mesa en Managua, Nicaragua: raquetas, gomas, pelotas de ping pong y accesorios.",
  keywords: SEARCH_TERMS.join(", "),
  areaServed: [
    { "@type": "City", name: BUSINESS.city },
    { "@type": "Country", name: BUSINESS.country },
  ],
  logo: absoluteUrl("/logo.png"),
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

/** One product per category for the comic carousel; empty if the catalog fails. */
async function comicPanels(): Promise<ComicPanel[]> {
  const catalog = await fetchProducts({ per_page: "1000" }).catch(() => null);
  if (!catalog) return [];
  return featuredByCategory(catalog.products, productCategories).map(({ category, product: p }) => ({
    slug: p.slug,
    name: p.name,
    price: money(p.price, p.currency, p.minorUnit),
    regularPrice:
      p.onSale && p.regularPrice > p.price ? money(p.regularPrice, p.currency, p.minorUnit) : null,
    image: p.image,
    imageAlt: p.imageAlt,
    category,
  }));
}

export default async function Home() {
  const panels = await comicPanels();
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
      <ComicCarousel panels={panels} />
      <section className="home-about shell" aria-labelledby="about-title">
        <h2 id="about-title">TIENDA DE PING PONG <br />EN MANAGUA</h2>
        <div className="home-about-copy">
          <p>
            Somos una tienda de tenis de mesa (ping pong) en Managua, Nicaragua. Aquí encuentras
            raquetas, gomas, pelotas de ping pong, pega, fundas, robots de entrenamiento y
            accesorios, con precios en córdobas.
          </p>
          <p>
            Elige tu equipo en la <Link href="/tienda">tienda en línea</Link> y coordina tu
            pedido por WhatsApp. Entregamos sin costo en el IND y en puntos céntricos de Managua,
            y enviamos al resto de Nicaragua por CargoTrans (el envío lo paga el cliente).
            Consulta la <Link href="/legal/envios">política de envíos</Link>.
          </p>
          <ul className="home-about-links" aria-label="Categorías de la tienda">
            {productCategories.map((category) => (
              <li key={category.value}>
                <Link href={`/tienda?categoria=${category.value}`}>{category.search}</Link>
              </li>
            ))}
          </ul>
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
