import { RefObject, useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Phone, Tablet } from './Devices'

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
          <Tablet />
        </motion.div>

        {/* Phone */}
        <motion.div
          style={{ y: reduced ? 0 : phoneY, x: reduced ? 0 : phoneX }}
          className="absolute -bottom-6 -right-6 z-10 w-[29%]"
        >
          <Phone />
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
