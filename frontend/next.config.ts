import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  ...(process.env.NEXT_BUILD_CHECK === "true" ? { distDir: ".next-build-check" } : {}),
};
export default config;
