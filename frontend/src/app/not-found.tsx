import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="shell py-20">
      <p className="eyebrow">404 · FUERA DE LA MESA</p>
      <h1 className="my-5 font-display text-6xl">
        Esta página no está aquí.
      </h1>
      <p className="mb-6 max-w-xl">
        Es posible que el enlace haya cambiado o que el producto ya no esté
        publicado.
      </p>
      <div className="flex flex-wrap gap-6">
        <Link href="/tienda" className="underline">
          Explorar el catálogo →
        </Link>
        <Link href="/" className="underline">
          Ir al inicio
        </Link>
      </div>
    </section>
  );
}
