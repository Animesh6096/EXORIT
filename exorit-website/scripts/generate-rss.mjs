/**
 * Generates public/rss.xml from src/config/blog.ts. An RSS feed is a
 * low-cost, well-established discovery signal for both traditional search
 * (Google Discover, news aggregators) and the newer wave of AI answer-engine
 * crawlers that poll feeds for fresh content rather than re-crawling whole
 * sites. Re-run after publishing a post:
 *
 *   node scripts/generate-rss.mjs
 */
import { writeFileSync } from 'node:fs'
import { blogPosts } from '../src/config/blog.ts'

const SITE_URL = 'https://exorit.dev'

const escapeXml = value =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date))

const items = sorted
  .map(
    post => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <author>${escapeXml(post.author.name)}</author>
      <category>${escapeXml(post.tag)}</category>
    </item>`
  )
  .join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>EXORIT Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Notes on custom software development and applied AI from the EXORIT founders.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`

writeFileSync('public/rss.xml', rss)
console.log(`generated public/rss.xml with ${sorted.length} posts`)
