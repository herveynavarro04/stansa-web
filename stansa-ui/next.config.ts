import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Include /data xlsx files in the server output trace so they ship with the build
  outputFileTracingRoot: path.join(__dirname),
  outputFileTracingIncludes: {
    "/": ["./products-tables/**/*.xlsx"],
    "/productos/**": ["./products-tables/**/*.xlsx"],
    "/api/products/**": ["./products-tables/**/*.xlsx"],
  },
};

export default nextConfig;
