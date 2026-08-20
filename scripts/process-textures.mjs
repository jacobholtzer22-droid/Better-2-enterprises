/**
 * Texture pipeline — FULLY SEPARATE from the client-photo pipeline.
 *
 * Reads generated, non-representational textures from public/images/texture/,
 * writes variants to public/images/texture-processed/, and emits
 * public/images/texture-manifest.json.
 *
 * The separation is structural, not naming convention: the <Picture> component
 * imports ONLY images/manifest.json (client photos) and the <Texture>
 * component imports ONLY images/texture-manifest.json. There is no code path
 * by which a texture renders as project imagery, and scripts/verify-textures.mjs
 * fails the build if a texture URL ever appears in the built /projects HTML.
 *
 * PNGs (the seamless grain tile) are copied through untouched — they must
 * tile losslessly.
 */
import { readdir, mkdir, stat, writeFile, copyFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const SOURCE_DIR = 'public/images/texture'
const OUT_DIR = 'public/images/texture-processed'
const WIDTHS = [960, 1600, 2400]
// Backgrounds sit under text at <=12% opacity: quality can go LOW.
const FORMATS = [
  { ext: 'avif', options: { quality: 45 } },
  { ext: 'webp', options: { quality: 62 } },
  { ext: 'jpg', options: { quality: 68, mozjpeg: true } },
]

async function main() {
  const manifest = {}
  if (!existsSync(SOURCE_DIR)) {
    await writeManifest(manifest)
    return
  }
  const entries = await readdir(SOURCE_DIR)
  const photographic = entries.filter((f) => /\.(jpe?g|png)$/i.test(f) && !f.endsWith('-grain.png'))
  const tiles = entries.filter((f) => f.endsWith('-grain.png'))

  await mkdir(OUT_DIR, { recursive: true })
  const { default: sharp } = await import('sharp')

  for (const file of photographic) {
    const srcPath = path.join(SOURCE_DIR, file)
    const base = path.parse(file).name.toLowerCase().replace(/[^a-z0-9-]+/g, '-')
    const srcStat = await stat(srcPath)
    const meta = await sharp(srcPath).metadata()
    const variants = []
    for (const width of WIDTHS) {
      if (meta.width && width > meta.width) continue
      for (const { ext, options } of FORMATS) {
        const outName = `${base}-${width}.${ext}`
        const outPath = path.join(OUT_DIR, outName)
        if (!existsSync(outPath) || (await stat(outPath)).mtimeMs < srcStat.mtimeMs) {
          await sharp(srcPath).resize({ width }).toFormat(ext === 'jpg' ? 'jpeg' : ext, options).toFile(outPath)
        }
        variants.push({
          src: `/images/texture-processed/${outName}`,
          width,
          format: ext,
          bytes: (await stat(outPath)).size,
        })
      }
    }
    manifest[base] = { source: file, width: meta.width ?? null, height: meta.height ?? null, variants }
    console.log(`[textures] ${file} → ${variants.length} variants`)
  }

  // Seamless tiles: lossless passthrough.
  for (const file of tiles) {
    const srcPath = path.join(SOURCE_DIR, file)
    const base = path.parse(file).name.toLowerCase().replace(/[^a-z0-9-]+/g, '-')
    const outPath = path.join(OUT_DIR, file)
    await copyFile(srcPath, outPath)
    const { default: sharp } = await import('sharp')
    const meta = await sharp(srcPath).metadata()
    manifest[base] = {
      source: file,
      width: meta.width ?? null,
      height: meta.height ?? null,
      variants: [
        {
          src: `/images/texture-processed/${file}`,
          width: meta.width ?? 0,
          format: 'png',
          bytes: (await stat(outPath)).size,
        },
      ],
    }
    console.log(`[textures] ${file} → tile passthrough`)
  }

  await writeManifest(manifest)
}

async function writeManifest(manifest) {
  await mkdir('public/images', { recursive: true })
  await writeFile('public/images/texture-manifest.json', JSON.stringify(manifest, null, 2))
  console.log(`[textures] manifest written (${Object.keys(manifest).length} textures).`)
}

main().catch((err) => {
  console.error('[textures] pipeline failed:', err)
  process.exit(1)
})
