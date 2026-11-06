# Despliegue en Cloudflare Workers

La tienda se publica como un Worker de Cloudflare mediante el adaptador **OpenNext** (`@opennextjs/cloudflare`). La configuración está en `wrangler.jsonc` y `open-next.config.ts`. **Nada de esta guía se ha ejecutado contra la cuenta de Cloudflare**: cada paso que compra, publica o cambia DNS requiere la autorización del propietario.

Verificado en local (5-nov-2026): `npm run cf:build` genera `.open-next/worker.js` en Windows, y `npx wrangler dev --local` sirve las 11 rutas principales, la API de pedidos, los encabezados de seguridad y la optimización de imágenes (WebP).

## 1. Requisitos (acciones del propietario)

1. Cuenta de Cloudflare a nombre del comerciante, con **verificación en dos pasos** activada (My Profile → Authentication).
2. Dominio `tenisdemesani.com` registrado en Cloudflare Registrar (a 5-nov-2026 **no está registrado**). Implica un pago.
3. Acceso de lectura al repositorio de GitHub para Workers Builds.

## 2. Crear el almacenamiento de caché (KV)

```bash
cd frontend
npx wrangler login
npx wrangler kv namespace create NEXT_INC_CACHE_KV
```

Copia el `id` que devuelve en `wrangler.jsonc` (reemplaza `REEMPLAZAR_CON_EL_ID_DEL_NAMESPACE_KV`). Se eligió KV porque funciona en el plan gratuito; R2 exige registrar un medio de pago.

## 3. Compilar y publicar

**Opción A, Workers Builds (recomendada).** En el panel: Workers & Pages → Create → Import a repository.

- Directorio raíz: `frontend`
- Comando de build: `npx opennextjs-cloudflare build`
- Comando de despliegue: `npx opennextjs-cloudflare deploy`
- Variables de build: `NEXT_PUBLIC_SITE_URL=https://tenisdemesani.com`, `SANITY_PROJECT_ID=3609i2j4`, `SANITY_DATASET=production` y, si se usa, `GOOGLE_SITE_VERIFICATION`. `NEXT_PUBLIC_SITE_URL` **debe** estar en el build: las páginas estáticas, el sitemap y robots se generan al compilar.
- Versión de Node: 22.

**Opción B, desde un equipo.** Con `.env.local` apuntando al dominio HTTPS, ejecuta `npm run cf:deploy`.

Antes de publicar, `npm run check:launch` no debe listar pendientes bloqueantes.

## 4. Dominio

1. Workers & Pages → `tenis-de-mesa` → Settings → Domains & Routes → Add → Custom domain: `tenisdemesani.com` y `www.tenisdemesani.com`. Cloudflare crea los registros DNS y el certificado.
2. Rules → Redirect Rules: redirige `www.tenisdemesani.com/*` a `https://tenisdemesani.com/${1}` con código 301.
3. En `wrangler.jsonc`, cambia `"workers_dev": false` y descomenta `routes`, para que la tienda solo responda en su dominio y no se indexe una copia en `*.workers.dev`.

## 5. Seguridad en el panel de Cloudflare (zona del dominio)

| Ajuste | Dónde | Valor |
|---|---|---|
| Modo SSL | SSL/TLS → Overview | Full (strict) |
| Redirección HTTPS | SSL/TLS → Edge Certificates | Always Use HTTPS: activado |
| TLS mínimo | SSL/TLS → Edge Certificates | 1.2 |
| HSTS | Lo envía la aplicación (`max-age=31536000; includeSubDomains`) | No activar *preload* hasta confirmar que todo subdominio usa HTTPS |
| Reglas administradas | Security → WAF | Cloudflare Free Managed Ruleset (activo por defecto en el plan gratuito) |
| Límite de peticiones | Security → WAF → Rate limiting rules | Ruta igual a `/api/checkout`, método POST: más de 20 peticiones en 10 s por IP → Block. Protege la cuota de la API de Sanity |
| Bots | Security → Bots | Bot Fight Mode: activar y comprobar que la vista previa de un producto en WhatsApp sigue funcionando; si deja de funcionar, desactivarlo |
| DNSSEC | DNS → Settings | Activar |
| Correo | DNS | Si el dominio no envía correo: `TXT @ "v=spf1 -all"`, `TXT _dmarc "v=DMARC1; p=reject"` y un MX nulo (`MX @ 0 .`), para impedir que se suplante el dominio |

Cloudflare protege la red (TLS, DDoS, bots y WAF). La validación de datos, los límites de tamaño, los precios calculados en el servidor y los encabezados CSP los aplica la propia aplicación.

## 6. Google Search Console

1. Añade una propiedad de tipo **Dominio** y verifícala con el registro TXT que indica Google (DNS en Cloudflare). Alternativa: propiedad de prefijo de URL con `GOOGLE_SITE_VERIFICATION` y un nuevo build.
2. Envía `https://tenisdemesani.com/sitemap.xml`.

## 7. Comprobación después de publicar

```bash
curl -sI http://tenisdemesani.com | grep -i location
curl -sI https://tenisdemesani.com | grep -iE "strict-transport|content-security|x-frame"
curl -s https://tenisdemesani.com/robots.txt
curl -s https://tenisdemesani.com/sitemap.xml | head
```

- El primero debe redirigir a `https://`.
- `robots.txt` debe decir `Allow: /` y enlazar el sitemap.
- Comparte un producto por WhatsApp y comprueba que se ve la foto.
- Haz un pedido de prueba sin enviarlo y revisa el total y la referencia.

## 8. Respaldos y recuperación

- **Código:** el repositorio de GitHub. Cualquier versión se vuelve a desplegar con Workers Builds o con `npm run cf:deploy`, y el panel de Workers permite volver a una versión anterior (Deployments → Rollback).
- **Catálogo (Sanity):** exporta el dataset una vez al mes desde `studio/`:

  ```bash
  npx sanity dataset export production respaldo-AAAA-MM.tar.gz
  ```

  Para restaurarlo: `npx sanity dataset import respaldo.tar.gz production --replace`. Esta operación reemplaza datos, así que solo debe hacerse con autorización.
- **Pedidos y conversaciones:** viven en WhatsApp. Activa la copia de seguridad de chats del teléfono del comerciante.

## 9. Límites del plan gratuito

Consúltalos en las páginas de precios de Cloudflare antes de publicar, porque cambian:

- Workers: peticiones diarias.
- KV: lecturas y escrituras diarias. Cada página regenerada escribe en KV.
- Images: transformaciones mensuales para las imágenes locales de categorías.

Las fotos de productos las optimiza el CDN de Sanity y no consumen Cloudflare Images.
