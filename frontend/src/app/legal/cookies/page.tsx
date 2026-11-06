import Link from "next/link";
import { LegalPage, legalMetadata } from "@/components/legal/legal-page";
import { ConsentPreferencesButton } from "@/components/consent/consent-preferences-button";

const path = "/legal/cookies";
export const metadata = legalMetadata(
  path,
  "Política de cookies",
  "Qué cookies y almacenamiento técnico usa la tienda, para qué sirven, cuánto duran y cómo configurar tus preferencias.",
);

export default function CookiesPage() {
  return (
    <LegalPage
      path={path}
      title="Política de cookies"
      lead="Qué tecnologías de almacenamiento usa la tienda, para qué sirven y cómo puedes aceptar, rechazar o cambiar tus preferencias."
    >
      <div className="legal-callout legal-callout-strong">
        <p>
          <strong>En resumen:</strong> la tienda solo usa almacenamiento
          técnico necesario para tu carrito y para recordar tu decisión sobre
          cookies. No usamos cookies analíticas, publicitarias ni de redes
          sociales.
        </p>
        <p>
          <ConsentPreferencesButton className="consent-button consent-button-quiet">
            Configurar mis preferencias
          </ConsentPreferencesButton>
        </p>
      </div>

      <h2 id="que-son">1. Qué son las cookies</h2>
      <p>
        Las cookies son pequeños archivos que un sitio web guarda en tu
        navegador. Existen tecnologías parecidas, como el almacenamiento local
        (<em>localStorage</em>), que guardan información en tu dispositivo sin
        enviarla automáticamente al servidor. En esta política llamamos
        «cookies» a todas ellas.
      </p>

      <h2 id="categorias">2. Categorías</h2>
      <ul>
        <li>
          <strong>Necesarias o técnicas:</strong> permiten funciones que tú
          pides, como conservar el carrito. No requieren consentimiento y
          siempre están activas.
        </li>
        <li>
          <strong>Analíticas:</strong> miden de forma agregada cómo se usa el
          sitio. <strong>No las usamos.</strong>
        </li>
        <li>
          <strong>Publicitarias o de terceros:</strong> sirven para mostrar
          anuncios o seguir tu actividad entre sitios.{" "}
          <strong>No las usamos.</strong>
        </li>
      </ul>

      <h2 id="lista">3. Cookies que usa este sitio</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Finalidad</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>tenis-cart-usd-v4</code></td>
              <td>Necesaria · almacenamiento local · propia</td>
              <td>Guardar los productos y cantidades de tu carrito.</td>
              <td>Hasta que vacíes el carrito o borres los datos del navegador.</td>
            </tr>
            <tr>
              <td><code>tm-consent</code></td>
              <td>Necesaria · almacenamiento local · propia</td>
              <td>Recordar tu decisión sobre cookies.</td>
              <td>12 meses; después te preguntamos de nuevo.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Estos datos se quedan en tu dispositivo y no se envían a nuestros
        servidores ni a terceros.
      </p>
      <h3>Cookies de seguridad de nuestro proveedor de alojamiento</h3>
      <p>
        El sitio se entrega a través de Cloudflare. Cuando Cloudflare detecta
        tráfico sospechoso o pide una verificación de seguridad, puede
        establecer cookies técnicas propias (por ejemplo <code>__cf_bm</code>{" "}
        o <code>cf_clearance</code>) para distinguir a las personas de los
        programas automatizados. Son necesarias para proteger el sitio, no se
        usan para publicidad y su duración es breve, según la configuración de
        Cloudflare.
      </p>
      <h3>Enlaces a servicios externos</h3>
      <p>
        Los botones de WhatsApp y de redes sociales abren servicios de
        terceros. Esos servicios pueden usar sus propias cookies según sus
        políticas, pero solo cuando decides abrirlos.
      </p>

      <h2 id="consentimiento">4. Cómo aceptar, rechazar o configurar</h2>
      <p>
        La primera vez que visitas el sitio aparece un aviso con tres opciones:
        «Aceptar todas», «Rechazar no esenciales» y «Configurar». Las cookies
        necesarias funcionan siempre; cualquier tecnología analítica o
        publicitaria que incorporemos en el futuro solo se activará si la
        aceptas, y no se cargará antes de que decidas.
      </p>

      <h2 id="cambiar">5. Cómo cambiar tu decisión</h2>
      <ul>
        <li>
          Usa el enlace «Preferencias de cookies» al pie de cualquier página o
          este botón:{" "}
          <ConsentPreferencesButton className="underline underline-offset-4 font-semibold">
            cambiar preferencias
          </ConsentPreferencesButton>
          .
        </li>
        <li>
          También puedes borrar los datos del sitio desde la configuración de
          tu navegador. Si lo haces, se vaciará tu carrito y volveremos a
          preguntarte.
        </li>
      </ul>

      <h2 id="mas">6. Más información</h2>
      <p>
        Para saber cómo tratamos tus datos personales, consulta la{" "}
        <Link href="/legal/privacidad">política de privacidad</Link>. Si
        incorporamos nuevas cookies, actualizaremos esta página y te pediremos
        tu consentimiento de nuevo.
      </p>
    </LegalPage>
  );
}
