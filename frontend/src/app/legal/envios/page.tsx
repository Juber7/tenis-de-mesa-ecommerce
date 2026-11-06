import Link from "next/link";
import { LegalPage, legalMetadata, Pending } from "@/components/legal/legal-page";
import { CARGOTRANS_URL } from "@/lib/site";

const path = "/legal/envios";
export const metadata = legalMetadata(
  path,
  "Política de envíos",
  "Entrega gratuita en el IND y en puntos céntricos de Managua. Envíos por CargoTrans al resto de Nicaragua, con costo a cargo del cliente.",
);

export default function ShippingPage() {
  return (
    <LegalPage
      path={path}
      title="Política de envíos"
      lead="Opciones de entrega, quién asume cada costo y cómo se procede en cada caso."
    >
      <div className="legal-callout legal-callout-strong">
        <p>
          <strong>En resumen:</strong> la entrega es gratuita en el Instituto
          Nicaragüense de Deportes (IND) y en puntos céntricos de Managua. Al
          resto del país se envía por CargoTrans, dentro de su cobertura, y el
          costo del envío lo paga el cliente. La opción, el costo y la fecha se
          confirman por WhatsApp antes de cerrar la compra.
        </p>
      </div>

      <h2 id="opciones">1. Opciones de entrega</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Opción</th>
              <th>Costo</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Instituto Nicaragüense de Deportes (IND), Managua</td>
              <td>Gratis</td>
              <td>
                Punto exacto y horarios:{" "}
                <Pending>pendiente de confirmar por el comerciante</Pending>
              </td>
            </tr>
            <tr>
              <td>Puntos céntricos de Managua</td>
              <td>Gratis</td>
              <td>
                Lista de puntos y condiciones (horarios, días, monto mínimo si
                lo hubiera):{" "}
                <Pending>pendiente de confirmar por el comerciante</Pending>
              </td>
            </tr>
            <tr>
              <td>CargoTrans: resto de Nicaragua, dentro de su cobertura</td>
              <td>A cargo del cliente, según la tarifa de CargoTrans</td>
              <td>Entrega en la agencia o dirección de CargoTrans que se indique.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="ind">2. Procedimiento: entrega en el IND</h2>
      <ol>
        <li>Al confirmar la compra se elige la entrega en el IND.</li>
        <li>Se acuerdan por WhatsApp el día y la hora.</li>
        <li>El pedido se entrega en el punto acordado a la persona indicada en el chat.</li>
      </ol>

      <h2 id="managua">3. Procedimiento: entrega en un punto céntrico de Managua</h2>
      <ol>
        <li>Se propone el punto disponible más cercano al cliente.</li>
        <li>Se acuerdan por WhatsApp el punto, el día y la hora.</li>
        <li>El pedido se entrega en el punto acordado a la persona indicada en el chat.</li>
      </ol>

      <h2 id="cargotrans">4. Procedimiento: envío por CargoTrans</h2>
      <ol>
        <li>Se verifica que el destino esté dentro de la cobertura de CargoTrans.</li>
        <li>
          Se informa el costo del envío según la tarifa de CargoTrans y el
          tiempo estimado de entrega. <strong>El costo del envío corre por
          cuenta del cliente</strong> y se informa antes de confirmar la
          compra.
        </li>
        <li>Una vez confirmada la compra, el paquete se entrega a CargoTrans y se comparten los datos para darle seguimiento.</li>
        <li>El cliente recibe el paquete en la agencia o dirección indicada.</li>
      </ol>
      <p>
        La cobertura, las tarifas y los tiempos de entrega los define
        CargoTrans y pueden consultarse en{" "}
        <a href={CARGOTRANS_URL} target="_blank" rel="noopener noreferrer">cargotrans.com.ni</a>.
        Si el destino no está cubierto, se busca otra alternativa o la compra
        no se realiza, sin costo para el cliente.
      </p>

      <h2 id="plazos">5. Fechas de entrega y retrasos</h2>
      <p>
        La fecha o el plazo estimado de entrega se acuerda en el chat al
        confirmar la compra. Ante cualquier retraso se avisa de inmediato. Si
        el pedido no puede entregarse, se devuelve sin demora cualquier monto
        adelantado.
      </p>

      <h2 id="danos">6. Procedimiento: producto dañado, incompleto o extraviado</h2>
      <ol>
        <li>Se recomienda revisar el paquete al recibirlo.</li>
        <li>Si llega dañado, incompleto o no llega, se informa por WhatsApp con la referencia del pedido y, si es posible, fotos del paquete y del producto.</li>
        <li>
          Se reemplaza el producto o se devuelve lo pagado, incluido el costo
          del envío. El producto viaja bajo responsabilidad de la tienda hasta
          su entrega.
        </li>
      </ol>
      <p>Avisar pronto agiliza la solución, pero no reduce los plazos legales para reclamar.</p>

      <h2 id="recepcion">7. Recepción del pedido</h2>
      <ul>
        <li>Se debe indicar el nombre y el teléfono de la persona que recibirá el pedido.</li>
        <li>Si no es posible asistir a la entrega acordada, se avisa con anticipación para reprogramarla.</li>
        <li>Al recibir, puede revisarse que el producto corresponda al pedido.</li>
      </ul>

      <h2 id="relacionadas">8. Políticas relacionadas</h2>
      <p>
        <Link href="/legal/terminos">Términos y condiciones</Link> ·{" "}
        <Link href="/legal/cambios-y-devoluciones">Cambios y devoluciones</Link> ·{" "}
        <Link href="/legal/garantia">Garantía</Link>
      </p>
    </LegalPage>
  );
}
