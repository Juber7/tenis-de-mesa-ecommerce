import Link from "next/link";
import { LegalPage, legalMetadata } from "@/components/legal/legal-page";

const path = "/legal/privacidad";
export const metadata = legalMetadata(
  path,
  "Política de privacidad",
  "Qué datos personales se tratan en la tienda y con qué finalidad.",
);

export default function PrivacyPage() {
  return (
    <LegalPage
      path={path}
      title="Política de privacidad"
      lead="Qué datos personales se tratan y con qué finalidad."
    >
      <h2 id="datos">1. Datos que se tratan</h2>
      <h3>Al navegar por el sitio</h3>
      <ul>
        <li>
          <strong>Carrito:</strong> los productos y cantidades elegidos se
          guardan en el almacenamiento local del navegador y no se envían a la
          tienda.
        </li>
        <li>
          <strong>Verificación del pedido:</strong> al abrir el carrito se
          envían al servidor únicamente los identificadores de los productos y
          sus cantidades, para comprobar precios y disponibilidad. No se envían
          nombres ni teléfonos, y la consulta no se guarda.
        </li>
        <li>
          <strong>Datos técnicos de conexión:</strong> el servicio de
          alojamiento recibe la dirección IP, el tipo de navegador y la página
          solicitada para entregar el sitio y protegerlo de abusos. El servicio
          de imágenes del catálogo recibe los mismos datos al mostrar las
          fotos.
        </li>
      </ul>
      <h3>Al hacer un pedido o escribir por WhatsApp</h3>
      <ul>
        <li>Número de teléfono y nombre del perfil de WhatsApp.</li>
        <li>Contenido del pedido: productos, cantidades, precios y referencia.</li>
        <li>Datos de entrega: nombre de quien recibe, punto de entrega o dirección y, en envíos por CargoTrans, el departamento y municipio de destino.</li>
        <li>Datos necesarios para emitir la factura y, si el pago es por transferencia, el comprobante de pago.</li>
      </ul>
      <h3>Al presentar un reclamo</h3>
      <ul>
        <li>Nombre, cédula o documento de identidad, domicilio, teléfono, número de factura y motivo del reclamo.</li>
      </ul>
      <p>
        No se solicitan datos sensibles ni datos de tarjetas. Los datos de
        entrega y facturación son necesarios para completar la compra: sin
        ellos no es posible entregar el pedido ni emitir la factura.
      </p>

      <h2 id="finalidades">2. Finalidades</h2>
      <ul>
        <li>Responder consultas y confirmar disponibilidad, precio, entrega y forma de pago.</li>
        <li>Preparar, entregar y dar seguimiento a los pedidos.</li>
        <li>Atender garantías, cambios, devoluciones y reclamos.</li>
      </ul>

      <h2 id="whatsapp">3. Comunicaciones por WhatsApp</h2>
      <p>
        WhatsApp se usa para responder consultas y coordinar pedidos; las
        conversaciones también las procesa WhatsApp según su propia política.
      </p>

      <h2 id="menores">4. Menores de edad</h2>
      <p>Los pedidos de menores de edad deben hacerse a través de su madre, padre o representante.</p>

      <h2 id="cookies">5. Cookies</h2>
      <p>
        El almacenamiento técnico que usa el sitio y la forma de gestionar las
        preferencias se describen en la{" "}
        <Link href="/legal/cookies">política de cookies</Link>.
      </p>
    </LegalPage>
  );
}
