import Link from "next/link";
export default function NotFound() {
  return (
    <section className="shell py-20">
      <p className="eyebrow">404 · FUERA DE LA MESA</p>
      <h1 className="my-5 font-display text-6xl">
        Este producto no está aquí.
      </h1>
      <Link href="/tienda" className="underline">
        Explorar el catálogo →
      </Link>
    </section>
  );
}
