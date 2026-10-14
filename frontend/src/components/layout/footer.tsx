import Link from "next/link";
export function Footer() {
  return (
    <footer className="mt-20 bg-ink py-12 text-cream">
      <div className="shell grid gap-10 md:grid-cols-3">
        <div>
          <Link href="/" className="font-display text-4xl font-bold uppercase">
            Tenis de Mesa<span className="text-paddle">.</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-sand/70">
            El equipo correcto. La asesoría que necesitas. La pasión que
            compartimos.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-widest text-sand/60">
            La tienda
          </p>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/tienda">Explorar catálogo</Link>
            <Link href="/carrito">Mi carrito</Link>
            <Link href="/#como-comprar">Cómo comprar</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs uppercase tracking-widest text-sand/60">
            De jugador a jugador
          </p>
          <p className="text-sm leading-6">
            Arma tu carrito y envía tu consulta
          </p>
        </div>
      </div>
    </footer>
  );
}
