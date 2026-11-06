import Link from "next/link";
import { LegalPage, legalMetadata } from "@/components/legal/legal-page";
import { ContactLink } from "@/components/contact-link";
import { CONTACT_NUMBER_DISPLAY } from "@/lib/contact";
import { BUSINESS } from "@/lib/site";

const path = "/contacto";
export const metadata = legalMetadata(
  path,
  "Contacto",
  `Escríbenos por WhatsApp al ${CONTACT_NUMBER_DISPLAY} para consultas, pedidos, garantías y reclamos.`,
);

export default function ContactPage() {
  return (
    <LegalPage
      path={path}
      kicker="TENIS DE MESA · NICARAGUA"
      title="Contacto"
      lead="WhatsApp es nuestro canal de atención: por ahí respondemos consultas, confirmamos pedidos y atendemos garantías y reclamos."
    >
      <h2 id="whatsapp">Escríbenos</h2>
      <h3>WhatsApp</h3>
      <p>
        <ContactLink className="font-semibold">{CONTACT_NUMBER_DISPLAY}</ContactLink>
      </p>
      <p>Consultas, pedidos, envíos, garantías y reclamos.</p>
      <h3>Redes sociales</h3>
      <ul>
        {BUSINESS.social.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
          </li>
        ))}
      </ul>

      <h2 id="mas">También te puede servir</h2>
      <ul>
        <li><Link href="/legal/reclamos">Presentar un reclamo con comprobante</Link></li>
        <li><Link href="/legal/envios">Opciones de entrega</Link></li>
        <li><Link href="/legal/garantia">Garantía</Link> y <Link href="/legal/cambios-y-devoluciones">cambios y devoluciones</Link></li>
        <li><Link href="/legal/privacidad">Política de privacidad</Link></li>
      </ul>
    </LegalPage>
  );
}
