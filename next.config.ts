import type { NextConfig } from "next";

import withVideo from 'next-video';


const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.alquran.cloud'], // Keep if needed for future use
  },
};

export default nextConfig;
