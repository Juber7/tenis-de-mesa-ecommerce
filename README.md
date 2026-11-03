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
NEXT_PUBLIC_WHATSAPP_NUMBER=NUMERO_REAL_CON_CODIGO_DE_PAIS
NEXT_PUBLIC_SITE_URL=https://tu-tienda.example
```

El teléfono debe contener de 8 a 15 dígitos, sin `+`, espacios ni guiones. Reinicia Next.js después de cambiar variables. Los precios proceden de Sanity y se expresan en dólares (USD, $). El acceso de atención personalizada utiliza el número 50589415416 y un saludo según la hora de Nicaragua. Las imágenes deben ser URLs públicas HTTP(S).

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
      loading.tsx
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

El carrito persiste localmente. Sus precios guardados son orientativos. Al preparar un pedido, `/api/checkout` recibe únicamente IDs y cantidades y vuelve a cargar el catálogo sin caché. Rechaza productos no disponibles, cantidades excesivas y monedas mezcladas. El comprador revisa el total actualizado antes de abrir WhatsApp con el botón **Confirmar Pedido por WhatsApp**. El enlace abre una pestaña nueva mediante una acción directa del usuario y no envía el mensaje automáticamente ni vacía el carrito.

El mensaje incluye el encabezado solicitado, nombre, precio unitario, cantidad y URL de imagen por producto, y el total calculado. Los cálculos emplean enteros en la unidad menor de la moneda. WhatsApp controla las previsualizaciones y puede no mostrar una por cada imagen. El total no incluye envío ni ajustes que Leandro deba confirmar.

Esta versión permite añadir productos simples. Los productos con variantes se muestran pero no pueden añadirse sin seleccionar una variante; el selector de variantes está fuera de esta implementación. Se limita el pedido a 50 productos distintos y hasta 99 unidades por línea, respetando la cantidad máxima por pedido definida en el panel. No hay pasarela de pago, cuentas de cliente ni registro automático de pedidos.

## Verificación

```powershell
npm run typecheck
npm test
npm run test:db
npm run build
npm start
```

`test:db` carga `.env.local`, comprueba un payload con dos productos y conecta a Sanity. Sin `SANITY_PROJECT_ID` devuelve código 2 y un diagnóstico explícito. Un error de API o catálogo sin productos disponibles devuelve código 1.

El proyecto incluye pruebas de normalización, payload, cantidades, moneda, URLs y total. El catálogo utiliza una caché de 60 segundos; la preparación del pedido usa `no-store` y timeout. Si Sanity falla, la tienda muestra un error en lugar de productos ficticios.

## Diseño y recursos

Paleta completa en `tailwind.config.js`, tipografías Inter y Barlow Condensed mediante Google Fonts. Carrusel Motion con tres imágenes, controles, pausa y respeto a movimiento reducido; menú móvil con foco y cierre gestionados por Radix. Es necesario acceso a Google Fonts y al CDN de Unsplash para esos recursos; hay fuentes de sistema de respaldo.

Fotografías de ejemplo bajo licencia Unsplash:
- Nicholas Ismael Martinez: https://unsplash.com/photos/LsmKRNXnyyA
- Taylor Friehl: https://unsplash.com/photos/6-ThuNXhuhY
- Marcus Clark: https://unsplash.com/photos/FMMEpT61n0c

Referencia técnica: https://www.sanity.io/docs/groq

Antes de publicar, confirma las condiciones de venta, configura el número de WhatsApp y ejecuta la prueba de conexión.
