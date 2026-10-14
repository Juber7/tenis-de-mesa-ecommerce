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
    <section className="shell py-10">
      <Button asChild variant="outline"><Link href="/tienda"><ArrowLeft size={18} />Volver a la tienda</Link></Button>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div className="aspect-square bg-sand">
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
        <div className="flex flex-col justify-center">
          <p className="eyebrow">
            {p.categories.map((c) => c.name).join(" · ")}
          </p>
          <h1 className="my-5 font-display text-5xl font-semibold md:text-6xl">
            {p.name}
          </h1>
          <p className="font-display text-4xl">
            {p.hasOptions ? "Desde " : ""}
            {money(p.price, p.currency, p.minorUnit)}
          </p>
          <p className="my-5 text-sm leading-7 text-charcoal/75">
            {p.description}
          </p>
          <p className="mb-6 text-sm text-forest">
            {p.inStock ? "● Disponible para consulta" : "Sin existencias"}
          </p>
          <AddToCart product={p} />
          <p className="mt-6 border-t border-sand pt-5 text-xs leading-6 text-charcoal/65">
            Confirmamos disponibilidad, precio final, envío y pago contigo por
            WhatsApp. Agregar al carrito no reserva inventario.
          </p>
        </div>
      </div>
    </section>
  );
}
