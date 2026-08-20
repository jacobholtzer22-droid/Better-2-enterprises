/**
 * Build-time image pipeline (runs before `next build`).
 *
 * Reads originals from public/images/source/, writes processed variants to
 * public/images/processed/ at fixed widths (640 / 1280 / 1920) in
 * AVIF + WebP + JPEG, and emits public/images/manifest.json that the
 * <Picture> component reads for srcsets and intrinsic dimensions.
 *
 * Idempotent: skips variants that already exist and are newer than the source.
 */
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const SOURCE_DIR = 'public/images/source'
const OUT_DIR = 'public/images/processed'
const WIDTHS = [640, 1280, 1920]
const FORMATS = [
  { ext: 'avif', options: { quality: 55 } },
  { ext: 'webp', options: { quality: 74 } },
  { ext: 'jpg', options: { quality: 78, mozjpeg: true } },
]
const VALID_INPUT = /\.(jpe?g|png|webp|tiff?)$/i

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    console.log(`[images] ${SOURCE_DIR} does not exist — nothing to process.`)
    await writeManifest({})
    return
  }

  const entries = (await readdir(SOURCE_DIR)).filter((f) => VALID_INPUT.test(f))
  if (entries.length === 0) {
    console.log('[images] No source images found — writing empty manifest.')
    await writeManifest({})
    return
  }

  // sharp is imported lazily so an empty source dir never requires it.
  const { default: sharp } = await import('sharp')
  await mkdir(OUT_DIR, { recursive: true })

  const manifest = {}
  for (const file of entries) {
    const srcPath = path.join(SOURCE_DIR, file)
    const base = path.parse(file).name.toLowerCase().replace(/[^a-z0-9-]+/g, '-')
    const srcStat = await stat(srcPath)
    const meta = await sharp(srcPath).metadata()
    const variants = []

    for (const width of WIDTHS) {
      // Never upscale: skip widths larger than the source.
      if (meta.width && width > meta.width) continue
      for (const { ext, options } of FORMATS) {
        const outName = `${base}-${width}.${ext}`
        const outPath = path.join(OUT_DIR, outName)
        let needsBuild = true
        if (existsSync(outPath)) {
          const outStat = await stat(outPath)
          needsBuild = outStat.mtimeMs < srcStat.mtimeMs
        }
        if (needsBuild) {
          await sharp(srcPath).resize({ width }).toFormat(ext === 'jpg' ? 'jpeg' : ext, options).toFile(outPath)
        }
        const size = (await stat(outPath)).size
        variants.push({ src: `/images/processed/${outName}`, width, format: ext, bytes: size })
      }
    }

    // If the source is smaller than the smallest target width, emit it at
    // native size rather than upscaling into mush.
    if (variants.length === 0 && meta.width) {
      for (const { ext, options } of FORMATS) {
        const outName = `${base}-${meta.width}.${ext}`
        const outPath = path.join(OUT_DIR, outName)
        if (!existsSync(outPath) || (await stat(outPath)).mtimeMs < srcStat.mtimeMs) {
          await sharp(srcPath).toFormat(ext === 'jpg' ? 'jpeg' : ext, options).toFile(outPath)
        }
        const size = (await stat(outPath)).size
        variants.push({ src: `/images/processed/${outName}`, width: meta.width, format: ext, bytes: size })
      }
    }

    manifest[base] = {
      source: file,
      width: meta.width ?? null,
      height: meta.height ?? null,
      variants,
    }
    console.log(`[images] ${file} → ${variants.length} variants`)
  }

  await writeManifest(manifest)
}

async function writeManifest(manifest) {
  await mkdir('public/images', { recursive: true })
  await writeFile('public/images/manifest.json', JSON.stringify(manifest, null, 2))
  console.log(`[images] manifest written (${Object.keys(manifest).length} images).`)
}

main().catch((err) => {
  console.error('[images] pipeline failed:', err)
  process.exit(1)
})
