/**
 * One place that registers GSAP plugins and owns smooth scrolling, so every
 * scroll-driven scene shares the same ScrollTrigger instance and the same clock.
 *
 * framer-motion still handles simple reveals (see `fadeUp` in Section.tsx);
 * GSAP is only for pinned and scrubbed scenes on the homepage.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export { gsap, ScrollTrigger, SplitText, useGSAP }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Breakpoint where cinematic scenes (pins, horizontal scroll) switch on. Below
 * it, and under reduced motion, every scene renders as a plain stacked layout.
 */
export const CINEMATIC_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'

/**
 * Smooth wheel scrolling driven from GSAP's ticker, so pinned scenes and the
 * scroll position never drift apart. Touch scrolling stays native. Returns a
 * cleanup function; does nothing under reduced motion.
 */
export const startSmoothScroll = () => {
  if (prefersReducedMotion()) return () => {}

  const lenis = new Lenis({ anchors: { offset: -80 }, lerp: 0.12 })
  const tick = (time: number) => lenis.raf(time * 1000)

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    gsap.ticker.lagSmoothing(500, 33)
    lenis.destroy()
  }
}
