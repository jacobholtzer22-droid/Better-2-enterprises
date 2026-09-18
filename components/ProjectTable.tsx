import { site, type ProjectCategory, type ProjectRecord } from '@/site.config'
import Reveal from './Reveal'

/**
 * The project record — the most credible element on the site, designed as a
 * centerpiece. Two sources merged and sorted newest-first:
 *   - publicWorks: client-provided project sheets with full details, rendered
 *     as expandable rows (native <details>, zero JS)
 *   - records: Genesee County permit filings, plain rows
 * Sourcing for both is stated in the fine print under the table.
 */
export default function ProjectTable({
  limit,
  categories,
}: {
  limit?: number
  categories?: ProjectCategory[]
}) {
  let entries: ProjectRecord[] = [...site.projects.publicWorks, ...site.projects.records]
  if (categories) entries = entries.filter((r) => categories.includes(r.category))
  entries.sort((a, b) => b.year - a.year)
  if (limit) entries = entries.slice(0, limit)

  return (
    <div>
      {/* Column headers (md+) */}
      <div className="hidden border border-b-0 border-joint bg-form md:grid md:grid-cols-[5.5rem_1fr_18rem_6.5rem_3rem]">
        <span className="station px-5 py-3 !text-aggregate">Year</span>
        <span className="station px-5 py-3 !text-aggregate">Project</span>
        <span className="station px-5 py-3 !text-aggregate">Location</span>
        <span className="station px-5 py-3 !text-aggregate">Type</span>
        <span aria-hidden="true" />
      </div>

      <ul className="border border-joint">
        {entries.map((r, i) => (
          <Reveal
            as="li"
            key={r.location + r.scope + r.year}
            delay={Math.min(i, 6) * 40}
            className="border-b border-joint last:border-b-0"
          >
            {r.details ? <ExpandableRow record={r} /> : <PlainRow record={r} />}
          </Reveal>
        ))}
      </ul>

      <p className="mt-3 text-xs text-aggregate">{site.projects.sourceNote}</p>
    </div>
  )
}

/** Shared summary-row layout: stacked card on mobile, table grid on md+. */
function RowContent({ record: r, expandable }: { record: ProjectRecord; expandable?: boolean }) {
  return (
    <>
      {/* Mobile */}
      <div className="p-4 md:hidden">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-sm text-aggregate">{r.yearLabel ?? r.year}</span>
          <span className="flex items-center gap-2">
            <CategoryChip category={r.category} />
            {expandable && <Chevron />}
          </span>
        </div>
        <p className="mt-2 font-semibold leading-snug">{r.scope}</p>
        <p className="mt-1 font-mono text-sm text-aggregate">
          {r.location}, {r.city}
        </p>
      </div>
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[5.5rem_1fr_18rem_6.5rem_3rem] md:items-center">
        <span className="whitespace-nowrap px-5 py-4 font-mono text-sm text-aggregate">
          {r.yearLabel ?? r.year}
        </span>
        <span className="px-5 py-4 font-semibold">{r.scope}</span>
        <span className="px-5 py-4 font-mono text-sm">
          {r.location}, {r.city}
        </span>
        <span className="px-5 py-4">
          <CategoryChip category={r.category} />
        </span>
        <span className="px-3 py-4 text-center">{expandable && <Chevron />}</span>
      </div>
    </>
  )
}

function PlainRow({ record }: { record: ProjectRecord }) {
  return <RowContent record={record} />
}

/**
 * Client-requested (Sept 2026): click a project to view its full details.
 * Native <details>/<summary> — keyboard accessible, no JS, no layout shift
 * above the row.
 */
function ExpandableRow({ record: r }: { record: ProjectRecord }) {
  const d = r.details!
  return (
    <details className="group">
      <summary className="block cursor-pointer list-none transition-colors duration-150 hover:bg-form/60 marker:content-none [&::-webkit-details-marker]:hidden">
        <RowContent record={r} expandable />
      </summary>
      <div className="border-t border-joint bg-form/50 px-4 pb-6 pt-5 md:px-5">
        <div className="grid gap-x-10 gap-y-3 md:grid-cols-[auto_1fr]">
          <DetailLine label="Owner" value={d.owner} />
          <DetailLine label="Location" value={d.location} />
          <DetailLine label="Timeframe" value={d.timeframe} />
          {d.siteConditions && <DetailLine label="Site conditions" value={d.siteConditions} />}
        </div>
        <p className="mt-4 max-w-3xl leading-relaxed">{d.scope}</p>
        <p className="station mt-5 !text-aggregate">What the work included</p>
        <ul className="mt-3 max-w-3xl space-y-2">
          {d.highlights.map((h) => (
            <li key={h} className="flex gap-3 leading-relaxed text-aggregate">
              <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-chalk" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="md:contents">
      <span className="station block !text-aggregate md:py-0.5">{label}</span>
      <span className="block text-sm font-semibold md:py-0.5 md:text-base">{value}</span>
    </div>
  )
}

function Chevron() {
  return (
    <span
      aria-hidden="true"
      className="inline-block font-mono text-lg leading-none text-chalk transition-transform duration-150 group-open:rotate-90"
    >
      &rsaquo;
    </span>
  )
}

function CategoryChip({ category }: { category: ProjectCategory }) {
  return (
    <span className="inline-block whitespace-nowrap border border-joint px-2 py-0.5 font-mono text-xs uppercase tracking-wide text-aggregate">
      {site.projects.categoryLabels[category]}
    </span>
  )
}
