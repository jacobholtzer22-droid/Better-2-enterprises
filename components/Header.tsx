'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { site } from '@/site.config'
import Wordmark from './Wordmark'

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-joint bg-slab/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-[4.5rem] md:px-8">
        <Link
          href="/"
          className="shrink-0"
          aria-label={`${site.identity.name}, home`}
          onClick={() => setOpen(false)}
        >
          <Wordmark className="text-xl md:text-2xl" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`text-sm font-semibold transition-opacity duration-150 hover:opacity-70 ${
                  active
                    ? 'text-chalk underline decoration-2 underline-offset-8'
                    : 'text-ink'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <a
            href={`tel:${site.identity.phone.e164}`}
            className="hover-raise ml-2 inline-flex items-center gap-2 bg-chalk px-4 py-2.5 text-sm font-bold text-white"
          >
            <Phone size={15} aria-hidden="true" />
            {site.identity.phone.display}
          </a>
        </nav>

        {/* Mobile: phone + menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${site.identity.phone.e164}`}
            className="inline-flex min-h-11 min-w-11 items-center justify-center bg-chalk px-3 text-white"
            aria-label={`Call ${site.identity.name} at ${site.identity.phone.display}`}
          >
            <Phone size={18} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-joint"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-joint bg-slab lg:hidden"
        >
          <ul>
            {site.nav.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href} className="border-b border-joint last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`block px-6 py-4 font-display text-lg font-bold uppercase tracking-wide ${
                      active ? 'text-chalk' : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
