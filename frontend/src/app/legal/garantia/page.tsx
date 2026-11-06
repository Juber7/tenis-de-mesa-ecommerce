import Link from "next/link";
import { LegalPage, legalMetadata } from "@/components/legal/legal-page";

const path = "/legal/garantia";
export const metadata = legalMetadata(
  path,
  "Política de garantía",
  "Garantía por defectos de fábrica: cambio del artículo o reembolso, sin costo de transporte, y procedimiento para hacerla efectiva.",
);

export default function WarrantyPage() {
  return (
    <LegalPage
      path={path}
      title="Garantía"
      lead="Qué cubre la garantía, qué solución se aplica y cómo se tramita."
    >
      <div className="legal-callout legal-callout-strong">
        <p>
          <strong>En resumen:</strong> garantía de un mes (accesorios y
          seminuevos sin garantía comercial). Ante un defecto de fábrica, el artículo
          se cambia por otro igual. Si no hay existencias, el cliente devuelve
          el artículo y se le reembolsa lo pagado. El trámite no tiene costo,
          transporte incluido.
        </p>
      </div>

      <h2 id="cobertura">1. Qué cubre</h2>
      <p>
        Cubre los defectos de fábrica: fallas de materiales o de fabricación
        que impiden el funcionamiento normal del producto o lo hacen inseguro.
        Por ejemplo, una madera con las capas despegadas, una goma con burbujas
        o con la superficie desprendida desde el inicio, o una pelota que se
        rompe en el primer uso normal.
      </p>
      <p>
        El desgaste natural por el uso, como la pérdida progresiva de agarre de
        una goma o el desgaste de las pelotas con el juego, no constituye por
        sí mismo un defecto de fábrica.
      </p>

      <h2 id="plazo">2. Plazo de garantía</h2>
      <p>
        La garantía comercial es de <strong>un (1) mes</strong> desde la
        entrega para todos los productos, excepto los de las categorías{" "}
        <strong>Accesorios</strong> y <strong>Productos seminuevos</strong>,
        que no tienen garantía comercial. Cuando el fabricante ofrece una
        garantía mayor, se aplica la del fabricante.
      </p>
      <p>
        La falta de garantía comercial no afecta los derechos que la ley
        reconoce en todo caso, como el reclamo por un producto que no
        corresponde a lo ofrecido o que presenta defectos ocultos al momento
        de la entrega.
      </p>
      <ul>
        <li>El tiempo que el producto permanece en revisión no se descuenta del plazo.</li>
        <li>Cuando se cambia el producto, el nuevo artículo tiene un plazo de garantía completo desde su entrega.</li>
      </ul>

      <h2 id="solucion">3. Solución</h2>
      <ol>
        <li><strong>Cambio</strong> del artículo por otro igual, si hay existencias.</li>
        <li>
          Si no hay existencias, el cliente devuelve el artículo y se le{" "}
          <strong>reembolsa el monto pagado</strong>. Si el pago fue en
          efectivo, no se obliga a aceptar crédito en tienda.
        </li>
      </ol>
      <p>
        El trámite es gratuito, incluido el transporte del producto, y se
        resuelve en un máximo de <strong>30 días calendario</strong> desde la
        presentación del reclamo.
      </p>

      <h2 id="procedimiento">4. Cómo se hace efectiva la garantía</h2>
      <ol>
        <li>
          Se escribe por WhatsApp o se usa el{" "}
          <Link href="/legal/reclamos">formulario de reclamos</Link>.
        </li>
        <li>Se indica la referencia del pedido o el número de factura y se describe el defecto con fotos o video.</li>
        <li>Se revisa el producto y se aplica la solución dentro del plazo indicado.</li>
      </ol>
    </LegalPage>
  );
}
