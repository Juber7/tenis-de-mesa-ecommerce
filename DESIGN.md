---
name: Tenis de Mesa
description: Identidad azul e ilustrada; portada con cartel deportivo y tarjetas suaves.
colors:
  navy: "#0A1F44"
  white: "#FFFFFF"
  electric: "#1E4BFF"
  secondary-text: "#285486"
  pale-blue: "#A9CFFF"
  surface: "#F4F8FC"
  border: "#DCE6F2"
  muted: "#60718A"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(64px, 7.6vw, 100px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "16px"
  home-title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "27px"
    fontWeight: 600
    lineHeight: 1.1
rounded:
  card: "24px"
  home-card: "28px"
  pill: "999px"
spacing:
  compact: "12px"
  mobile-gutter: "20px"
  card: "24px"
  desktop-gutter: "40px"
  section-mobile: "48px"
components:
  home-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  home-primary-hover:
    backgroundColor: "{colors.electric}"
  home-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
  home-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.home-card}"
---

# Sistema visual · Tenis de Mesa

## Overview

Tienda nicaragüense de tenis de mesa. La identidad combina azul marino y blanco con ilustraciones de producto. El recorrido principal permite explorar categorías o filtrar el catálogo, revisar un producto y coordinar el pedido por WhatsApp. Los productos de demostración se identifican como tales hasta sustituirlos por inventario real.

La portada incorpora la dirección solicitada: cartel constructivista deportivo con tarjetas comerciales suaves. Su composición específica se documenta en `.impeccable/surfaces/home.md`; no modifica la composición de tienda, detalle ni carrito.

## Colors

Marino para encabezado, pie, títulos y paneles; blanco para superficies y texto invertido; eléctrico para acción, énfasis y foco. Azul secundario para lectura de apoyo; azul claro para detalles sobre marino. Superficie secundaria para fondos suaves; borde para campos y separadores; muted para el placeholder del buscador de portada.

El rojo se reserva para los productos que lo necesitan visualmente, como gomas y raquetas. Sobre blanco, marino ofrece contraste 16.25:1; eléctrico, 5.99:1; azul secundario, 7.77:1. El azul claro se usa sobre marino, no como texto sobre blanco.

## Typography

Barlow Condensed para titulares y nombres de producto; Inter para lectura y controles. Texto principal de 16 px y etiquetas de formularios de 14 px. El token display describe el titular de portada en escritorio: peso 800, interlínea compacta y banda inclinada. Los títulos de sección de portada usan peso 700; las tarjetas, 600. La escala móvil del titular se recoge en el documento de superficie.

## Layout

Contenedor máximo de 1320 px, con margen interior de 20 px en móvil y 40 px desde 768 px. Objetivos táctiles de al menos 44 × 44 px.

La portada apila texto e ilustraciones por debajo de 768 px y conserva dos columnas de categorías hasta 1023 px; desde 1024 px muestra cuatro. Su panel de compra pasa a una columna en móvil. Espaciado vertical de categorías: 48 px en móvil y 80/88 px en escritorio.

Se conservan los patrones de otras vistas: filtros en dos columnas desde 640 px; detalle en dos columnas desde 768 px; navegación horizontal y resumen lateral del carrito desde 1024 px; filtros en una fila desde 1280 px.

## Elevation & Depth

En portada, disco azul claro y diagonal marina organizan la profundidad del cartel. Las tarjetas flotantes llevan sombra suave permanente; las categorías tienen sombra baja y se elevan al hover con puntero fino. Los valores exactos están en el sidecar. Se respeta `prefers-reduced-motion` para reducir animaciones y transiciones decorativas.

## Shapes

Las categorías existentes mantienen radio de 24 px, ilustración centrada y desplazamiento vertical de 16 px. En portada, las tarjetas y el panel de compra usan radio de 28 px, reducido a 24 px en móvil. Botones y buscador son cápsulas; el disco y los controles de flecha, círculos. La banda del titular gira −4° y la diagonal decorativa −30°.

## Components

Los tokens de implementación viven en `frontend/tailwind.config.js` y los patrones responsivos en `frontend/src/app/globals.css`. Las cuatro vistas comparten encabezado, pie, botones y foco visible.

En portada, el enlace principal es marino y cambia a eléctrico; su variante sobre el panel marino es blanca y cambia a azul claro. El buscador tiene campo de 44 px, envío circular de 46 px y contorno eléctrico al recibir foco. El foco general mide 2 px con separación de 4 px; dentro del panel marino de compra cambia a azul claro para mantener visibilidad.

Las tarjetas de categoría completas son enlaces. En móvil se oculta el texto descriptivo breve, pero se conserva el nombre. Las ilustraciones existentes de `frontend/public/category-art` se reutilizan sin modificación.

## Do's and Don'ts

- Conservar la paleta azul y las ilustraciones existentes.
- Mantener titulares expresivos y controles de lectura clara.
- Aplicar el cartel diagonal a la portada; conservar los patrones documentados de las otras vistas.
- Evitar texto azul claro sobre blanco y mantener foco visible sobre paneles oscuros.
- Mantener espacio interno alrededor de cada ilustración y reducir movimiento cuando se solicite.
