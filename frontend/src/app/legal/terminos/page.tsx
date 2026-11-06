import Link from "next/link";
import { LegalPage, legalMetadata } from "@/components/legal/legal-page";

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
      <h2 id="uso">1. Uso del sitio</h2>
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

      <h2 id="productos">2. Información de los productos</h2>
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

      <h2 id="precios">3. Precios y moneda</h2>
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

      <h2 id="disponibilidad">4. Disponibilidad e inventario</h2>
      <p>
        La etiqueta «Disponible» indica que el producto tiene existencias según
        el inventario de la tienda. Agregar un producto al carrito no lo
        reserva. Si al revisar el pedido un producto ya no tiene existencias,
        se informa en el chat, no se cobra y, si se hubiera adelantado algún
        monto, se devuelve de inmediato.
      </p>

      <h2 id="pedidos">5. Procedimiento de pedido</h2>
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

      <h2 id="confirmacion">6. Confirmación de la compra</h2>
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

      <h2 id="pagos">7. Medios de pago</h2>
      <p>
        El sitio no procesa pagos ni solicita datos bancarios: la forma de pago
        se acuerda por WhatsApp. Se aceptan <strong>transferencias bancarias</strong>{" "}
        y <strong>efectivo</strong>.
      </p>

      <h2 id="entregas">8. Entregas</h2>
      <p>
        Las opciones de entrega, sus condiciones y sus costos se describen en
        la <Link href="/legal/envios">política de envíos</Link>.
      </p>

      <h2 id="garantias">9. Cambios, devoluciones y garantía</h2>
      <p>
        Los productos con defectos de fábrica se cambian o se reembolsan según
        la <Link href="/legal/garantia">política de garantía</Link>. Los demás
        casos se tramitan según la política de{" "}
        <Link href="/legal/cambios-y-devoluciones">cambios y devoluciones</Link>.
        Ninguna de estas políticas limita los derechos que la ley reconoce a
        las personas consumidoras.
      </p>

      <h2 id="responsabilidades">10. Responsabilidades</h2>
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

      <h2 id="limitaciones">11. Alcance de la responsabilidad</h2>
      <p>
        Estos términos no excluyen ni limitan la responsabilidad que la ley
        atribuye al comercio frente a las personas consumidoras. El sitio puede
        quedar temporalmente fuera de servicio por mantenimiento o por causas
        ajenas a la tienda; en ese caso los pedidos se atienden directamente
        por WhatsApp. Los enlaces a WhatsApp y a redes sociales llevan a
        servicios de terceros con sus propias condiciones.
      </p>

      <h2 id="propiedad">12. Propiedad intelectual</h2>
      <p>
        El diseño, los textos y las imágenes propias del sitio pertenecen a
        «Tenis de Mesa». Las marcas de los productos pertenecen a sus
        titulares y se mencionan solo para identificar los productos a la
        venta.
      </p>

      <h2 id="datos">13. Protección de datos</h2>
      <p>
        El tratamiento de datos personales se describe en la{" "}
        <Link href="/legal/privacidad">política de privacidad</Link>.
      </p>

      <h2 id="reclamos">14. Atención y reclamos</h2>
      <p>
        Las consultas y reclamos se reciben por WhatsApp o mediante el{" "}
        <Link href="/legal/reclamos">formulario de reclamos</Link>, que genera
        un comprobante con número y fecha. Cada reclamo se responde en un plazo
        máximo de <strong>3 días hábiles</strong>.
      </p>

      <h2 id="cambios">15. Modificaciones</h2>
      <p>
        Estos términos pueden actualizarse. Los cambios se aplican a los
        pedidos enviados después de su publicación. Un pedido ya confirmado
        conserva las condiciones vigentes al momento de su confirmación.
      </p>
    </LegalPage>
  );
}
