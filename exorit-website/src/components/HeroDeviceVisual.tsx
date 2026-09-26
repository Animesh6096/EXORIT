import { motion, useReducedMotion } from 'framer-motion'

/**
 * Mobile hero visual: a phone frame with a real EXORIT product scrolling inside
 * it. The screen content is a genuine capture of ReadVenture
 * (readventure001.vercel.app) at phone width — shipped work, not a mockup, which
 * is the whole point of putting it in the hero. ReadVenture follows the system
 * colour scheme, so there is a light and a dark capture and the screen matches
 * the site's theme.
 *
 * Regenerate with Chrome (puppeteer) at a 500×1270 viewport, device scale 2,
 * once with `prefers-color-scheme: light` and once with `dark`, then resize to
 * 640×1626 WebP:
 *   public/images/hero-readventure-mobile-light.webp
 *   public/images/hero-readventure-mobile.webp
 * Originals are archived in assets-src/originals/.
 *
 * A phone frame rather than a laptop or tablet because the hero it sits in is
 * itself a phone viewport: a laptop frame at this width shrinks its screen
 * content to something illegible.
 */
const HeroDeviceVisual = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
      className="relative mx-auto w-[248px] lg:hidden"
    >
      {/* Ambient glow so the device separates from the hero background behind it. */}
      <div className="absolute -inset-10 rounded-full bg-primary/25 blur-3xl" aria-hidden="true"></div>

      {/* Device body */}
      <div className="relative rounded-[2.25rem] border border-white/20 bg-[#0A1220] p-2 shadow-2xl shadow-black/60 ring-1 ring-inset ring-white/10">
        {/* Screen */}
        <div className="relative aspect-[9/17] overflow-hidden rounded-[1.75rem] bg-white dark:bg-[#101a2e]">
          {/* Status bar keeps the page clear of the camera cutout. */}
          <div className="absolute inset-x-0 top-0 z-10 h-8 bg-white dark:bg-[#101a2e]" aria-hidden="true"></div>
          <div className="absolute inset-x-0 bottom-0 top-8 overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0"
              animate={prefersReducedMotion ? undefined : { y: ['0%', '-25%', '0%'] }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 22, times: [0, 0.5, 1], repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <img
                src="/images/hero-readventure-mobile-light.webp"
                alt="ReadVenture, a book community platform built by EXORIT, shown on a phone"
                width={640}
                height={1626}
                loading="lazy"
                className="block w-full dark:hidden"
              />
              <img
                src="/images/hero-readventure-mobile.webp"
                alt="ReadVenture, a book community platform built by EXORIT, shown on a phone"
                width={640}
                height={1626}
                loading="lazy"
                className="hidden w-full dark:block"
              />
            </motion.div>
          </div>

          {/* Notch */}
          <div
            className="absolute left-1/2 top-2 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-[#0A1220]"
            aria-hidden="true"
          ></div>

          {/* Screen glare, kept subtle so it does not fight the UI underneath. */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
            aria-hidden="true"
          ></div>
        </div>
      </div>

      {/* Caption — says plainly that this is real shipped work rather than a mockup. */}
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
        ReadVenture · shipped by EXORIT
      </p>
    </motion.div>
  )
}

export default HeroDeviceVisual
