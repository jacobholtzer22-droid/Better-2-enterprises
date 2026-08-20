'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone } from 'lucide-react'
import { site } from '@/site.config'

/**
 * Sticky bottom bar on phones: tap-to-call + quote CTA, thumb-reachable.
 * Hidden on /contact (the form is already the page) and on md+ viewports.
 */
export default function MobileCtaBar() {
  const pathname = usePathname()
  if (pathname === '/contact') return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-joint md:hidden">
      <a
        href={`tel:${site.identity.phone.e164}`}
        className="flex min-h-14 items-center justify-center gap-2 bg-ink pb-[env(safe-area-inset-bottom)] font-display text-base font-bold uppercase tracking-wide text-slab"
      >
        <Phone size={16} aria-hidden="true" />
        {site.cta.call.label.replace('Call ', '')}
      </a>
      <Link
        href={site.cta.primary.href}
        className="flex min-h-14 items-center justify-center bg-chalk pb-[env(safe-area-inset-bottom)] font-display text-base font-bold uppercase tracking-wide text-white"
      >
        {site.cta.primary.label}
      </Link>
    </div>
  )
}
