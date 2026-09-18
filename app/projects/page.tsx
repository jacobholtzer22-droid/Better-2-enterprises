import type { Metadata } from 'next'
import { site } from '@/site.config'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import ProjectTable from '@/components/ProjectTable'
import CtaBand from '@/components/CtaBand'

const page = site.pages.projects

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
}

/**
 * The verified permit record. DELIBERATELY photo-free: no textures (enforced
 * by scripts/verify-textures.mjs) and no stock photography — nothing on this
 * page may be mistaken for evidence of Better 2's work except the actual
 * public record. Real client photos, when they arrive, are the only imagery
 * allowed here.
 */
export default function ProjectsPage() {
  return (
    <>
      <PageHeader station="Public record" h1={page.h1} lead={page.intro} />

      <Section station="Project record" stationNumber="01" tone="form">
        <ProjectTable />
        <p className="mt-10 max-w-2xl border-l-2 border-chalk pl-5 text-aggregate">
          {page.photoNote}
        </p>
      </Section>

      <CtaBand
        heading="Your project could be the next entry"
        body={site.pages.home.finalCta.body}
        texture={false}
      />
    </>
  )
}
