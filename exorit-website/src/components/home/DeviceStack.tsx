import { RefObject, useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * Desktop hero visual: real captures of ReadVenture (readventure001.vercel.app)
 * on a tablet and a phone, tilted in 3D. Follows the pointer and drifts apart
 * as the hero scrolls away, handing off to the work section below. Replaces the
 * decorative code window — shipped work instead of an illustration of code.
 */
const DeviceStack = ({ heroRef }: { heroRef: RefObject<HTMLElement | null> }) => {
  const reduced = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-16, -4]), { stiffness: 80, damping: 18 })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, 2]), { stiffness: 80, damping: 18 })

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const tabletY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const phoneX = useTransform(scrollYProgress, [0, 1], [0, 60])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    if (reduced) return
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5)
      py.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [px, py, reduced])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
      className="relative hidden h-[27rem] w-full max-w-[34rem] [perspective:1400px] lg:block"
      aria-hidden="true"
    >
      <motion.div
        style={reduced ? { rotateY: -10, rotateX: 6 } : { rotateY, rotateX, opacity: fade }}
        className="relative h-full w-full"
      >
        {/* Tablet — landscape, aluminium body, black bezel, front camera on the long edge. */}
        <motion.div style={{ y: reduced ? 0 : tabletY }} className="absolute left-0 top-4 w-[94%]">
          {/* Top button and volume keys sit just outside the body. */}
          <span className="absolute -top-[3px] right-[12%] h-[3px] w-10 rounded-t-sm bg-gradient-to-b from-[#5b6576] to-[#2b3240]"></span>
          <span className="absolute -right-[3px] top-[12%] h-8 w-[3px] rounded-r-sm bg-gradient-to-r from-[#2b3240] to-[#5b6576]"></span>
          <span className="absolute -right-[3px] top-[24%] h-8 w-[3px] rounded-r-sm bg-gradient-to-r from-[#2b3240] to-[#5b6576]"></span>

          <div className="rounded-[1.9rem] bg-gradient-to-br from-[#6b7485] via-[#2a313d] to-[#11161f] p-[2px] shadow-[0_40px_80px_-24px_rgba(15,23,42,0.45)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)]">
            <div className="relative rounded-[1.8rem] bg-[#05070b] p-[11px] ring-1 ring-inset ring-white/5">
              <span className="absolute left-1/2 top-[4px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#1b2433] ring-1 ring-white/10"></span>
              <div className="relative aspect-[1180/820] overflow-hidden rounded-[1.1rem] bg-white dark:bg-[#0f172a]">
                {/* ReadVenture follows the system theme, so the screen matches the site's theme. */}
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
        </motion.div>

        {/* Phone */}
        <motion.div
          style={{ y: reduced ? 0 : phoneY, x: reduced ? 0 : phoneX }}
          className="absolute -bottom-6 -right-6 z-10 w-[29%]"
        >
          <div className="rounded-[1.9rem] bg-gradient-to-br from-[#6b7485] via-[#2a313d] to-[#11161f] p-[2px] shadow-[0_30px_60px_-18px_rgba(15,23,42,0.5)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)]">
            <div className="rounded-[1.8rem] bg-[#05070b] p-[6px]">
              <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.45rem] bg-white dark:bg-[#101a2e]">
                {/* Status bar, so the page starts below the camera rather than under it. */}
                <div className="absolute inset-x-0 top-0 z-10 flex h-6 items-center justify-between bg-white px-4 font-sans text-[8px] font-semibold text-gray-900 dark:bg-[#101a2e] dark:text-white">
                  <span>9:41</span>
                  <span className="flex items-center gap-1">
                    <span className="flex items-end gap-px">
                      <span className="h-1 w-0.5 rounded-sm bg-current"></span>
                      <span className="h-1.5 w-0.5 rounded-sm bg-current"></span>
                      <span className="h-2 w-0.5 rounded-sm bg-current"></span>
                    </span>
                    <span className="h-2 w-3.5 rounded-[2px] border border-current p-px opacity-90">
                      <span className="block h-full w-2/3 rounded-[1px] bg-current"></span>
                    </span>
                  </span>
                </div>
                <div className="absolute left-1/2 top-1.5 z-20 h-3.5 w-11 -translate-x-1/2 rounded-full bg-black"></div>
                <div className="absolute inset-x-0 bottom-0 top-6 overflow-hidden">
                  <motion.div
                    className="absolute inset-x-0 top-0"
                    animate={reduced ? undefined : { y: ['0%', '-30%', '0%'] }}
                    transition={reduced ? undefined : { duration: 20, times: [0, 0.5, 1], repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <img src="/images/hero-readventure-mobile-light.webp" alt="" width={640} height={1626} className="block w-full dark:hidden" />
                    <img src="/images/hero-readventure-mobile.webp" alt="" width={640} height={1626} className="hidden w-full dark:block" />
                  </motion.div>
                </div>
                <div className="absolute bottom-1.5 left-1/2 z-20 h-1 w-12 -translate-x-1/2 rounded-full bg-gray-900/70 dark:bg-white/70"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Caption chip */}
        <div className="absolute -left-4 bottom-10 flex items-center gap-2 z-20 rounded-full border border-gray-200 bg-white/80 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-600 shadow-lg backdrop-blur-md dark:border-white/15 dark:bg-gray-950/70 dark:text-gray-300 dark:shadow-none">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"></span>
          ReadVenture · shipped by EXORIT
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DeviceStack
