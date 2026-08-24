import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { site, yearsInBusiness } from '@/site.config'
import Texture from '@/components/Texture'
import Picture from '@/components/Picture'
import Section from '@/components/Section'
import Reveal from '@/components/Reveal'
import ProjectTable from '@/components/ProjectTable'
import FaqBlock from '@/components/FaqBlock'
import CtaBand from '@/components/CtaBand'
import CountUp from '@/components/CountUp'

const home = site.pages.home

export default function Home() {
  return (
    <>
      {/* HERO — typographic; H1 paints immediately (LCP), never animates. */}
      <section className="relative overflow-hidden">
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
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
          <h1 className="max-w-4xl font-display text-5xl font-extrabold uppercase leading-[0.92] md:text-7xl">
            {home.h1}
          </h1>
          <div className="chalk-line load-snap mt-7 w-40 md:w-64" />
          <p className="load-fade mt-8 max-w-2xl text-lg leading-relaxed text-aggregate">
            {home.heroLead}
          </p>
          <div className="load-fade mt-9 flex flex-wrap gap-4" style={{ animationDelay: '120ms' }}>
            <a
              href={`tel:${site.identity.phone.e164}`}
              className="hover-raise inline-flex items-center bg-chalk px-6 py-3.5 font-display text-lg font-bold uppercase tracking-wide text-white"
            >
              {site.cta.call.label}
            </a>
            <Link
              href={site.cta.primary.href}
              className="hover-raise inline-flex items-center border-2 border-ink px-6 py-3 font-display text-lg font-bold uppercase tracking-wide"
            >
              {site.cta.primary.label}
            </Link>
          </div>
        </div>
      </section>

      {/* SPLIT — the two audiences */}
      <Section station="Scope of work" stationNumber="01">
        <h2 className="max-w-3xl font-display text-3xl font-bold uppercase md:text-4xl">
          {home.splitHeading}
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden border border-joint bg-joint md:grid-cols-2">
          {[home.commercialCard, home.residentialCard].map((card, i) => (
            <Reveal key={card.title} delay={i * 80} className="bg-slab p-7 md:p-9">
              <h3 className="font-display text-2xl font-bold uppercase">{card.title}</h3>
              <p className="mt-4 leading-relaxed text-aggregate">{card.body}</p>
              <Link
                href={card.link}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-chalk underline-offset-4 hover:underline"
              >
                {card.linkLabel}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PHOTO BAND — licensed stock, illustrative (docs/PHOTOS.md) */}
      <div className="joint-rule relative max-h-[420px] overflow-hidden">
        <Picture
          name={site.images.homeBand.name}
          alt={site.images.homeBand.alt}
          sizes="100vw"
          imgClassName="h-full max-h-[420px] w-full object-cover"
        />
      </div>

      {/* PROJECT RECORD PREVIEW — the credibility centerpiece */}
      <Section station="On the public record" stationNumber="02" tone="form">
        <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">
          {home.projectPreviewHeading}
        </h2>
        <p className="mt-4 max-w-2xl text-aggregate">{home.projectPreviewSub}</p>
        <div className="mt-8">
          <ProjectTable limit={4} />
        </div>
        <Link
          href="/projects"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-chalk underline-offset-4 hover:underline"
        >
          See the full project record
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </Section>

      {/* TRUST — real figures only, counted up */}
      <Section station="The short version" stationNumber="03">
        <div className="grid gap-10 sm:grid-cols-3">
          <Reveal>
            <p className="font-display text-6xl font-extrabold text-chalk md:text-7xl">
              <CountUp value={yearsInBusiness()} />
            </p>
            <p className="station mt-3 !text-ink">{home.trust.yearsLabel}</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="font-display text-6xl font-extrabold text-chalk md:text-7xl">
              {site.identity.bbb.rating}
            </p>
            <p className="station mt-3 !text-ink">{home.trust.bbbLabel}</p>
          </Reveal>
          <Reveal delay={160}>
            <p className="font-display text-6xl font-extrabold text-chalk md:text-7xl">
              <CountUp value={site.projects.records.length} />
            </p>
            <p className="station mt-3 !text-ink">{home.trust.permitsLabel}</p>
          </Reveal>
        </div>
      </Section>

      {/* THE review — singular, honest */}
      <Section station={site.review.sectionTitle} stationNumber="04" tone="form">
        <Reveal>
          <blockquote className="max-w-3xl">
            <p className="font-display text-3xl font-bold leading-tight md:text-4xl">
              &ldquo;{site.review.quote}&rdquo;
            </p>
            <footer className="mt-5 text-aggregate">
              <cite className="not-italic font-semibold text-ink">{site.review.author}</cite>
              {' · '}
              {site.review.source}
            </footer>
          </blockquote>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section station="Questions" stationNumber="05">
        <FaqBlock heading={home.faqHeading} items={site.faq.home} />
      </Section>

      <CtaBand heading={home.finalCta.heading} body={home.finalCta.body} />
    </>
  )
}
