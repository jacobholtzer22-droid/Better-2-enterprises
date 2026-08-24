/**
 * Interior page header: station marker, the page's single H1, the snapped
 * chalk line, and an optional lead paragraph.
 */
export default function PageHeader({
  station,
  h1,
  lead,
}: {
  station: string
  h1: string
  lead?: string
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-14 md:px-8 md:pb-16 md:pt-20">
      <p className="station mb-5">{station}</p>
      <h1 className="max-w-4xl font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">
        {h1}
      </h1>
      <div className="chalk-line load-snap mt-6 w-32 md:w-52" />
      {lead && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-aggregate">{lead}</p>}
    </div>
  )
}
