import { site, type ProjectCategory } from '@/site.config'
import Reveal from './Reveal'

/**
 * The permit record — the most credible element on the site, designed as a
 * centerpiece. Location, scope as written on the permit, year, category tag,
 * with the sourcing note in fine print.
 */
export default function ProjectTable({
  limit,
  categories,
}: {
  limit?: number
  categories?: ProjectCategory[]
}) {
  let records = [...site.projects.records]
  if (categories) records = records.filter((r) => categories.includes(r.category))
  if (limit) records = records.slice(0, limit)

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto border border-joint md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-joint bg-form">
              <th scope="col" className="station px-5 py-3 !text-aggregate">Year</th>
              <th scope="col" className="station px-5 py-3 !text-aggregate">Scope on permit</th>
              <th scope="col" className="station px-5 py-3 !text-aggregate">Location</th>
              <th scope="col" className="station px-5 py-3 !text-aggregate">Type</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.location + r.year} className="border-b border-joint last:border-b-0">
                <td className="whitespace-nowrap px-5 py-4 font-mono text-sm text-aggregate">{r.year}</td>
                <td className="px-5 py-4 font-semibold">{r.scope}</td>
                <td className="whitespace-nowrap px-5 py-4 font-mono text-sm">
                  {r.location}, {r.city}
                </td>
                <td className="px-5 py-4">
                  <CategoryChip category={r.category} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="border border-joint md:hidden">
        {records.map((r, i) => (
          <Reveal as="li" key={r.location + r.year} delay={i * 40} className="border-b border-joint p-4 last:border-b-0">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-sm text-aggregate">{r.year}</span>
              <CategoryChip category={r.category} />
            </div>
            <p className="mt-2 font-semibold leading-snug">{r.scope}</p>
            <p className="mt-1 font-mono text-sm text-aggregate">
              {r.location}, {r.city}
            </p>
          </Reveal>
        ))}
      </ul>

      <p className="mt-3 text-xs text-aggregate">{site.projects.sourceNote}</p>
    </div>
  )
}

function CategoryChip({ category }: { category: ProjectCategory }) {
  return (
    <span className="inline-block whitespace-nowrap border border-joint px-2 py-0.5 font-mono text-xs uppercase tracking-wide text-aggregate">
      {site.projects.categoryLabels[category]}
    </span>
  )
}
