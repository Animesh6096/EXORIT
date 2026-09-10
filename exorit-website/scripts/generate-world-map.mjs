/**
 * Pre-renders the dotted world map to static SVG so the `dotted-map` package
 * (and the world geometry it carries — ~150 kB gzipped) never reaches the
 * browser bundle. Run after changing the map's look:
 *
 *   node scripts/generate-world-map.mjs
 *
 * Output: public/images/world-dots-light.svg, public/images/world-dots-dark.svg
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import DottedMap from 'dotted-map'

const OUT_DIR = 'public/images'

const variants = [
  { name: 'world-dots-light.svg', color: '#0F172A40' },
  { name: 'world-dots-dark.svg', color: '#94A3B84D' },
]

mkdirSync(OUT_DIR, { recursive: true })

const map = new DottedMap({ height: 100, grid: 'diagonal' })

for (const variant of variants) {
  const svg = map.getSVG({
    radius: 0.22,
    color: variant.color,
    shape: 'circle',
    backgroundColor: 'transparent',
  })
  writeFileSync(`${OUT_DIR}/${variant.name}`, svg)
  console.log(`generated ${OUT_DIR}/${variant.name} (${(svg.length / 1024).toFixed(0)} kB)`)
}
