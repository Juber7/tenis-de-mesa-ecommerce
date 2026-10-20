# Portada · cartel deportivo

Dirección solicitada: cartel constructivista con tarjetas comerciales redondeadas, paleta e ilustraciones existentes. Implementación en `frontend/src/app/page.tsx`, `frontend/src/components/hero.tsx` y bloque Home de `frontend/src/app/globals.css`.

- Primer bloque: titular a la izquierda, banda eléctrica a −4°; constelación enlazada de raqueta, pelotas y gomas a la derecha, sobre disco azul claro y diagonal marina a −30°. Búsqueda al pie.
- Secuencia: cartel y búsqueda → ocho categorías → panel marino con tres pasos para preparar la consulta por WhatsApp. Mantener el aviso existente de catálogo local.
- Desde 1024 px: cartel de dos columnas, titular `clamp(64px, 7.6vw, 100px)`, categorías de cuatro columnas con separación de 20 px, tarjetas de 28 px.
- Entre 768 y 1023 px: titular `clamp(58px, 7.5vw, 82px)`, ilustraciones más compactas, dos columnas de categorías.
- Bajo 768 px: texto seguido de ilustraciones, titular `clamp(58px, 13.5vw, 88px)`, categorías de dos columnas con separación de 12 px, radios de 24 px y panel de compra en una columna. Ocultar descripciones de tarjetas, conservar nombres.
- Foco: eléctrico sobre superficies claras; azul claro dentro del panel marino de compra. Buscador con contorno del grupo al recibir foco.
- Movimiento: elevación y giro de tarjetas solo con hover y puntero fino; reducción de movimiento global vigente.

Imágenes preexistentes de `frontend/public/category-art`, sin imágenes nuevas ni modificaciones. Estos patrones pertenecen a la portada; no sustituyen las reglas de tienda, detalle o carrito.
