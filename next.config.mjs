/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/factor-construction-game',
  assetPrefix: '/factor-construction-game/',
}

export default nextConfig;
