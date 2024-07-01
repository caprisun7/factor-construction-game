/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
      unoptimized: true,
    },
    assetPrefix: '/factor-construction-game/',
    basePath: '/factor-construction-game',
    // Preserve any existing configurations you might have:
    // For example:
    // experimental: {
    //   appDir: true,
    // },
  }
  
  export default nextConfig;
