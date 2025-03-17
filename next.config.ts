import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone", // This helps with containerization if needed
  // Add transpilePackages if needed for SDK
  transpilePackages: ["@telegram-apps/sdk-react", "@telegram-apps/sdk"],
};

export default nextConfig;
