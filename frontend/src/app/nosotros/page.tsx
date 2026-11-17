import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { productCategories } from "@/lib/categories";
import { OG_BASE } from "@/lib/site";

const path = "/nosotros";
const title = "Tienda de ping pong en Managua";
const description =
  "Tienda de tenis de mesa (ping pong) en Managua, Nicaragua: raquetas, gomas, pelotas de ping pong, pega, fundas, robots y accesorios, con precios en córdobas.";

// The canonical URL is the home page: search engines are told to show the
// home page for this text instead of listing /nosotros as a result.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { ...OG_BASE, title, description, url: "/" },
};

export default function AboutPage() {
  return (
    <LegalPage
      path={path}
      kicker="TENIS DE MESA · MANAGUA, NICARAGUA"
      title={title}
      lead="Somos una tienda de tenis de mesa (ping pong) en Managua, Nicaragua. Aquí encuentras raquetas, gomas, pelotas de ping pong, pega, fundas, robots de entrenamiento y accesorios, con precios en córdobas."
    >
      <h2 id="como-comprar">Cómo comprar</h2>
      <p>
        Elige tu equipo en la <Link href="/tienda">tienda en línea</Link> y coordina tu pedido
        por WhatsApp. Entregamos sin costo en el IND y en puntos céntricos de Managua, y
        enviamos al resto de Nicaragua por CargoTrans (el envío lo paga el cliente). Consulta la{" "}
        <Link href="/legal/envios">política de envíos</Link>.
      </p>
      <h2 id="categorias">Qué vendemos</h2>
      <ul>
        {productCategories.map((category) => (
          <li key={category.value}>
            <Link href={`/tienda?categoria=${category.value}`}>{category.search}</Link>
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
