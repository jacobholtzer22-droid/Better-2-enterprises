/**
 * Verifies that text contrast still passes WCAG AA (4.5:1) after each texture
 * is composited underneath at its placement opacity.
 *
 * Method: for each placement, take the texture's most adverse pixel (darkest
 * for dark-text-on-light, lightest for light-text-on-dark), alpha-composite
 * it over the background token at the placement opacity, and compute the
 * contrast ratio of the text token against that worst-case composite.
 */
import sharp from 'sharp'
import { existsSync } from 'node:fs'

const TOKENS = {
  slab: [0xee, 0xef, 0xeb],
  ink: [0x16, 0x1d, 0x24],
  aggregate: [0x54, 0x5d, 0x56],
  chalk: [0x32, 0x40, 0xc0],
  white: [0xff, 0xff, 0xff],
}

// placement: texture file, opacity, background token, text tokens on top
const PLACEMENTS = [
  { name: 'hero-broom-finish (home hero, 8%)', file: 'public/images/texture/hero-broom-finish.jpg', opacity: 0.08, bg: 'slab', texts: ['ink', 'aggregate', 'chalk'] },
  { name: 'drawing-stock-grain (global, 4%)', file: 'public/images/texture/drawing-stock-grain.png', opacity: 0.04, bg: 'slab', texts: ['ink', 'aggregate', 'chalk'] },
  { name: 'formwork-plywood (about, 10%)', file: 'public/images/texture/formwork-plywood.jpg', opacity: 0.1, bg: 'slab', texts: ['ink', 'aggregate'] },
  { name: 'cure-transition (CTA band, 10%)', file: 'public/images/texture/cure-transition.jpg', opacity: 0.1, bg: 'ink', texts: ['slab', 'white'] },
  // aggregate-macro divider carries no text: listed for completeness, no gate.
]

function relLum([r, g, b]) {
  const f = (v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

function contrast(a, b) {
  const [l1, l2] = [relLum(a), relLum(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

function composite(texPixel, alpha, bg) {
  return texPixel.map((c, i) => Math.round(alpha * c + (1 - alpha) * bg[i]))
}

async function main() {
  let failed = false
  console.log('placement | text token | worst-case composite | contrast | pass(4.5:1)')
  console.log('---|---|---|---|---')
  for (const p of PLACEMENTS) {
    if (!existsSync(p.file)) {
      console.log(`${p.name} | — | SOURCE MISSING (${p.file}) | — | SKIP`)
      continue
    }
    const stats = await sharp(p.file).stats()
    // Grayscale sources have one channel: expand to rgb.
    const chans = stats.channels.length >= 3 ? stats.channels.slice(0, 3) : [stats.channels[0], stats.channels[0], stats.channels[0]]
    const min = chans.map((c) => c.min)
    const max = chans.map((c) => c.max)
    const bg = TOKENS[p.bg]
    const bgIsLight = relLum(bg) > 0.5
    // Worst case for the text: the texture pixel pulling the background
    // toward the text's own luminance.
    for (const t of p.texts) {
      const text = TOKENS[t]
      const adverse = bgIsLight ? min : max
      const comp = composite(adverse, p.opacity, bg)
      const ratio = contrast(text, comp)
      const pass = ratio >= 4.5
      if (!pass) failed = true
      console.log(
        `${p.name} | ${t} | rgb(${comp.join(',')}) | ${ratio.toFixed(2)}:1 | ${pass ? 'PASS' : 'FAIL'}`
      )
    }
  }
  if (failed) {
    console.error('\n[texture-contrast] FAIL — reduce opacity or change placement.')
    process.exit(1)
  }
  console.log('\n[texture-contrast] all placements pass 4.5:1 under worst-case composite.')
}

main()
