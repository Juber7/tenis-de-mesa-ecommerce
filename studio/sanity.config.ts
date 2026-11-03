import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { esESLocale } from "@sanity/locale-es-es";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Tenis de Mesa · Panel",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([S.documentTypeListItem("product").title("Productos")]),
    }),
    esESLocale(),
  ],
  schema: { types: schemaTypes },
});
