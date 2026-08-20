/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site. Every route is pre-rendered to HTML at build time so
  // crawlers (Google and AI) get complete content in the initial response.
  output: 'export',
  // Images are pre-processed to fixed widths by scripts/process-images.mjs
  // and served as static files via the <Picture> component. next/image's
  // per-request optimizer is disabled on purpose (it bills per transformation).
  images: { unoptimized: true },
  trailingSlash: false,
}

export default nextConfig
