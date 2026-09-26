import { useEffect } from 'react'
import { site } from '../config/site'

/**
 * Per-route metadata. The site is a client-rendered SPA with no SSR/prerender
 * (see PLAN-2026.md, technical upgrade #2), so `index.html` supplies only the
 * homepage's tags and every other route reused them verbatim — wrong title,
 * wrong description, wrong canonical, on every page but one. This hook patches
 * that at runtime: it still executes after JS runs, so it helps a
 * JS-executing crawler (Google, most AI answer engines) and social unfurlers
 * that re-fetch, but it is not a substitute for real prerendering — a crawler
 * that reads only the initial HTML response still sees the homepage's tags.
 * Prerendering remains the correct fix and is tracked as open work.
 */

interface SeoOptions {
  /** Page title without the site suffix — it is appended automatically. */
  title: string
  description: string
  /** Path from the domain root, e.g. '/about' or '/blog/my-post'. */
  path: string
  image?: string
  type?: 'website' | 'article'
  /** One or more JSON-LD graphs specific to this page, in addition to the sitewide Organization schema in index.html. */
  jsonLd?: object | object[]
  noindex?: boolean
}

const DEFAULT_IMAGE = `${site.url}/og-image.jpg`
const PAGE_JSONLD_ID = 'page-jsonld'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function useSeo({ title, description, path, image = DEFAULT_IMAGE, type = 'website', jsonLd, noindex = false }: SeoOptions) {
  // JSON-LD objects are usually inline literals that change identity on every
  // render; stringify to key the effect so it fires only when the content
  // actually changes.
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const url = `${site.url}${path}`
    // The homepage leads with the brand so the tab reads "EXORIT" even when
    // truncated; inner pages lead with the page name.
    const fullTitle = path === '/' ? `EXORIT — ${title}` : `${title} — EXORIT`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    setLink('canonical', url)

    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:image', image)

    setMeta('name', 'twitter:url', url)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)

    const existing = document.getElementById(PAGE_JSONLD_ID)
    if (existing) existing.remove()

    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = PAGE_JSONLD_ID
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.getElementById(PAGE_JSONLD_ID)?.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, type, noindex, jsonLdKey])
}
