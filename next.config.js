/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        "*.mdx": ["mdx-loader"]
      }
    },
  },
}

module.exports = nextConfig
