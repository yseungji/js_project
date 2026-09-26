import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep dynamic page metadata in <head> for Naver's Yeti crawler and other bots.
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },
};

export default nextConfig;
