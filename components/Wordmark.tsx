import { site } from '@/site.config'

/**
 * Typographic wordmark: BETTER 2 ENTERPRISES in the display face, the "2"
 * marked in chalk. No logo asset exists; the type IS the mark.
 */
export default function Wordmark({ className = '' }: { className?: string }) {
  const [before, after] = site.identity.name.split(' 2 ')
  return (
    <span
      className={`font-display font-bold uppercase leading-none tracking-wide ${className}`}
    >
      {before} <span className="wordmark-accent">2</span> {after}
    </span>
  )
}
