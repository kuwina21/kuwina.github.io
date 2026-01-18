import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath and assetPrefix removed for local development
  // Add them back only if deploying to a subdirectory (e.g., username.github.io/repo-name)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;