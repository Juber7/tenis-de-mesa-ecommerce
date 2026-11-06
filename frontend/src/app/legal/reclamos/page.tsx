import Link from "next/link";
import { LegalPage, legalMetadata } from "@/components/legal/legal-page";
import { ComplaintForm } from "@/components/legal/complaint-form";
import { DIPRODEC_URL } from "@/lib/site";

const path = "/legal/reclamos";
export const metadata = legalMetadata(
  path,
  "Reclamos",
  "Presenta un reclamo y obtén un comprobante con número y fecha. Respondemos en un máximo de 10 días hábiles.",
);

export default function ComplaintsPage() {
  return (
    <LegalPage
      path={path}
      kicker="ATENCIÓN AL CLIENTE"
      title="Reclamos"
      lead="Si algo salió mal con tu compra, cuéntanos. Este formulario genera un comprobante con número y fecha que envías por WhatsApp."
    >
      <h2 id="como">Cómo funciona</h2>
      <ol>
        <li>Completa el formulario. Los datos se quedan en tu navegador: el sitio no los guarda ni los envía a ningún servidor.</li>
        <li>Al pulsar «Generar comprobante» verás tu reclamo con su número y fecha. Guárdalo o imprímelo.</li>
        <li>Envíalo por WhatsApp con el botón del comprobante. Te confirmaremos la recepción en el chat.</li>
        <li>Te daremos una respuesta en un máximo de <strong>10 días hábiles</strong>.</li>
      </ol>
      <p>
        Si no estás conforme con la respuesta, tienes 30 días hábiles para
        acudir a la DIPRODEC del MIFIC (Ley 842, artículo 100). Más información
        en <a href={DIPRODEC_URL} target="_blank" rel="noopener noreferrer">el sitio del MIFIC</a>.
        Para cambios y garantías consulta también{" "}
        <Link href="/legal/cambios-y-devoluciones">cambios y devoluciones</Link>.
      </p>

      <h2 id="formulario">Formulario de reclamo</h2>
      <ComplaintForm />
    </LegalPage>
  );
}
