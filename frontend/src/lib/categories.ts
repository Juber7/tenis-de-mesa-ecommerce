// `value` and `label` must match studio/schemaTypes/categories.ts: products
// store these values. `search` is the phrase people type into a search engine
// ("ping pong" is as common as "tenis de mesa"); it is used in page titles,
// descriptions and links.
export const productCategories = [
  { value: "paletas", label: "Raquetas", search: "Raquetas de ping pong" },
  { value: "gomas", label: "Gomas", search: "Gomas para raquetas de ping pong" },
  { value: "pelotas", label: "Pelotas", search: "Pelotas de ping pong" },
  { value: "pega", label: "Pega", search: "Pega para gomas de ping pong" },
  { value: "accesorios", label: "Accesorios", search: "Accesorios de ping pong" },
  { value: "fundas-de-raqueta", label: "Fundas de raqueta", search: "Fundas para raquetas de ping pong" },
  { value: "robots", label: "Robot", search: "Robots de ping pong" },
  { value: "productos-seminuevos", label: "Productos seminuevos", search: "Productos seminuevos de ping pong" },
];

/** Search phrase of a category, e.g. "Pelotas de ping pong". */
export const categorySearchName = (value: string | undefined) =>
  productCategories.find((c) => c.value === value)?.search;
