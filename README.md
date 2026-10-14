# Tenis de Mesa · Leandro

Tienda headless local construida con Next.js App Router, TypeScript estricto, Tailwind CSS, Motion, componentes shadcn/ui basados en Radix y Zustand. Catálogo público de WooCommerce; cierre de venta manual por WhatsApp.

## WordPress local integrado

Ya existe `backend/` con WordPress.org y WooCommerce persistentes. Para abrir el proyecto completo usa **Iniciar tienda.cmd** o ejecuta `npm run dev` desde esta carpeta. La guía para entrar al panel, editar productos y guardar una copia está en [backend/LEEME.md](backend/LEEME.md).

Si estás en la carpeta exterior `tenis-de-mesa-ecomerce` (la que abre este proyecto en Codex), también puedes ejecutar `npm run dev` allí. Su `package.json` inicia esta aplicación y detecta si los servidores ya estaban abiertos.

La conexión del frontend está en `.env.local`, apunta a `http://127.0.0.1:9400` y mantiene `LOCAL_CATALOG=true` para bloquear pedidos de los productos de práctica. Esta configuración local no equivale a una publicación en internet.

## Iniciar

Requiere Node.js 20.9 o superior y npm.

```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
npm run dev
```

Abre http://localhost:3000. Sin `WOOCOMMERCE_URL`, se activa un catálogo de ejemplo identificado y se bloquea el envío de pedidos reales. Las fotografías ilustrativas no representan productos disponibles de Leandro.

## Configuración real

En `frontend/.env.local` configura:

```dotenv
WOOCOMMERCE_URL=https://tu-wordpress.example
NEXT_PUBLIC_WHATSAPP_NUMBER=NUMERO_REAL_CON_CODIGO_DE_PAIS
NEXT_PUBLIC_SITE_URL=https://tu-tienda.example
```

El teléfono debe contener de 8 a 15 dígitos, sin `+`, espacios ni guiones. Reinicia Next.js después de cambiar variables. La moneda, cantidad de decimales y precios proceden de WooCommerce; el catálogo local y la demostración utilizan córdobas (NIO, C$), conservando los importes sin conversión de divisas. El acceso de atención personalizada utiliza el número 50589415416 y un saludo según la hora de Nicaragua. Las imágenes deben ser URLs públicas HTTP(S).

La Store API pública no necesita claves de administrador. Las consultas se realizan desde el servidor hacia `/wp-json/wc/store/v1/products`; no se exponen credenciales. Los filtros usan `search`, `category`, `on_sale`, `orderby`, `order` y `page`. Las categorías sugeridas usan los slugs `paletas`, `pelotas`, `accesorios`; ajusta los enlaces si tu catálogo utiliza otros.

## WPVibe

WPVibe es una herramienta de administración de WordPress, no una dependencia de ejecución del frontend. Al inspeccionar la cuenta no había sitios conectados. Para completar la integración:

1. Proporciona la URL de WordPress y conecta el sitio mediante la autorización de WPVibe. No compartas contraseñas en el chat.
2. Usa `site_info` para verificar conexión y WooCommerce activo.
3. Consulta el endpoint público con `rest_api` y confirma precios, monedas, imágenes, slugs y límites de cantidad.
4. Si se requieren campos adicionales, inspecciona primero las capacidades y registra extensiones con las APIs oficiales de WooCommerce. No se necesitan hooks personalizados para este alcance.

Se instaló un WordPress local en `backend/`. No se ha conectado aún a WPVibe ni se ha publicado en internet. No se crean pedidos WooCommerce ni se reserva stock: la confirmación comercial ocurre con Leandro.

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
      woocommerce.ts
      whatsapp.ts
      checkout.ts
      demo.ts
      utils.ts
    store/cart.ts
    types/product.ts
  scripts/test-db.ts
  tests/
  tailwind.config.js
  components.json
  package.json
```

## Flujo de compra

El carrito persiste localmente. Sus precios guardados son orientativos. Al preparar un pedido, `/api/checkout` recibe únicamente IDs y cantidades y vuelve a cargar el catálogo sin caché. Rechaza productos no disponibles, cantidades excesivas y monedas mezcladas. El comprador revisa el total actualizado antes de abrir WhatsApp con el botón **Confirmar Pedido por WhatsApp**. El enlace abre una pestaña nueva mediante una acción directa del usuario y no envía el mensaje automáticamente ni vacía el carrito.

El mensaje incluye el encabezado solicitado, nombre, precio unitario, cantidad y URL de imagen por producto, y el total calculado. Los cálculos emplean enteros en la unidad menor de la moneda. WhatsApp controla las previsualizaciones y puede no mostrar una por cada imagen. El total no incluye envío ni ajustes que Leandro deba confirmar.

Esta versión permite añadir productos simples. Los productos con variantes se muestran pero no pueden añadirse sin seleccionar una variante; el selector de variantes está fuera de esta implementación. Se limita el pedido a 50 productos distintos y hasta 99 unidades por línea, respetando el máximo publicado por WooCommerce. No hay pasarela de pago, cuentas de cliente ni registro automático de pedidos.

## Verificación

```powershell
npm run typecheck
npm test
npm run test:db
npm run build
npm start
```

`test:db` carga `.env.local`, comprueba un payload con dos productos y conecta a la API real. Sin URL devuelve código 2 y un diagnóstico explícito; nunca considera la demostración una prueba de conexión. Un error de API o catálogo sin productos disponibles devuelve código 1.

El proyecto incluye pruebas de normalización, payload, cantidades, moneda, URLs y total. El catálogo utiliza una caché de 60 segundos; la preparación del pedido usa `no-store` y timeout. Los errores del backend no se sustituyen silenciosamente por productos ficticios.

## Diseño y recursos

Paleta completa en `tailwind.config.js`, tipografías Inter y Barlow Condensed mediante Google Fonts. Carrusel Motion con tres imágenes, controles, pausa y respeto a movimiento reducido; menú móvil con foco y cierre gestionados por Radix. Es necesario acceso a Google Fonts y al CDN de Unsplash para esos recursos; hay fuentes de sistema de respaldo.

Fotografías de ejemplo bajo licencia Unsplash:
- Nicholas Ismael Martinez: https://unsplash.com/photos/LsmKRNXnyyA
- Taylor Friehl: https://unsplash.com/photos/6-ThuNXhuhY
- Marcus Clark: https://unsplash.com/photos/FMMEpT61n0c

Referencia técnica: https://developer.woocommerce.com/docs/apis/store-api/resources-endpoints/products/

Antes de publicar, sustituye el catálogo ilustrativo por el catálogo real, confirma la moneda y las condiciones de venta, configura el número de WhatsApp y ejecuta la prueba de conexión.
