import { motion } from 'framer-motion'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import BookingButton from '../components/BookingButton'
import TrustStrip from '../components/TrustStrip'
import { bookingEmbeddable, engagements, faqs, icps, positioning, site } from '../config/site'
import HeroDeviceVisual from '../components/HeroDeviceVisual'
import DeviceStack from '../components/home/DeviceStack'
import ServiceBento from '../components/home/ServiceBento'
import AuditPanel from '../components/home/AuditPanel'
import OverlapClocks from '../components/home/OverlapClocks'
import InsightsRow from '../components/home/InsightsRow'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useMediaQuery } from '../hooks/useMediaQuery'
import Section, { SectionHeader, fadeUp } from '../components/Section'
import { useSeo } from '../hooks/useSeo'
import { useTheme } from '../contexts/ThemeContext'

// Scroll-driven scenes pull in GSAP; the globe pulls in three.js. All of it
// loads after the hero has rendered, so none of it delays the headline.
const WorkScroller = lazy(() => import('../components/home/WorkScroller'))
const ProcessStory = lazy(() => import('../components/home/ProcessStory'))
const RiskReversal = lazy(() => import('../components/home/RiskReversal'))
const HeroGlobe = lazy(() => import('../components/home/HeroGlobe'))

const GLOBE_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'

const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/** Headline words rise out of a mask one after another. */
const headlineWords = positioning.headline.split(' ')

const Home = () => {
  useSeo({
    title: 'Custom Software, Web, Mobile and AI Development',
    description:
      'EXORIT designs and builds custom web platforms, mobile apps and AI systems for businesses in Australia, Europe, North America and Bangladesh. Written scope and quote before work starts, a working demo every week.',
    path: '/',
    // Reuses the FAQ content actually rendered further down this page — structured
    // data has to match what a visitor sees, not add claims that only exist in markup.
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  })

  const heroRef = useRef<HTMLElement>(null)
  const { darkMode } = useTheme()
  const globeAllowed = useMediaQuery(GLOBE_QUERY)
  const [showGlobe, setShowGlobe] = useState(false)
  const [globeReady, setGlobeReady] = useState(false)

  // Start the globe once the page is idle, never on small screens, under
  // reduced motion, or without WebGL.
  useEffect(() => {
    if (!globeAllowed || !supportsWebGL()) {
      setShowGlobe(false)
      return
    }
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setShowGlobe(true), { timeout: 1500 })
      return () => w.cancelIdleCallback?.(id)
    }
    const id = window.setTimeout(() => setShowGlobe(true), 800)
    return () => window.clearTimeout(id)
  }, [globeAllowed])

  // Smooth wheel scrolling for the homepage's scroll scenes, desktop only.
  useEffect(() => {
    if (!globeAllowed) return
    let stop: (() => void) | undefined
    let cancelled = false
    import('../lib/motion').then(m => {
      if (!cancelled) stop = m.startSmoothScroll()
    })
    return () => {
      cancelled = true
      stop?.()
    }
  }, [globeAllowed])

  // Parallax effect for hero background
  const [backgroundRef, backgroundY] = useScrollAnimation({
    offset: [0, 1],
    outputRange: [0, 100],
  })

  // Scale effect for CTA
  const [ctaRef, ctaScale] = useScrollAnimation({
    offset: [-0.3, 0.3],
    outputRange: [0.95, 1],
  })

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-[820px] items-center overflow-hidden lg:h-screen lg:min-h-[720px] bg-slate-50 dark:bg-gray-950">
        <motion.div
          ref={backgroundRef}
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0 bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-gray-950 dark:via-[#071329] dark:to-blue-950"
        ></motion.div>
        {/* Flat dotted map wherever the globe is not running. */}
        <div
          className={`absolute inset-0 z-10 bg-[url('/images/world-dots-light.svg')] dark:bg-[url('/images/world-dots-dark.svg')] bg-[length:140%_auto] bg-[center_30%] bg-no-repeat transition-opacity duration-700 sm:bg-[length:110%_auto] ${
            showGlobe && globeReady ? 'opacity-0' : 'opacity-60'
          }`}
          aria-hidden="true"
        ></div>
        {/* Same ambient treatment as the inner-page and 404 heroes: blue blooms over a fine grid. */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-90"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 17% 26%, rgba(0,123,255,.16), transparent 25%), radial-gradient(circle at 83% 68%, rgba(0,123,255,.12), transparent 28%), linear-gradient(rgba(148,163,184,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.06) 1px, transparent 1px)',
            backgroundSize: 'auto, auto, 42px 42px, 42px 42px',
          }}
        ></div>

        {showGlobe && (
          <div
            className={`pointer-events-none absolute -right-[16%] top-1/2 z-10 aspect-square w-[60vw] max-w-[900px] -translate-y-1/2 transition-opacity duration-1000 ${
              globeReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Suspense fallback={null}>
              <HeroGlobe dark={darkMode} onReady={() => setGlobeReady(true)} />
            </Suspense>
          </div>
        )}

        <div className="container relative z-20 mx-auto px-4 pb-32 pt-28 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-12">
            <div className="w-full text-center lg:w-1/2 lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-600 backdrop-blur-sm dark:border-white/15 dark:bg-white/5 dark:text-gray-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                Dhaka · Adelaide · Custom software, AI-capable
              </motion.p>
              <h1 className="mb-6 font-display text-4xl font-bold tracking-tightest text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                {headlineWords.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {word}
                      {i < headlineWords.length - 1 && ' '}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-8 text-lg text-gray-600 dark:text-gray-300"
              >
                {positioning.subhead}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4 lg:justify-start"
              >
                <BookingButton location="hero">{positioning.primaryCta}</BookingButton>
                <Button
                  to="/projects"
                  variant="outline"
                  size="lg"
                  className="!border-gray-900 !text-gray-900 hover:!bg-gray-900 hover:!text-white dark:!border-white dark:!text-white dark:hover:!bg-white dark:hover:!text-primary"
                >
                  {positioning.secondaryCta}
                </Button>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 lg:justify-start"
              >
                <svg className="h-4 w-4 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                First milestone money-back. Written scope before any work starts.
              </motion.p>
            </div>
            <HeroDeviceVisual />
            <div className="hidden w-full justify-center lg:flex lg:w-1/2 lg:justify-end">
              <DeviceStack heroRef={heroRef} />
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-16 left-1/2 z-30 hidden -translate-x-1/2 transform lg:block"
        >
          <a href="#work" className="flex flex-col items-center text-gray-600 dark:text-gray-300" aria-label="Scroll down">
            <span className="mb-2 text-sm">Scroll Down</span>
            <svg className="h-6 w-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 z-30">
          <TrustStrip />
        </div>
      </section>

      <Suspense fallback={<div className="min-h-screen" />}>
        <WorkScroller />
      </Suspense>

      {/* Client quotes are off the page until real ones exist. To bring them back, add
          entries to `testimonials` in src/config/site.ts and render <Testimonials /> here. */}

      <Suspense fallback={<div className="min-h-screen" />}>
        <ProcessStory />
      </Suspense>

      <ServiceBento />

      <AuditPanel />

      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <RiskReversal />
      </Suspense>

      {/* Who We Work With */}
      <Section>
        <SectionHeader
          eyebrow="Fit"
          title="Who We Work With"
          lead="If your project is not one of these, we will say so on the first call and point you somewhere better."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {icps.map((icp, index) => (
            <motion.div
              key={icp.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-gray-200 p-8 text-left transition-colors duration-200 hover:border-primary/40 dark:border-white/10"
            >
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">{icp.fit}</p>
              <h3 className="mb-3 font-display text-lg font-semibold text-gray-900 dark:text-gray-100">{icp.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{icp.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Engagements */}
      <Section id="offers">
        <SectionHeader
          eyebrow="Engagements"
          title="Ways to Work Together"
          lead="Every project is custom, so every project is quoted on its own — usually within a couple of days of the first call."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {engagements.map((engagement, index) => (
            <motion.div
              key={engagement.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col rounded-2xl border border-gray-200 p-8 text-left transition-colors duration-200 hover:border-primary/40 dark:border-white/10"
            >
              <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100">{engagement.name}</h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-primary">{engagement.duration}</p>
              <p className="mt-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{engagement.summary}</p>
              <ul className="mb-8 mt-6 flex-grow space-y-3">
                {engagement.deliverables.map(item => (
                  <li key={item} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <BookingButton location={`engagement_${engagement.id}`} size="md" className="w-full">
                Get a quote
              </BookingButton>
            </motion.div>
          ))}
        </div>
      </Section>

      <OverlapClocks />

      <InsightsRow />

      {/* FAQ */}
      <Section id="faq">
        <SectionHeader eyebrow="Questions" title="Questions Clients Ask First" />
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-200 text-left dark:border-white/10">
          {faqs.map((faq, index) => (
            <details
              key={faq.q}
              className={`group px-6 py-5 sm:px-8 ${index > 0 ? 'border-t border-gray-200 dark:border-white/10' : ''}`}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-base font-medium text-gray-900 dark:text-gray-100">
                {faq.q}
                <svg
                  className="mt-1 h-4 w-4 flex-shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Closing CTA — a contained panel, not a full-bleed colour band */}
      <section ref={ctaRef} className="overflow-hidden pb-24 pt-4">
        <div className="container">
          <motion.div
            style={{ scale: ctaScale }}
            className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-16 text-center sm:px-16 dark:bg-white/[0.04] dark:ring-1 dark:ring-white/10"
          >
            <div
              className="absolute inset-0 opacity-90"
              style={{
                backgroundImage:
                  'radial-gradient(40rem 20rem at 15% -20%, rgba(0,123,255,0.45) 0%, transparent 60%), radial-gradient(30rem 18rem at 90% 120%, rgba(0,123,255,0.28) 0%, transparent 55%)',
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tightest text-white md:text-4xl">
                Tell us what you are trying to build
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-300">
                Twenty minutes. You leave with an honest answer on whether it is buildable, roughly what it
                involves, and whether we are the right team for it.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <BookingButton location="footer_cta" variant="light">
                  {positioning.primaryCta}
                </BookingButton>
                <Button
                  to="/contact"
                  variant="outline"
                  size="lg"
                  className="!border-white/30 !text-white hover:!border-white hover:!bg-white/10 hover:!text-white"
                >
                  Send a message instead
                </Button>
              </div>
              {/* Inline booking once a real booking link is configured (VITE_BOOKING_URL). */}
              {bookingEmbeddable && (
                <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl bg-white">
                  <iframe
                    src={site.bookingUrl}
                    title="Book a 20-minute call with EXORIT"
                    loading="lazy"
                    className="h-[680px] w-full border-0"
                  ></iframe>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home
