import Link from "next/link";
import { LegalPage, legalMetadata, Pending } from "@/components/legal/legal-page";
import { whatsappTextLink } from "@/lib/contact";
import { DIPRODEC_URL } from "@/lib/site";

const path = "/legal/cambios-y-devoluciones";
export const metadata = legalMetadata(
  path,
  "Cambios y devoluciones",
  "Cambios por defectos de fábrica, derecho de retracto y procedimiento de reclamación. Tus derechos como persona consumidora en Nicaragua.",
);

const claimLink = whatsappTextLink(
  "Hola, quiero solicitar un cambio o devolución. Referencia o factura del pedido: ",
);

export default function ReturnsPage() {
  return (
    <LegalPage
      path={path}
      title="Cambios y devoluciones"
      lead="Distinguimos entre los derechos que te da la ley, que son irrenunciables, y la política comercial de la tienda."
    >
      <h2 id="legales">1. Tus derechos legales (irrenunciables)</h2>
      <p>
        La Ley 842, Ley de Protección de los Derechos de las Personas
        Consumidoras y Usuarias, es de orden público: ningún acuerdo, aviso o
        política de la tienda puede reducir estos derechos.
      </p>
      <ul>
        <li>
          <strong id="retracto">Derecho de retracto:</strong> en las ventas a
          distancia puedes retractarte dentro de los <strong>5 días
          hábiles</strong> siguientes a la recepción del producto (artículo
          81).
        </li>
        <li>
          <strong>Garantía legal:</strong> si el producto tiene un defecto o no
          funciona normalmente, tienes derecho a su reparación, reposición o a
          la devolución de lo pagado, sin costo, según la{" "}
          <Link href="/legal/garantia">política de garantía</Link>.
        </li>
        <li>
          <strong>Producto distinto al ofrecido:</strong> si lo que recibes no
          corresponde a lo que ofrecimos o confirmamos, puedes pedir el cambio
          o la devolución de lo pagado.
        </li>
        <li>
          <strong>Pagos anticipados:</strong> si la venta no se concreta, te
          devolvemos de inmediato cualquier monto adelantado.
        </li>
        <li>
          <strong>Reembolsos:</strong> si pagaste en efectivo, no te
          obligaremos a aceptar una nota de crédito o crédito en tienda.
        </li>
      </ul>

      <h2 id="politica">2. Nuestra política comercial</h2>
      <ul>
        <li>
          <strong>Defectos de fábrica:</strong> cambiamos el artículo por otro
          igual si hay existencias. Si no hay, recogemos o recibimos el artículo
          y te reembolsamos el monto pagado. Los detalles están en la{" "}
          <Link href="/legal/garantia">política de garantía</Link>.
        </li>
        <li>
          <strong>Cambios por preferencia</strong> (modelo, color o grosor
          distinto) fuera del plazo de retracto: no forman parte de nuestra
          política, pero puedes consultarnos y los evaluaremos según
          disponibilidad.
        </li>
        <li>
          <strong>Productos seminuevos:</strong> su estado se informa antes de
          la compra. Condiciones de garantía para seminuevos:{" "}
          <Pending>pendiente de confirmar por el comerciante y revisión legal</Pending>
        </li>
      </ul>

      <h2 id="procedimiento">3. Cómo solicitar un cambio, una devolución o el retracto</h2>
      <ol>
        <li>
          Escríbenos por{" "}
          <a href={claimLink} target="_blank" rel="noopener noreferrer">WhatsApp</a>{" "}
          o usa el <Link href="/legal/reclamos">formulario de reclamos</Link>,
          que te entrega un comprobante con número y fecha.
        </li>
        <li>
          Indica la referencia del pedido o el número de factura, el producto
          y el motivo. Si se trata de un defecto, envía fotos o un video que lo
          muestren.
        </li>
        <li>
          Te confirmaremos la recepción y te diremos cómo entregarnos el
          producto. Cuando se trate de un defecto o de un producto distinto al
          ofrecido, el transporte corre por nuestra cuenta.
        </li>
        <li>
          Revisamos el producto y te damos una solución. En garantía, el plazo
          máximo para resolver es de <strong>30 días calendario</strong>.
        </li>
        <li>
          El reembolso se hace por el mismo medio de pago, salvo que acordemos
          otro contigo. Plazo y forma del reembolso:{" "}
          <Pending>pendiente de confirmar por el comerciante</Pending>
        </li>
      </ol>
      <h3>En el retracto</h3>
      <p>
        Devuelve el producto en el estado en que lo recibiste, con sus
        accesorios. Te reembolsaremos el monto pagado. Quién asume el envío de
        retorno en un retracto sin defecto:{" "}
        <Pending>pendiente de revisión legal</Pending>
      </p>

      <h2 id="reclamos">4. Si no estás conforme</h2>
      <p>
        Respondemos los reclamos en un máximo de <strong>10 días
        hábiles</strong>. Si la respuesta no te satisface, tienes{" "}
        <strong>30 días hábiles</strong> para acudir a la DIPRODEC del MIFIC
        (Ley 842, artículo 100). Información en{" "}
        <a href={DIPRODEC_URL} target="_blank" rel="noopener noreferrer">el sitio del MIFIC</a>.
      </p>
    </LegalPage>
  );
}
