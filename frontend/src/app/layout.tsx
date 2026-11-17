import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Anton, Barlow, Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import "./home.css";
import "./comic.css";
import "./commerce.css";
import "./legal.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HomeSideRail } from "@/components/home-side-rail";
import { CookieConsent } from "@/components/consent/cookie-consent";
import { PressNavigation } from "@/components/press-navigation";
import { ComicJump } from "@/components/comic-jump";
import { PageLoader } from "@/components/page-loader";
import { OG_BASE, SEARCH_TERMS, SITE_URL } from "@/lib/site";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";

const CONSENT_BOOTSTRAP = `try{if(!localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)}))document.documentElement.dataset.consent="pending"}catch(e){document.documentElement.dataset.consent="pending"}`;

// Fonts are downloaded at build time and served from this site: visitors'
// browsers never contact Google Fonts.
// Preloaded: Anton (titles), Barlow Condensed (labels) and Inter (body text,
// a single variable file) so long texts don't reflow when fonts arrive.
// Barlow is only used for a few home-page details and loads on demand.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-barlow-text",
  display: "swap",
  preload: false,
});
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });

// People search for the sport as "ping pong" at least as often as "tenis de
// mesa", so titles and descriptions name both.
const title = "Tienda de Ping Pong y Tenis de Mesa en Managua, Nicaragua";
const description =
  "Tienda de ping pong y tenis de mesa en Managua, Nicaragua: raquetas, gomas, pelotas de ping pong y accesorios. Elige tu equipo y coordina tu pedido por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Tenis de Mesa",
  },
  description,
  keywords: SEARCH_TERMS,
  applicationName: "Tenis de Mesa",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { ...OG_BASE, title, description },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/social-preview.png"],
  },
  // Google Search Console: set the token from the "HTML tag" method.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
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
    <html
      lang="es-NI"
      className={`${inter.variable} ${barlowCondensed.variable} ${barlow.variable} ${anton.variable}`}
      // The consent script below sets data-consent before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* Product photos come from Sanity's CDN: open the connection early. */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        {/* Shows the server-rendered cookie banner on first paint when no
            choice is stored, instead of waiting for hydration. */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP }} />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-cream focus:p-4"
        >
          Saltar al contenido
        </a>
        <Header />
        <HomeSideRail />
        <main id="contenido">{children}</main>
        <Footer />
        <CookieConsent />
        <PressNavigation />
        <ComicJump />
        {/* Reads the query string, which is only known in the browser. */}
        <Suspense fallback={null}>
          <PageLoader />
        </Suspense>
      </body>
    </html>
  );
}
