import type { FaqItem } from '@/site.config'
import Reveal from './Reveal'

/**
 * Visible FAQ block — native <details>, zero JS. The same items feed the
 * FAQPage schema in Phase 5, which must mirror this copy exactly.
 */
export default function FaqBlock({ heading, items }: { heading: string; items: readonly FaqItem[] }) {
  return (
    <div>
      <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">{heading}</h2>
      <div className="mt-8 border-t border-joint">
        {items.map((item, i) => (
          <Reveal key={item.question} delay={i * 40} className="border-b border-joint">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 py-5 font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="font-mono text-lg text-chalk transition-transform duration-150 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-6 leading-relaxed text-aggregate">{item.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
