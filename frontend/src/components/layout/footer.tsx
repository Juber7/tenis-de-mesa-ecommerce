import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer mt-20 bg-banner py-12 text-white">
      <div className="home-footer-line shell">
        <span>© TENIS DE MESA · NICARAGUA</span>
        <span className="home-footer-ni">NI</span>
      </div>
      <div className="shell grid gap-10 md:grid-cols-3">
        <div>
          <Link href="/" className="font-display text-4xl font-bold uppercase">
            Tenis de Mesa<span className="text-[#A9CFFF]">.</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-white/80">
            El equipo correcto. La asesoría que necesitas. La pasión que
            compartimos.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-white/75">
            La tienda
          </p>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/tienda">Explorar catálogo</Link>
            <Link href="/carrito">Mi carrito</Link>
            <Link href="/#contacto">Contacto</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-white/75">
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
