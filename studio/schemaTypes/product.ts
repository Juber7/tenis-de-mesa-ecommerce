import { defineField, defineType } from "sanity";
import { productCategories } from "./categories";

export const product = defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "images",
      title: "Fotos",
      description: "La primera foto es la principal. Arrástralas para cambiar el orden.",
      type: "array",
      options: { layout: "grid" },
      validation: (rule) => rule.required().min(1),
      of: [
        {
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Descripción de la foto",
              description: "Texto para lectores de pantalla. Si se deja vacío se usa el nombre.",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "price",
      title: "Precio (US$)",
      description: "Precio normal en dólares. Ejemplo: 24.49",
      type: "number",
      validation: (rule) => rule.required().min(0).precision(2),
    }),
    defineField({
      name: "salePrice",
      title: "Precio de oferta (US$)",
      description: "Opcional. Si se llena, el producto aparece en ofertas con este precio.",
      type: "number",
      validation: (rule) =>
        rule
          .min(0)
          .precision(2)
          .custom((value, context) => {
            const price = (context.document as { price?: number } | undefined)?.price;
            if (value === undefined || price === undefined) return true;
            return value < price || "Debe ser menor que el precio normal.";
          }),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: { list: productCategories, layout: "dropdown" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "inStock",
      title: "Disponible",
      description: "Desactívalo cuando no haya existencias. El producto se sigue mostrando, pero no se puede pedir.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "maxQuantity",
      title: "Cantidad máxima por pedido",
      type: "number",
      initialValue: 10,
      validation: (rule) => rule.required().integer().min(1).max(99),
    }),
    defineField({
      name: "slug",
      title: "Dirección web",
      description: "Parte final del enlace del producto. Usa el botón Generar.",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    { title: "Nombre", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
    { title: "Precio", name: "priceAsc", by: [{ field: "price", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", price: "price", category: "category", inStock: "inStock", media: "images.0" },
    prepare: ({ title, price, category, inStock, media }) => ({
      title,
      subtitle: [
        typeof price === "number" ? `$${price.toFixed(2)}` : "Sin precio",
        productCategories.find((c) => c.value === category)?.title,
        inStock === false ? "Agotado" : null,
      ]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
