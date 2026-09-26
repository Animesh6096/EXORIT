import { motion } from 'framer-motion'
import { Phone, Tablet } from './home/Devices'

/**
 * Hero visual below the `lg` breakpoint: the same tablet and phone as the
 * desktop hero (see home/DeviceStack.tsx), in their compact size and without
 * the pointer tilt. Both screens are genuine captures of ReadVenture — shipped
 * work, not a mockup, which is the whole point of putting it in the hero.
 */
const HeroDeviceVisual = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
    className="relative mx-auto w-full max-w-[26rem] lg:hidden"
    role="img"
    aria-label="ReadVenture, a book community platform built by EXORIT, shown on a tablet and a phone"
  >
    {/* Ambient glow so the devices separate from the hero background behind them. */}
    <div className="absolute -inset-8 rounded-full bg-primary/20 blur-3xl" aria-hidden="true"></div>

    <div className="relative pb-10 pr-6">
      <Tablet compact />
      <div className="absolute bottom-0 right-0 z-10 w-[30%]">
        <Phone compact />
      </div>
    </div>

    {/* Caption — says plainly that this is real shipped work rather than a mockup. */}
    <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
      ReadVenture · shipped by EXORIT
    </p>
  </motion.div>
)

export default HeroDeviceVisual
