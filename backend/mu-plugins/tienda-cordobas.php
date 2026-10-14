<?php
/**
 * Plugin Name: Tienda · Configuración Nicaragua
 * Description: Migración única de la moneda del catálogo a córdobas. Mantiene los importes.
 */
add_action('init', function () {
    if (get_option('tienda_nicaragua_currency_v1')) return;
    update_option('woocommerce_currency', 'NIO');
    update_option('woocommerce_default_country', 'NI');
    update_option('timezone_string', 'America/Managua');
    update_option('tienda_nicaragua_currency_v1', true);
}, 5);

// Register the agreed catalog categories without changing existing assignments.
add_action('init', function () {
    if (!taxonomy_exists('product_cat') || get_option('tienda_categories_v1')) return;
    $categories = [
        'paletas' => 'Paletas', 'pelotas' => 'Pelotas', 'gomas' => 'Gomas',
        'pega' => 'Pega', 'accesorios' => 'Accesorios',
        'fundas-de-raqueta' => 'Fundas de raqueta', 'robots' => 'Robots',
    ];
    foreach ($categories as $slug => $name) {
        if (!term_exists($slug, 'product_cat')) {
            $result = wp_insert_term($name, 'product_cat', ['slug' => $slug]);
            if (is_wp_error($result)) return;
        }
    }
    update_option('tienda_categories_v1', true);
}, 20);
