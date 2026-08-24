'use client'

import { useEffect, useRef, useState } from 'react'
import { observeOnce } from './Reveal'

/**
 * Counts up to a real numeric figure on scroll-into-view. Uses the shared
 * IntersectionObserver (via observeOnce). Under prefers-reduced-motion the
 * final value renders immediately. Runs once.
 */
export default function CountUp({
  value,
  className = '',
  durationMs = 900,
}: {
  value: number
  className?: string
  durationMs?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplay(value)
      return
    }
    return observeOnce(el, () => {
      if (started.current) return
      started.current = true
      const t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / durationMs)
        setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
  }, [value, durationMs])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
