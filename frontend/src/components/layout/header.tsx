"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, ArrowUpRight, MessageCircle } from "lucide-react";
import { useCart } from "@/store/cart";
import { contactLink } from "@/lib/contact";
import { productCategories } from "@/lib/categories";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

export function Header() {
  const isHome = usePathname() === "/";
  const items = useCart((s) => s.items);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [whatsapp, setWhatsapp] = useState("https://wa.me/50589415416");
  useEffect(() => {
    void useCart.persist.rehydrate();
    setReady(true);
    setWhatsapp(contactLink());
  }, []);
  const categoryLinks = [
    ...productCategories.map((category) => [
      category.label,
      `/tienda?categoria=${category.value}`,
    ]),
  ];
  const links = [
    ["Tienda", "/tienda"],
    ...categoryLinks,
    ["Ofertas ↗", "/tienda?ofertas=si"],
  ];
  if (isHome) return null;

  return (
    <>
      <div className="announcement-bar flex items-center justify-center bg-[#F4F8FC] px-4 py-2 text-xs">
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => {
            event.currentTarget.href = contactLink();
          }}
          className="inline-flex min-h-8 items-center gap-2 rounded-full font-medium text-banner underline-offset-4 transition-colors hover:text-electric hover:underline"
        >
          <MessageCircle size={14} />
          Atención personalizada por WhatsApp
          <ArrowUpRight size={12} />
        </a>
      </div>
      <header className="shop-header relative z-40 bg-banner text-white">
        <div className="shell shop-header-inner flex min-h-[72px] items-center gap-4 py-3">
          <Link
            href="/"
            aria-label="Tenis de Mesa, inicio"
            className="flex shrink-0 items-center gap-3 focus-visible:rounded-md"
          >
            <span className="logo-mark">
              tm<span>•</span>
            </span>
            <span className="max-w-[72px] text-[10px] font-bold leading-4 tracking-[.2em]">
              TENIS DE MESA
            </span>
          </Link>
          <nav aria-label="Navegación principal" className="ml-auto hidden items-center gap-1 lg:flex">
            {[["Tienda", "/tienda"], ["Categorías", "/#categorias"], ["Ofertas", "/tienda?ofertas=si"], ["Inicio", "/"]].map(([label, url]) => (
              <Link
                key={url}
                href={url}
                className="nav-link"
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            href="/carrito"
            aria-label={`Carrito, ${ready ? items.reduce((s, i) => s + i.quantity, 0) : 0} productos`}
            className="cart-button ml-auto lg:ml-2"
          >
            <ShoppingBag size={19} />
            <span className="hidden sm:inline">Carrito</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-banner">
              {ready ? items.reduce((s, i) => s + i.quantity, 0) : 0}
            </span>
          </Link>
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                aria-label="Abrir menú"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              >
                <Menu size={21} />
              </SheetTrigger>
              <SheetContent>
                <SheetTitle className="mt-8 font-display text-3xl">
                  Explora la tienda
                </SheetTitle>
                <SheetDescription className="mt-2 text-sm">
                  Encuentra tu próximo equipo.
                </SheetDescription>
                <nav className="mt-8 flex flex-col gap-1" aria-label="Navegación móvil">
                  {links.map(([label, url]) => (
                    <SheetClose asChild key={url}>
                      <Link
                        href={url}
                        className="rounded-xl px-4 py-3 transition-colors hover:bg-blue-50"
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
