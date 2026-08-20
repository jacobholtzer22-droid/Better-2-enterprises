import { site } from '@/site.config'
import Texture from '@/components/Texture'

// Phase 0/1 placeholder — the real homepage is built in Phase 2 (Block B).
// The hero ambient texture layer is already in its final position.
export default function Home() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient layer: generated, non-representational broom-finish macro.
          8% opacity under type, slow drift, killed by prefers-reduced-motion. */}
      <div className="ambient-drift absolute inset-[-3%]" aria-hidden="true">
        <Texture
          name="hero-broom-finish"
          opacity={0.08}
          priority
          className="block h-full w-full"
          imgClassName="h-full w-full object-cover"
          sizes="100vw"
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-24 md:px-8">
        <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] md:text-7xl">
          {site.pages.home.h1}
        </h1>
        <div className="chalk-line load-snap mt-6 w-40 md:w-64" />
        <p className="load-fade mt-8 max-w-2xl text-lg text-aggregate">
          {site.pages.home.heroLead}
        </p>
      </div>
    </section>
  )
}
