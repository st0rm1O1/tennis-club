/** @type {import('next').NextConfig} */
const BASE_PATH = "/baseline-tennis-club";

const nextConfig = {
  reactCompiler: true,
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH,
  images: { unoptimized: true },
};

export default nextConfig;