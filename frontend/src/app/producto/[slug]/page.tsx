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
    <section className="shell py-10 md:py-16">
      <Button asChild variant="outline"><Link href="/tienda"><ArrowLeft size={18} />Volver a la tienda</Link></Button>
      <div className="product-detail-grid mt-8">
        <div className="aspect-square overflow-hidden rounded-2xl bg-[#F4F8FC]">
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
        <div className="flex max-w-xl flex-col justify-center">
          <p className="eyebrow">
            {p.categories.map((c) => c.name).join(" · ")}
          </p>
          <h1 className="my-4 font-display text-5xl font-semibold leading-none md:text-6xl">
            {p.name}
          </h1>
          <p className="font-display text-4xl">
            {p.hasOptions ? "Desde " : ""}
            {money(p.price, p.currency, p.minorUnit)}
          </p>
          <p className="my-5 text-sm leading-7 text-charcoal/75">
            {p.description}
          </p>
          <p className={`mb-6 text-sm font-medium ${p.inStock ? "text-forest" : "text-petroleum"}`}>
            {p.inStock ? "● Disponible para consulta" : "Sin existencias"}
          </p>
          <AddToCart product={p} />
          <p className="mt-6 border-t border-sand pt-5 text-sm leading-6 text-charcoal/70">
            Confirmamos disponibilidad, precio final, envío y pago contigo por
            WhatsApp. Agregar al carrito no reserva inventario.
          </p>
        </div>
      </div>
    </section>
  );
}
