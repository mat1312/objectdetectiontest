import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost', 'api-inference.huggingface.co'],
  },
};

export default nextConfig;
