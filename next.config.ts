import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // static, database-free site
  images: { unoptimized: true }, // required for static export; optimize images at build time instead
};

export default nextConfig;
