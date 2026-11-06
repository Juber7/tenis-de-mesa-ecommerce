import Link from "next/link";
import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { BUSINESS, LEGAL_PAGES, LEGAL_UPDATED_AT, OG_BASE } from "@/lib/site";
import { CONTACT_NUMBER_DISPLAY } from "@/lib/contact";
import { ContactLink } from "@/components/contact-link";

export function legalMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...OG_BASE, title, description, url: path },
  };
}

const updated = new Intl.DateTimeFormat("es-NI", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(LEGAL_UPDATED_AT + "T12:00:00Z"));

export function LegalPage({
  path,
  kicker = "INFORMACIÓN LEGAL",
  title,
  lead,
  children,
}: {
  path: string;
  kicker?: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section className="commerce-page legal-page">
      <div className="legal-intro">
        <div className="shell">
          <p className="commerce-kicker">{kicker}</p>
          <h1 className="legal-title">{title}</h1>
          <p className="legal-lead">{lead}</p>
          <p className="legal-meta">Última actualización: {updated}</p>
        </div>
      </div>
      <div className="shell legal-layout">
        <article className="legal-body">{children}</article>
        <aside className="legal-aside" aria-label="Otras páginas legales">
          <h2>Información</h2>
          <nav>
            {[{ href: "/contacto", label: "Contacto" }, ...LEGAL_PAGES].map((page) => (
              <Link
                key={page.href}
                href={page.href}
                aria-current={page.href === path ? "page" : undefined}
              >
                {page.label}
              </Link>
            ))}
          </nav>
          <ContactLink className="legal-whatsapp">
            <MessageCircle size={18} aria-hidden="true" />
            WhatsApp {CONTACT_NUMBER_DISPLAY}
          </ContactLink>
        </aside>
      </div>
    </section>
  );
}

/** Marks merchant data that has not been confirmed yet. */
export function Pending({ children }: { children: React.ReactNode }) {
  return <span className="legal-pending">{children}</span>;
}

/** Contact block reused across legal pages. */
export function MerchantContact() {
  return (
    <ul>
      <li>
        <strong>Comerciante:</strong> {BUSINESS.ownerName}, nombre comercial «{BUSINESS.storeName}».
      </li>
      <li>
        <strong>WhatsApp:</strong>{" "}
        <ContactLink>{CONTACT_NUMBER_DISPLAY}</ContactLink> (canal principal de
        atención, pedidos y reclamos).
      </li>
      <li>
        <strong>Ubicación:</strong>{" "}
        {BUSINESS.address ?? `${BUSINESS.city}, ${BUSINESS.country}`}
        {BUSINESS.address ? "" : ". La dirección exacta se indica por WhatsApp cuando corresponde."}
      </li>
      {BUSINESS.ruc && (
        <li>
          <strong>RUC:</strong> {BUSINESS.ruc}
        </li>
      )}
      {BUSINESS.email && (
        <li>
          <strong>Correo:</strong> <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        </li>
      )}
      {BUSINESS.hours && (
        <li>
          <strong>Horario de atención:</strong> {BUSINESS.hours}
        </li>
      )}
    </ul>
  );
}
