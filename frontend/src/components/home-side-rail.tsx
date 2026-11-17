"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutGrid, ShoppingBag, ShoppingCart } from "lucide-react";
import { usesSideRail } from "@/lib/routes";
import { useCart } from "@/store/cart";
import { useCartHydrated } from "@/store/use-cart-hydrated";

export function HomeSideRail() {
  const pathname = usePathname();
  const items = useCart((s) => s.items);
  const ready = useCartHydrated();
  const count = ready ? items.reduce((sum, i) => sum + i.quantity, 0) : 0;
  if (!usesSideRail(pathname)) return null;

  return (
    <aside className="home-side-rail" aria-label="Accesos rápidos">
      <Link href="/" className="home-rail-logo" aria-label="Tenis de Mesa, inicio">
        <Image src="/logo.png" alt="" width={42} height={42} priority />
      </Link>
      <nav className="home-rail-actions" aria-label="Navegación principal">
        <Link href="/tienda" aria-label="Tienda"><ShoppingBag size={20} strokeWidth={1.7} /></Link>
        <Link href="/#categorias" aria-label="Categorías"><LayoutGrid size={20} strokeWidth={1.7} /></Link>
        <Link href="/carrito" className="home-rail-cart" aria-label={count ? `Carrito, ${count} ${count === 1 ? "producto" : "productos"}` : "Carrito"}>
          <ShoppingCart size={20} strokeWidth={1.7} />
          {/* The key restarts the pop each time the number changes. */}
          {count > 0 && <span key={count} className="home-rail-count" aria-hidden="true">{count > 99 ? "99+" : count}</span>}
        </Link>
      </nav>
    </aside>
  );
}
