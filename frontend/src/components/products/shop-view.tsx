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
    <section className="shell py-10 md:py-16">
      <h1 className="max-w-4xl font-display text-5xl font-bold uppercase leading-none md:text-6xl">
        Encuentra tu equipo.
      </h1>
      <SearchForm
        key={`filters-${JSON.stringify(s)}`}
        className="shop-filter-grid my-8 items-end rounded-2xl bg-[#F4F8FC] p-4 md:p-6"
      >
        <label className="min-w-0 text-sm font-medium text-charcoal/75">
          Buscar
          <input
            key={q}
            defaultValue={q}
            name="q"
            placeholder="Busca tu equipo…"
            className="mt-2 block min-h-12 w-full rounded-xl border border-sand bg-cream px-4 text-sm text-charcoal transition-colors focus:border-petroleum focus:outline-none focus:ring-2 focus:ring-petroleum/30"
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
        <button className="sport-button flex min-h-12 items-center justify-center gap-3 rounded-xl bg-electric px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1239D8] active:scale-[.97]">
          Filtrar
        </button>
      </SearchForm>
      <div className="mb-6 flex items-center justify-between gap-4 text-sm">
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
        <p className="rounded-2xl border border-sand bg-cream p-10">
          No encontramos productos. Prueba otra búsqueda o elimina los filtros.
        </p>
      )}
      <nav aria-label="Paginación" className="mt-10 flex justify-center gap-6">
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
    </section>
  );
}
