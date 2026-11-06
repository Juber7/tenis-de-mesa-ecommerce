# Informe de auditoría y preparación para el lanzamiento — Tenis de Mesa

Fecha: 5 de noviembre de 2026 · Rama: `launch-audit` (sin confirmar ni publicar) · Alcance: código del repositorio, servicios públicos verificables y legislación nicaragüense aplicable.

Clasificación usada: **IMPLEMENTADO Y VERIFICADO** · **IMPLEMENTADO, PENDIENTE DE VERIFICACIÓN** · **PENDIENTE DE CONFIGURACIÓN EXTERNA** · **PENDIENTE DE INFORMACIÓN DEL COMERCIANTE** · **PENDIENTE DE REVISIÓN LEGAL** · **NO IMPLEMENTADO**.

> Este informe no es asesoría jurídica. Los textos legales se redactaron a partir de fuentes oficiales, pero deben ser revisados por un abogado en Nicaragua antes de publicarse.

---

## 1. Resumen ejecutivo del estado inicial

La tienda funcionaba bien como catálogo: Next.js 16 con productos administrados en Sanity, carrito local y cierre de venta por WhatsApp. **No estaba lista para publicarse**:

- **Crítico:** el carrito armaba el mensaje de WhatsApp con los precios guardados en el navegador. Existía un endpoint de verificación en el servidor (`/api/checkout`), pero no se usaba. Comprobado: al alterar el carrito, el pedido salió por **$0.01**.
- **Crítico:** no existía ninguna página legal, ni términos, ni canal de reclamos.
- **Alto:**
  - No había encabezados de seguridad.
  - Las fichas de producto no tenían título, descripción ni imagen propios, de modo que al compartirlas en WhatsApp se veía el logo genérico.
  - Faltaban sitemap, robots y URLs canónicas.
  - Había una dependencia con vulnerabilidad alta (zod 3).
  - No había configuración de despliegue para Cloudflare.
- **Medio:**
  - Las fuentes se cargaban desde Google, lo que bloqueaba el renderizado y enviaba la IP del visitante a un tercero.
  - No había consentimiento de cookies.
  - El CLS de la portada era alto.
- **Externo:** el dominio `tenisdemesani.com` **no está registrado** (DNS NXDOMAIN y RDAP 404 el 5-nov-2026). En el navegador integrado no había sesión iniciada ni en Cloudflare ni en Sanity, así que no pude inspeccionar esos paneles.

**Estado actual:** las correcciones técnicas están implementadas y probadas. El lanzamiento depende de cuatro cosas:

1. Datos que solo el comerciante puede aportar.
2. Una decisión legal sobre la **moneda de los precios** (ver §11).
3. La revisión de un abogado.
4. La configuración de Cloudflare, que requiere la cuenta del cliente y un pago.

## 2. Arquitectura y tecnologías identificadas

| Capa | Tecnología | Observaciones |
|---|---|---|
| Frontend y servidor | Next.js 16.4.5 (App Router, webpack), React 19, TypeScript estricto | Se actualizó de 16.4.3 a 16.4.5, versión mínima que exige el adaptador de Cloudflare |
| Estilos | Tailwind 3 y CSS propio (estilo "poster") | Identidad conservada; los estilos nuevos están en `src/app/legal.css` |
| Estado | Zustand, persistido en localStorage | El carrito guarda solo productos y cantidades; los precios se verifican en el servidor |
| Contenido | Sanity: proyecto `3609i2j4`, dataset `production` público de solo lectura, Studio v6 | Consultas GROQ desde el servidor, sin tokens en el frontend |
| API | `POST /api/checkout` | Única ruta dinámica con datos; validación con zod 4 |
| Pedidos | Enlace `wa.me` al **+505 8817 4072** | Número definido en un solo lugar: `src/lib/contact.ts` |
| Base de datos y cuentas | No existen | No se guardan datos de clientes en el sitio |
| Pasarela de pago | No existe | El pago se acuerda por WhatsApp |
| Hosting previsto | Cloudflare Workers con OpenNext | Configuración preparada y probada en local; no desplegada |

## 3. Problemas encontrados durante la auditoría

| # | Problema | Riesgo | Prioridad | Estado |
|---|---|---|---|---|
| 1 | Carrito con precios del navegador; `/api/checkout` sin uso | Pedidos con precios viejos o manipulados | Crítico | IMPLEMENTADO Y VERIFICADO |
| 2 | Sin páginas legales ni canal de reclamos | Incumplir las leyes 842 y 787 y su reglamento | Crítico | IMPLEMENTADO; PENDIENTE DE REVISIÓN LEGAL e INFORMACIÓN DEL COMERCIANTE |
| 3 | Precios publicados solo en USD | Ley 842, arts. 10.4, 23.4 y 117.11; Ley 732, art. 36 | Crítico (legal) | PENDIENTE DE REVISIÓN LEGAL |
| 4 | Sin encabezados de seguridad (CSP, HSTS, X-Frame-Options…) | Clickjacking, menor defensa ante XSS | Alto | IMPLEMENTADO Y VERIFICADO |
| 5 | Ficha de producto sin metadatos propios | SEO débil; vista previa genérica en WhatsApp | Alto | IMPLEMENTADO Y VERIFICADO |
| 6 | Sin sitemap, robots, canónicas ni `noindex` en carrito y filtros | Indexación deficiente y contenido duplicado | Alto | IMPLEMENTADO Y VERIFICADO |
| 7 | zod 3 (vulnerabilidad alta), postcss-selector-parser (moderada) | Vulnerabilidades conocidas | Alto | IMPLEMENTADO Y VERIFICADO (0 vulnerabilidades en dependencias de producción) |
| 8 | Sin configuración para Cloudflare | No se podía publicar en la infraestructura prevista | Alto | IMPLEMENTADO Y VERIFICADO en local; PENDIENTE DE CONFIGURACIÓN EXTERNA |
| 9 | Google Fonts por `@import` | Bloquea el renderizado; envía la IP a Google | Medio | IMPLEMENTADO Y VERIFICADO |
| 10 | Sin consentimiento de cookies | Requisito del proyecto | Medio | IMPLEMENTADO Y VERIFICADO |
| 11 | La API leía el cuerpo completo antes de limitarlo, respondía 422 ante JSON inválido y no exigía Content-Type | Abuso o consumo de cuota de Sanity | Medio | IMPLEMENTADO Y VERIFICADO; el límite de peticiones queda PENDIENTE DE CONFIGURACIÓN EXTERNA |
| 12 | Footer oculto por completo en la portada | Sin enlaces legales en la página principal | Medio | IMPLEMENTADO Y VERIFICADO |
| 13 | CLS de 0.15–0.22 por el esqueleto de carga raíz y las fuentes | Core Web Vitals | Medio | IMPLEMENTADO Y VERIFICADO |
| 14 | README con otro número (50589415416) y variable `NEXT_PUBLIC_WHATSAPP_NUMBER` sin uso | Confusión al configurar | Bajo | IMPLEMENTADO Y VERIFICADO |
| 15 | Tarjetas del catálogo con imágenes de 1200 px | Datos móviles desperdiciados | Bajo | IMPLEMENTADO Y VERIFICADO |
| 16 | Sin linter | Requisito de pruebas | Bajo | IMPLEMENTADO Y VERIFICADO |
| 17 | Saludo de WhatsApp calculado al compilar en páginas estáticas | Saludo incorrecto según la hora | Bajo | IMPLEMENTADO Y VERIFICADO |
| 18 | Studio: 19 avisos de `npm audit` en herramientas del CLI de Sanity | Afectan la compilación, no el navegador | Bajo | NO IMPLEMENTADO (sin corrección compatible publicada) |

Lo que ya funcionaba y no se reconstruyó: cálculo en centavos, filtros y paginación, catálogo con caché de 60 s, estados de carga y error, y el diseño. El dataset de Sanity no expone borradores: lo comprobé consultando sin autenticación, con 0 borradores accesibles y solo documentos de tipo `product` e imágenes.

## 4. Cambios implementados

**Compra y carrito**
- `cart-view.tsx`: el carrito consulta `/api/checkout` (con espera de 250 ms y cancelación) y muestra los precios verificados. El enlace de WhatsApp lo genera el servidor. Marca productos agotados o con cantidad excesiva y ofrece «Ajustar» y «Reintentar». También sincroniza el carrito guardado con los datos frescos.
- `checkout.ts`: informa **todos** los problemas del carrito con su motivo y añade una **referencia de pedido** `P-AAMMDD-XXXX` al mensaje (Ley 842, art. 82.3).
- `route.ts`: exige Content-Type JSON (415), lee como máximo 10 KB sin cargar todo el cuerpo (413), devuelve 400 ante JSON inválido, 409 ante problemas del carrito y 503 genérico si Sanity falla, sin exponer detalles internos.
- Botones renombrados para no prometer una compra cerrada: «Enviar pedido por WhatsApp» y «Pedir directamente por WhatsApp». Se añadieron avisos sobre cuándo queda confirmada la compra, con enlaces a términos, envíos y garantía.
- Los productos sin foto ya pueden pedirse: se omite la línea de imagen.

**Contacto e identidad del comercio**
- `src/lib/site.ts` (`BUSINESS`) concentra los datos del comerciante; los campos sin confirmar quedan en `null` y no se publican. `contact.ts` es la única fuente del número de WhatsApp.
- Componente `ContactLink`: calcula el saludo según la hora de Managua al hacer clic.

**Rendimiento**
- Fuentes alojadas en el propio sitio con `next/font`. Se precargan solo las que aparecen en la primera pantalla y se eliminaron los pesos sin uso.
- Se eliminó la frontera de carga raíz (`loading.tsx`), que retrasaba el LCP y provocaba desplazamientos en las páginas estáticas.
- `srcset` responsivo en las fotos de producto, `preconnect` al CDN de Sanity y tamaños explícitos en las imágenes.
- El banner de cookies viene en el HTML y un script mínimo en `<head>` lo muestra antes del primer pintado. Así deja de ser el elemento LCP tardío.

**Calidad**
- ESLint 9 con `eslint-config-next` (core-web-vitals y TypeScript).
- Corregidos los 3 errores que detectó el linter: `setState` dentro de efectos y JSX dentro de `try/catch`.
- Hidratación del carrito con `useSyncExternalStore`.

**Infraestructura**
- `wrangler.jsonc`, `open-next.config.ts` (caché incremental en KV, compatible con el plan gratuito) y scripts `cf:build`, `cf:preview`, `cf:deploy` y `cf:typegen`.
- Guía de despliegue en `frontend/DEPLOY-CLOUDFLARE.md`.
- `npm run check:launch`: lista lo que falta para publicar.
- Studio actualizado a Sanity 6.22.0 (versión menor); compila.

## 5. Páginas legales creadas

Investigación basada en los textos oficiales de la Asamblea Nacional: Ley 842 y su texto consolidado de 2021, Reglamento (Decreto 36-2013), Ley 787 y Reglamento (Decreto 36-2012), Ley 729, Código Civil (edición 2019), Código de Comercio, Ley 732, Ley 822 y Código Tributario. Se consultaron también la página de DIPRODEC del MIFIC y el sitio de CargoTrans. La ausencia de un plazo legal mínimo de garantía para artículos deportivos y el estado real de la DIPRODAP se señalan como inciertos.

| Página | Contenido clave | Estado |
|---|---|---|
| `/legal/terminos` | Precios finales con impuestos; tipo de cambio del BCN; el precio confirmado no supera el publicado (Ley 842, arts. 10.4 y 26); el pedido por WhatsApp es una **solicitud** y la venta se perfecciona cuando el cliente acepta las condiciones confirmadas (Código Civil, arts. 2449 y 2540); devolución inmediata de anticipos (art. 9.13); retracto de 5 días hábiles (art. 81); reclamos en 10 días hábiles (art. 100); DIPRODEC; sin arbitraje obligatorio | PENDIENTE DE REVISIÓN LEGAL; medios de pago PENDIENTE DE INFORMACIÓN DEL COMERCIANTE |
| `/legal/privacidad` | Datos realmente tratados (el sitio no tiene base de datos); finalidades; fundamento (Ley 787, art. 6); terceros (WhatsApp/Meta, Cloudflare, Sanity, CargoTrans); WhatsApp comercial solo con consentimiento y en horario laboral (Ley 842, art. 25); derechos ARCO con plazos de 10 y 5 días hábiles (arts. 17 y 19); procedimiento gratuito; conservación | PENDIENTE DE REVISIÓN LEGAL; almacenamiento de facturas PENDIENTE DE INFORMACIÓN DEL COMERCIANTE |
| `/legal/cookies` | Inventario real (`tenis-cart-usd-v4`, `tm-consent`); posibles cookies de seguridad de Cloudflare; ninguna analítica ni publicitaria; cómo cambiar la decisión | IMPLEMENTADO Y VERIFICADO |
| `/legal/envios` | IND y puntos céntricos de Managua gratis; CargoTrans según su tarifa y cobertura, informada antes de confirmar; el riesgo del transporte lo asume el comerciante (art. 116.12) | Puntos, horarios y quién paga CargoTrans: PENDIENTE DE INFORMACIÓN DEL COMERCIANTE |
| `/legal/cambios-y-devoluciones` | Separa los **derechos legales irrenunciables** de la **política comercial**; procedimiento; 30 días como máximo en garantía; sin obligar a aceptar notas de crédito | Seminuevos, reembolso y envío del retracto: PENDIENTE DE INFORMACIÓN DEL COMERCIANTE y DE REVISIÓN LEGAL |
| `/legal/garantia` | Cambio si hay existencias y, si no, devolución y reembolso; gratis, transporte incluido; renovación del plazo al reponer; exoneración solo por los motivos del art. 48; contenido del documento de garantía (art. 40) | **Plazo de garantía: PENDIENTE DE INFORMACIÓN DEL COMERCIANTE** (no se inventó) |
| `/legal/reclamos` | Formulario que genera un comprobante con número `R-AAMMDD-XXXX` y fecha, con los campos del Reglamento (arts. 51-52). No envía datos al servidor: se imprime o se envía por WhatsApp | IMPLEMENTADO Y VERIFICADO; PENDIENTE DE REVISIÓN LEGAL sobre si este canal basta como «sistema comprobable» |
| `/contacto` | WhatsApp, redes, datos del comercio y enlaces útiles | Dirección, RUC, correo y horario: PENDIENTE DE INFORMACIÓN DEL COMERCIANTE |

Los datos no confirmados aparecen en el sitio resaltados en amarillo y `npm run check:launch` los lista (9 marcadores y la dirección física).

## 6. Mejoras de seguridad

| Requisito | Estado |
|---|---|
| CSP restrictiva (`default-src 'self'`, imágenes solo del sitio y de cdn.sanity.io, `frame-ancestors 'none'`, `object-src 'none'`, `form-action 'self'`) | IMPLEMENTADO Y VERIFICADO en producción local y en el Worker. Usa `'unsafe-inline'` en scripts porque Next.js inserta scripts en línea en las páginas estáticas; los nonces obligarían a renderizar todo de forma dinámica |
| HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy y COOP | IMPLEMENTADO Y VERIFICADO (el iframe de prueba fue bloqueado) |
| `X-Robots-Tag: noindex` en la API; sin `X-Powered-By` | IMPLEMENTADO Y VERIFICADO |
| Validación en frontend y backend; precios calculados en el servidor | IMPLEMENTADO Y VERIFICADO (pruebas automáticas y manipulación manual del carrito) |
| SQL injection | No aplica: no hay base de datos SQL. GROQ con consulta fija; los IDs se filtran en memoria tras validarlos con una expresión regular |
| XSS | React escapa el contenido; JSON-LD con `<` escapado; mensajes y reclamos limpios de caracteres de control |
| CSRF | El único endpoint no tiene efectos secundarios ni sesión y exige JSON, lo que obliga a una verificación CORS previa que nunca se concede |
| Fuerza bruta, sesiones y rutas privadas | No aplica: no hay inicio de sesión ni rutas privadas en la tienda. El acceso administrativo es el de Sanity |
| Spam en formularios | El formulario de reclamos no envía nada al servidor; no hay vía de spam hacia la tienda |
| Subida de archivos | No aplica: las imágenes se suben en Sanity Studio, con autenticación de Sanity |
| Errores sin información sensible | IMPLEMENTADO Y VERIFICADO (503 genérico; prueba automática) |
| Secretos | No hay secretos en el repositorio: `.env*` está ignorado y el ID de Sanity es público. No hay tokens en el frontend |
| Límite de peticiones en `/api/checkout` | PENDIENTE DE CONFIGURACIÓN EXTERNA (regla de Cloudflare documentada) |
| Dependencias | 0 vulnerabilidades en producción. Quedan 8 moderadas en ESLint (solo desarrollo) y 19 en el CLI de Sanity (dependen de que Sanity publique una corrección) |

**Administración y respaldos:** PENDIENTE DE CONFIGURACIÓN EXTERNA. Hay que revisar los miembros de Sanity y activar la verificación en dos pasos tanto en el proveedor de acceso de Sanity como en Cloudflare. El procedimiento de respaldo (exportación mensual del dataset y vuelta atrás de versiones en Workers) está documentado en `DEPLOY-CLOUDFLARE.md` §8.

## 7. Configuración de Cloudflare y servicios externos

| Servicio | Lo verificado | Estado |
|---|---|---|
| Dominio `tenisdemesani.com` | No registrado (NXDOMAIN y RDAP 404) | PENDIENTE DE CONFIGURACIÓN EXTERNA (compra autorizada por el propietario) |
| Cloudflare | Panel no inspeccionado: pide inicio de sesión y no introduzco contraseñas. El Worker compila y funciona en local | PENDIENTE DE CONFIGURACIÓN EXTERNA |
| Sanity, API pública | El dataset solo expone `product` e imágenes y no expone borradores | IMPLEMENTADO Y VERIFICADO |
| Sanity Studio | Publicado con HTTPS y HSTS en `tenis-de-mesa-leandro.sanity.studio` | Miembros, permisos y verificación en dos pasos: PENDIENTE DE CONFIGURACIÓN EXTERNA |
| Cobros | No hay pasarela; el pago se acuerda por WhatsApp | PENDIENTE DE INFORMACIÓN DEL COMERCIANTE |
| CargoTrans | Su sitio oficial no publica tarifas, tiempos, cobertura exacta ni condiciones de la póliza | PENDIENTE DE INFORMACIÓN DEL COMERCIANTE |

No se compró nada, no se cambió DNS, no se publicó el sitio ni se envió ningún mensaje real.

## 8. Mejoras SEO

| Requisito | Estado |
|---|---|
| Títulos y descripciones únicos (catálogo, cada categoría, cada producto, páginas legales, contacto) | IMPLEMENTADO Y VERIFICADO (16 URLs revisadas) |
| URL canónica por página; `noindex, follow` en búsqueda, orden y paginación; `noindex` en carrito y 404 | IMPLEMENTADO Y VERIFICADO |
| `sitemap.xml` dinámico desde Sanity (53 URLs, con imágenes de producto) | IMPLEMENTADO Y VERIFICADO |
| `robots.txt`: indexa solo con dominio HTTPS y bloquea copias locales o de prueba | IMPLEMENTADO Y VERIFICADO (prueba automática con el dominio de producción) |
| Open Graph y Twitter en todas las páginas; foto del producto (1200×630 JPG) para WhatsApp | IMPLEMENTADO Y VERIFICADO en el HTML. La vista previa real en WhatsApp queda PENDIENTE DE VERIFICACIÓN tras publicar |
| Schema.org: `Store` en la portada; `Product`, `Offer` y `BreadcrumbList` en cada producto, con condición «usado» para seminuevos | IMPLEMENTADO Y VERIFICADO (JSON-LD válido); prueba con la herramienta de resultados enriquecidos de Google PENDIENTE DE VERIFICACIÓN |
| Imágenes WebP/AVIF | Fotos de producto: CDN de Sanity con `auto=format` y tamaños responsivos. Imágenes de categoría: `next/image` (WebP comprobado en el Worker) |
| Lazy loading, fuentes optimizadas, 404 propia | IMPLEMENTADO Y VERIFICADO |
| Google Search Console | Soporte para la variable `GOOGLE_SITE_VERIFICATION` o verificación por DNS. **No está verificado**: PENDIENTE DE CONFIGURACIÓN EXTERNA |

## 9. Resultados de las pruebas

| Prueba | Resultado |
|---|---|
| `npm run typecheck` | ✔ sin errores |
| `npm run lint` (ESLint) | ✔ 0 problemas (había 3 errores y 4 avisos) |
| `npm test` | ✔ **28/28**. Antes había 16; se añadieron pruebas de checkout en el servidor, consentimiento, referencias, reclamos y robots |
| `npm run test:db` (Sanity real) | ✔ 35 productos publicados, payload y total exactos |
| `npm run build` (producción) | ✔ 52 páginas, 35 productos prerenderizados |
| `opennextjs-cloudflare build` y `wrangler dev --local` | ✔ 11 rutas con 200/404 correctos, API, encabezados, sitemap e imagen WebP |
| Carrito | ✔ Precio manipulado ($0.01) corregido a $34.49 con datos del servidor; agotados y cantidades excesivas detectados (prueba automática) |
| Enlaces de WhatsApp | ✔ Número único `50588174072`, mensaje codificado, referencia de pedido y saludo según la hora de Managua. No se envió ningún mensaje real |
| Formulario de reclamos | ✔ 7 errores mostrados con foco y `aria-invalid`; comprobante generado sin ninguna petición de red |
| Consentimiento de cookies | ✔ Banner en la primera visita; rechazar y aceptar persisten tras recargar; se reabre desde el footer; «necesarias» bloqueada; 0 cookies; 0 peticiones a terceros en la portada |
| Responsive | ✔ Sin desplazamiento horizontal a 375 px en 7 páginas; banner por encima de la barra móvil; footer sin solaparse con el riel a 1280 px. Pruebas en iOS y Android reales: PENDIENTE DE VERIFICACIÓN |
| Lighthouse, móvil simulado (producción local) | Ver tabla |
| HTTPS y redirección HTTP → HTTPS | PENDIENTE DE CONFIGURACIÓN EXTERNA (sin dominio no se puede comprobar) |
| `npm audit` | ✔ 0 en producción; avisos solo en herramientas de desarrollo y en el CLI de Sanity |

| Página | Rendimiento | Accesibilidad | Buenas prácticas | LCP | CLS |
|---|---|---|---|---|---|
| `/` | 99 | 100 | 100 | 0.9 s (antes 4.7 s) | 0.002 (antes 0.218) |
| `/tienda` | 95 | 100 | 100 | 0.8 s (antes 3.7 s) | 0.001 |
| `/producto/dhs-hurricane-3` | 88 | 100 | 100 | 3.4 s | 0.007 (antes 0.15) |
| `/carrito` | 89 | 100 | 100 | 3.4 s | 0.002 |
| `/contacto` | 99 | 100 | 100 | 0.9 s | 0.002 |
| `/legal/privacidad` | 98 | 100 | 100 | 0.9 s | 0.072 |
| `/legal/terminos`, `/legal/reclamos` | 100 | 100 | 100 | 0.9 s | < 0.01 |

En todas las páginas, el SEO de Lighthouse solo falla en `is-crawlable`, por el `robots.txt` local que bloquea la indexación a propósito. Con el dominio HTTPS, la prueba automática confirma que se permite indexar. En producto, el LCP depende de la foto que sirve el CDN de Sanity bajo una red 4G lenta simulada. En el carrito, el contenido se pinta tras la hidratación porque vive en `localStorage`.

## 10. Problemas que siguen pendientes

1. **Datos del comerciante** que no se inventaron:
   - dirección física, RUC, correo y horario de atención;
   - medios de pago;
   - plazo de garantía;
   - punto y horarios de entrega en el IND;
   - lista y condiciones de los puntos céntricos de Managua;
   - quién paga el envío por CargoTrans;
   - plazo y forma de los reembolsos;
   - garantía de los productos seminuevos;
   - dónde se guardan facturas y registros.
2. **Configuración externa:** registrar el dominio, crear el namespace KV, Workers Builds, dominio propio, ajustes de seguridad de la zona, regla de límite de peticiones, DNSSEC, registros SPF/DMARC y Search Console.
3. **Paneles no inspeccionados:** Cloudflare y Sanity (miembros, verificación en dos pasos, tokens y CORS) requieren que inicies sesión.
4. **Ofertas:** la Ley 842 (arts. 27-28) exige indicar el plazo y las condiciones de las promociones. Sanity no tiene un campo de vigencia; se recomienda añadir uno y mostrarlo en la ficha. NO IMPLEMENTADO: cambia el panel de administración y requiere desplegar el Studio.
5. **Vulnerabilidades del CLI de Sanity:** dependen de una versión futura de Sanity.

## 11. Riesgos que requieren atención

1. **Moneda (riesgo legal más importante).** La Ley 842 exige precio final en moneda nacional con impuestos incluidos (arts. 5, 10.4 y 23.4) y califica como infracción grave cobrar en divisas (art. 117.11). La Ley 732 (art. 36) establece que los precios se expresan en córdobas, aunque su art. 37.1 y el art. 9.12 de la Ley 842 admiten acuerdos en divisa al tipo de cambio oficial. Hoy la tienda muestra solo USD. Opciones:
   - (a) Que el comerciante cargue precios en córdobas en Sanity.
   - (b) Mostrar el equivalente en C$ con un tipo de cambio del BCN que el comerciante actualice en Sanity.
   - (c) Mantener USD tras una opinión legal favorable.

   **PENDIENTE DE REVISIÓN LEGAL y decisión del propietario.** La opción (a) o (b) se puede implementar en cuanto se decida.
2. **Retracto:** la ley (art. 81) concede 5 días hábiles; el reglamento (art. 41) lo limita a productos defectuosos o distintos a lo ofrecido. Los términos informan el plazo de la ley, que es la opción más prudente. PENDIENTE DE REVISIÓN LEGAL.
3. **Garantía legal:** no hay un plazo mínimo para artículos deportivos. El plazo debe fijarse por escrito y no puede ser menor al del fabricante (arts. 39-40). Falta saber si el cliente puede elegir el reembolso aunque haya existencias (art. 37.3).
4. **Ley 787:** la DIPRODAP no parece estar operando y el registro de ficheros no existe en la práctica. Falta determinar si usar WhatsApp (Meta) constituye una transferencia internacional (arts. 13-15). PENDIENTE DE REVISIÓN LEGAL.
5. **Obligaciones tributarias:** RUC, régimen (cuota fija o general; los importadores quedan excluidos de la cuota fija, art. 249.2 de la Ley 822), facturación y matrícula municipal en Managua. PENDIENTE DE INFORMACIÓN DEL COMERCIANTE y de un contador.
6. **CSP con `'unsafe-inline'`:** es un compromiso aceptado para mantener las páginas estáticas. Si en el futuro se añaden scripts de terceros, debe revisarse.
7. **Cuota de Sanity:** cada apertura del carrito consulta la API sin caché. Hay que activar la regla de límite de peticiones en Cloudflare y vigilar el uso en sanity.io/manage.
8. **Bot Fight Mode** podría bloquear las vistas previas de WhatsApp: hay que probarlo tras activarlo.

## 12. Acciones manuales que debes completar

1. Enviar al comerciante la lista de datos del §10.1 y rellenar `BUSINESS` en `frontend/src/lib/site.ts` y los textos marcados en amarillo.
2. Consultar a un abogado en Nicaragua sobre los puntos del §11 (moneda, retracto, garantía y protección de datos) antes de publicar.
3. Decidir cómo se mostrarán los precios (§11.1).
4. Con la cuenta del cliente:
   - registrar `tenisdemesani.com` (implica pago);
   - activar la verificación en dos pasos;
   - seguir `frontend/DEPLOY-CLOUDFLARE.md`: KV, Workers Builds, dominio propio, seguridad, límite de peticiones, DNSSEC y SPF/DMARC.
5. En sanity.io/manage: revisar miembros y roles, confirmar que no hay tokens de API innecesarios y activar la verificación en dos pasos en el proveedor de acceso (Google o GitHub).
6. Verificar Search Console y enviar el sitemap.
7. Iniciar sesión en Cloudflare y Sanity en el navegador integrado si quieres que inspeccione esos paneles.
8. Revisar los cambios de la rama `launch-audit`, confirmarlos y abrir un PR.

## 13. Recomendaciones para pasar a producción

1. No publicar hasta que `npm run check:launch` no muestre pendientes bloqueantes y el abogado haya revisado los textos.
2. Desplegar primero en `*.workers.dev`, que no se indexa porque las canónicas apuntan al dominio, y repetir las pruebas del §9 allí. Después, conectar el dominio y desactivar `workers_dev`.
3. Tras publicar: comprobar la redirección a HTTPS, los encabezados, robots y sitemap; compartir un producto por WhatsApp y hacer un pedido de prueba sin enviarlo.
4. Exportar el dataset de Sanity una vez al mes y activar la copia de seguridad de chats de WhatsApp.
5. Añadir el campo de vigencia de ofertas en Sanity antes de usar promociones.
6. Si más adelante se incorporan herramientas de analítica o publicidad, envolverlas en `<ConsentGate>`, declararlas en la política de cookies y subir `CONSENT_VERSION`.
7. Revisar `npm audit` y las actualizaciones de Next.js y Sanity cada mes.
