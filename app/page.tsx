import { site } from '@/site.config'

// Phase 0 placeholder — the real homepage is built in Phase 2.
export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-5xl font-bold uppercase">{site.pages.home.h1}</h1>
      <p className="mt-6 text-lg text-aggregate">{site.pages.home.heroLead}</p>
    </main>
  )
}
