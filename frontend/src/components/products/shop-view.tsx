import Link from "next/link";
import { SearchForm } from "@/components/products/search-form";
import { FilterSelect } from "@/components/ui/filter-select";
import { productCategories } from "@/lib/categories";
import { ProductCard } from "@/components/products/product-card";
import { shopQuery, type ShopParams } from "@/lib/product-filters";
import type { Product } from "@/types/product";

export function ShopView({
  params: s,
  data,
}: {
  params: ShopParams;
  data: { products: Product[]; total: number; totalPages: number };
}) {
  const query = shopQuery(s);
  const val = (k: string) => (typeof s[k] === "string" ? s[k] : "");
  const q = query.search || "";
  const category = query.category || "";
  const order = query.orderby ? `price-${query.order}` : "";
  const sale = query.on_sale === "true";
  const page = Number(query.page);
  const products = data.products;
  const pageLink = (p: number) => {
    const params = new URLSearchParams();
    for (const k of ["q", "categoria", "orden", "ofertas"])
      if (val(k)) params.set(k, val(k));
    params.set("pagina", String(p));
    return `/tienda?${params}`;
  };
  return (
    <section className="commerce-page">
      <div className="commerce-intro">
        <div className="shell">
          <p className="commerce-kicker">TENIS DE MESA · NICARAGUA</p>
          <h1 className="commerce-title">Encuentra<br /><em>tu equipo.</em></h1>
          <p className="commerce-subtitle">Selecciona, compara y prepara tu pedido en un solo lugar.</p>
        </div>
      </div>
      <div className="shell pb-16 md:pb-24">
      <SearchForm
        key={`filters-${JSON.stringify(s)}`}
        className="shop-controls shop-filter-grid items-end"
      >
        <label className="min-w-0 text-sm font-medium text-charcoal/75">
          Buscar
          <input
            key={q}
            defaultValue={q}
            name="q"
            placeholder="Busca tu equipo…"
            className="shop-search-input mt-2 block min-h-12 w-full rounded-xl border border-sand bg-cream px-4 text-sm text-charcoal focus:border-petroleum focus:outline-none focus:ring-2 focus:ring-petroleum/30"
          />
        </label>
        <FilterSelect
          name="categoria"
          label="Categoría"
          value={category}
          options={[
            { value: "all", label: "Todas las categorías" },
            ...productCategories,
          ]}
        />
        <FilterSelect
          name="orden"
          label="Ordenar"
          value={order}
          options={[
            { value: "all", label: "Destacados" },
            { value: "price-asc", label: "Precio: menor a mayor" },
            { value: "price-desc", label: "Precio: mayor a menor" },
          ]}
        />
        <label className="flex min-h-12 items-center gap-2 rounded-xl px-2 text-sm">
          <input
            type="checkbox"
            key={String(sale)}
            className="h-5 w-5 accent-electric"
            name="ofertas"
            value="si"
            defaultChecked={sale}
          />{" "}
          Ofertas
        </label>
        <button className="sport-button flex min-h-12 items-center justify-center gap-3 rounded-xl bg-electric px-6 py-3 text-sm font-semibold text-white">
          Filtrar
        </button>
      </SearchForm>
      <div className="shop-results-meta mb-6 flex items-center justify-between gap-4 text-sm">
        <p>{data.total} productos</p>
        <Link href="/tienda" className="inline-flex min-h-11 items-center underline underline-offset-4">
          Limpiar filtros
        </Link>
      </div>
      {products.length ? (
        <div
          key={`results-${JSON.stringify(s)}`}
          className="results-enter grid grid-cols-2 gap-3 gap-y-8 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="shop-empty p-10">
          No encontramos productos. Prueba otra búsqueda o elimina los filtros.
        </p>
      )}
      <nav aria-label="Paginación" className="shop-pagination mt-10 flex justify-center gap-6">
        {page > 1 && <Link href={pageLink(page - 1)}>← Anterior</Link>}
        {data.totalPages > 1 && (
          <span>
            {page} / {data.totalPages}
          </span>
        )}
        {page < data.totalPages && (
          <Link href={pageLink(page + 1)}>Siguiente →</Link>
        )}
      </nav>
      </div>
    </section>
  );
}
