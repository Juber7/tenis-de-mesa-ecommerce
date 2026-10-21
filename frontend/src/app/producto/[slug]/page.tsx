import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/woocommerce";
import { money } from "@/lib/utils";
import { AddToCart } from "@/components/products/add-to-cart";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { demoProducts } from "@/lib/demo";
export function generateStaticParams() {
  return demoProducts.map((product) => ({ slug: product.slug }));
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();
  return (
    <section className="commerce-page product-page">
      <div className="shell product-page-inner">
        <Button asChild variant="outline" className="product-back"><Link href="/tienda"><ArrowLeft size={18} />Volver a la tienda</Link></Button>
      <div className="product-detail-grid product-detail-layout">
        <div className="product-gallery">
          {p.image ? (
            <img
              className="h-full w-full object-cover"
              src={p.image}
              alt={p.imageAlt}
            />
          ) : (
            <p className="p-10">Imagen no disponible</p>
          )}
        </div>
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
          <p className="product-description">
            {p.description}
          </p>
          <p className={`product-stock ${p.inStock ? "text-forest" : "text-petroleum"}`}>
            {p.inStock ? "● Disponible para consulta" : "Sin existencias"}
          </p>
          <AddToCart product={p} />
          <p className="product-note">
            Confirmamos disponibilidad, precio final, envío y pago contigo por
            WhatsApp. Agregar al carrito no reserva inventario.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
