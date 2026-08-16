/** @type {import('next').NextConfig} */
const BASE_PATH = "/tennis-club";

const nextConfig = {
  reactCompiler: true,
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH,
  images: { unoptimized: true },
};

export default nextConfig;