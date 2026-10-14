"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, ArrowUpRight, MessageCircle } from "lucide-react";
import { useCart } from "@/store/cart";
import { contactLink } from "@/lib/contact";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

export function Header() {
  const items = useCart((s) => s.items);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [whatsapp, setWhatsapp] = useState("https://wa.me/50589415416");
  useEffect(() => {
    void useCart.persist.rehydrate();
    setReady(true);
    setWhatsapp(contactLink());
  }, []);
  const links = [
    ["Tienda", "/tienda"],
    ["Paletas", "/tienda?categoria=paletas"],
    ["Pelotas", "/tienda?categoria=pelotas"],
    ["Accesorios", "/tienda?categoria=accesorios"],
    ["Ofertas ↗", "/tienda?ofertas=si"],
  ];
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-sand px-4 py-2 text-[11px] tracking-wide">
        <span className="hidden sm:inline">
          TU PRÓXIMO GRAN PUNTO EMPIEZA AQUÍ
        </span>
        <span className="hidden sm:inline" aria-hidden="true">
          •
        </span>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => {
            event.currentTarget.href = contactLink();
          }}
          className="inline-flex items-center gap-2 rounded-full font-medium text-petroleum underline-offset-4 transition-colors hover:text-forest hover:underline"
        >
          <MessageCircle size={14} />
          Atención personalizada por WhatsApp
          <ArrowUpRight size={12} />
        </a>
      </div>
      <header className="relative z-40 bg-ink text-cream">
        <div className="flex min-h-[72px] w-full items-center gap-4 px-4 lg:gap-8 lg:px-6">
          <Link
            href="/"
            aria-label="Tenis de Mesa, inicio"
            className="flex shrink-0 items-center gap-3"
          >
            <span className="logo-mark">
              tm<span>•</span>
            </span>
            <span className="max-w-[72px] text-[10px] font-bold leading-4 tracking-[.2em]">
              TENIS DE MESA
            </span>
          </Link>
          <nav
            aria-label="Navegación principal"
            className="ml-auto hidden items-center gap-1 lg:flex xl:gap-3"
          >
            {links.map(([label, url]) => (
              <Link
                key={url}
                href={url}
                className={`nav-link ${url.includes("ofertas") ? "text-mustard" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            href="/carrito"
            aria-label={`Carrito, ${ready ? items.reduce((s, i) => s + i.quantity, 0) : 0} productos`}
            className="cart-button ml-auto lg:ml-0"
          >
            <ShoppingBag size={19} />
            <span className="hidden sm:inline">Carrito</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-paddle px-1 text-[10px]">
              {ready ? items.reduce((s, i) => s + i.quantity, 0) : 0}
            </span>
          </Link>
          <div className="lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                aria-label="Abrir menú"
                className="rounded-full p-2 transition-colors hover:bg-white/10"
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
                <nav className="mt-8 flex flex-col gap-3">
                  {links.map(([label, url]) => (
                    <SheetClose asChild key={url}>
                      <Link
                        href={url}
                        className="rounded-xl px-4 py-3 transition-colors hover:bg-sand"
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
