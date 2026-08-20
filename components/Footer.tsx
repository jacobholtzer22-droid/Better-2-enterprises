import Link from 'next/link'
import { site, yearsInBusiness } from '@/site.config'
import Wordmark from './Wordmark'

/**
 * Footer carries the crawlable NAP line. The street address renders ONLY
 * once identity.address.public is flipped true (client confirmation —
 * CLIENT-TODO #2); until then the site presents as a service-area business
 * based in Montrose, MI.
 */
export default function Footer() {
  const { identity } = site
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-slab">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Wordmark className="text-2xl" />
            <p className="mt-4 max-w-xs text-sm text-slab/75">{site.footer.tagline}</p>
            <p className="mt-4 text-sm text-slab/75">
              BBB Accredited Business since {identity.bbb.accreditedSinceDisplay} &middot; Rating{' '}
              {identity.bbb.rating}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="station !text-slab/60">Pages</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {[{ label: 'Home', href: '/' }, ...site.nav, { label: 'Privacy', href: '/privacy' }].map(
                (item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slab/85 underline-offset-4 transition-opacity duration-150 hover:underline hover:opacity-80"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div>
            <h2 className="station !text-slab/60">Contact</h2>
            {/* NAP — must match the Google Business Profile character for character. */}
            <p className="mt-4 text-sm font-semibold">{identity.name}</p>
            {identity.address.public ? (
              <p className="text-sm text-slab/85">
                {identity.address.street}, {identity.address.city}, {identity.address.state}{' '}
                {identity.address.zip}
              </p>
            ) : (
              <p className="text-sm text-slab/85">
                {identity.address.city}, {identity.address.state} &middot; Serving{' '}
                {site.serviceArea.region}
              </p>
            )}
            <p className="mt-2">
              <a
                href={`tel:${identity.phone.e164}`}
                className="font-mono text-base font-medium underline decoration-[var(--chalk-lift)] decoration-2 underline-offset-4"
              >
                {identity.phone.display}
              </a>
            </p>
            {identity.email && (
              <p className="mt-1 text-sm">
                <a href={`mailto:${identity.email}`} className="underline underline-offset-4">
                  {identity.email}
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-slab/20 pt-6 text-xs text-slab/60">
          <p>
            &copy; {year} {site.footer.legalLine} &middot; {identity.category} &middot;{' '}
            {yearsInBusiness()} years in business &middot; {site.footer.credit}
          </p>
        </div>
      </div>
    </footer>
  )
}
