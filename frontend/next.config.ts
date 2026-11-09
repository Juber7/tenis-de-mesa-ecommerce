import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
// Production over HTTPS (not `next start` on localhost for local checks).
const isHttps = (process.env.NEXT_PUBLIC_SITE_URL ?? "").startsWith("https://");

// Next.js inlines bootstrap scripts, so 'unsafe-inline' is required without
// nonces (nonces would force every page to render dynamically). All other
// sources are restricted to this site, Sanity's image CDN and WhatsApp links.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isHttps && !isDev ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Browsers ignore HSTS over plain HTTP, so it is harmless locally. Add
  // `preload` only after confirming every subdomain serves HTTPS.
  ...(isDev
    ? []
    : [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }]),
];

const config: NextConfig = {
  poweredByHeader: false,
  ...(process.env.NEXT_BUILD_CHECK === "true" ? { distDir: ".next-build-check" } : {}),
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
  async redirects() {
    // www is attached to the same Worker; send it to the canonical domain.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.tenisdemesani.com" }],
        destination: "https://tenisdemesani.com/:path*",
        permanent: true,
      },
    ];
  },
};
export default config;
