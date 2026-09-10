/**
 * Generates public/sitemap.xml from the actual route list plus every post in
 * src/config/blog.ts, so blog posts never go stale in the sitemap the way the
 * hand-maintained version did (see PLAN-2026.md, technical upgrade #9).
 *
 * Run after adding or changing a route or a blog post:
 *   node scripts/generate-sitemap.mjs
 *
 * Imports blog.ts directly — Node 24's native TypeScript support strips the
 * type-only syntax at load time, so this needs no build step or extra
 * dependency. If this script ever fails to run, the Node version dropped
 * below what type-stripping needs; check `node --version`.
 */
import { writeFileSync } from 'node:fs'
import { blogPosts } from '../src/config/blog.ts'

const SITE_URL = 'https://exorit.dev'
const today = new Date().toISOString().slice(0, 10)

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/projects', changefreq: 'weekly', priority: '0.9' },
  { path: '/team', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/careers', changefreq: 'weekly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
]

const blogRoutes = blogPosts.map(post => ({
  path: `/blog/${post.slug}`,
  lastmod: post.date,
  changefreq: 'monthly',
  priority: '0.7',
}))

const urls = [...staticRoutes.map(r => ({ ...r, lastmod: today })), ...blogRoutes]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync('public/sitemap.xml', xml)
console.log(`generated public/sitemap.xml with ${urls.length} URLs (${blogRoutes.length} blog posts)`)
