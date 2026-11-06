import Link from "next/link";
import { LegalPage, legalMetadata } from "@/components/legal/legal-page";
import { ConsentPreferencesButton } from "@/components/consent/consent-preferences-button";

const path = "/legal/cookies";
export const metadata = legalMetadata(
  path,
  "Política de cookies",
  "Qué cookies y almacenamiento técnico usa la tienda, para qué sirven, cuánto duran y cómo se configuran las preferencias.",
);

export default function CookiesPage() {
  return (
    <LegalPage
      path={path}
      title="Política de cookies"
      lead="Qué tecnologías de almacenamiento usa la tienda, para qué sirven y cómo se aceptan, rechazan o modifican las preferencias."
    >
      <p>
        <ConsentPreferencesButton className="consent-button consent-button-quiet">
          Configurar preferencias
        </ConsentPreferencesButton>
      </p>


      <h2 id="que-son">1. Qué son las cookies</h2>
      <p>
        Las cookies son pequeños archivos que un sitio web guarda en el
        navegador. Existen tecnologías similares, como el almacenamiento local
        (<em>localStorage</em>), que guardan información en el dispositivo sin
        enviarla automáticamente al servidor. En esta política se llama
        «cookies» a todas ellas.
      </p>

      <h2 id="categorias">2. Categorías</h2>
      <ul>
        <li>
          <strong>Necesarias o técnicas:</strong> permiten funciones solicitadas
          por el usuario, como conservar el carrito. No requieren
          consentimiento y siempre están activas.
        </li>
        <li>
          <strong>Analíticas:</strong> miden de forma agregada el uso del
          sitio. <strong>No se usan.</strong>
        </li>
        <li>
          <strong>Publicitarias o de terceros:</strong> muestran anuncios o
          siguen la actividad entre sitios. <strong>No se usan.</strong>
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
              <td><code>tenis-cart-v5</code></td>
              <td>Necesaria · almacenamiento local · propia</td>
              <td>Guardar los productos y cantidades del carrito.</td>
              <td>Hasta que se vacíe el carrito o se borren los datos del navegador.</td>
            </tr>
            <tr>
              <td><code>tm-consent</code></td>
              <td>Necesaria · almacenamiento local · propia</td>
              <td>Recordar la decisión sobre cookies.</td>
              <td>12 meses; después se vuelve a preguntar.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Estos datos permanecen en el dispositivo y no se envían a la tienda ni a terceros.</p>
      <h3>Cookies de seguridad del proveedor de alojamiento</h3>
      <p>
        El sitio se entrega a través de Cloudflare. Cuando Cloudflare detecta
        tráfico sospechoso o solicita una verificación de seguridad, puede
        establecer cookies técnicas propias (por ejemplo <code>__cf_bm</code>{" "}
        o <code>cf_clearance</code>) para distinguir a las personas de los
        programas automatizados. Son necesarias para proteger el sitio, no se
        usan con fines publicitarios y su duración es breve, según la
        configuración de Cloudflare.
      </p>
      <h3>Enlaces a servicios externos</h3>
      <p>
        Los botones de WhatsApp y de redes sociales abren servicios de
        terceros, que aplican sus propias cookies solo cuando se accede a
        ellos.
      </p>

      <h2 id="consentimiento">4. Aceptación, rechazo y configuración</h2>
      <p>
        En la primera visita se muestra un aviso con tres opciones: «Aceptar
        todas», «Rechazar no esenciales» y «Configurar». Las cookies necesarias
        funcionan siempre. Cualquier tecnología analítica o publicitaria que se
        incorpore en el futuro solo se activará con el consentimiento del
        usuario y no se cargará antes de que este decida.
      </p>

      <h2 id="cambiar">5. Modificación del consentimiento</h2>
      <ul>
        <li>
          La decisión puede cambiarse en cualquier momento desde el enlace
          «Preferencias de cookies» al pie de cada página o con este botón:{" "}
          <ConsentPreferencesButton className="underline underline-offset-4 font-semibold">
            cambiar preferencias
          </ConsentPreferencesButton>
          .
        </li>
        <li>
          También pueden borrarse los datos del sitio desde la configuración
          del navegador. En ese caso se vacía el carrito y el aviso vuelve a
          mostrarse.
        </li>
      </ul>

      <h2 id="mas">6. Más información</h2>
      <p>
        El tratamiento de datos personales se explica en la{" "}
        <Link href="/legal/privacidad">política de privacidad</Link>. Si se
        incorporan nuevas cookies, esta página se actualiza y el
        consentimiento se solicita de nuevo.
      </p>
    </LegalPage>
  );
}
