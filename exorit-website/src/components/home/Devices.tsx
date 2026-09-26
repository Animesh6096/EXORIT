import { motion, useReducedMotion } from 'framer-motion'

/**
 * Tablet and phone frames showing real ReadVenture captures
 * (readventure001.vercel.app). ReadVenture follows the system colour scheme, so
 * each screen has a light and a dark capture and matches the site's theme.
 *
 * Regenerate with Chrome (puppeteer), device scale 2, once with
 * `prefers-color-scheme: light` and once with `dark`, then resize to WebP:
 *   tablet: 1180×820 viewport → hero-readventure-tablet{-light}.webp (1180×820)
 *   phone:  500×1270 viewport → hero-readventure-mobile{-light}.webp (640×1626)
 * Originals are archived in assets-src/originals/.
 *
 * `compact` scales bezels, corners and status-bar details down for the phone-
 * width hero, where the full-size proportions would look heavy.
 */

const body = 'bg-gradient-to-br from-[#6b7485] via-[#2a313d] to-[#11161f] p-[2px]'
const key = 'absolute from-[#2b3240] to-[#5b6576]'

export const Tablet = ({ compact = false }: { compact?: boolean }) => (
  <div className="relative">
    {/* Top button and volume keys sit just outside the body. */}
    <span className={`${key} right-[12%] rounded-t-sm bg-gradient-to-t ${compact ? '-top-[2px] h-[2px] w-6' : '-top-[3px] h-[3px] w-10'}`}></span>
    <span className={`${key} top-[12%] rounded-r-sm bg-gradient-to-r ${compact ? '-right-[2px] h-5 w-[2px]' : '-right-[3px] h-8 w-[3px]'}`}></span>
    <span className={`${key} top-[24%] rounded-r-sm bg-gradient-to-r ${compact ? '-right-[2px] h-5 w-[2px]' : '-right-[3px] h-8 w-[3px]'}`}></span>

    <div
      className={`${body} ${compact ? 'rounded-[1.15rem]' : 'rounded-[1.9rem]'} shadow-[0_40px_80px_-24px_rgba(15,23,42,0.45)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)]`}
    >
      <div className={`relative bg-[#05070b] ring-1 ring-inset ring-white/5 ${compact ? 'rounded-[1.05rem] p-[7px]' : 'rounded-[1.8rem] p-[11px]'}`}>
        <span
          className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-[#1b2433] ring-1 ring-white/10 ${compact ? 'top-[2px] h-[3px] w-[3px]' : 'top-[4px] h-[5px] w-[5px]'}`}
        ></span>
        <div className={`relative aspect-[1180/820] overflow-hidden bg-white dark:bg-[#0f172a] ${compact ? 'rounded-[0.65rem]' : 'rounded-[1.1rem]'}`}>
          <img
            src="/images/hero-readventure-tablet-light.webp"
            alt=""
            width={1180}
            height={820}
            className="absolute inset-0 h-full w-full object-cover dark:hidden"
          />
          <img
            src="/images/hero-readventure-tablet.webp"
            alt=""
            width={1180}
            height={820}
            className="absolute inset-0 hidden h-full w-full object-cover dark:block"
          />
          {/* Glass glare */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.09] via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  </div>
)

export const Phone = ({ compact = false }: { compact?: boolean }) => {
  const reduced = useReducedMotion()
  const bar = compact ? 'h-4 px-2.5 text-[6px]' : 'h-6 px-4 text-[8px]'

  return (
    <div
      className={`${body} ${compact ? 'rounded-[1.25rem]' : 'rounded-[1.9rem]'} shadow-[0_30px_60px_-18px_rgba(15,23,42,0.5)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)]`}
    >
      <div className={`bg-[#05070b] ${compact ? 'rounded-[1.15rem] p-[4px]' : 'rounded-[1.8rem] p-[6px]'}`}>
        <div className={`relative aspect-[9/19.5] overflow-hidden bg-white dark:bg-[#101a2e] ${compact ? 'rounded-[0.95rem]' : 'rounded-[1.45rem]'}`}>
          {/* Status bar, so the page starts below the camera rather than under it. */}
          <div className={`absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-white font-sans font-semibold text-gray-900 dark:bg-[#101a2e] dark:text-white ${bar}`}>
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="flex items-end gap-px">
                <span className="h-1 w-0.5 rounded-sm bg-current"></span>
                <span className="h-1.5 w-0.5 rounded-sm bg-current"></span>
                <span className={`${compact ? 'h-1.5' : 'h-2'} w-0.5 rounded-sm bg-current`}></span>
              </span>
              <span className={`rounded-[2px] border border-current p-px opacity-90 ${compact ? 'h-1.5 w-2.5' : 'h-2 w-3.5'}`}>
                <span className="block h-full w-2/3 rounded-[1px] bg-current"></span>
              </span>
            </span>
          </div>
          <div
            className={`absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-black ${compact ? 'top-1 h-2 w-7' : 'top-1.5 h-3.5 w-11'}`}
          ></div>
          <div className={`absolute inset-x-0 bottom-0 overflow-hidden ${compact ? 'top-4' : 'top-6'}`}>
            <motion.div
              className="absolute inset-x-0 top-0"
              animate={reduced ? undefined : { y: ['0%', '-30%', '0%'] }}
              transition={reduced ? undefined : { duration: 20, times: [0, 0.5, 1], repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src="/images/hero-readventure-mobile-light.webp" alt="" width={640} height={1626} className="block w-full dark:hidden" />
              <img src="/images/hero-readventure-mobile.webp" alt="" width={640} height={1626} className="hidden w-full dark:block" />
            </motion.div>
          </div>
          <div
            className={`absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-gray-900/70 dark:bg-white/70 ${compact ? 'bottom-1 h-0.5 w-8' : 'bottom-1.5 h-1 w-12'}`}
          ></div>
        </div>
      </div>
    </div>
  )
}
