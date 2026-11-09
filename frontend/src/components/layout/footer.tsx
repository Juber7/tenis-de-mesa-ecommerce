import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Music2 } from "lucide-react";
import { CONTACT_NUMBER_DISPLAY } from "@/lib/contact";
import { BUSINESS, LEGAL_PAGES } from "@/lib/site";
import { ContactLink } from "@/components/contact-link";
import { ConsentPreferencesButton } from "@/components/consent/consent-preferences-button";

const icons = { Instagram, TikTok: Music2, Facebook } as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-contact-banner">
        <div className="shell footer-contact-layout">
          <div className="footer-contact-copy">
            <p className="footer-kicker">TENIS DE MESA · MANAGUA, NICARAGUA</p>
            <h2>¿LISTO PARA JUGAR?</h2>
            <p>Escríbenos para elegir tu equipo o resolver cualquier consulta.</p>
          </div>

          <ContactLink className="footer-whatsapp">
            <MessageCircle aria-hidden="true" size={20} strokeWidth={2.5} />
            <span>
              <small>WHATSAPP</small>
              {CONTACT_NUMBER_DISPLAY}
            </span>
          </ContactLink>

          <nav className="footer-socials" aria-label="Redes sociales">
            {BUSINESS.social.map(({ href, label }) => {
              const Icon = icons[label];
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={"Visitar " + label}
                  title={label}
                >
                  <Icon aria-hidden="true" size={20} strokeWidth={2.25} />
                </a>
              );
            })}
          </nav>
        </div>

        <span className="footer-ni" aria-hidden="true">NI</span>
      </div>
      <div className="footer-legal">
        <div className="shell footer-legal-inner">
          <nav aria-label="Información legal" className="footer-legal-links">
            <Link href="/contacto">Contacto</Link>
            {LEGAL_PAGES.map((page) => (
              <Link key={page.href} href={page.href}>
                {page.label}
              </Link>
            ))}
            <ConsentPreferencesButton />
          </nav>
          <p className="footer-legal-owner">
            © {new Date().getFullYear()} {BUSINESS.storeName} · {BUSINESS.ownerName} ·{" "}
            {BUSINESS.city}, {BUSINESS.country}
            {BUSINESS.ruc ? ` · RUC ${BUSINESS.ruc}` : ""} · Desarrollado por{" "}
            <a href="https://juber-sanchez.pages.dev/" target="_blank" rel="noopener">
              Juber Sánchez
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
