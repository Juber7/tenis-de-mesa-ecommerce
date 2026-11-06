import Link from "next/link";
import { LegalPage, legalMetadata } from "@/components/legal/legal-page";

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
              <td>Punto y horarios exactos: consultar a través de WhatsApp.</td>
            </tr>
            <tr>
              <td>Puntos céntricos de Managua</td>
              <td>Gratis</td>
              <td>Punto y horarios exactos: consultar a través de WhatsApp.</td>
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

      <h2 id="danos">4. Procedimiento: producto dañado, incompleto o extraviado</h2>
      <ol>
        <li>Se recomienda revisar el paquete al recibirlo.</li>
        <li>Si llega dañado, incompleto o no llega, se informa por WhatsApp con la referencia del pedido y, si es posible, fotos del paquete y del producto.</li>
      </ol>
      <p>Avisar pronto agiliza la solución, pero no reduce los plazos legales para reclamar.</p>

      <h2 id="recepcion">5. Recepción del pedido</h2>
      <ul>
        <li>Se debe indicar el nombre y el teléfono de la persona que recibirá el pedido.</li>
        <li>Si no es posible asistir a la entrega acordada, se avisa con anticipación para reprogramarla.</li>
        <li>Al recibir, puede revisarse que el producto corresponda al pedido.</li>
      </ul>

      <h2 id="relacionadas">6. Políticas relacionadas</h2>
      <p>
        <Link href="/legal/terminos">Términos y condiciones</Link> ·{" "}
        <Link href="/legal/cambios-y-devoluciones">Cambios y devoluciones</Link> ·{" "}
        <Link href="/legal/garantia">Garantía</Link>
      </p>
    </LegalPage>
  );
}
