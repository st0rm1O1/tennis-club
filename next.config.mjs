/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.getlayers.ai",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
