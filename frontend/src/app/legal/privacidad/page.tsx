import Link from "next/link";
import { LegalPage, legalMetadata, MerchantContact, Pending } from "@/components/legal/legal-page";
import { whatsappTextLink } from "@/lib/contact";

const path = "/legal/privacidad";
export const metadata = legalMetadata(
  path,
  "Política de privacidad",
  "Qué datos personales se tratan, para qué, con quién se comparten y cómo se ejercen los derechos sobre ellos.",
);

const rightsLink = whatsappTextLink(
  "Hola, solicito ejercer mi derecho de [acceso / rectificación / cancelación / oposición] sobre mis datos personales. Mi nombre es: ",
);

export default function PrivacyPage() {
  return (
    <LegalPage
      path={path}
      title="Política de privacidad"
      lead="Qué datos personales se tratan, con qué finalidad y cuál es el procedimiento para consultarlos, corregirlos o eliminarlos."
    >
      <div className="legal-callout legal-callout-strong">
        <p>
          <strong>En resumen:</strong> el sitio no tiene cuentas ni guarda datos
          de clientes en sus servidores. El carrito se queda en el dispositivo
          del cliente. Los datos personales que se tratan son los que el
          cliente comparte por WhatsApp para pedir, consultar o reclamar, y se
          usan solo para atenderlo.
        </p>
      </div>

      <h2 id="responsable">1. Responsable del tratamiento</h2>
      <MerchantContact />

      <h2 id="datos">2. Datos que se tratan</h2>
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
        <li>
          No se usan herramientas analíticas, publicitarias ni píxeles de
          seguimiento. Las tipografías se sirven desde el propio sitio.
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

      <h2 id="finalidades">3. Finalidades</h2>
      <ul>
        <li>Responder consultas y confirmar disponibilidad, precio, entrega y forma de pago.</li>
        <li>Preparar, entregar y dar seguimiento a los pedidos.</li>
        <li>Emitir facturas y cumplir las obligaciones tributarias y de protección al consumidor.</li>
        <li>Atender garantías, cambios, devoluciones y reclamos.</li>
        <li>Enviar novedades u ofertas, <strong>solo con el consentimiento previo del cliente</strong>.</li>
      </ul>

      <h2 id="fundamento">4. Fundamento del tratamiento</h2>
      <p>
        Conforme a la Ley 787, de Protección de Datos Personales, los datos se
        tratan para cumplir la relación comercial que inicia el cliente
        (pedido, entrega, garantía y reclamos) y las obligaciones legales de
        facturación. Los mensajes promocionales requieren consentimiento, que
        puede retirarse en cualquier momento y sin costo.
      </p>

      <h2 id="seguridad">5. Almacenamiento y protección</h2>
      <ul>
        <li>El sitio no tiene base de datos de clientes: no almacena nombres, teléfonos ni direcciones.</li>
        <li>
          El sitio aplica encabezados de seguridad del navegador y recalcula
          en el servidor el precio de cada pedido. Una vez publicado en su
          dominio, se sirve únicamente por HTTPS.
        </li>
        <li>
          Las conversaciones y los datos de pedidos se conservan en la cuenta
          de WhatsApp del comerciante. Ubicación de facturas y registros:{" "}
          <Pending>pendiente de confirmar por el comerciante</Pending>.
        </li>
        <li>Solo el comerciante accede a estos datos, que no se venden ni se ceden con fines comerciales.</li>
      </ul>

      <h2 id="terceros">6. Terceros que intervienen</h2>
      <p>
        Los siguientes proveedores intervienen en el funcionamiento de la
        tienda. Algunos procesan datos fuera de Nicaragua, bajo sus propias
        políticas de privacidad:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Función</th>
              <th>Datos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>WhatsApp (Meta Platforms)</td>
              <td>Comunicación, pedidos y reclamos</td>
              <td>Teléfono, perfil y mensajes</td>
            </tr>
            <tr>
              <td>Cloudflare</td>
              <td>Alojamiento del sitio y protección contra abusos</td>
              <td>Datos técnicos de conexión</td>
            </tr>
            <tr>
              <td>Sanity</td>
              <td>Catálogo de productos e imágenes</td>
              <td>Datos técnicos de conexión al cargar las fotos</td>
            </tr>
            <tr>
              <td>CargoTrans</td>
              <td>Envíos fuera de los puntos de entrega gratuitos</td>
              <td>Nombre, teléfono y destino de la entrega</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Fuera de estos casos, los datos solo se entregan a una autoridad cuando la ley lo exige.</p>

      <h2 id="whatsapp">7. Comunicaciones por WhatsApp</h2>
      <p>
        WhatsApp se usa para responder consultas y coordinar pedidos; las
        conversaciones también las procesa WhatsApp según su propia política.
        Los mensajes promocionales solo se envían a quien haya aceptado
        recibirlos, en días hábiles entre las 8:00 y las 17:00. Para dejar de
        recibirlos basta con responder «BAJA». Aceptar promociones nunca es
        condición para comprar.
      </p>

      <h2 id="derechos">8. Derechos sobre los datos</h2>
      <ul>
        <li><strong>Acceso:</strong> conocer qué datos se tienen y para qué se usan.</li>
        <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
        <li><strong>Cancelación:</strong> eliminar los datos que ya no sean necesarios, salvo los que deban conservarse por ley.</li>
        <li><strong>Oposición:</strong> oponerse a un tratamiento, por ejemplo a recibir promociones.</li>
        <li><strong>Revocación</strong> del consentimiento en cualquier momento.</li>
      </ul>

      <h2 id="procedimiento">9. Procedimiento para ejercer los derechos</h2>
      <ol>
        <li>
          Se envía la solicitud por escrito por{" "}
          <a href={rightsLink} target="_blank" rel="noopener noreferrer">WhatsApp</a>,
          con el nombre del titular, el derecho que se ejerce y, si aplica,
          los datos que deben corregirse.
        </li>
        <li>Se confirma la recepción indicando la fecha. Puede pedirse información adicional para verificar la identidad del titular.</li>
        <li>
          Las solicitudes de acceso se responden en un máximo de{" "}
          <strong>10 días hábiles</strong>; las de rectificación o cancelación,
          en un máximo de <strong>5 días hábiles</strong>.
        </li>
        <li>El trámite es gratuito.</li>
      </ol>

      <h2 id="conservacion">10. Conservación</h2>
      <ul>
        <li><strong>Carrito:</strong> en el dispositivo del cliente, hasta que se vacíe o se borren los datos del navegador.</li>
        <li><strong>Conversaciones y datos del pedido:</strong> mientras sean necesarios para la entrega, la garantía y la atención de reclamos.</li>
        <li><strong>Facturas y comprobantes:</strong> durante el plazo que exige la legislación tributaria.</li>
        <li><strong>Consentimiento para promociones:</strong> hasta que se retire.</li>
      </ul>
      <p>Cuando dejan de ser necesarios, los datos se eliminan.</p>

      <h2 id="menores">11. Menores de edad</h2>
      <p>Los pedidos de menores de edad deben hacerse a través de su madre, padre o representante.</p>

      <h2 id="cookies">12. Cookies</h2>
      <p>
        El almacenamiento técnico que usa el sitio y la forma de gestionar las
        preferencias se describen en la{" "}
        <Link href="/legal/cookies">política de cookies</Link>.
      </p>

      <h2 id="cambios">13. Modificaciones</h2>
      <p>
        Las nuevas versiones de esta política se publican en esta página con su
        fecha de actualización. Si un cambio afecta un tratamiento basado en el
        consentimiento, este se solicita de nuevo.
      </p>
    </LegalPage>
  );
}
