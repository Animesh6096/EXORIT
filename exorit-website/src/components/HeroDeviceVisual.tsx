import { motion, useReducedMotion } from 'framer-motion'

/**
 * Mobile hero visual: a phone frame with a real EXORIT product scrolling inside
 * it. This replaced an abstract "system blueprint" diagram whose 8px labels were
 * unreadable at phone size and whose right-hand column was clipped off the
 * viewport.
 *
 * The screen content is a genuine capture of ReadVenture
 * (readventure001.vercel.app) at phone width — shipped work, not a mockup, which
 * is the whole point of putting it in the hero. Regenerate with:
 *
 *   chrome --headless=new --force-device-scale-factor=2 --window-size=500,2400 \
 *     --screenshot=/tmp/rv.png https://readventure001.vercel.app/
 *   # crop above the live site's failed-fetch banner before resizing:
 *   python -c "from PIL import Image; im=Image.open('/tmp/rv.png').crop((0,0,1000,2540)); im.resize((640,1626)).save('/tmp/rv-strip.png')"
 *   cwebp -q 84 /tmp/rv-strip.png -o public/images/hero-readventure-mobile.webp
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
      {/* Ambient glow so the device separates from the hero photograph behind it. */}
      <div className="absolute -inset-10 rounded-full bg-primary/25 blur-3xl" aria-hidden="true"></div>

      {/* Device body */}
      <div className="relative rounded-[2.25rem] border border-white/20 bg-[#0A1220] p-2 shadow-2xl shadow-black/60 ring-1 ring-inset ring-white/10">
        {/* Screen */}
        <div className="relative aspect-[9/17] overflow-hidden rounded-[1.75rem] bg-[#101a2e]">
          <motion.img
            src="/images/hero-readventure-mobile.webp"
            alt="ReadVenture, a book community platform built by EXORIT, shown on a phone"
            width={640}
            height={1626}
            loading="lazy"
            className="absolute inset-x-0 top-0 w-full"
            animate={prefersReducedMotion ? undefined : { y: ['0%', '-25%', '0%'] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 22, times: [0, 0.5, 1], repeat: Infinity, ease: 'easeInOut' }
            }
          />

          {/* Notch */}
          <div
            className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-[#0A1220]"
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
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">
        ReadVenture · shipped by EXORIT
      </p>
    </motion.div>
  )
}

export default HeroDeviceVisual
