import type { Metadata } from 'next'
import { site } from '@/site.config'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import Reveal from '@/components/Reveal'
import Picture from '@/components/Picture'
import CtaBand from '@/components/CtaBand'
import ServiceAreaMap from '@/components/ServiceAreaMap'

const page = site.pages.serviceAreas

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
}

export default function ServiceAreasPage() {
  const withBlurb = site.serviceArea.core.filter((c) => 'blurb' in c && c.blurb)
  const plain = site.serviceArea.core.filter((c) => !('blurb' in c && c.blurb))

  return (
    <>
      <PageHeader station="Coverage" h1={page.h1} lead={page.intro} />

      <Section station={site.serviceArea.region} stationNumber="01" tone="form">
        {/* Cities where the record supports a specific claim */}
        <div className="grid gap-px overflow-hidden border border-joint bg-joint md:grid-cols-2">
          {withBlurb.map((city, i) => (
            <Reveal key={city.name} delay={(i % 2) * 60} className="bg-slab p-7">
              <h2 className="font-display text-2xl font-bold uppercase">{city.name}</h2>
              <p className="mt-3 leading-relaxed text-aggregate">
                {'blurb' in city ? city.blurb : null}
              </p>
            </Reveal>
          ))}
        </div>

        {/* The rest of the county, plainly */}
        <h2 className="station mt-12 !text-ink">Also across Genesee County</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {plain.map((city) => (
            <li
              key={city.name}
              className="border border-joint bg-slab px-4 py-2 font-mono text-sm"
            >
              {city.name}
            </li>
          ))}
        </ul>

        <h2 className="station mt-10 !text-ink">{site.serviceArea.adjacent.label}</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {site.serviceArea.adjacent.cities.map((name) => (
            <li key={name} className="border border-joint bg-slab px-4 py-2 font-mono text-sm">
              {name}
            </li>
          ))}
        </ul>
      </Section>

      {/* Travel radius map — client-stated 1.5h range, backed by Midland + Yale projects */}
      <Section station={site.serviceArea.travel.heading} stationNumber="02">
        <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">
          {site.serviceArea.travel.heading}
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-aggregate">
          {site.serviceArea.travel.note}
        </p>
        <div className="mt-8">
          <ServiceAreaMap />
        </div>
      </Section>

      <div className="joint-rule relative max-h-[380px] overflow-hidden">
        <Picture
          name={site.images.serviceAreasBand.name}
          alt={site.images.serviceAreasBand.alt}
          sizes="100vw"
          imgClassName="h-full max-h-[380px] w-full object-cover"
        />
      </div>

      <CtaBand
        heading="Close to the area? Call and ask."
        body="If your job is near Genesee County, there is a good chance we cover it. Call (810) 493-3521 and tell us where you are."
      />
    </>
  )
}
