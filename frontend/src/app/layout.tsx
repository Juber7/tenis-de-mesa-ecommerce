import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { isDemo } from "@/lib/woocommerce";
export const metadata: Metadata = {
  title: {
    default: "Tenis de Mesa",
    template: "%s | Tenis de Mesa",
  },
  description:
    "Paletas, pelotas y accesorios de tenis de mesa. Elige tu equipo y coordina tu pedido por WhatsApp.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-cream focus:p-4"
        >
          Saltar al contenido
        </a>
        <Header />
        {(isDemo() || process.env.LOCAL_CATALOG === "true") && (
          <div className="bg-cream py-2 text-center text-[11px] text-petroleum">
            {process.env.LOCAL_CATALOG === "true"
              ? "WordPress local conectado · Productos de ejemplo, no disponibles para venta"
              : "Catálogo de demostración · Precios e imágenes ilustrativos"}
          </div>
        )}
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
