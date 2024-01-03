/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    nextConfig,
    images: {
        remotePatterns: [
          {
            // これも環境変数化が必要かな
            protocol: 'https',
            hostname: 'bucksam1.s3.amazonaws.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}
