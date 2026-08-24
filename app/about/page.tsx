import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { site, yearsInBusiness } from '@/site.config'
import PageHeader from '@/components/PageHeader'
import Reveal from '@/components/Reveal'
import Texture from '@/components/Texture'
import CtaBand from '@/components/CtaBand'

const page = site.pages.about

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
}

export default function AboutPage() {
  return (
    <>
      <PageHeader station="About" h1={page.h1} />

      {/* The one warm note: formwork-plywood texture behind the About body,
          10% opacity (contrast verified). */}
      <section className="joint-rule saw-tick relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Texture
            name="formwork-plywood"
            opacity={0.1}
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="max-w-2xl space-y-6 text-lg leading-relaxed lg:col-span-2">
              {page.body.map((para) => (
                <Reveal as="div" key={para.slice(0, 24)}>
                  <p>{para}</p>
                </Reveal>
              ))}
              <Reveal>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 font-semibold text-chalk underline-offset-4 hover:underline"
                >
                  See the project record
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
            <div className="grid content-start gap-8 border-l border-joint pl-8">
              <div>
                <p className="font-display text-5xl font-extrabold text-chalk">{yearsInBusiness()}</p>
                <p className="station mt-2 !text-ink">Years in business</p>
              </div>
              <div>
                <p className="font-display text-5xl font-extrabold text-chalk">
                  {site.identity.bbb.rating}
                </p>
                <p className="station mt-2 !text-ink">
                  BBB rating, accredited since {site.identity.bbb.accreditedSinceDisplay}
                </p>
              </div>
              <div>
                <p className="font-display text-5xl font-extrabold text-chalk">
                  {site.projects.records.length}
                </p>
                <p className="station mt-2 !text-ink">{site.pages.home.trust.permitsLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand heading={site.pages.home.finalCta.heading} body={site.pages.home.finalCta.body} />
    </>
  )
}
