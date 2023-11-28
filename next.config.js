/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'shared-infra-staging-cms-uploads-bucket.s3.eu-central-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cloudinary.kansino.nl',
      }
    ],
  },
}

module.exports = nextConfig
