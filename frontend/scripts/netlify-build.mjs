import { spawnSync } from "node:child_process";

const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL;
if (!siteUrl) {
  throw new Error("Netlify debe proporcionar la URL pública de la demo.");
}

const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build", "--webpack"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_SITE_URL: siteUrl,
    WOOCOMMERCE_URL: "",
    LOCAL_CATALOG: "true",
  },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
