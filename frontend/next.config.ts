import type { NextConfig } from "next";
const isPages = process.env.GITHUB_PAGES === "true";
const pagesBasePath = "/tenis-de-mesa-ecommerce";
const config: NextConfig = {
  poweredByHeader: false,
  ...(isPages ? { output: "export", trailingSlash: true, basePath: pagesBasePath, assetPrefix: `${pagesBasePath}/`, images: { unoptimized: true } } : {}),
};
export default config;
