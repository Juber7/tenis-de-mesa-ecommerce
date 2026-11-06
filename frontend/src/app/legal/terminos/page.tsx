import Link from "next/link";
import { LegalPage, legalMetadata, MerchantContact, Pending } from "@/components/legal/legal-page";
import { DIPRODEC_URL } from "@/lib/site";

const path = "/legal/terminos";
export const metadata = legalMetadata(
  path,
  "Términos y condiciones",
  "Condiciones de uso de la tienda: precios en córdobas, procedimiento de pedido por WhatsApp, confirmación de la compra, pagos, entregas, garantías y reclamos.",
);

export default function TermsPage() {
  return (
    <LegalPage
      path={path}
      title="Términos y condiciones"
      lead="Cómo funciona la tienda, cómo se tramita un pedido y en qué momento se considera confirmada una compra."
    >
      <div className="legal-callout legal-callout-strong">
        <p>
          <strong>En resumen:</strong> el sitio funciona como catálogo. El
          mensaje que se envía por WhatsApp desde el carrito es una{" "}
          <strong>solicitud de pedido</strong>. La compra queda confirmada
          cuando, en ese mismo chat, se confirman la disponibilidad, el precio
          final, la entrega y la forma de pago, y el cliente acepta esas
          condiciones.
        </p>
      </div>

      <h2 id="comercio">1. Identificación del comercio</h2>
      <MerchantContact />

      <h2 id="uso">2. Uso del sitio</h2>
      <p>
        El catálogo se consulta sin registro: no existen cuentas de usuario ni
        formularios de pago. El uso del sitio implica la aceptación de estos
        términos y de las políticas de{" "}
        <Link href="/legal/privacidad">privacidad</Link>,{" "}
        <Link href="/legal/cookies">cookies</Link>,{" "}
        <Link href="/legal/envios">envíos</Link>,{" "}
        <Link href="/legal/cambios-y-devoluciones">cambios y devoluciones</Link>{" "}
        y <Link href="/legal/garantia">garantía</Link>. No se permite alterar
        el funcionamiento del sitio, sus precios ni el contenido de los
        pedidos.
      </p>

      <h2 id="productos">3. Información de los productos</h2>
      <p>
        Cada ficha muestra nombre, fotografías, descripción, categoría, precio
        y disponibilidad. Los colores pueden variar ligeramente según la
        pantalla. Las dudas sobre medidas, grosor de esponja, peso o
        compatibilidad se resuelven por WhatsApp antes de confirmar la compra.
      </p>
      <p>
        Los <strong>productos seminuevos</strong> se publican en su propia
        categoría. Antes de confirmar la compra se informa su estado y
        cualquier desgaste o detalle visible.
      </p>

      <h2 id="precios">4. Precios y moneda</h2>
      <ul>
        <li>
          Los precios se publican en <strong>córdobas (C$)</strong>. Cada
          producto tiene un precio base en dólares estadounidenses que se
          convierte con el tipo de cambio oficial que publica el Banco Central
          de Nicaragua (BCN) para el día en curso.
        </li>
        <li>
          La conversión se actualiza automáticamente cada día, de modo que el
          precio en córdobas puede variar de un día a otro si cambia el tipo
          de cambio oficial. El tipo de cambio aplicado se muestra en la ficha
          del producto, en el carrito y en el mensaje del pedido.
        </li>
        <li>
          Los precios publicados son finales e incluyen los impuestos
          aplicables.
        </li>
        <li>
          El precio que se confirma por WhatsApp es el publicado en el momento
          de enviar el pedido, aunque la confirmación se haga otro día.
        </li>
        <li>
          Si se acuerda el pago en dólares, se usa el mismo tipo de cambio del
          pedido.
        </li>
        <li>
          El costo de envío, cuando corresponde, se informa por separado antes
          de confirmar la compra (ver la{" "}
          <Link href="/legal/envios">política de envíos</Link>).
        </li>
        <li>
          Los productos marcados como <em>oferta</em> se venden al precio
          rebajado mientras la oferta esté publicada.
        </li>
      </ul>

      <h2 id="disponibilidad">5. Disponibilidad e inventario</h2>
      <p>
        La etiqueta «Disponible» indica que el producto tiene existencias según
        el inventario de la tienda. Agregar un producto al carrito no lo
        reserva. Si al revisar el pedido un producto ya no tiene existencias,
        se informa en el chat, no se cobra y, si se hubiera adelantado algún
        monto, se devuelve de inmediato.
      </p>

      <h2 id="pedidos">6. Procedimiento de pedido</h2>
      <ol>
        <li>Se agregan los productos al carrito. El carrito se guarda solo en el dispositivo del cliente.</li>
        <li>Al abrir el carrito, el sistema verifica los precios y la disponibilidad con el catálogo vigente.</li>
        <li>
          El botón «Enviar pedido por WhatsApp» abre un mensaje con los
          productos, cantidades, precios, total, tipo de cambio y una
          referencia de pedido. El mensaje no se envía de forma automática:
          lo envía el cliente.
        </li>
        <li>
          Por el mismo chat se responde con la confirmación de disponibilidad,
          precio final, forma y costo de entrega, fecha estimada y forma de
          pago.
        </li>
        <li>Cuando el cliente acepta expresamente esas condiciones, la compra queda confirmada.</li>
      </ol>

      <h2 id="confirmacion">7. Confirmación de la compra</h2>
      <p>
        El mensaje enviado desde el sitio es una solicitud de compra. La
        compraventa se perfecciona cuando ambas partes están de acuerdo sobre
        el producto y el precio, es decir, cuando el cliente acepta en el chat
        las condiciones confirmadas. Hasta ese momento la solicitud puede
        modificarse o cancelarse sin costo.
      </p>
      <p>
        Una vez confirmada la compra, se envía por WhatsApp un resumen con los
        productos, el precio final, el costo de envío, la forma de pago, la
        fecha estimada de entrega y la referencia del pedido. Ese resumen sirve
        como comprobante.
      </p>
      <p>
        Una solicitud solo se rechaza por causa justificada, como la falta real
        de existencias o la imposibilidad de entregar en el lugar indicado. En
        ese caso se explica el motivo en el chat.
      </p>

      <h2 id="pagos">8. Medios de pago</h2>
      <p>
        El sitio no procesa pagos ni solicita datos bancarios: la forma de pago
        se acuerda por WhatsApp. Medios aceptados:{" "}
        <Pending>pendiente de confirmar por el comerciante (por ejemplo, efectivo contra entrega o transferencia)</Pending>.
      </p>
      <p>
        <strong>Seguridad:</strong> nunca se solicita por WhatsApp ni por el
        sitio el número completo de una tarjeta, su código de seguridad,
        contraseñas ni códigos de verificación. Cualquier solicitud de ese
        tipo hecha en nombre de la tienda debe ignorarse y reportarse.
      </p>
      <p>
        Con cada compra se entrega la factura o el comprobante, que también se
        usa para hacer valer la garantía.
      </p>

      <h2 id="entregas">9. Entregas</h2>
      <p>
        Las opciones de entrega, sus condiciones y sus costos se describen en
        la <Link href="/legal/envios">política de envíos</Link>. El producto
        viaja bajo responsabilidad de la tienda hasta que el cliente lo recibe.
      </p>

      <h2 id="retracto">10. Derecho de retracto</h2>
      <p>
        Conforme a la Ley 842, las compras a distancia pueden dejarse sin
        efecto dentro de los <strong>5 días hábiles</strong> siguientes a la
        recepción del producto. El procedimiento se explica en{" "}
        <Link href="/legal/cambios-y-devoluciones#retracto">cambios y devoluciones</Link>.
      </p>

      <h2 id="garantias">11. Cambios, devoluciones y garantía</h2>
      <p>
        Los productos con defectos de fábrica se cambian o se reembolsan según
        la <Link href="/legal/garantia">política de garantía</Link>. Los demás
        casos se tramitan según la política de{" "}
        <Link href="/legal/cambios-y-devoluciones">cambios y devoluciones</Link>.
        Ninguna de estas políticas limita los derechos que la ley reconoce a
        las personas consumidoras.
      </p>

      <h2 id="responsabilidades">12. Responsabilidades</h2>
      <h3>Del comercio</h3>
      <ul>
        <li>Informar con veracidad las características, el precio y la disponibilidad de los productos.</li>
        <li>Respetar el precio publicado y las condiciones confirmadas en el chat.</li>
        <li>Entregar el producto acordado, en buen estado, en el lugar y plazo convenidos.</li>
        <li>Atender garantías, devoluciones y reclamos.</li>
        <li>Tratar los datos personales según la política de privacidad.</li>
      </ul>
      <h3>Del cliente</h3>
      <ul>
        <li>Proporcionar datos de contacto y de entrega correctos.</li>
        <li>Revisar el resumen del pedido antes de aceptarlo.</li>
        <li>Recibir el pedido en el lugar y horario acordados o avisar con anticipación si no es posible.</li>
        <li>Usar los productos según su naturaleza y las instrucciones del fabricante.</li>
      </ul>

      <h2 id="limitaciones">13. Alcance de la responsabilidad</h2>
      <p>
        Estos términos no excluyen ni limitan la responsabilidad que la ley
        atribuye al comercio frente a las personas consumidoras. El sitio puede
        quedar temporalmente fuera de servicio por mantenimiento o por causas
        ajenas a la tienda; en ese caso los pedidos se atienden directamente
        por WhatsApp. Los enlaces a WhatsApp y a redes sociales llevan a
        servicios de terceros con sus propias condiciones.
      </p>

      <h2 id="propiedad">14. Propiedad intelectual</h2>
      <p>
        El diseño, los textos y las imágenes propias del sitio pertenecen a
        «Tenis de Mesa». Las marcas de los productos pertenecen a sus
        titulares y se mencionan solo para identificar los productos a la
        venta.
      </p>

      <h2 id="datos">15. Protección de datos</h2>
      <p>
        El tratamiento de datos personales se describe en la{" "}
        <Link href="/legal/privacidad">política de privacidad</Link>.
      </p>

      <h2 id="reclamos">16. Atención y reclamos</h2>
      <p>
        Las consultas y reclamos se reciben por WhatsApp o mediante el{" "}
        <Link href="/legal/reclamos">formulario de reclamos</Link>, que genera
        un comprobante con número y fecha. Cada reclamo se responde en un plazo
        máximo de <strong>10 días hábiles</strong>.
      </p>
      <p>
        Si la respuesta no resulta satisfactoria, el reclamo puede presentarse
        ante la Dirección de Protección de los Derechos de las Personas
        Consumidoras y Usuarias (DIPRODEC) del MIFIC. Información en{" "}
        <a href={DIPRODEC_URL} target="_blank" rel="noopener noreferrer">el sitio del MIFIC</a>.
      </p>

      <h2 id="ley">17. Legislación aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de Nicaragua. Las controversias
        se resuelven por acuerdo directo, ante la DIPRODEC o ante los
        tribunales competentes. No se exige someter ninguna controversia a
        arbitraje.
      </p>

      <h2 id="cambios">18. Modificaciones</h2>
      <p>
        Estos términos pueden actualizarse; la fecha de la última versión
        aparece al inicio de la página. Los cambios se aplican a los pedidos
        enviados después de su publicación. Un pedido ya confirmado conserva
        las condiciones vigentes al momento de su confirmación.
      </p>
    </LegalPage>
  );
}
