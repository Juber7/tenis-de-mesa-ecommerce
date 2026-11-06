import Link from "next/link";
import { LegalPage, legalMetadata } from "@/components/legal/legal-page";
import { ComplaintForm } from "@/components/legal/complaint-form";
import { DIPRODEC_URL } from "@/lib/site";

const path = "/legal/reclamos";
export const metadata = legalMetadata(
  path,
  "Reclamos",
  "Presentación de reclamos con comprobante numerado y fechado. Respuesta en un máximo de 3 días hábiles.",
);

export default function ComplaintsPage() {
  return (
    <LegalPage
      path={path}
      kicker="ATENCIÓN AL CLIENTE"
      title="Reclamos"
      lead="Procedimiento para presentar un reclamo y obtener un comprobante con número y fecha."
    >
      <h2 id="procedimiento">Procedimiento</h2>
      <ol>
        <li>Se completa el formulario. Los datos permanecen en el navegador: el sitio no los guarda ni los envía a ningún servidor.</li>
        <li>Al pulsar «Generar comprobante» se muestra el reclamo con su número y fecha, que puede guardarse o imprimirse.</li>
        <li>El comprobante se envía por WhatsApp con el botón correspondiente. La recepción se confirma en el chat.</li>
        <li>El reclamo se responde en un plazo máximo de <strong>3 días hábiles</strong>.</li>
      </ol>
      <p>
        Si la respuesta no resulta satisfactoria, existe un plazo de 30 días
        hábiles para acudir a la DIPRODEC del MIFIC. Información en{" "}
        <a href={DIPRODEC_URL} target="_blank" rel="noopener noreferrer">el sitio del MIFIC</a>.
        Los cambios y la garantía se explican en{" "}
        <Link href="/legal/cambios-y-devoluciones">cambios y devoluciones</Link>.
      </p>

      <h2 id="formulario">Formulario de reclamo</h2>
      <ComplaintForm />
    </LegalPage>
  );
}
