import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",  // Tells Next.js to build static HTML files for GitHub Pages
  basePath: "/mayores", // IMPORTANT: This must match your Repository Name exactly
  images: {
    unoptimized: true, // IMPORTANT: GitHub Pages does not support Image Optimization
  },
};

export default nextConfig;