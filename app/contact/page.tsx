import type { Metadata } from 'next'
import { Phone } from 'lucide-react'
import { site } from '@/site.config'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/Section'
import ContactForm from '@/components/ContactForm'

const page = site.pages.contact

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
}

export default function ContactPage() {
  return (
    <>
      <PageHeader station="Contact" h1={page.h1} lead={page.intro} />

      <Section station="Quote request" stationNumber="01" tone="form">
        <div className="grid items-start gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-bold uppercase">{page.formHeading}</h2>
            <div className="relative mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="grid content-start gap-8 border-t border-joint pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <h2 className="station !text-ink">{page.phoneHeading}</h2>
              <a
                href={`tel:${site.identity.phone.e164}`}
                className="mt-3 inline-flex items-center gap-3 font-mono text-2xl font-medium text-chalk underline decoration-2 underline-offset-8"
              >
                <Phone size={22} aria-hidden="true" />
                {site.identity.phone.display}
              </a>
            </div>
            <div>
              <h2 className="station !text-ink">Service area</h2>
              <p className="mt-3 leading-relaxed text-aggregate">
                {site.identity.homeBase} &middot; Serving {site.serviceArea.region} and nearby
                communities.
              </p>
            </div>
            {site.identity.address.public && (
              <div>
                <h2 className="station !text-ink">Address</h2>
                <p className="mt-3 text-aggregate">
                  {site.identity.address.street}, {site.identity.address.city},{' '}
                  {site.identity.address.state} {site.identity.address.zip}
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}
