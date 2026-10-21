import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./home.css";
import "./commerce.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeSideRail } from "@/components/home-side-rail";
import { isDemo } from "@/lib/woocommerce";
export const metadata: Metadata = {
  title: {
    default: "Tenis de Mesa",
    template: "%s | Tenis de Mesa",
  },
  description:
    "Paletas, pelotas y accesorios de tenis de mesa. Elige tu equipo y coordina tu pedido por WhatsApp.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F8FC" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1F44" },
  ],
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
        <HomeSideRail />
        {(isDemo() || process.env.LOCAL_CATALOG === "true") && (
          <div className="catalog-demo-notice bg-white px-5 py-2 text-center text-[13px] leading-5 text-petroleum">
            {process.env.LOCAL_CATALOG === "true"
              ? "Catálogo local · Disponibilidad y precio final se confirman por WhatsApp"
              : "Catálogo de demostración · Precios e imágenes ilustrativos"}
          </div>
        )}
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
