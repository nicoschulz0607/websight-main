import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix Turbopack workspace root warning
  turbopack: {
    root: path.resolve(__dirname),
  },

  // bundle-dynamic-imports: allow GSAP tree-shaking
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;
