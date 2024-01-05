/** @type {import('next').NextConfig} */
const nextConfig = {}


module.exports = {
    nextConfig,
    images: {
        remotePatterns: [
          {
            // これも環境変数化が必要かな
            protocol: 'https',
            hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME,
            port: '',
            pathname: '/**',
          },
        ],
      },
}
