"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutGrid, ShoppingBag, ShoppingCart } from "lucide-react";
import { usesSideRail } from "@/lib/routes";

export function HomeSideRail() {
  const pathname = usePathname();
  if (!usesSideRail(pathname)) return null;

  return (
    <aside className="home-side-rail" aria-label="Accesos rápidos">
      <Link href="/" className="home-rail-logo" aria-label="Tenis de Mesa, inicio">
        <Image src="/icon.svg" alt="" width={42} height={42} priority />
      </Link>
      <nav className="home-rail-actions" aria-label="Navegación principal">
        <Link href="/tienda" aria-label="Tienda"><ShoppingBag size={20} strokeWidth={1.7} /></Link>
        <Link href="/#categorias" aria-label="Categorías"><LayoutGrid size={20} strokeWidth={1.7} /></Link>
        <Link href="/carrito" aria-label="Carrito"><ShoppingCart size={20} strokeWidth={1.7} /></Link>
      </nav>
    </aside>
  );
}
