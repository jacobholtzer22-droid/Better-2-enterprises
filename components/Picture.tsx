import manifest from '@/public/images/manifest.json'

/**
 * Static <picture> element fed by the build-time sharp pipeline.
 *
 * Reads public/images/manifest.json (written by scripts/process-images.mjs)
 * and emits real <source> elements with explicit srcset/sizes — AVIF first,
 * WebP second, JPEG fallback. No per-request transformation, no next/image.
 *
 * `name` is the manifest key (kebab-cased source filename without extension).
 */

interface Variant {
  src: string
  width: number
  format: string
  bytes: number
}

interface ManifestEntry {
  source: string
  width: number | null
  height: number | null
  variants: Variant[]
}

const images = manifest as Record<string, ManifestEntry>

interface PictureProps {
  name: string
  /** Real, descriptive alt text. Empty string ONLY for decorative images. */
  alt: string
  sizes?: string
  className?: string
  imgClassName?: string
  /** true for the hero/LCP image only: eager + fetchpriority=high. */
  priority?: boolean
}

export default function Picture({
  name,
  alt,
  sizes = '100vw',
  className = '',
  imgClassName = '',
  priority = false,
}: PictureProps) {
  const entry = images[name]
  if (!entry || entry.variants.length === 0) return null

  const byFormat = (format: string) =>
    entry.variants
      .filter((v) => v.format === format)
      .sort((a, b) => a.width - b.width)

  const avif = byFormat('avif')
  const webp = byFormat('webp')
  const jpg = byFormat('jpg')
  const fallback = jpg[jpg.length - 1] ?? entry.variants[entry.variants.length - 1]

  const srcset = (vs: Variant[]) => vs.map((v) => `${v.src} ${v.width}w`).join(', ')

  // Intrinsic dimensions reserve layout space (zero CLS).
  const width = entry.width ?? fallback.width
  const height =
    entry.width && entry.height ? Math.round((fallback.width / entry.width) * entry.height) : undefined

  return (
    <picture className={className}>
      {avif.length > 0 && <source type="image/avif" srcSet={srcset(avif)} sizes={sizes} />}
      {webp.length > 0 && <source type="image/webp" srcSet={srcset(webp)} sizes={sizes} />}
      <img
        src={fallback.src}
        srcSet={jpg.length > 0 ? srcset(jpg) : undefined}
        sizes={sizes}
        alt={alt}
        width={fallback.width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        // eslint-disable-next-line react/no-unknown-property
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        className={imgClassName}
        data-source-width={width}
      />
    </picture>
  )
}

/** Manifest access for the projects gallery + verification scripts. */
export function listImages(): Array<{ name: string } & ManifestEntry> {
  return Object.entries(images).map(([name, entry]) => ({ name, ...entry }))
}
