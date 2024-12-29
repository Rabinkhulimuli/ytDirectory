import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      /* dangerouslyAllowSVG: true, */
      {
        protocol: 'https',
        hostname:"*"
      }
    ]
  }
};

export default nextConfig;
