import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://api:4000/:path*', // Proxy to Backend
      },
      {
        source: '/media/:path*',
        destination: 'http://minio:9000/:path*', // Proxy to MinIO
      },
    ];
  },
};

export default nextConfig;
