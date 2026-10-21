"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { House, LayoutGrid, ShoppingBag, ShoppingCart } from "lucide-react";

export function HomeSideRail() {
  const pathname = usePathname();
  if (!(["/", "/tienda", "/carrito"].includes(pathname) || pathname.startsWith("/producto/"))) return null;

  return (
    <aside className="home-side-rail" aria-label="Accesos rápidos">
      <Link href="/" className="home-rail-logo" aria-label="Tenis de Mesa, inicio">
        <Image src="/icon.svg" alt="" width={42} height={42} priority />
      </Link>
      <nav className="home-rail-actions" aria-label="Navegación principal">
        <Link href="/" aria-label="Inicio"><House size={20} strokeWidth={1.7} /></Link>
        <Link href="/tienda" aria-label="Tienda"><ShoppingBag size={20} strokeWidth={1.7} /></Link>
        <Link href="/#categorias" aria-label="Categorías"><LayoutGrid size={20} strokeWidth={1.7} /></Link>
        <Link href="/carrito" aria-label="Carrito"><ShoppingCart size={20} strokeWidth={1.7} /></Link>
      </nav>
    </aside>
  );
}
