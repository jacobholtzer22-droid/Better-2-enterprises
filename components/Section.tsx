import type { ReactNode } from 'react'

/**
 * Layout primitive for the control-joint grid: each section meets the next
 * on a full-width hairline joint with saw-cut ticks, and carries a mono
 * station-marker label ("01 — Scope of work").
 */
interface SectionProps {
  station?: string
  stationNumber?: string
  children: ReactNode
  /** dark = structural --ink band (final CTA, etc.) */
  tone?: 'light' | 'form' | 'dark'
  className?: string
  id?: string
}

export default function Section({
  station,
  stationNumber,
  children,
  tone = 'light',
  className = '',
  id,
}: SectionProps) {
  const toneClass =
    tone === 'dark' ? 'bg-ink text-slab' : tone === 'form' ? 'bg-form' : 'bg-slab'

  return (
    <section id={id} className={`joint-rule saw-tick ${toneClass} ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
        {station && (
          <p className={`station mb-6 ${tone === 'dark' ? '!text-slab/60' : ''}`}>
            {stationNumber && <span className="mr-3">{stationNumber}</span>}
            {station}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
