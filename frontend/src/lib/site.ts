import { CONTACT_NUMBER } from "./contact";

/** Public origin of the store, without a trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL + "/").href;

/**
 * Merchant data shown in the footer, contact page and legal pages.
 * Fields set to null are not published yet: fill them in with information
 * confirmed by the merchant (never with placeholders).
 */
export const BUSINESS = {
  storeName: "Tenis de Mesa",
  ownerName: "Leandro Paiz",
  country: "Nicaragua",
  city: "Managua",
  whatsapp: CONTACT_NUMBER,
  /** Número RUC emitido por la DGI. */
  ruc: null as string | null,
  /** Dirección física para notificaciones y reclamos. */
  address: "Managua 11039" as string | null,
  postalCode: "11039",
  /** Correo electrónico de atención, si el comerciante decide publicarlo. */
  email: null as string | null,
  /** Horario de atención por WhatsApp, por ejemplo "Lunes a sábado, 9:00 a 18:00". */
  hours: null as string | null,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/leonardo_paiz27/" },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@leopaiz27",
    },
    { label: "Facebook", href: "https://www.facebook.com/alfredo.paizarana" },
  ],
} as const;

/**
 * Next.js replaces (does not merge) a parent's openGraph object, so every page
 * that sets openGraph must spread this base to keep the site name and image.
 */
export const OG_BASE = {
  type: "website" as const,
  locale: "es_NI",
  siteName: "Tenis de Mesa",
  images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: "Logo de Tenis de Mesa" }],
};

/** Date the legal texts were last reviewed (ISO, America/Managua). */
export const LEGAL_UPDATED_AT = "2026-11-05";

export const LEGAL_PAGES = [
  { href: "/legal/terminos", label: "Términos y condiciones" },
  { href: "/legal/privacidad", label: "Política de privacidad" },
  { href: "/legal/cookies", label: "Política de cookies" },
  { href: "/legal/envios", label: "Política de envíos" },
  { href: "/legal/cambios-y-devoluciones", label: "Cambios y devoluciones" },
  { href: "/legal/garantia", label: "Garantía" },
  { href: "/legal/reclamos", label: "Reclamos" },
] as const;

/** Consumer protection authority (MIFIC). */
export const DIPRODEC_URL = "https://www.mific.gob.ni/Inicio/Servicios/Servicio-Diprodec";
export const CARGOTRANS_URL = "https://www.cargotrans.com.ni/";
