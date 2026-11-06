/**
 * Pre-launch checklist: lists data and configuration that are still missing.
 * Usage: npm run check:launch   (exit code 1 while blocking items remain)
 */
import { loadEnvConfig } from "@next/env";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

loadEnvConfig(process.cwd());

async function main() {
  const { BUSINESS, SITE_URL } = await import("../src/lib/site");
  const blocking: string[] = [];
  const warnings: string[] = [];

  if (!SITE_URL.startsWith("https://"))
    blocking.push(`NEXT_PUBLIC_SITE_URL debe ser el dominio HTTPS público (actual: ${SITE_URL}).`);
  if (!process.env.SANITY_PROJECT_ID) blocking.push("Falta SANITY_PROJECT_ID.");

  const wrangler = readFileSync("wrangler.jsonc", "utf8");
  if (wrangler.includes("REEMPLAZAR_CON_EL_ID_DEL_NAMESPACE_KV"))
    blocking.push("wrangler.jsonc: crea el namespace KV y pega su id.");

  if (!BUSINESS.address)
    blocking.push("Dirección física del comercio (Ley 842, arts. 40 y 78): BUSINESS.address en src/lib/site.ts.");
  if (!BUSINESS.ruc) warnings.push("RUC del comercio (BUSINESS.ruc), si ya está inscrito en la DGI.");
  if (!BUSINESS.email) warnings.push("Correo de atención (BUSINESS.email); la Ley 842, art. 78, menciona el correo electrónico.");
  if (!BUSINESS.hours) warnings.push("Horario de atención por WhatsApp (BUSINESS.hours).");
  if (!process.env.GOOGLE_SITE_VERIFICATION)
    warnings.push("GOOGLE_SITE_VERIFICATION sin configurar (o verifica Search Console por DNS).");

  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const path = join(dir, name);
      return statSync(path).isDirectory() ? walk(path) : path.endsWith(".tsx") ? [path] : [];
    });
  for (const file of walk(join("src", "app", "legal"))) {
    const source = readFileSync(file, "utf8");
    for (const m of source.matchAll(/<Pending>([\s\S]*?)<\/Pending>/g)) {
      // Show the sentence that precedes the marker so the missing data is clear.
      const before = source
        .slice(Math.max(0, m.index - 400), m.index)
        .replace(/<[^>]+>|\{" "\}|[{}]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(-70);
      const page = file.replace(/\\/g, "/").replace(/^src\/app/, "").replace(/\/page\.tsx$/, "");
      blocking.push(`${page}: «…${before}» → ${m[1].replace(/\s+/g, " ").trim()}`);
    }
  }

  console.log("\nPENDIENTES QUE BLOQUEAN EL LANZAMIENTO");
  for (const item of blocking) console.log("  ✖ " + item);
  if (!blocking.length) console.log("  ✔ Ninguno");
  console.log("\nRECOMENDADOS");
  for (const item of warnings) console.log("  • " + item);
  if (!warnings.length) console.log("  ✔ Ninguno");
  console.log("");
  process.exitCode = blocking.length ? 1 : 0;
}

void main();
