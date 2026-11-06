import Link from "next/link";
import { LegalPage, legalMetadata, MerchantContact, Pending } from "@/components/legal/legal-page";
import { whatsappTextLink } from "@/lib/contact";

const path = "/legal/privacidad";
export const metadata = legalMetadata(
  path,
  "Política de privacidad",
  "Qué datos personales tratamos, para qué, con quién los compartimos y cómo ejercer tus derechos según la Ley 787 de Nicaragua.",
);

const rightsLink = whatsappTextLink(
  "Hola, quiero ejercer mi derecho de [acceso / rectificación / cancelación / oposición] sobre mis datos personales. Mi nombre es: ",
);

export default function PrivacyPage() {
  return (
    <LegalPage
      path={path}
      title="Política de privacidad"
      lead="Qué datos personales tratamos, para qué los usamos y cómo puedes ejercer tus derechos conforme a la Ley 787, Ley de Protección de Datos Personales."
    >
      <div className="legal-callout legal-callout-strong">
        <p>
          <strong>En resumen:</strong> el sitio no tiene cuentas ni formularios
          que guarden tus datos en nuestros servidores. Tu carrito se queda en
          tu dispositivo. Los datos personales que tratamos son los que tú
          compartes al escribirnos por WhatsApp para hacer un pedido, consultar
          o reclamar, y los usamos solo para atenderte.
        </p>
      </div>

      <h2 id="responsable">1. Responsable del tratamiento</h2>
      <MerchantContact />

      <h2 id="datos">2. Qué datos tratamos</h2>
      <h3>Al navegar por el sitio</h3>
      <ul>
        <li>
          <strong>Carrito:</strong> los productos y cantidades que eliges se
          guardan en el almacenamiento local de tu navegador. No se envían a
          nuestros servidores salvo lo indicado en el punto siguiente.
        </li>
        <li>
          <strong>Verificación del pedido:</strong> al abrir el carrito, el
          sitio envía a nuestro servidor solo los identificadores de los
          productos y sus cantidades para comprobar precios y disponibilidad.
          No incluye tu nombre ni tu teléfono, y no lo guardamos.
        </li>
        <li>
          <strong>Datos técnicos de conexión:</strong> como cualquier sitio
          web, el servidor y la red que lo entregan reciben tu dirección IP, el
          tipo de navegador y la página solicitada. Los usan nuestro proveedor
          de alojamiento para entregar el sitio y protegerlo de abusos, y el
          servicio de imágenes del catálogo para mostrarte las fotos.
        </li>
        <li>
          El sitio <strong>no</strong> usa herramientas analíticas ni
          publicitarias ni píxeles de seguimiento. Las tipografías se sirven
          desde el propio sitio.
        </li>
      </ul>
      <h3>Al hacer un pedido o escribirnos por WhatsApp</h3>
      <ul>
        <li>Tu número de teléfono y el nombre de tu perfil de WhatsApp.</li>
        <li>El contenido del mensaje del pedido: productos, cantidades, precios y referencia.</li>
        <li>Los datos que nos des para la entrega: nombre de quien recibe, punto de entrega o dirección y, si eliges CargoTrans, el departamento y municipio de destino.</li>
        <li>Los datos necesarios para emitir la factura y, si pagas por transferencia, el comprobante de pago.</li>
        <li>En un reclamo: nombre, cédula o documento de identidad, domicilio, teléfono, número de factura y el motivo, como exige el reglamento de la Ley 842.</li>
      </ul>
      <p>
        No solicitamos datos sensibles ni datos de tarjetas. Darnos los datos
        de entrega y facturación es necesario para completar la compra: sin
        ellos no podemos entregarte el pedido ni emitir la factura.
      </p>

      <h2 id="finalidades">3. Para qué usamos tus datos</h2>
      <ul>
        <li>Responder tus consultas y confirmar disponibilidad, precio, envío y forma de pago.</li>
        <li>Preparar, entregar y dar seguimiento a tu pedido.</li>
        <li>Emitir facturas y cumplir obligaciones tributarias y de protección al consumidor.</li>
        <li>Atender garantías, cambios, devoluciones y reclamos.</li>
        <li>Enviarte novedades u ofertas, <strong>solo si nos das tu consentimiento</strong>.</li>
      </ul>

      <h2 id="fundamento">4. Fundamento del tratamiento</h2>
      <ul>
        <li>
          <strong>Relación comercial:</strong> los datos necesarios para
          atender tu pedido, la entrega, la garantía y los reclamos se tratan
          para cumplir la relación que inicias con nosotros (Ley 787,
          artículo 6).
        </li>
        <li>
          <strong>Obligaciones legales:</strong> la facturación y la
          conservación de comprobantes que exigen la legislación tributaria y
          la Ley 842.
        </li>
        <li>
          <strong>Consentimiento:</strong> para mensajes promocionales. Puedes
          retirarlo en cualquier momento, de forma gratuita.
        </li>
      </ul>

      <h2 id="seguridad">5. Cómo guardamos y protegemos los datos</h2>
      <ul>
        <li>
          El sitio no tiene base de datos de clientes: no almacena nombres,
          teléfonos ni direcciones.
        </li>
        <li>
          El sitio aplica encabezados de seguridad del navegador y recalcula en
          el servidor los precios de cada pedido. Una vez publicado en su
          dominio, se servirá únicamente por HTTPS.
        </li>
        <li>
          Las conversaciones y los datos de pedidos se guardan en la cuenta de
          WhatsApp del comerciante. Dónde se guardan las facturas y registros:{" "}
          <Pending>pendiente de confirmar por el comerciante</Pending>.
        </li>
        <li>
          Solo el comerciante accede a esos datos y no los vende ni los cede a
          terceros con fines comerciales.
        </li>
      </ul>

      <h2 id="terceros">6. Terceros que intervienen</h2>
      <p>
        Para que la tienda funcione intervienen los siguientes proveedores.
        Algunos procesan datos fuera de Nicaragua, bajo sus propias políticas
        de privacidad:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Para qué</th>
              <th>Qué datos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>WhatsApp (Meta Platforms)</td>
              <td>Comunicación, pedidos y reclamos</td>
              <td>Teléfono, perfil y mensajes que intercambiamos</td>
            </tr>
            <tr>
              <td>Cloudflare</td>
              <td>Alojamiento del sitio, entrega y protección contra abusos</td>
              <td>Datos técnicos de conexión (IP, navegador, página)</td>
            </tr>
            <tr>
              <td>Sanity</td>
              <td>Catálogo de productos y servicio de imágenes</td>
              <td>Datos técnicos de conexión al cargar las fotos</td>
            </tr>
            <tr>
              <td>CargoTrans</td>
              <td>Envíos fuera de los puntos de entrega gratuitos, si eliges esa opción</td>
              <td>Nombre, teléfono y destino de la entrega</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Fuera de estos casos, solo entregaremos datos a una autoridad cuando la
        ley lo exija.
      </p>

      <h2 id="whatsapp">7. Uso de WhatsApp para comunicaciones comerciales</h2>
      <p>
        Usamos WhatsApp para responder tus consultas y coordinar tus pedidos.
        Las conversaciones también las procesa WhatsApp, según su propia
        política de privacidad. Solo te enviaremos mensajes promocionales si
        aceptas recibirlos; en ese caso, los enviaremos en días hábiles entre
        las 8:00 y las 17:00, y puedes dejar de recibirlos en cualquier momento
        respondiendo «BAJA». Aceptar promociones nunca es condición para
        comprar.
      </p>

      <h2 id="derechos">8. Tus derechos</h2>
      <p>Como titular de tus datos tienes derecho a:</p>
      <ul>
        <li><strong>Acceso:</strong> saber qué datos tenemos sobre ti y para qué los usamos.</li>
        <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
        <li><strong>Cancelación:</strong> pedir que eliminemos tus datos cuando ya no sean necesarios, salvo los que debamos conservar por ley.</li>
        <li><strong>Oposición:</strong> oponerte a un tratamiento, por ejemplo a recibir promociones.</li>
        <li><strong>Revocar tu consentimiento</strong> en cualquier momento, sin costo.</li>
      </ul>

      <h2 id="ejercer">9. Cómo ejercer tus derechos</h2>
      <ol>
        <li>
          Envíanos tu solicitud por escrito por{" "}
          <a href={rightsLink} target="_blank" rel="noopener noreferrer">WhatsApp</a>,
          indicando tu nombre, el derecho que quieres ejercer y, si aplica, los
          datos que deben corregirse.
        </li>
        <li>Te confirmaremos la recepción con su fecha. Podemos pedirte información adicional para verificar tu identidad.</li>
        <li>
          Responderemos las solicitudes de acceso en un máximo de{" "}
          <strong>10 días hábiles</strong>, y las de rectificación o
          cancelación en un máximo de <strong>5 días hábiles</strong>
          (Ley 787, artículos 17 y 19).
        </li>
        <li>El trámite es gratuito.</li>
      </ol>
      <p>
        La autoridad competente en materia de datos personales, según la Ley
        787, es la Dirección de Protección de Datos Personales del Ministerio
        de Hacienda y Crédito Público.
      </p>

      <h2 id="conservacion">10. Cuánto tiempo conservamos los datos</h2>
      <ul>
        <li><strong>Carrito:</strong> en tu dispositivo, hasta que lo vacíes o borres los datos del navegador.</li>
        <li><strong>Conversaciones y datos del pedido:</strong> mientras sean necesarios para la entrega, la garantía y la atención de reclamos.</li>
        <li><strong>Facturas y comprobantes:</strong> durante el plazo que exige la legislación tributaria.</li>
        <li><strong>Consentimiento para promociones:</strong> hasta que lo retires.</li>
      </ul>
      <p>Cuando dejan de ser necesarios, los eliminamos.</p>

      <h2 id="menores">11. Menores de edad</h2>
      <p>
        Los pedidos deben hacerlos personas mayores de edad o, en el caso de
        menores, su madre, padre o representante.
      </p>

      <h2 id="cookies">12. Cookies</h2>
      <p>
        Consulta la <Link href="/legal/cookies">política de cookies</Link> para
        conocer el almacenamiento técnico que usa el sitio y cómo gestionar tus
        preferencias.
      </p>

      <h2 id="cambios">13. Cambios en esta política</h2>
      <p>
        Si modificamos esta política, publicaremos la nueva versión en esta
        página con su fecha de actualización. Si el cambio afecta un
        tratamiento basado en tu consentimiento, te lo pediremos de nuevo.
      </p>
    </LegalPage>
  );
}
