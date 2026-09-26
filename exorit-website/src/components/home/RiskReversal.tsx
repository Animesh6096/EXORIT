import { useRef } from 'react'
import { riskReversal } from '../../config/site'
import BookingButton from '../BookingButton'
import { CINEMATIC_QUERY, gsap, useGSAP } from '../../lib/motion'

/**
 * The guarantee, set large. Words light up as the section scrolls through the
 * viewport. Without motion it is simply the full sentence at full strength.
 */
const RiskReversal = () => {
  const root = useRef<HTMLElement>(null)
  const words = riskReversal.title.split(' ')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(CINEMATIC_QUERY, () => {
        gsap.fromTo(
          '[data-word]',
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.12,
            ease: 'none',
            scrollTrigger: { trigger: '[data-headline]', start: 'top 80%', end: 'bottom 45%', scrub: true },
          }
        )
        gsap.fromTo(
          '[data-stamp]',
          { scale: 1.8, rotate: -24, opacity: 0 },
          {
            scale: 1,
            rotate: -12,
            opacity: 1,
            ease: 'back.out(2.2)',
            duration: 0.5,
            scrollTrigger: { trigger: '[data-headline]', start: 'bottom 55%', toggleActions: 'play none none reverse' },
          }
        )
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section ref={root} id="guarantee" className="relative overflow-hidden py-24 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(38rem 20rem at 50% 0%, rgba(0,123,255,0.14) 0%, transparent 70%)',
        }}
      ></div>
      <div className="container relative text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">The guarantee</p>

        <div className="relative mx-auto mt-8 max-w-4xl">
          <h2
            data-headline
            className="font-display text-4xl font-bold leading-[1.05] tracking-tightest text-gray-900 dark:text-gray-100 sm:text-6xl md:text-7xl"
          >
            {words.map((word, i) => (
              <span key={i} data-word className="inline-block">
                {word}
                {i < words.length - 1 && ' '}
              </span>
            ))}
          </h2>

          <div
            data-stamp
            className="pointer-events-none absolute -right-2 -top-10 hidden -rotate-12 rounded-xl border-2 border-emerald-500/80 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 md:block"
            aria-hidden="true"
          >
            Money-back
            <br />
            milestone one
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          {riskReversal.body}
        </p>

        <div className="mt-10 flex justify-center">
          <BookingButton location="guarantee">Talk it through on a call</BookingButton>
        </div>
      </div>
    </section>
  )
}

export default RiskReversal
