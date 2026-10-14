import Link from "next/link";
import { SearchForm } from "@/components/products/search-form";
import { FilterSelect } from "@/components/ui/filter-select";
import { productCategories } from "@/lib/categories";
import { fetchProducts } from "@/lib/woocommerce";
import { ProductCard } from "@/components/products/product-card";
import { isDemo } from "@/lib/woocommerce";
export const metadata = { title: "Tienda" };
export const dynamic = "force-static";
export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const s = await searchParams;
  const val = (k: string) => (typeof s[k] === "string" ? (s[k] as string) : "");
  const q = val("q");
  const category = val("categoria");
  const order = val("orden");
  const page = Math.max(1, parseInt(val("pagina")) || 1);
  const sale = val("ofertas") === "si";
  const query: Record<string, string> = { page: String(page) };
  if (q) query.search = q;
  if (category) query.category = category;
  if (sale) query.on_sale = "true";
  if (["price-asc", "price-desc"].includes(order)) {
    query.orderby = "price";
    query.order = order === "price-asc" ? "asc" : "desc";
  }
  let data;
  try {
    data = await fetchProducts(query);
  } catch {
    return (
      <section className="shell py-20">
        <h1 className="font-display text-5xl">
          El catálogo no está disponible
        </h1>
        <p className="my-6">
          No pudimos conectar con la tienda. Por favor, inténtalo de nuevo.
        </p>
        <Link href="/tienda" className="underline">
          Reintentar
        </Link>
      </section>
    );
  }
  let products = data.products;
  if (isDemo()) {
    products = products.filter(
      (p) =>
        (!q || p.name.toLowerCase().includes(q.toLowerCase())) &&
        (!category || p.categories.some((c) => c.slug === category)) &&
        (!sale || p.onSale),
    );
    if (order)
      products.sort((a, b) =>
        order === "price-asc" ? a.price - b.price : b.price - a.price,
      );
    data.total = products.length;
  }
  const pageLink = (p: number) => {
    const params = new URLSearchParams();
    for (const k of ["q", "categoria", "orden", "ofertas"])
      if (val(k)) params.set(k, val(k));
    params.set("pagina", String(p));
    return `/tienda?${params}`;
  };
  return (
    <section className="shell py-12">
      <p className="eyebrow">ENCUENTRA TU VENTAJA</p>
      <h1 className="mt-3 font-display text-6xl font-bold uppercase">
        El equipo hace la diferencia.
      </h1>
      <SearchForm className="my-9 grid grid-cols-1 items-end gap-4 rounded-2xl border border-sand bg-sand/25 p-4 sm:grid-cols-2 md:p-6 xl:grid-cols-[minmax(200px,1fr)_200px_230px_auto_auto]">
        <label className="min-w-0 text-xs font-medium text-charcoal/75">
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
            className="h-4 w-4 accent-paddle"
            name="ofertas"
            value="si"
            defaultChecked={sale}
          />{" "}
          Ofertas
        </label>
        <button className="sport-button flex min-h-12 items-center justify-center gap-3 rounded-xl bg-paddle px-6 py-3 text-sm font-medium text-white transition hover:bg-[#ac2924] active:scale-95">
          Filtrar
        </button>
      </SearchForm>
      <div className="mb-6 flex justify-between text-xs">
        <p>{data.total} productos</p>
        <Link href="/tienda" className="underline">
          Limpiar filtros
        </Link>
      </div>
      {products.length ? (
        <div
          key={JSON.stringify(s)}
          className="results-enter grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4"
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
