import type { NextConfig } from "next";
const isPages = process.env.GITHUB_PAGES === "true";
const pagesBasePath = "/tenis-de-mesa-ecommerce";
const config: NextConfig = {
  poweredByHeader: false,
  ...(process.env.NEXT_BUILD_CHECK === "true" ? { distDir: ".next-build-check" } : {}),
  ...(isPages ? { output: "export", trailingSlash: true, basePath: pagesBasePath, assetPrefix: `${pagesBasePath}/`, images: { unoptimized: true } } : {}),
};
export default config;
