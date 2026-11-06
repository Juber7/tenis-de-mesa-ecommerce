import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProducts, getProduct } from "@/lib/catalog";
import { money } from "@/lib/utils";
import { describeRate } from "@/lib/exchange-rate";
import { absoluteUrl, BUSINESS, OG_BASE } from "@/lib/site";
import { AddToCart } from "@/components/products/add-to-cart";
import { ProductGallery } from "@/components/products/product-gallery";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/types/product";

export async function generateStaticParams() {
  const { products } = await fetchProducts({ per_page: "1000" });
  return products.map((product) => ({ slug: product.slug }));
}

const summary = (p: Product) => {
  const text = p.description.replace(/\s+/g, " ").trim();
  const base = text || `${p.name}, ${p.categories[0]?.name ?? "equipo"} de tenis de mesa.`;
  const short = base.length > 150 ? base.slice(0, 147).replace(/\s+\S*$/, "") + "…" : base;
  return `${short} ${money(p.price, p.currency, p.minorUnit)}. Pedido por WhatsApp en Nicaragua.`;
};

/** Social previews (WhatsApp, Facebook) use a 1200x630 crop of the main photo. */
const socialImage = (p: Product) =>
  p.image ? p.image.replace(/\?.*$/, "") + "?w=1200&h=630&fit=fill&bg=ffffff&fm=jpg&q=85" : null;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug).catch(() => null);
  if (!p) return { title: "Producto no encontrado", robots: { index: false } };
  const url = `/producto/${p.slug}`;
  const image = socialImage(p);
  const description = summary(p);
  return {
    title: p.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...OG_BASE,
      url,
      title: p.name,
      description,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: p.imageAlt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: p.name,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();
  const used = p.categories.some((c) => c.slug === "productos-seminuevos");
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description || undefined,
    image: p.gallery.map((g) => g.src),
    sku: p.id,
    category: p.categories[0]?.name,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/producto/${p.slug}`),
      price: (p.price / 10 ** p.minorUnit).toFixed(p.minorUnit),
      priceCurrency: p.currency,
      availability: p.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: used
        ? "https://schema.org/UsedCondition"
        : "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: BUSINESS.storeName },
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tienda", item: absoluteUrl("/tienda") },
      ...(p.categories[0]
        ? [{
            "@type": "ListItem",
            position: 2,
            name: p.categories[0].name,
            item: absoluteUrl(`/tienda?categoria=${p.categories[0].slug}`),
          }]
        : []),
      { "@type": "ListItem", position: p.categories[0] ? 3 : 2, name: p.name },
    ],
  };
  return (
    <section className="commerce-page product-page">
      <JsonLd data={productLd} />
      <JsonLd data={breadcrumbLd} />
      <div className="shell product-page-inner">
        <Button asChild variant="outline" className="product-back"><Link href="/tienda"><ArrowLeft size={18} />Volver a la tienda</Link></Button>
      <div className="product-detail-grid product-detail-layout">
        {p.gallery.length ? (
          <ProductGallery images={p.gallery} />
        ) : (
          <div className="product-gallery">
            <p className="p-10">Imagen no disponible</p>
          </div>
        )}
        <div className="product-info-panel">
          <p className="product-kicker">
            {p.categories.map((c) => c.name).join(" · ")}
          </p>
          <h1>
            {p.name}
          </h1>
          <p className="product-price">
            {p.hasOptions ? "Desde " : ""}
            {money(p.price, p.currency, p.minorUnit)}
          </p>
          {p.onSale && p.regularPrice > p.price && (
            <p className="product-regular-price">
              Precio normal: <del>{money(p.regularPrice, p.currency, p.minorUnit)}</del>
            </p>
          )}
          <p className="product-description">
            {p.description}
          </p>
          <p className={`product-stock ${p.inStock ? "text-forest" : "text-petroleum"}`}>
            {p.inStock ? "● Disponible para consulta" : "Sin existencias"}
          </p>
          <AddToCart product={p} />
          <p className="product-note">
            {p.fx && <>Precios en córdobas calculados a {describeRate(p.fx)}. </>}
            Confirmamos disponibilidad, precio final, envío y pago contigo por
            WhatsApp. Agregar al carrito no reserva inventario. Consulta la{" "}
            <Link href="/legal/envios">política de envíos</Link>, la{" "}
            <Link href="/legal/garantia">garantía</Link> y los{" "}
            <Link href="/legal/cambios-y-devoluciones">cambios y devoluciones</Link>.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
