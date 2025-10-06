import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.rogerebert.com", "image.tmdb.org", "tse2.mm.bing.net"], // добавь сюда все внешние домены
  },
};

export default nextConfig;
