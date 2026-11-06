import Link from "next/link";
import { LegalPage, legalMetadata, Pending } from "@/components/legal/legal-page";
import { CARGOTRANS_URL } from "@/lib/site";

const path = "/legal/envios";
export const metadata = legalMetadata(
  path,
  "Política de envíos",
  "Envío gratuito al IND y a puntos céntricos de Managua, y envíos por CargoTrans al resto de Nicaragua.",
);

export default function ShippingPage() {
  return (
    <LegalPage
      path={path}
      title="Política de envíos"
      lead="Opciones de entrega, quién asume cada costo y qué pasa si el producto se daña en el camino."
    >
      <div className="legal-callout legal-callout-strong">
        <p>
          <strong>En resumen:</strong> la entrega es gratuita en el Instituto
          Nicaragüense de Deportes (IND) y en puntos céntricos de Managua. Al
          resto del país enviamos por CargoTrans, dentro de su cobertura. La
          opción, el costo y la fecha se confirman por WhatsApp antes de que
          aceptes la compra.
        </p>
      </div>

      <h2 id="opciones">1. Opciones de entrega</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Opción</th>
              <th>Costo para ti</th>
              <th>Cómo funciona</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Instituto Nicaragüense de Deportes (IND), Managua</td>
              <td>Gratis</td>
              <td>
                Coordinamos contigo el día y la hora de entrega por WhatsApp.
                Punto exacto y horarios:{" "}
                <Pending>pendiente de confirmar por el comerciante</Pending>
              </td>
            </tr>
            <tr>
              <td>Puntos céntricos de Managua</td>
              <td>Gratis</td>
              <td>
                Te ofrecemos el punto disponible más cercano. Lista de puntos y
                condiciones (horarios, días, monto mínimo si lo hubiera):{" "}
                <Pending>pendiente de confirmar por el comerciante</Pending>
              </td>
            </tr>
            <tr>
              <td>
                CargoTrans, resto de Nicaragua dentro de su cobertura
              </td>
              <td>
                Según la tarifa de CargoTrans para tu destino. Quién la paga:{" "}
                <Pending>pendiente de confirmar por el comerciante</Pending>
              </td>
              <td>
                Enviamos el paquete a la agencia o dirección de CargoTrans que
                elijas. Te informamos el costo y el tiempo estimado antes de
                que confirmes la compra.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="cargotrans">2. Envíos por CargoTrans</h2>
      <p>
        CargoTrans es una empresa de transporte de paquetería con agencias en
        los departamentos del país. La cobertura, las tarifas y los tiempos de
        entrega los define CargoTrans; puedes consultarlos en{" "}
        <a href={CARGOTRANS_URL} target="_blank" rel="noopener noreferrer">cargotrans.com.ni</a>.
        Antes de confirmar tu compra te diremos:
      </p>
      <ul>
        <li>si tu destino está dentro de la cobertura;</li>
        <li>el costo del envío y quién lo paga;</li>
        <li>el tiempo estimado de entrega que informe CargoTrans;</li>
        <li>cómo dar seguimiento al paquete.</li>
      </ul>
      <p>
        Si tu destino no está cubierto, buscaremos contigo otra alternativa o
        no se realizará la compra, sin costo para ti.
      </p>

      <h2 id="plazos">3. Fechas de entrega</h2>
      <p>
        La fecha o el plazo estimado de entrega se acuerda en el chat al
        confirmar la compra. Si surge un retraso, te avisaremos de inmediato.
        Si no podemos entregar el pedido, te devolveremos sin demora cualquier
        monto que hayas adelantado.
      </p>

      <h2 id="danos">4. Daños o pérdidas durante el transporte</h2>
      <p>
        El producto viaja bajo nuestra responsabilidad hasta que lo recibes.
        Si llega dañado, incompleto o no llega, escríbenos por WhatsApp con la
        referencia del pedido y, si es posible, fotos del paquete y del
        producto. Lo reemplazaremos o te devolveremos lo pagado, incluido el
        envío que hayas pagado. Te recomendamos revisar el paquete al recibirlo
        y avisarnos cuanto antes, pero esto no limita los plazos que te da la
        ley para reclamar.
      </p>

      <h2 id="recepcion">5. Recepción del pedido</h2>
      <ul>
        <li>Indica un nombre y un teléfono de contacto de quien recibirá el pedido.</li>
        <li>Si no puedes asistir a la entrega acordada, avísanos con anticipación para reprogramarla.</li>
        <li>Al recibir, puedes revisar que el producto corresponda a tu pedido.</li>
      </ul>

      <h2 id="relacionadas">6. Políticas relacionadas</h2>
      <p>
        Consulta los <Link href="/legal/terminos">términos y condiciones</Link>,
        la política de <Link href="/legal/cambios-y-devoluciones">cambios y devoluciones</Link>{" "}
        y la <Link href="/legal/garantia">garantía</Link>.
      </p>
    </LegalPage>
  );
}
