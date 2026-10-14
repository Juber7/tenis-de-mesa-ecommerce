import type { Product } from "@/types/product";
export const photos = {
  paddle:
    "https://images.unsplash.com/photo-1636734909254-ff5c43927e10?auto=format&fit=crop&w=1600&q=85",
  balls:
    "https://images.unsplash.com/photo-1633976027967-49db0f2507f6?auto=format&fit=crop&w=1600&q=85",
  action:
    "https://images.unsplash.com/photo-1518928286447-dc161b7cd6fb?auto=format&fit=crop&w=1600&q=85",
};
export const demoProducts: Product[] = [
  {
    id: 1,
    slug: "paleta-control-pro",
    name: "Paleta Control Pro",
    price: 45000,
    regularPrice: 52500,
    category: "Paletas",
    image: photos.paddle,
  },
  {
    id: 2,
    slug: "pelotas-competicion-40",
    name: "Pelotas Competición 40+ · 6 uds.",
    price: 8500,
    regularPrice: 8500,
    category: "Pelotas",
    image: photos.balls,
  },
  {
    id: 3,
    slug: "paleta-carbon-off",
    name: "Paleta Carbon OFF+",
    price: 79500,
    regularPrice: 79500,
    category: "Paletas",
    image: photos.paddle,
  },
  {
    id: 4,
    slug: "kit-entrenamiento",
    name: "Kit de entrenamiento",
    price: 62500,
    regularPrice: 70000,
    category: "Accesorios",
    image: photos.balls,
  },
].map((p) => ({
  ...p,
  description:
    "Producto de demostración para explorar la tienda. Las especificaciones, fotografías, precios y disponibilidad definitivos se obtendrán del catálogo de Leandro en WooCommerce.",
  imageAlt: p.name,
  currency: "NIO",
  minorUnit: 2,
  categories: [
    {
      id: p.category === "Paletas" ? 1 : p.category === "Pelotas" ? 2 : 3,
      name: p.category,
      slug: p.category.toLowerCase(),
    },
  ],
  inStock: true,
  purchasable: true,
  hasOptions: false,
  maxQuantity: 10,
  onSale: p.price < p.regularPrice,
}));
