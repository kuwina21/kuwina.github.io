import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/mayores', 
  assetPrefix: '/mayores/', // This ensures CSS and JS files load correctly
  images: {
    unoptimized: true,
  },
};

export default nextConfig;