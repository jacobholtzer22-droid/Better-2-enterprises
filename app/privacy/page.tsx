import type { Metadata } from 'next'
import { site } from '@/site.config'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'

const page = site.pages.privacy

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader station="Policy" h1={page.h1} />
      <Section station={`Last updated ${site.privacy.updated}`} stationNumber="">
        <div className="max-w-2xl space-y-10">
          {site.privacy.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-2xl font-bold uppercase">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-aggregate">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
