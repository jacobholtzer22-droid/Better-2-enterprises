import type { Metadata } from 'next'
import { Big_Shoulders_Display, Source_Sans_3, IBM_Plex_Mono } from 'next/font/google'
import { site } from '@/site.config'
import './globals.css'

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
      <body className="bg-slab font-body text-ink antialiased">{children}</body>
    </html>
  )
}
