import textureManifest from '@/public/images/texture-manifest.json'

/**
 * Decorative texture renderer — GOVERNED BY DIFFERENT RULES THAN <Picture>.
 *
 * These are generated, non-representational background assets. They:
 *   - always render alt="" and aria-hidden="true" (not overridable: the props
 *     do not exist)
 *   - never carry a caption (no caption prop exists)
 *   - never appear on /projects or in a gallery — enforced at build time by
 *     scripts/verify-textures.mjs, which fails the build otherwise
 *   - max 12% opacity anywhere text sits on top (opacity is clamped here)
 *
 * Client photos use <Picture> and images/manifest.json. The two manifests and
 * components are fully separate code paths on purpose.
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

const textures = textureManifest as Record<string, ManifestEntry>

export type TextureName = keyof typeof textures & string

interface TextureProps {
  name: string
  /** 0–0.12 where text sits on top; clamped to 0.2 absolute max for text-free bands. */
  opacity: number
  /** Set true ONLY under text — enforces the 12% cap. */
  underText?: boolean
  sizes?: string
  className?: string
  imgClassName?: string
  /** Hero ambient layer only: eager load. Everything else lazy. */
  priority?: boolean
}

export default function Texture({
  name,
  opacity,
  underText = true,
  sizes = '100vw',
  className = '',
  imgClassName = '',
  priority = false,
}: TextureProps) {
  const entry = textures[name]
  if (!entry || entry.variants.length === 0) return null

  const cap = underText ? 0.12 : 0.2
  const clamped = Math.min(opacity, cap)

  const byFormat = (format: string) =>
    entry.variants.filter((v) => v.format === format).sort((a, b) => a.width - b.width)
  const avif = byFormat('avif')
  const webp = byFormat('webp')
  const jpg = byFormat('jpg')
  const fallback = jpg[jpg.length - 1] ?? entry.variants[entry.variants.length - 1]
  const srcset = (vs: Variant[]) => vs.map((v) => `${v.src} ${v.width}w`).join(', ')

  return (
    <picture aria-hidden="true" className={className} style={{ opacity: clamped }}>
      {avif.length > 0 && <source type="image/avif" srcSet={srcset(avif)} sizes={sizes} />}
      {webp.length > 0 && <source type="image/webp" srcSet={srcset(webp)} sizes={sizes} />}
      <img
        src={fallback.src}
        srcSet={jpg.length > 0 ? srcset(jpg) : undefined}
        sizes={sizes}
        alt=""
        aria-hidden="true"
        width={fallback.width}
        height={
          entry.width && entry.height
            ? Math.round((fallback.width / entry.width) * entry.height)
            : undefined
        }
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={imgClassName}
      />
    </picture>
  )
}

/**
 * Thin full-bleed aggregate band between major sections. Text-free, so it may
 * exceed the 12% under-text cap slightly (still subtle).
 */
export function TextureDivider() {
  return (
    <div className="joint-rule relative h-[120px] overflow-hidden" aria-hidden="true">
      <Texture
        name="aggregate-macro"
        opacity={0.16}
        underText={false}
        className="absolute inset-0"
        imgClassName="h-[120px] w-full object-cover"
        sizes="100vw"
      />
    </div>
  )
}

/**
 * Global paper-grain overlay (3–5%): sells the printed-drawing concept.
 * Fixed, tiled, pointer-transparent. The tile is a 320px seamless PNG.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        opacity: 0.04,
        backgroundImage: 'url(/images/texture-processed/drawing-stock-grain.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '320px 320px',
      }}
    />
  )
}
