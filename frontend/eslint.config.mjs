import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Product photos come from Sanity's image CDN, which already resizes
      // and serves WebP/AVIF (auto=format). next/image would process them twice.
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([
    ".next/**",
    ".next-build-check/**",
    ".open-next/**",
    ".wrangler/**",
    ".netlify/**",
    ".taste-review/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "cloudflare-env.d.ts",
  ]),
]);
