# Sistema visual · Tenis de Mesa

## Propósito

Tienda nicaragüense de tenis de mesa. La identidad combina azul marino y blanco con ilustraciones de producto. El recorrido principal es explorar categorías o filtrar el catálogo, revisar un producto y coordinar el pedido por WhatsApp. Los productos de demostración se identifican como tales hasta sustituirlos por inventario real.

## Color

| Rol | Valor | Uso |
| --- | --- | --- |
| Azul principal | `#0A1F44` | Header, banners, footer, títulos |
| Blanco | `#FFFFFF` | Fondo, superficies, texto sobre azul |
| Azul eléctrico | `#1E4BFF` | Acción principal y foco |
| Azul de texto secundario | `#285486` | Énfasis y enlaces sobre blanco |
| Azul claro | `#A9CFFF` | Detalles sobre azul marino |
| Superficie secundaria | `#F4F8FC` | Filtros y hero |
| Borde | `#DCE6F2` | Campos y separadores funcionales |

El rojo se reserva para los productos que lo necesitan visualmente, como gomas y raquetas. Sobre blanco, `#0A1F44` ofrece contraste 16.25:1; `#1E4BFF`, 5.99:1; `#285486`, 7.77:1. `#A9CFFF` se usa sobre el azul marino, no como texto sobre blanco.

## Tipografía y espacio

- Barlow Condensed para titulares y nombres de producto; Inter para lectura y controles.
- Texto principal: 16 px; etiquetas de formularios: 14 px; objetivos táctiles: 44 × 44 px como mínimo.
- Contenedor: máximo 1320 px, con margen interior de 20 px en móvil y 40 px desde 768 px.
- Tarjetas de categorías: radio 24 px; ilustración centrada con desplazamiento vertical de 16 px; el objeto conserva espacio interno.

## Adaptación

- Desde 640 px, los filtros pueden distribuirse en dos columnas.
- Desde 768 px, la ficha de producto pasa a dos columnas y aumentan los espacios de la cuadrícula.
- Desde 1024 px, las categorías pasan a cuatro columnas, aparece la navegación horizontal y el carrito muestra resumen al lado.
- Desde 1280 px, el formulario de filtros se presenta en una fila.
- Las animaciones de hover solo se aplican con puntero fino; `prefers-reduced-motion` reduce movimiento decorativo.

## Componentes

Los tokens se implementan en `frontend/tailwind.config.js` y los patrones responsivos en `frontend/src/app/globals.css`. Las cuatro vistas comparten encabezado, pie, botones, foco visible y superficies: portada, tienda, detalle de producto y carrito.
