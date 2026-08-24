/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site. Every route is pre-rendered to HTML at build time so
  // crawlers (Google and AI) get complete content in the initial response.
  output: 'export',
  // Images are pre-processed to fixed widths by scripts/process-images.mjs
  // and served as static files via the <Picture> component. next/image's
  // per-request optimizer is disabled on purpose (it bills per transformation).
  images: { unoptimized: true },
  // true → every route exports as route/index.html, which resolves on ANY
  // static host (extensionless .html files 404 on plain file servers).
  trailingSlash: true,
}

export default nextConfig
