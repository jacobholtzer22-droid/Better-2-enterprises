/**
 * Structural enforcement: no texture asset may ever appear on /projects,
 * inside a gallery, or anywhere it could read as a photo of Better 2's work.
 *
 * Runs after `next build` (wired into npm run build) and FAILS the build if
 * any texture path shows up in the built /projects HTML. Also asserts every
 * rendered <img> whose src points at a texture carries alt="" and
 * aria-hidden="true".
 */
import { readFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const OUT = 'out'
const TEXTURE_PATHS = ['/images/texture-processed/', '/images/texture/']
// The paper-grain tile is the sitewide "printed drawing" overlay the texture
// spec itself mandates as GLOBAL (3–5%). It is paper, not concrete — it
// cannot read as a photograph of work — so it is the single exemption from
// the /projects ban. Every photographic texture stays banned there.
const PROJECTS_EXEMPT = ['drawing-stock-grain']

async function htmlFiles(dir) {
  const files = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await htmlFiles(p)))
    else if (entry.name.endsWith('.html')) files.push(p)
  }
  return files
}

async function main() {
  if (!existsSync(OUT)) {
    console.error('[verify-textures] out/ missing — run next build first.')
    process.exit(1)
  }
  const files = await htmlFiles(OUT)
  let failed = false

  for (const file of files) {
    const html = await readFile(file, 'utf8')
    const isProjects = /(^|\/)projects(\.html|\/index\.html)$/.test(file)
    if (isProjects) {
      // Every texture URL on /projects must be in the exempt list.
      const urls = [...html.matchAll(/\/images\/texture(?:-processed)?\/([a-z0-9-]+)[.-]/g)].map(
        (m) => m[1]
      )
      const offending = urls.filter((u) => !PROJECTS_EXEMPT.some((e) => u.startsWith(e)))
      if (offending.length > 0) {
        console.error(
          `[verify-textures] FAIL: texture asset(s) rendered on ${file} — forbidden: ${[...new Set(offending)].join(', ')}`
        )
        failed = true
      }
    }

    // Every texture <img> must be decorative: alt="" and aria-hidden.
    const imgTags = html.match(/<img\b[^>]*>/g) ?? []
    for (const tag of imgTags) {
      if (TEXTURE_PATHS.some((t) => tag.includes(t))) {
        if (!/alt=""/.test(tag) || !/aria-hidden="true"/.test(tag)) {
          console.error(`[verify-textures] FAIL: texture <img> in ${file} missing alt=""/aria-hidden: ${tag.slice(0, 120)}`)
          failed = true
        }
      }
    }
  }

  if (failed) process.exit(1)
  console.log(`[verify-textures] OK — ${files.length} pages checked, no texture on /projects, all texture imgs decorative.`)
}

main()
