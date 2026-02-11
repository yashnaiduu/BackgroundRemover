import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: 'export' for local dev server
  images: {
    unoptimized: true,
  },
  // API calls will use NEXT_PUBLIC_API_BASE env var
};

export default nextConfig;