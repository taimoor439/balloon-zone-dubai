/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // GitHub Pages serves the site under /balloon-zone-dubai/, so assets and
  // links must be prefixed there. On Vercel (root domain) no prefix is needed.
  basePath: process.env.GITHUB_PAGES === "true" ? "/balloon-zone-dubai" : "",
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};
module.exports = nextConfig;
