import type { Product } from "@/types/product";

type CatalogEntry = {
  id: number;
  slug: string;
  name: string;
  price: number;
  category: string;
  categorySlug: keyof typeof categories;
  image: string;
  description: string;
};

const categories = {
  paletas: { id: 1, name: "Raquetas", slug: "paletas" },
  gomas: { id: 2, name: "Gomas", slug: "gomas" },
  pelotas: { id: 3, name: "Pelotas", slug: "pelotas" },
  pega: { id: 4, name: "Pega", slug: "pega" },
  seminuevos: {
    id: 8,
    name: "Productos seminuevos",
    slug: "productos-seminuevos",
  },
};

const productImage = (name: string) =>
  (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") +
  "/products/" +
  name;

const catalog: CatalogEntry[] = [
  {
    id: 101,
    slug: "butterfly-dignics-05",
    name: "Butterfly Dignics 05",
    price: 345000,
    category: "Gomas",
    categorySlug: "gomas",
    image: productImage("butterfly-dignics-05.png"),
    description:
      "Goma ofensiva de alta fricción con Spring Sponge X. Está pensada para topspin y contraataque cerca y a media distancia; disponible en rojo o negro según existencia.",
  },
  {
    id: 102,
    slug: "butterfly-viscaria",
    name: "Butterfly Viscaria",
    price: 630000,
    category: "Raquetas",
    categorySlug: "paletas",
    image: productImage("butterfly-viscaria.png"),
    description:
      "Madera ofensiva de 5 capas de madera y 2 de Arylate-Carbon. Ofrece un tacto estable para ataque con efecto y es una de las configuraciones más reconocidas de Butterfly.",
  },
  {
    id: 103,
    slug: "dhs-d40-wtt-3-estrellas-6-uds",
    name: "DHS D40+ WTT · 3 estrellas · 6 uds.",
    price: 45000,
    category: "Pelotas",
    categorySlug: "pelotas",
    image: productImage("dhs-d40-wtt.png"),
    description:
      "Pelotas de competición ABS de 40+ mm y 3 estrellas. El empaque incluye 6 unidades para juego de club, entrenamientos exigentes y partidos.",
  },
  {
    id: 104,
    slug: "loki-rxton-one-100ml",
    name: "Loki Rxton One · pega base agua · 100 ml",
    price: 55000,
    category: "Pega",
    categorySlug: "pega",
    image: productImage("loki-rxton-one.png"),
    description:
      "Adhesivo base agua sin VOC para montar gomas de tenis de mesa. El frasco de 100 ml incluye aplicadores y es adecuado para montajes y cambios de goma.",
  },
  {
    id: 105,
    slug: "yinhe-mercury-ii",
    name: "Yinhe Mercury II",
    price: 55000,
    category: "Gomas",
    categorySlug: "gomas",
    image: productImage("yinhe-mercury-ii.png"),
    description:
      "Goma invertida ligeramente pegajosa para juego all-round. Su esponja MOXA aporta control en bloqueos y empujes, con buen agarre para servicios y aperturas.",
  },
  {
    id: 106,
    slug: "loki-rxton-5-neo",
    name: "Loki Rxton 5 Neo",
    price: 90000,
    category: "Gomas",
    categorySlug: "gomas",
    image: productImage("loki-rxton-5-neo.png"),
    description:
      "Goma pegajosa de 2.1 mm para jugadores intermedios. Combina control all-round con una trayectoria segura para abrir con topspin y atacar la tercera bola.",
  },
  {
    id: 107,
    slug: "sanwei-t5000",
    name: "Sanwei T5000",
    price: 165000,
    category: "Raquetas",
    categorySlug: "paletas",
    image: productImage("sanwei-loki-blades.png"),
    description:
      "Madera ofensiva Sanwei para jugadores que buscan una respuesta directa y rápida. La selección se confirma por peso y disponibilidad antes de coordinar la compra.",
  },
  {
    id: 108,
    slug: "loki-kirin-k1",
    name: "Loki Kirin K1",
    price: 65000,
    category: "Raquetas",
    categorySlug: "paletas",
    image: productImage("sanwei-loki-blades.png"),
    description:
      "Madera Loki Kirin K1 de enfoque controlado. Es una opción accesible para construir una primera raqueta personalizada y trabajar una técnica consistente.",
  },
  {
    id: 109,
    slug: "loki-kirin-k3",
    name: "Loki Kirin K3",
    price: 90000,
    category: "Raquetas",
    categorySlug: "paletas",
    image: productImage("sanwei-loki-blades.png"),
    description:
      "Madera ofensiva all-round con estructura de 5 capas de madera y 2 fibras GNF. Equilibra salida de bola, control y sensación para el ataque moderno.",
  },
  {
    id: 110,
    slug: "set-butterfly-rosa-negro-seminuevo",
    name: "Set Butterfly rosa y negro · seminuevo",
    price: 165000,
    category: "Productos seminuevos",
    categorySlug: "seminuevos",
    image: productImage("butterfly-pair.png"),
    description:
      "Juego de dos raquetas Butterfly seminuevas, una rosa y una negra. La condición, gomas y disponibilidad se confirman por WhatsApp antes de la compra.",
  },
];

export const demoProducts: Product[] = catalog.map((product) => ({
  ...product,
  imageAlt: product.name,
  regularPrice: product.price,
  currency: "NIO",
  minorUnit: 2,
  categories: [categories[product.categorySlug]],
  inStock: true,
  purchasable: true,
  hasOptions: false,
  maxQuantity: 10,
  onSale: false,
}));
