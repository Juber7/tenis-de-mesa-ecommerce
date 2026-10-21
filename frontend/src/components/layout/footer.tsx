import { Facebook, Instagram, MessageCircle, Music2 } from "lucide-react";
import { CONTACT_NUMBER, contactLink } from "@/lib/contact";

const socialLinks = [
  {
    href: "https://www.instagram.com/leonardo_paiz27/",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://www.tiktok.com/@leopaiz27?is_from_webapp=1&sender_device=pc",
    label: "TikTok",
    Icon: Music2,
  },
  {
    href: "https://www.facebook.com/alfredo.paizarana",
    label: "Facebook",
    Icon: Facebook,
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-contact-banner">
        <div className="shell footer-contact-layout">
          <div className="footer-contact-copy">
            <p className="footer-kicker">TENIS DE MESA · NICARAGUA</p>
            <h2>¿LISTO PARA JUGAR?</h2>
            <p>Escríbenos para elegir tu equipo o resolver cualquier consulta.</p>
          </div>

          <a
            href={contactLink()}
            className="footer-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle aria-hidden="true" size={20} strokeWidth={2.5} />
            <span>
              <small>WHATSAPP</small>
              +{CONTACT_NUMBER.slice(0, 3)} {CONTACT_NUMBER.slice(3, 7)} {CONTACT_NUMBER.slice(7)}
            </span>
          </a>

          <nav className="footer-socials" aria-label="Redes sociales">
            {socialLinks.map(({ href, label, Icon }) => (
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
            ))}
          </nav>
        </div>

        <span className="footer-ni" aria-hidden="true">NI</span>
      </div>
    </footer>
  );
}
