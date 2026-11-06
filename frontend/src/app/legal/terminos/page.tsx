import Link from "next/link";
import { LegalPage, legalMetadata, MerchantContact, Pending } from "@/components/legal/legal-page";
import { DIPRODEC_URL } from "@/lib/site";

const path = "/legal/terminos";
export const metadata = legalMetadata(
  path,
  "Términos y condiciones",
  "Condiciones de uso de la tienda, pedidos por WhatsApp, precios, pagos, entregas, garantías y reclamos conforme a la legislación de Nicaragua.",
);

export default function TermsPage() {
  return (
    <LegalPage
      path={path}
      title="Términos y condiciones"
      lead="Cómo funciona la tienda, qué significa enviar un pedido por WhatsApp y cuáles son tus derechos como persona consumidora en Nicaragua."
    >
      <div className="legal-callout legal-callout-strong">
        <p>
          <strong>En resumen:</strong> este sitio es un catálogo. Enviar tu
          carrito por WhatsApp es una <strong>solicitud de pedido</strong>, no
          una compra cerrada. La compra queda confirmada cuando te respondemos
          con la disponibilidad, el precio final, el envío y la forma de pago,
          y tú aceptas esas condiciones en el chat. Tus derechos como persona
          consumidora son irrenunciables y nada en estos términos los limita.
        </p>
      </div>

      <h2 id="quienes-somos">1. Quiénes somos</h2>
      <MerchantContact />

      <h2 id="uso">2. Uso del sitio</h2>
      <p>
        Al navegar en el sitio o enviar un pedido aceptas estos términos. Puedes
        consultar el catálogo sin registrarte: no hay cuentas de usuario ni
        formularios de pago. Te pedimos usar el sitio de buena fe y no intentar
        alterar su funcionamiento, sus precios o el contenido de los pedidos.
      </p>
      <p>
        Estos términos se aplican junto con la{" "}
        <Link href="/legal/privacidad">política de privacidad</Link>, la{" "}
        <Link href="/legal/cookies">política de cookies</Link>, la{" "}
        <Link href="/legal/envios">política de envíos</Link>, la política de{" "}
        <Link href="/legal/cambios-y-devoluciones">cambios y devoluciones</Link>{" "}
        y la <Link href="/legal/garantia">política de garantía</Link>.
      </p>

      <h2 id="productos">3. Información de los productos</h2>
      <p>
        Cada producto muestra su nombre, fotografías, descripción, categoría,
        precio y si está disponible. Procuramos que la información sea clara,
        veraz y completa. Los colores pueden verse ligeramente distintos según
        tu pantalla. Si tienes una duda sobre un producto (medidas, grosor de
        esponja, peso o compatibilidad), pregúntanos antes de confirmar.
      </p>
      <p>
        Los <strong>productos seminuevos</strong> se identifican en su propia
        categoría. Antes de confirmar la compra te informaremos su estado y
        cualquier desgaste o detalle visible.
      </p>

      <h2 id="precios">4. Precios y moneda</h2>
      <ul>
        <li>
          Los precios se publican en dólares estadounidenses (US$) y son precios
          finales: incluyen los impuestos aplicables. No se cobra ningún cargo
          adicional por el producto.
        </li>
        <li>
          Si pagas en córdobas, se aplica el tipo de cambio oficial del Banco
          Central de Nicaragua del día del pago.
        </li>
        <li>
          El precio que te confirmemos por WhatsApp no será mayor que el
          publicado en el sitio cuando enviaste tu pedido.
        </li>
        <li>
          El costo de envío, cuando exista, se informa por separado y antes de
          que confirmes la compra. Consulta la{" "}
          <Link href="/legal/envios">política de envíos</Link>.
        </li>
        <li>
          Un producto marcado como <em>oferta</em> se vende al precio rebajado
          mientras la oferta esté publicada en el sitio.
        </li>
      </ul>
      <p>
        El total que muestra el carrito se calcula con los precios vigentes en
        el catálogo: el sitio los vuelve a verificar con nuestro inventario
        antes de abrir WhatsApp.
      </p>

      <h2 id="disponibilidad">5. Disponibilidad e inventario</h2>
      <p>
        La etiqueta «Disponible» indica que el producto tiene existencias
        según nuestro inventario. Agregar un producto al carrito no lo reserva.
        Si al recibir tu pedido un producto ya no tiene existencias, te lo
        diremos en el chat; no tendrás que pagarlo y, si ya hubieras adelantado
        algún monto, te lo devolveremos de inmediato.
      </p>

      <h2 id="pedidos">6. Cómo se hace un pedido</h2>
      <ol>
        <li>Agregas productos al carrito. El carrito se guarda solo en tu dispositivo.</li>
        <li>
          Al abrir el carrito, el sitio verifica precios y disponibilidad con
          el catálogo actualizado.
        </li>
        <li>
          Con el botón «Enviar pedido por WhatsApp» se abre un mensaje con los
          productos, cantidades, precios, el total calculado y una referencia
          de pedido. El mensaje no se envía solo: tú decides enviarlo.
        </li>
        <li>
          Te respondemos por WhatsApp para confirmar disponibilidad, precio
          final, forma y costo de entrega, fecha estimada y forma de pago.
        </li>
        <li>
          Cuando aceptas expresamente esas condiciones en el chat, la compra
          queda confirmada.
        </li>
      </ol>

      <h2 id="confirmacion">7. Confirmación de la compra</h2>
      <p>
        El mensaje que envías desde el sitio es una solicitud de compra. La
        compraventa se perfecciona cuando ambas partes están de acuerdo sobre
        el producto y el precio: es decir, cuando tú aceptas en el chat las
        condiciones que te confirmamos. Hasta ese momento puedes cambiar o
        cancelar tu solicitud sin costo.
      </p>
      <p>
        Al confirmar, te enviaremos por WhatsApp un resumen con los productos,
        el precio final, el costo de envío, la forma de pago, la fecha estimada
        de entrega y la referencia del pedido. Guárdalo como comprobante.
      </p>
      <p>
        Solo podemos rechazar una solicitud por una causa justificada, como la
        falta real de existencias o la imposibilidad de entregar en el lugar
        solicitado. En ese caso te lo explicaremos en el chat.
      </p>

      <h2 id="pagos">8. Medios de pago</h2>
      <p>
        El sitio no procesa pagos ni solicita datos bancarios. La forma de pago
        se acuerda por WhatsApp. Medios aceptados:{" "}
        <Pending>pendiente de confirmar por el comerciante (por ejemplo, efectivo contra entrega o transferencia)</Pending>.
      </p>
      <p>
        <strong>Seguridad:</strong> nunca te pediremos por WhatsApp ni por el
        sitio el número completo de tu tarjeta, su código de seguridad,
        contraseñas ni códigos de verificación. Si alguien te los pide en
        nuestro nombre, no los compartas y avísanos.
      </p>
      <p>
        Te entregaremos la factura o el comprobante de tu compra, que también
        sirve para hacer valer la garantía.
      </p>

      <h2 id="entregas">9. Entregas</h2>
      <p>
        Las opciones de entrega, sus condiciones y quién asume cada costo están
        en la <Link href="/legal/envios">política de envíos</Link>. Respondemos
        ante ti por los daños o pérdidas que sufra el producto durante el
        transporte hasta que lo recibas.
      </p>

      <h2 id="retracto">10. Derecho de retracto</h2>
      <p>
        En las ventas a distancia, la Ley 842 (artículo 81) te reconoce el
        derecho a retractarte de la compra dentro de los{" "}
        <strong>5 días hábiles</strong> siguientes a la recepción del producto.
        Para ejercerlo, escríbenos por WhatsApp dentro de ese plazo. El
        procedimiento está en{" "}
        <Link href="/legal/cambios-y-devoluciones#retracto">cambios y devoluciones</Link>.
      </p>

      <h2 id="garantias">11. Cambios, devoluciones y garantía</h2>
      <p>
        Los productos con defectos de fábrica se cambian o se reembolsan según
        la <Link href="/legal/garantia">política de garantía</Link>. Esta
        política comercial se suma a la garantía legal, que no puede reducirse
        ni excluirse.
      </p>

      <h2 id="responsabilidades">12. Responsabilidades</h2>
      <h3>Del comerciante</h3>
      <ul>
        <li>Informar de forma veraz las características, el precio y la disponibilidad de los productos.</li>
        <li>Respetar el precio publicado y las condiciones confirmadas en el chat.</li>
        <li>Entregar el producto acordado, en buen estado y en el lugar y plazo convenidos.</li>
        <li>Atender garantías, devoluciones y reclamos conforme a la ley.</li>
        <li>Tratar tus datos personales según la política de privacidad.</li>
      </ul>
      <h3>De la persona compradora</h3>
      <ul>
        <li>Proporcionar datos de contacto y entrega correctos.</li>
        <li>Revisar el resumen del pedido antes de aceptarlo.</li>
        <li>Recibir el pedido en el lugar y horario acordados, o avisar con anticipación si no puede hacerlo.</li>
        <li>Usar los productos según su naturaleza y las instrucciones del fabricante.</li>
      </ul>

      <h2 id="limitaciones">13. Alcance de nuestra responsabilidad</h2>
      <p>
        Nada en estos términos excluye ni limita la responsabilidad que nos
        corresponde por ley frente a las personas consumidoras. El sitio puede
        estar temporalmente fuera de servicio por mantenimiento o por causas
        ajenas a nosotros; en ese caso puedes pedir por WhatsApp. Los enlaces a
        WhatsApp y a redes sociales llevan a servicios de terceros que tienen
        sus propias condiciones.
      </p>

      <h2 id="propiedad">14. Propiedad intelectual</h2>
      <p>
        El diseño, los textos y las imágenes propias del sitio pertenecen a
        «Tenis de Mesa». Las marcas de los productos pertenecen a sus
        respectivos titulares y se mencionan solo para identificar los
        productos que vendemos.
      </p>

      <h2 id="datos">15. Protección de datos</h2>
      <p>
        Tratamos tus datos conforme a la Ley 787, Ley de Protección de Datos
        Personales. Consulta la <Link href="/legal/privacidad">política de privacidad</Link>.
      </p>

      <h2 id="reclamos">16. Atención y reclamos</h2>
      <p>
        Puedes presentar consultas y reclamos por WhatsApp o mediante el{" "}
        <Link href="/legal/reclamos">formulario de reclamos</Link>, que genera
        un comprobante con número y fecha. Responderemos tu reclamo en un plazo
        máximo de <strong>10 días hábiles</strong> (Ley 842, artículo 100).
      </p>
      <p>
        Si no quedas conforme con la respuesta, o no la recibes, puedes acudir a
        la Dirección de Protección de los Derechos de las Personas Consumidoras
        y Usuarias (DIPRODEC) del Ministerio de Fomento, Industria y Comercio
        (MIFIC). Información y contactos en{" "}
        <a href={DIPRODEC_URL} target="_blank" rel="noopener noreferrer">el sitio del MIFIC</a>.
      </p>

      <h2 id="ley">17. Legislación aplicable y controversias</h2>
      <p>
        Estos términos se rigen por las leyes de la República de Nicaragua, en
        especial la Ley 842, Ley de Protección de los Derechos de las Personas
        Consumidoras y Usuarias, y su reglamento. Las controversias pueden
        resolverse por acuerdo directo, ante DIPRODEC o ante los tribunales
        competentes de Nicaragua. No exigimos someter ninguna controversia a
        arbitraje.
      </p>

      <h2 id="cambios">18. Cambios en estos términos</h2>
      <p>
        Podemos actualizar estos términos; la fecha de la última actualización
        aparece al inicio de la página. Los cambios se aplican a los pedidos
        enviados después de su publicación: un pedido ya confirmado mantiene
        las condiciones vigentes al confirmarlo.
      </p>
    </LegalPage>
  );
}
