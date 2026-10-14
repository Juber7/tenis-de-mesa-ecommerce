# WordPress de la tienda

Este backend usa **WordPress.org y WooCommerce reales**, ejecutados localmente mediante WordPress Playground (herramienta oficial). No es una cuenta de WordPress.com ni un sitio publicado. Para desarrollo utiliza PHP WebAssembly y SQLite en lugar de un servidor PHP/MySQL externo.

## Abrir tu tienda

Desde la carpeta principal del proyecto, haz doble clic en **Iniciar tienda.cmd**. Mantén abierta esa ventana mientras trabajas. También puedes ejecutar `npm run dev` desde la carpeta principal.

- Panel de administración: http://127.0.0.1:9400/wp-admin/
- Tienda Next.js: http://127.0.0.1:3000

La primera instalación necesita conexión a internet. Los siguientes inicios conservan productos, imágenes, usuarios y ajustes; no vuelven a cargar ni sobrescriben los productos de ejemplo. Para cerrar ambos servidores, pulsa Ctrl+C en la ventana de inicio.

## Entrar al panel

El usuario es **admin**. La contraseña local se genera automáticamente y está en **backend/.runtime/acceso-local.json**, en el campo `password`. Ábrelo en tu editor, copia únicamente ese valor y pégalo en la pantalla de acceso de WordPress. No es necesario enviar esa contraseña por chat. El archivo queda excluido de Git y no se sirve por HTTP.

El servidor se limita a este equipo. No uses este entorno local como alojamiento público ni compartas el archivo de acceso.

## Tu primer producto

1. En el menú de WordPress entra en **Productos → Todos los productos**.
2. Abre uno de los cuatro productos con la etiqueta **(ejemplo)** para practicar.
3. Edita nombre, descripción y precio en **Datos del producto → General**.
4. En **Inventario**, indica las unidades disponibles.
5. A la derecha elige la categoría y una **Imagen del producto**. Puedes subir una fotografía desde tu equipo.
6. Pulsa **Actualizar** y abre la tienda Next.js. Los cambios pueden tardar hasta 60 segundos por la caché del catálogo.

Para crear uno desde cero: **Productos → Añadir nuevo**, selecciona **Producto simple**, completa esos campos y pulsa **Publicar**. Los borradores no aparecen en la tienda. Las categorías iniciales son Paletas, Pelotas y Accesorios; sus slugs deben conservarse para los enlaces del menú.

Los cuatro productos iniciales, sus precios y el inventario son de práctica. No se han enviado pedidos ni habilitado pagos. El envío por WhatsApp permanece bloqueado mientras `LOCAL_CATALOG=true`.

## Dónde se guarda todo

- `wordpress/`: archivos completos de WordPress, plugins y medios.
- `wordpress/wp-content/database/`: base de datos SQLite persistente, incluidos productos y ajustes. Incluye archivos ocultos.
- `.runtime/`: información local de acceso y de instalación.
- `blueprint.json`: configuración inicial reproducible.
- `scripts/seed.php`: carga idempotente de ejemplos, solo en la instalación inicial.
- `scripts/start.mjs`: servidor y preparación del entorno.

Para una copia de seguridad local, cierra los servidores y copia **backend/wordpress/** y **backend/.runtime/** completos a una carpeta segura. No basta con guardar el código en Git, porque los datos y contraseñas están excluidos. No sincronices la base de datos abierta con otro equipo; espera a detener el servidor y a que OneDrive termine de sincronizar.

## Comprobar la conexión

Con ambos servidores abiertos, ejecuta `npm run test:db` desde la carpeta principal. Comprueba la Store API real y el mensaje de WhatsApp con dos productos.

## Cuando quieras publicar

Será necesario elegir un alojamiento compatible con WordPress y un dominio. La instalación de producción debe usar PHP/MySQL o MariaDB y HTTPS. Se migrará el contenido, se configurará la URL pública en `frontend/.env.local`, se reemplazarán los ejemplos y se añadirá el número de WhatsApp real.

Las imágenes locales con dirección `127.0.0.1` no son accesibles desde WhatsApp ni desde otros equipos. En producción deberán usar el dominio público de WordPress. La integración administrativa con WPVibe también queda pendiente de contar con una URL accesible desde ese servicio; no se ha expuesto tu equipo a internet.

Referencia oficial: https://developer.wordpress.org/playground/developers/local-development/wp-playground-cli/
