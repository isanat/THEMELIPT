import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "preview-chat-4fa9a7ad-ed10-4edb-a753-2eaa5df39ecc.space.z.ai",
  ],
  // No serverExternalPackages needed for PostgreSQL
};

export default nextConfig;
