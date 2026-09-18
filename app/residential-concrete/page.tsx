import type { Metadata } from 'next'
import { site } from '@/site.config'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import Reveal from '@/components/Reveal'
import Picture from '@/components/Picture'
import FaqBlock from '@/components/FaqBlock'
import CtaBand from '@/components/CtaBand'

const page = site.pages.residential
const svc = site.services.residential

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
}

export default function ResidentialConcretePage() {
  return (
    <>
      <PageHeader station="Residential" h1={page.h1} lead={svc.intro} />

      <div className="joint-rule relative max-h-[400px] overflow-hidden">
        <Picture
          name={site.images.residentialHero.name}
          alt={site.images.residentialHero.alt}
          sizes="100vw"
          imgClassName="h-full max-h-[400px] w-full object-cover"
        />
      </div>

      <Section station="Services" stationNumber="01">
        <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">
          Residential concrete services
        </h2>
        <ul className="mt-10 grid gap-px overflow-hidden border border-joint bg-joint sm:grid-cols-2 lg:grid-cols-3">
          {svc.items.map((item, i) => (
            <Reveal as="li" key={item.name} delay={(i % 3) * 60} className="bg-slab p-6">
              <h3 className="font-display text-xl font-bold uppercase">{item.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-aggregate">{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section station="What to expect" stationNumber="02" tone="form">
        <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">
          {page.processHeading}
        </h2>
        <p className="mt-4 max-w-2xl text-aggregate">{page.processSub}</p>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
          <ol className="grid gap-7">
            {site.residentialProcess.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i * 60} className="flex gap-5">
                <span className="font-mono text-sm text-chalk">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase">{step.step}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-aggregate">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="hidden gap-6 lg:grid">
            <Picture
              name={site.images.residentialProcess.name}
              alt={site.images.residentialProcess.alt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              imgClassName="w-full border border-joint object-cover"
            />
            <Picture
              name={site.images.residentialDetail.name}
              alt={site.images.residentialDetail.alt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              imgClassName="w-full border border-joint object-cover"
            />
          </div>
        </div>
      </Section>

      <Section station="Questions" stationNumber="03">
        <FaqBlock heading="Homeowner questions" items={site.faq.residential} />
      </Section>

      <CtaBand
        heading="Get a real number for your driveway"
        body="Call (810) 493-3521 or send the form. Tell us where the job is and what you want done, and we will quote it from the actual site."
      />
    </>
  )
}
