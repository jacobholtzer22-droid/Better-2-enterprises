import type { Metadata } from 'next'
import { Big_Shoulders_Display, Source_Sans_3, IBM_Plex_Mono } from 'next/font/google'
import { site } from '@/site.config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileCtaBar from '@/components/MobileCtaBar'
import './globals.css'

// Self-hosted via next/font: static font files served from our origin,
// font-display swap, zero render-blocking third-party requests.
const display = Big_Shoulders_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const body = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.pages.home_meta.title,
  description: site.pages.home_meta.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-slab font-body text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-chalk focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        {/* pb clears the fixed mobile CTA bar so content is never hidden. */}
        <main id="main" className="pb-14 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  )
}
