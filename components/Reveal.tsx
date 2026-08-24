'use client'

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

/**
 * Scroll-triggered reveal via ONE shared IntersectionObserver instance.
 *
 * Every <Reveal> registers its element with the module-level observer below —
 * there is never more than one observer on the page. Elements start at
 * opacity: 0 / translateY(12px) (see .reveal in globals.css), settle once on
 * intersection, and are immediately unobserved so nothing animates twice.
 *
 * Stagger within a group by passing incremental `delay` values (ms) from the
 * parent — never element-by-element down a whole page.
 *
 * Reduced motion: the CSS layer renders final states; the observer still
 * fires but the transition duration is ~0, so content is simply visible.
 */

type RevealCallback = () => void

let sharedObserver: IntersectionObserver | null = null
const callbacks = new WeakMap<Element, RevealCallback>()

/**
 * Register a one-shot intersection callback on the SHARED observer.
 * Used by Reveal and CountUp so the page never has more than one observer.
 */
export function observeOnce(el: Element, cb: RevealCallback): () => void {
  const observer = getObserver()
  callbacks.set(el, cb)
  observer.observe(el)
  return () => {
    callbacks.delete(el)
    observer.unobserve(el)
  }
}

function getObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            callbacks.get(entry.target)?.()
            callbacks.delete(entry.target)
            sharedObserver?.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )
  }
  return sharedObserver
}

interface RevealProps {
  children: ReactNode
  /** Stagger offset in ms, set by the parent for grouped reveals. */
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'span' | 'article'
}

export default function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    return observeOnce(el, () => el.classList.add('is-revealed'))
  }, [])

  const Tag = as
  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {}

  return (
    // @ts-expect-error — ref typing across the small union of tags
    <Tag ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  )
}
