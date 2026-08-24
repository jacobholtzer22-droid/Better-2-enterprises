import type { Metadata } from 'next'
import { site } from '@/site.config'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import Reveal from '@/components/Reveal'
import Picture from '@/components/Picture'
import FaqBlock from '@/components/FaqBlock'
import CtaBand from '@/components/CtaBand'

const page = site.pages.commercial
const svc = site.services.commercial

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
}

export default function CommercialConcretePage() {
  return (
    <>
      <PageHeader station="Commercial" h1={page.h1} lead={page.forWho} />

      <div className="joint-rule relative max-h-[400px] overflow-hidden">
        <Picture
          name={site.images.commercialHero.name}
          alt={site.images.commercialHero.alt}
          sizes="100vw"
          imgClassName="h-full max-h-[400px] w-full object-cover"
        />
      </div>

      <Section station="Services" stationNumber="01">
        <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">
          Commercial concrete services
        </h2>
        <p className="mt-4 max-w-2xl text-aggregate">{svc.intro}</p>
        <ul className="mt-10 grid gap-px overflow-hidden border border-joint bg-joint md:grid-cols-3">
          {svc.items.map((item, i) => (
            <Reveal as="li" key={item.name} delay={(i % 3) * 60} className="bg-slab p-6">
              <h3 className="font-display text-xl font-bold uppercase">{item.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-aggregate">{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section station="How we run a commercial job" stationNumber="02" tone="form">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="grid gap-8">
            {page.expectations.map((e, i) => (
              <Reveal key={e.title} delay={i * 60}>
                <h3 className="font-display text-2xl font-bold uppercase">{e.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-aggregate">{e.body}</p>
              </Reveal>
            ))}
          </div>
          <Picture
            name={site.images.commercialSecondary.name}
            alt={site.images.commercialSecondary.alt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="hidden lg:block"
            imgClassName="w-full border border-joint object-cover"
          />
        </div>
      </Section>

      <Section station="Questions" stationNumber="03">
        <FaqBlock heading="Commercial concrete questions" items={site.faq.commercial} />
      </Section>

      <CtaBand
        heading="Need a concrete sub that hits dates?"
        body={site.pages.home.finalCta.body}
      />
    </>
  )
}
