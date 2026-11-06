import Link from "next/link";
import { LegalPage, legalMetadata, Pending } from "@/components/legal/legal-page";
import { BUSINESS } from "@/lib/site";

const path = "/legal/garantia";
export const metadata = legalMetadata(
  path,
  "Política de garantía",
  "Garantía por defectos de fábrica: cambio del artículo o reembolso, sin costo, y tus derechos de garantía según la Ley 842.",
);

export default function WarrantyPage() {
  return (
    <LegalPage
      path={path}
      title="Garantía"
      lead="Qué cubre la garantía, cómo se hace efectiva y qué derechos te reconoce la ley en todo caso."
    >
      <div className="legal-callout legal-callout-strong">
        <p>
          <strong>En resumen:</strong> si un producto tiene un defecto de
          fábrica, lo cambiamos por otro igual. Si no hay existencias, nos
          devuelves el artículo y te reembolsamos lo que pagaste. No tiene costo
          para ti, transporte incluido.
        </p>
      </div>

      <h2 id="cobertura">1. Qué cubre</h2>
      <p>
        Cubre los defectos de fábrica: fallas de materiales o de fabricación
        que impiden que el producto funcione con normalidad o lo hacen
        inseguro, por ejemplo una madera despegada en sus capas, una goma con
        burbujas o la superficie desprendida desde el inicio, o una pelota que
        se rompe en el primer uso normal.
      </p>
      <p>
        El desgaste natural por el uso (por ejemplo, la pérdida progresiva de
        agarre de una goma o el desgaste de las pelotas con el juego) no es,
        por sí mismo, un defecto de fábrica.
      </p>

      <h2 id="plazo">2. Plazo de garantía</h2>
      <p>
        Plazo de la garantía comercial:{" "}
        <Pending>pendiente de definir por el comerciante</Pending>. El plazo
        nunca será menor que la garantía que ofrezca el fabricante del
        producto, que te trasladamos. El plazo se cuenta desde la entrega.
      </p>
      <ul>
        <li>El tiempo que el producto esté en revisión o reparación no se cuenta dentro del plazo.</li>
        <li>Si cambiamos el producto, el nuevo artículo tiene un plazo de garantía completo desde su entrega.</li>
      </ul>

      <h2 id="solucion">3. Solución</h2>
      <ol>
        <li><strong>Cambio</strong> del artículo por otro igual, si hay existencias.</li>
        <li>
          Si no hay existencias, nos devuelves el artículo y te{" "}
          <strong>reembolsamos el monto pagado</strong>. Si pagaste en
          efectivo, no te obligaremos a aceptar crédito en tienda.
        </li>
      </ol>
      <p>
        Todo el proceso es gratuito, incluido el transporte del producto, y se
        resuelve en un máximo de <strong>30 días calendario</strong> desde que
        presentas el reclamo.
      </p>

      <h2 id="ley">4. Lo que dice la ley (garantía legal)</h2>
      <p>
        Esta política comercial no reemplaza la garantía que establece la Ley
        842 y su reglamento, que es obligatoria y se aplica en todo caso:
      </p>
      <ul>
        <li>La garantía no tiene costo adicional y responden de forma solidaria el fabricante y el comerciante: puedes reclamarnos directamente a nosotros.</li>
        <li>La ley prevé la reparación del producto y, cuando no es posible, su reposición por otro igual o la devolución de lo pagado (artículo 45).</li>
        <li>Si un producto reparado vuelve a fallar, procede el cambio; si el producto de reemplazo falla, procede la devolución del dinero.</li>
        <li>Ante defectos ocultos dentro del plazo de garantía, puedes pedir la devolución de lo pagado o una rebaja del precio (artículo 46).</li>
        <li>
          Solo quedamos exonerados cuando el daño se debe a un uso indebido del
          producto, a no seguir las instrucciones del fabricante o cuando la
          garantía ya venció (artículo 48).
        </li>
      </ul>

      <h2 id="como">5. Cómo hacer efectiva la garantía</h2>
      <ol>
        <li>
          Escríbenos por WhatsApp o usa el{" "}
          <Link href="/legal/reclamos">formulario de reclamos</Link>.
        </li>
        <li>Indica la referencia del pedido o la factura, y describe el defecto con fotos o video.</li>
        <li>Te confirmamos la recepción y coordinamos la entrega del producto, sin costo para ti.</li>
        <li>Revisamos el producto y te damos la solución dentro del plazo indicado.</li>
      </ol>

      <h2 id="documento">6. Documento de garantía</h2>
      <p>
        Con tu compra te entregaremos la factura o el comprobante. El documento
        de garantía indicará: el nombre y la dirección del comercio
        ({BUSINESS.storeName}, {BUSINESS.ownerName}), la descripción del
        producto (marca y modelo), la fecha de compra y de entrega con el
        número de factura, la duración de la garantía, lo que cubre y lo que no
        cubre, y dónde presentar el reclamo.
      </p>
    </LegalPage>
  );
}
