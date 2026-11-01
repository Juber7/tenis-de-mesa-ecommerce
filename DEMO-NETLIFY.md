# Demo en Netlify

- Tienda pública: https://leandro-tenis-de-mesa-demo.netlify.app
- Catálogo: https://leandro-tenis-de-mesa-demo.netlify.app/tienda
- Proyecto: `leandro-tenis-de-mesa-demo`
- ID: `3796c081-9762-4567-8e76-a4bd32ad46d8`
- Equipo: `josue-guerrero`

La demo conserva los 10 productos del catálogo incorporado en el frontend. No depende del WordPress local ni requiere mantener encendida la computadora. Los pedidos reales están bloqueados por el modo demo.

La publicación se realizó manualmente con Netlify CLI, sin conectar el repositorio para despliegues automáticos. Los cambios posteriores requieren una nueva publicación. `netlify.toml` configura el frontend y el adaptador oficial de Next.js; el script de compilación usa la URL pública de Netlify para las imágenes.

OneDrive bloqueó archivos de compilaciones anteriores. Para completar el despliegue se utilizó una copia temporal del frontend fuera de OneDrive, sin `.env.local`, credenciales ni el backend de WordPress.

Se verificaron públicamente la portada, el catálogo, una ficha de producto, el carrito y una imagen de producto con respuestas HTTP 200. El navegador mostró los 10 productos del catálogo.
