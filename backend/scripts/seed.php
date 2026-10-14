<?php
require '/wordpress/wp-load.php';
if (get_option('leandro_local_setup_v1')) { echo 'Configuración existente conservada.'; return; }
if (!class_exists('WC_Product_Simple')) { throw new Exception('WooCommerce no está activo.'); }

$admin = get_user_by('login', 'admin');
if (!$admin) { throw new Exception('No se encontró el administrador local.'); }
$credentials = json_decode(file_get_contents('/leandro-private/acceso-local.json'), true);
if (empty($credentials['password'])) { throw new Exception('Falta la contraseña local generada.'); }
wp_set_password($credentials['password'], $admin->ID);
wp_update_user(['ID' => $admin->ID, 'display_name' => 'Administrador local']);
update_option('woocommerce_onboarding_profile', ['completed' => true, 'skipped' => true]);
update_option('woocommerce_task_list_hidden', 'yes');
update_option('woocommerce_coming_soon', 'no');
update_option('woocommerce_store_pages_only', 'no');

$categories = [];
foreach (['paletas' => 'Paletas', 'pelotas' => 'Pelotas', 'accesorios' => 'Accesorios'] as $slug => $name) {
    $term = term_exists($slug, 'product_cat');
    if (!$term) $term = wp_insert_term($name, 'product_cat', ['slug' => $slug]);
    if (is_wp_error($term)) throw new Exception($term->get_error_message());
    $categories[$slug] = (int) (is_array($term) ? $term['term_id'] : $term);
}

require_once ABSPATH . 'wp-admin/includes/image.php';
$images = [];
foreach (['paleta', 'pelotas'] as $name) {
    $path = WP_CONTENT_DIR . '/uploads/ejemplos/' . $name . '.jpg';
    $attachment = wp_insert_attachment([
        'post_mime_type' => 'image/jpeg',
        'post_title' => ucfirst($name) . ' (fotografía ilustrativa)',
        'post_status' => 'inherit',
    ], $path, 0, true);
    if (is_wp_error($attachment)) throw new Exception($attachment->get_error_message());
    update_attached_file($attachment, $path);
    wp_update_attachment_metadata($attachment, wp_generate_attachment_metadata($attachment, $path));
    update_post_meta($attachment, '_wp_attachment_image_alt', 'Fotografía ilustrativa de tenis de mesa');
    $images[$name] = $attachment;
}

$rows = [
    ['Paleta Control Pro (ejemplo)', 'paleta-control-pro', '525', '450', 'paletas', 'paleta'],
    ['Pelotas Competición 40+ · 6 uds. (ejemplo)', 'pelotas-competicion-40', '85', '', 'pelotas', 'pelotas'],
    ['Paleta Carbon OFF+ (ejemplo)', 'paleta-carbon-off', '795', '', 'paletas', 'paleta'],
    ['Kit de entrenamiento (ejemplo)', 'kit-entrenamiento', '700', '625', 'accesorios', 'pelotas'],
];
foreach ($rows as [$name, $slug, $regular, $sale, $category, $image]) {
    $sku = 'LOCAL-EJEMPLO-' . $slug;
    if (wc_get_product_id_by_sku($sku)) continue;
    $product = new WC_Product_Simple();
    $product->set_name($name);
    $product->set_slug($slug);
    $product->set_sku($sku);
    $product->set_status('publish');
    $product->set_description('Producto de ejemplo para aprender a administrar la tienda. Sustituye nombre, descripción, precio, inventario y fotografía antes de vender. No representa inventario real de Leandro.');
    $product->set_regular_price($regular);
    if ($sale !== '') $product->set_sale_price($sale);
    $product->set_category_ids([$categories[$category]]);
    $product->set_image_id($images[$image]);
    $product->set_manage_stock(true);
    $product->set_stock_quantity(10);
    $product->set_stock_status('instock');
    $product->save();
}
flush_rewrite_rules();
update_option('leandro_local_setup_v1', true);
echo 'WooCommerce listo: tres categorías y cuatro productos de ejemplo.';
