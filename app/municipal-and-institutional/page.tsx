import type { Metadata } from 'next'
import { site } from '@/site.config'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import Reveal from '@/components/Reveal'
import Picture from '@/components/Picture'
import ProjectTable from '@/components/ProjectTable'
import FaqBlock from '@/components/FaqBlock'
import CtaBand from '@/components/CtaBand'

const page = site.pages.municipal
const svc = site.services.municipal

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
}

export default function MunicipalPage() {
  return (
    <>
      <PageHeader station="Municipal · Transit · Schools" h1={page.h1} lead={svc.intro} />

      {/* THE EVIDENCE — full permit record, the best thing on this site */}
      <Section station="Permit record" stationNumber="01" tone="form">
        <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">
          {page.recordHeading}
        </h2>
        <p className="mt-4 max-w-2xl text-aggregate">{page.recordSub}</p>
        <div className="mt-8">
          <ProjectTable categories={['municipal']} />
        </div>
      </Section>

      <Section station="Services" stationNumber="02">
        <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">
          Public and institutional work
        </h2>
        <ul className="mt-10 grid gap-px overflow-hidden border border-joint bg-joint md:grid-cols-2">
          {svc.items.map((item, i) => (
            <Reveal as="li" key={item.name} delay={(i % 2) * 60} className="bg-slab p-6 md:p-7">
              <h3 className="font-display text-xl font-bold uppercase">{item.name}</h3>
              <p className="mt-3 leading-relaxed text-aggregate">{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <div className="joint-rule relative max-h-[380px] overflow-hidden">
        <Picture
          name={site.images.municipalBand.name}
          alt={site.images.municipalBand.alt}
          sizes="100vw"
          imgClassName="h-full max-h-[380px] w-full object-cover object-center"
        />
      </div>

      <Section station="How public work runs" stationNumber="03" tone="form">
        <div className="grid gap-8 md:grid-cols-2">
          {page.expectations.map((e, i) => (
            <Reveal key={e.title} delay={(i % 2) * 60}>
              <h3 className="font-display text-2xl font-bold uppercase">{e.title}</h3>
              <p className="mt-2 max-w-xl leading-relaxed text-aggregate">{e.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section station="Questions" stationNumber="04">
        <FaqBlock heading="Municipal and school district questions" items={site.faq.municipal} />
      </Section>

      <CtaBand
        heading="Put us on your bid list"
        body="Call (810) 493-3521 or send the form and tell us about the project. Scope, timeline, and documentation from there."
      />
    </>
  )
}
