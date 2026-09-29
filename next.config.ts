import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Public artwork is already compressed. On the small App Platform instance,
    // runtime /_next/image transforms compete with page requests for memory.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ["simple-icons"],
  },
  async headers() {
    const yearCache = "public, max-age=31536000, immutable";
    const dayCache = "public, max-age=86400, stale-while-revalidate=604800";
    return [
      {
        source: "/og.png",
        headers: [{ key: "Cache-Control", value: dayCache }],
      },
      {
        source: "/mascot/:path*",
        headers: [{ key: "Cache-Control", value: yearCache }],
      },
      {
        source: "/projects/:path*",
        headers: [{ key: "Cache-Control", value: yearCache }],
      },
      {
        source: "/service-art/:path*",
        headers: [{ key: "Cache-Control", value: dayCache }],
      },
      {
        source: "/concepts/:path*",
        headers: [{ key: "Cache-Control", value: dayCache }],
      },
      {
        source: "/blog/:path*",
        headers: [{ key: "Cache-Control", value: dayCache }],
      },
      {
        source: "/solutions/:path*",
        headers: [{ key: "Cache-Control", value: dayCache }],
      },
      {
        source: "/favicon/:path*",
        headers: [{ key: "Cache-Control", value: yearCache }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
