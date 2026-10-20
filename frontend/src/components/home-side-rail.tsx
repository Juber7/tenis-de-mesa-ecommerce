import Link from "next/link";
import Image from "next/image";
import { House, LayoutGrid, ShoppingBag, UserRound } from "lucide-react";

export function HomeSideRail() {
  return (
    <aside className="home-side-rail" aria-label="Accesos rápidos">
      <Link href="/" className="home-rail-logo" aria-label="Tenis de Mesa, inicio">
        <Image src="/icon.svg" alt="" width={42} height={42} priority />
      </Link>
      <nav className="home-rail-actions" aria-label="Navegación de la portada">
        <Link href="/" aria-label="Inicio"><House size={20} strokeWidth={1.7} /></Link>
        <Link href="/#categorias" aria-label="Categorías"><LayoutGrid size={20} strokeWidth={1.7} /></Link>
        <Link href="/carrito" aria-label="Carrito"><ShoppingBag size={20} strokeWidth={1.7} /></Link>
        <Link href="/tienda" aria-label="Mi tienda"><UserRound size={20} strokeWidth={1.7} /></Link>
      </nav>
    </aside>
  );
}
