import Link from 'next/link'
import { Phone } from 'lucide-react'
import { site } from '@/site.config'
import Texture from './Texture'

/**
 * Closing CTA band — the structural dark section. Carries the cure-transition
 * texture at 10% (contrast verified in scripts/verify-texture-contrast.mjs).
 */
export default function CtaBand({
  heading,
  body,
  texture = true,
}: {
  heading: string
  body: string
  /** false on /projects — that page must stay texture-free (verify-textures.mjs enforces). */
  texture?: boolean
}) {
  return (
    <section className="joint-rule relative overflow-hidden bg-ink text-slab">
      {texture && (
        <div className="absolute inset-0" aria-hidden="true">
          <Texture
            name="cure-transition"
            opacity={0.1}
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover"
            sizes="100vw"
          />
        </div>
      )}
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <h2 className="max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">
          {heading}
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-slab/85">{body}</p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={`tel:${site.identity.phone.e164}`}
            className="hover-raise inline-flex items-center gap-2 bg-slab px-6 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-ink"
          >
            <Phone size={18} aria-hidden="true" />
            {site.identity.phone.display}
          </a>
          <Link
            href={site.cta.primary.href}
            className="hover-raise inline-flex items-center border-2 border-slab/60 px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-slab"
          >
            {site.cta.primary.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
