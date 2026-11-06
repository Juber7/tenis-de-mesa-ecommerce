import Link from "next/link";
import { LegalPage, legalMetadata, Pending } from "@/components/legal/legal-page";
import { whatsappTextLink } from "@/lib/contact";
import { DIPRODEC_URL } from "@/lib/site";

const path = "/legal/cambios-y-devoluciones";
export const metadata = legalMetadata(
  path,
  "Cambios y devoluciones",
  "Procedimiento para cambios por defecto de fábrica, productos distintos a lo pedido, retracto de la compra y reembolsos.",
);

const claimLink = whatsappTextLink(
  "Hola, solicito un cambio o devolución. Referencia o factura del pedido: ",
);

export default function ReturnsPage() {
  return (
    <LegalPage
      path={path}
      title="Cambios y devoluciones"
      lead="Cómo se tramita cada caso: defecto de fábrica, producto distinto al pedido, retracto de la compra y cambio por preferencia."
    >
      <div className="legal-callout">
        <p>
          Los derechos que la Ley 842 reconoce a las personas consumidoras son
          irrenunciables. Esta política describe el procedimiento interno y no
          limita esos derechos.
        </p>
      </div>

      <h2 id="solicitud">1. Cómo se inicia cualquier solicitud</h2>
      <ol>
        <li>
          Se escribe por{" "}
          <a href={claimLink} target="_blank" rel="noopener noreferrer">WhatsApp</a>{" "}
          o se usa el <Link href="/legal/reclamos">formulario de reclamos</Link>,
          que genera un comprobante con número y fecha.
        </li>
        <li>Se indica la referencia del pedido o el número de factura, el producto y el motivo.</li>
        <li>Se confirma la recepción de la solicitud y se indica cómo entregar el producto.</li>
      </ol>

      <h2 id="defecto">2. Caso: producto con defecto de fábrica</h2>
      <p>
        Se tramita como garantía: el artículo se cambia por otro igual si hay
        existencias y, si no las hay, se recibe el artículo y se reembolsa el
        monto pagado. El procedimiento completo está en la{" "}
        <Link href="/legal/garantia">política de garantía</Link>. El
        transporte del producto no tiene costo para el cliente.
      </p>

      <h2 id="distinto">3. Caso: producto distinto al pedido o incompleto</h2>
      <ol>
        <li>Se envían fotos del producto recibido y de su empaque.</li>
        <li>Se verifica la diferencia con el pedido confirmado.</li>
        <li>Se entrega el producto correcto o la parte faltante o, si el cliente lo prefiere, se reembolsa el monto pagado. El transporte corre por cuenta de la tienda.</li>
      </ol>

      <h2 id="retracto">4. Caso: retracto de la compra</h2>
      <p>
        Las compras a distancia pueden dejarse sin efecto dentro de los{" "}
        <strong>5 días hábiles</strong> siguientes a la recepción del
        producto.
      </p>
      <ol>
        <li>Se comunica la decisión por WhatsApp dentro de ese plazo, indicando la referencia del pedido.</li>
        <li>El producto se devuelve en el estado en que se recibió, con sus accesorios y empaque.</li>
        <li>
          Cuando el producto no tiene defecto, <strong>el costo del envío de
          devolución corre por cuenta del cliente</strong>.
        </li>
        <li>Recibido y revisado el producto, se reembolsa el monto pagado por él.</li>
      </ol>

      <h2 id="preferencia">5. Caso: cambio por preferencia</h2>
      <p>
        Fuera del plazo de retracto, los cambios por preferencia (modelo,
        color o grosor distinto) no forman parte de la política de la tienda.
        Pueden consultarse y se evalúan según la disponibilidad; en ese caso,
        los costos de envío corren por cuenta del cliente.
      </p>

      <h2 id="transporte">6. Caso: daño o pérdida durante el envío</h2>
      <p>
        Se tramita según la{" "}
        <Link href="/legal/envios#danos">política de envíos</Link>: se reemplaza
        el producto o se devuelve lo pagado, incluido el envío.
      </p>

      <h2 id="seminuevos">7. Productos seminuevos</h2>
      <p>
        Su estado se informa antes de la compra. Los productos seminuevos y
        los accesorios no tienen garantía comercial (ver{" "}
        <Link href="/legal/garantia#plazo">garantía</Link>); se mantienen los
        reclamos por producto distinto al ofrecido o con defectos ocultos.
      </p>

      <h2 id="reembolsos">8. Reembolsos</h2>
      <ul>
        <li>El reembolso se hace por el mismo medio de pago, salvo que se acuerde otro.</li>
        <li>Si el pago fue en efectivo, no se obliga a aceptar notas de crédito ni crédito en tienda.</li>
        <li>
          Plazo y forma del reembolso:{" "}
          <Pending>pendiente de confirmar por el comerciante</Pending>
        </li>
      </ul>

      <h2 id="inconformidad">9. Si la solución no resulta satisfactoria</h2>
      <p>
        Las solicitudes se responden en un máximo de <strong>10 días
        hábiles</strong>. Si la respuesta no resulta satisfactoria, existe un
        plazo de 30 días hábiles para acudir a la DIPRODEC del MIFIC.
        Información en{" "}
        <a href={DIPRODEC_URL} target="_blank" rel="noopener noreferrer">el sitio del MIFIC</a>.
      </p>
    </LegalPage>
  );
}
