import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/background-remover-pro',
  // API calls will use NEXT_PUBLIC_API_BASE env var
};

export default nextConfig;