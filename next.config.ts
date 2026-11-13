import type { NextConfig } from "next";
import { siteConfig } from "./src/lib/site";

const nextConfig: NextConfig = {
  // Static export — GitHub Pages serves plain HTML/CSS/JS, no Node runtime.
  output: "export",

  // GitHub Pages serves project sites from a sub-path.
  basePath: siteConfig.basePath,
  assetPrefix: siteConfig.basePath,

  // GitHub Pages needs real directory indexes for clean URLs.
  trailingSlash: true,

  images: {
    // No image optimizer at build time in static export.
    unoptimized: true,
  },
};

export default nextConfig;
