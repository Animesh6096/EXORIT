/**
 * Generates branded cover images for projects that have no shippable product
 * screenshot (private repos, internal tools). Honest alternative to stock photos
 * of strangers in offices.
 *
 * Usage: node scripts/generate-project-covers.mjs
 * Requires Google Chrome installed locally. Output: public/images/covers/*.webp
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const OUT_DIR = 'public/images/covers'

const projects = [
  { slug: 'hire-me', title: 'Hire Me', kicker: 'Recruiting platform', stack: ['Flask', 'React', 'Realtime'] },
]

const template = ({ title, kicker, stack }) => `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:750px;background:#0b1120;
  background-image:radial-gradient(45rem 22rem at 12% -8%,rgba(0,123,255,.38) 0%,transparent 60%),
                   radial-gradient(30rem 18rem at 96% 12%,rgba(59,130,246,.25) 0%,transparent 55%);
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color:#fff;padding:80px;
  display:flex;flex-direction:column;justify-content:center;gap:28px;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;opacity:.05;
  background-image:linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px);
  background-size:60px 60px}
.k{position:relative;font-size:26px;letter-spacing:.28em;text-transform:uppercase;color:#93c5fd}
h1{position:relative;font-size:92px;font-weight:800;letter-spacing:-.02em;line-height:1.05}
.s{position:relative;display:flex;gap:14px;flex-wrap:wrap;margin-top:8px}
.s span{border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:12px 24px;font-size:24px;color:#cbd5e1}
</style></head><body><div class="grid"></div>
<div class="k">${kicker}</div><h1>${title}</h1>
<div class="s">${stack.map(t => `<span>${t}</span>`).join('')}</div>
</body></html>`

mkdirSync(OUT_DIR, { recursive: true })

for (const project of projects) {
  const html = join(tmpdir(), `${project.slug}.html`)
  const png = join(tmpdir(), `${project.slug}.png`)
  writeFileSync(html, template(project))

  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--screenshot=${png}`,
    '--window-size=1200,750',
    `file://${html}`,
  ], { stdio: 'ignore' })

  execFileSync('cwebp', ['-q', '84', png, '-o', join(OUT_DIR, `${project.slug}.webp`)], { stdio: 'ignore' })
  rmSync(html, { force: true })
  rmSync(png, { force: true })
  console.log(`generated ${OUT_DIR}/${project.slug}.webp`)
}
