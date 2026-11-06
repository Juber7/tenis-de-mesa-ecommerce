# Tenis de Mesa · Leandro

Tienda headless local construida con Next.js App Router, TypeScript estricto, Tailwind CSS, Motion, componentes shadcn/ui basados en Radix y Zustand. Los productos se administran en Sanity; el cierre de venta es manual por WhatsApp.

## Panel de productos (Sanity)

El cliente administra los productos en **https://tenis-de-mesa-leandro.sanity.studio**: crea, edita y elimina productos, cambia precios y fotos (la primera es la principal) y marca existencias. Los cambios aparecen en la tienda en uno o dos minutos, sin volver a publicarla.

- Proyecto de Sanity: `3609i2j4`, conjunto de datos `production` (público de solo lectura; la tienda no necesita claves).
- El código del panel está en `studio/`. El tipo de documento es `studio/schemaTypes/product.ts` y sus categorías deben coincidir con `frontend/src/lib/categories.ts`.
- Los precios se escriben en dólares con hasta dos decimales. Si se llena *Precio de oferta*, el producto aparece en ofertas con ese precio.
- Para dar acceso a otra persona: sanity.io/manage → proyecto → *Members* → *Invite*.

Comandos desde `studio/` (requieren Node.js 22.12 o superior, `npx sanity login` y `studio/.env` copiado de `.env.example`):

```powershell
npm install
npm run dev          # panel local en http://localhost:3333
npm run deploy       # publica los cambios del panel
```

Para abrir la tienda local usa **Iniciar tienda.cmd** o `npm run dev` desde esta carpeta.

## Iniciar

Requiere Node.js 20.9 o superior y npm.

```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
npm run dev
```

Abre http://localhost:3000. La tienda necesita `SANITY_PROJECT_ID` en `.env.local` para cargar los productos.

## Configuración real

En `frontend/.env.local` configura:

```dotenv
SANITY_PROJECT_ID=3609i2j4
SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://tenisdemesani.com
GOOGLE_SITE_VERIFICATION=   # opcional, Search Console
```

`NEXT_PUBLIC_SITE_URL` se usa al compilar (URLs canónicas, sitemap, robots y Open Graph). Si no empieza por `https://`, `robots.txt` bloquea la indexación a propósito, para que las copias locales o de prueba no aparezcan en Google. Reinicia Next.js después de cambiar variables.

**WhatsApp:** el número del comerciante (+505 8817 4072) está en un único lugar, `src/lib/contact.ts`, y lo usan el carrito, la ficha de producto, el footer, el contacto, las páginas legales y los reclamos. Los precios se cargan en dólares en Sanity y la tienda los muestra en córdobas con el tipo de cambio oficial del BCN del día (`src/lib/exchange-rate.ts`, servicio web del BCN, caché diaria y tasa de respaldo). El certificado del servicio del BCN no envía su intermedio: en local, `Iniciar tienda.cmd` activa `NODE_USE_SYSTEM_CA=1` para completarlo con el almacén de Windows. Las imágenes deben ser URLs públicas HTTP(S).

**Datos del comercio:** `src/lib/site.ts` (`BUSINESS`) guarda nombre, ciudad, redes, RUC, dirección, correo y horario. Los campos en `null` no se publican. Las páginas legales marcan en amarillo los datos que el comerciante debe confirmar; `npm run check:launch` los lista todos.

La tienda consulta desde el servidor la API pública de Sanity con GROQ; no se exponen credenciales. El listado usa el CDN de Sanity y la caché de Next.js (60 segundos); la preparación del pedido consulta la API directa sin caché. Los filtros de búsqueda, categoría, ofertas, orden y página se aplican en `product-filters.ts`.

## Estructura

```text
frontend/
  src/
    app/
      page.tsx
      tienda/page.tsx
      producto/[slug]/page.tsx
      carrito/page.tsx
      api/checkout/route.ts
      legal/            # páginas legales y reclamos
      contacto/page.tsx
      sitemap.ts, robots.ts
      error.tsx
      not-found.tsx
    components/
      layout/
      products/
      cart/
      ui/
    lib/
      catalog.ts
      whatsapp.ts
      checkout.ts
      utils.ts
    store/cart.ts
    types/product.ts
  scripts/test-db.ts
  tests/
studio/
  sanity.config.ts
  sanity.cli.ts
  schemaTypes/

  tailwind.config.js
  components.json
  package.json
```

## Flujo de compra

El carrito guarda en el navegador solo qué productos y cuántos. Al abrir el carrito, `/api/checkout` recibe IDs y cantidades, vuelve a cargar el catálogo desde Sanity sin caché y devuelve los precios vigentes, el total y el enlace de WhatsApp con una referencia de pedido (`P-AAMMDD-XXXX`). El navegador nunca decide el precio: si alguien altera el carrito guardado, el mensaje sale con los datos del servidor. Los productos agotados o con cantidad excesiva se marcan para que el comprador los corrija.

El botón **Enviar pedido por WhatsApp** abre una pestaña nueva y no envía el mensaje automáticamente. El mensaje incluye el encabezado, la referencia, nombre, precio unitario, cantidad e imagen de cada producto, y el total calculado en enteros de centavos. Según los términos, el mensaje es una *solicitud*: la compra queda confirmada cuando el comerciante responde con disponibilidad, precio final, envío y forma de pago, y el cliente acepta.

Se limita el pedido a 50 productos distintos y hasta 99 unidades por línea, respetando la cantidad máxima por pedido definida en el panel. No hay pasarela de pago, cuentas de cliente ni registro automático de pedidos.

## Páginas legales, cookies y reclamos

- `/legal/terminos`, `/legal/privacidad`, `/legal/cookies`, `/legal/envios`, `/legal/cambios-y-devoluciones`, `/legal/garantia`, `/legal/reclamos` y `/contacto`. La fecha de revisión está en `LEGAL_UPDATED_AT` (`src/lib/site.ts`).
- **Cookies:** el sitio solo usa almacenamiento técnico (`tenis-cart-usd-v4` para el carrito y `tm-consent` para la preferencia). El banner permite aceptar, rechazar o configurar, y se reabre desde «Preferencias de cookies» en el footer. Cualquier herramienta analítica o publicitaria futura debe envolverse en `<ConsentGate category="analytics">` (o `"marketing"`) y declararse en la política de cookies; si cambian las categorías, sube `CONSENT_VERSION` en `src/lib/consent.ts`.
- **Reclamos:** el formulario genera en el navegador un comprobante con número (`R-AAMMDD-XXXX`) y fecha, como pide el reglamento de la Ley 842. No envía datos al servidor: el cliente lo imprime o lo envía por WhatsApp.

## Despliegue

Ver [`frontend/DEPLOY-CLOUDFLARE.md`](frontend/DEPLOY-CLOUDFLARE.md) (Cloudflare Workers con OpenNext). Nada se publica sin ejecutar `npm run cf:deploy` con acceso a la cuenta.

## Verificación

```powershell
npm run check          # TypeScript + ESLint + pruebas
npm run test:db        # conexión real con Sanity
npm run build
npm start
npm run check:launch   # datos y configuración pendientes para publicar
npm run cf:build       # build para Cloudflare Workers (no publica)
```

`test:db` carga `.env.local`, comprueba un payload con dos productos y conecta a Sanity. Sin `SANITY_PROJECT_ID` devuelve código 2 y un diagnóstico explícito. Un error de API o catálogo sin productos disponibles devuelve código 1.

Las pruebas cubren normalización, payload, cantidades, moneda, URLs, total, verificación de precios en el servidor, consentimiento, reclamos y robots. Si Sanity falla, la tienda muestra un error en lugar de productos ficticios.

## Diseño y recursos

Paleta completa en `tailwind.config.js`. Las tipografías (Anton, Barlow Condensed, Barlow e Inter) se descargan al compilar con `next/font` y se sirven desde el propio sitio: el navegador del visitante no contacta a Google Fonts. Carrusel Motion con tres imágenes, controles, pausa y respeto a movimiento reducido; menú móvil con foco y cierre gestionados por Radix. 

Fotografías de ejemplo bajo licencia Unsplash:
- Nicholas Ismael Martinez: https://unsplash.com/photos/LsmKRNXnyyA
- Taylor Friehl: https://unsplash.com/photos/6-ThuNXhuhY
- Marcus Clark: https://unsplash.com/photos/FMMEpT61n0c

Referencia técnica: https://www.sanity.io/docs/groq

Antes de publicar, revisa `docs/INFORME-AUDITORIA-LANZAMIENTO.md` y ejecuta `npm run check:launch`.
