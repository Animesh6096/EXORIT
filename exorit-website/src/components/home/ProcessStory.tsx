import { useRef } from 'react'
import { motion } from 'framer-motion'
import Section, { SectionHeader, fadeUp } from '../Section'
import { process, trustSignals } from '../../config/site'
import { CINEMATIC_QUERY, gsap, useGSAP } from '../../lib/motion'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { CallMock, DemoMock, HandoverMock, ScopeMock, StagingMock } from './processMocks'

/**
 * "How we work", told as the sequence of things a client actually receives.
 * Copy comes from `process` in site.ts; the third step there covers both the
 * staging URL and the weekly demo, so it is shown here as two beats.
 */
const steps = [
  { when: 'Day one', title: process[0].title, body: process[0].body, Mock: CallMock },
  { when: 'Within a couple of days', title: process[1].title, body: process[1].body, Mock: ScopeMock },
  {
    when: 'Week one',
    title: process[2].title,
    body: 'You watch the product exist as it is built — a live environment and a shared channel from the start.',
    Mock: StagingMock,
  },
  {
    when: 'Every week',
    title: trustSignals[3],
    body: 'A working demo in your hands each week, and scope decisions made with you rather than for you.',
    Mock: DemoMock,
  },
  { when: 'Launch', title: process[3].title, body: process[3].body, Mock: HandoverMock },
]

const lead = 'The risk in hiring a remote team is not skill. It is silence. Here is exactly what you get, and when.'

const ProcessStory = () => {
  const cinematic = useMediaQuery(CINEMATIC_QUERY)
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!cinematic || !root.current) return
      const pin = root.current.querySelector<HTMLElement>('[data-pin]')!
      const mocks = gsap.utils.toArray<HTMLElement>('[data-mock]')
      const items = gsap.utils.toArray<HTMLElement>('[data-step]')
      const bodies = gsap.utils.toArray<HTMLElement>('[data-body]')

      gsap.set(mocks.slice(1), { autoAlpha: 0, y: 60, scale: 0.96 })
      gsap.set(items.slice(1), { opacity: 0.3 })
      gsap.set(bodies.slice(1), { autoAlpha: 0, y: 8 })
      mocks.slice(1).forEach(m => gsap.set(m.querySelectorAll('[data-in]'), { autoAlpha: 0, y: 12 }))
      gsap.set(mocks.map(m => m.querySelector('[data-stamp]')).filter(Boolean), { autoAlpha: 0, scale: 1.8 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: pin,
          pin: true,
          start: 'top top',
          end: () => `+=${window.innerHeight * (steps.length - 0.5)}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

      mocks.forEach((mock, i) => {
        if (i > 0) {
          tl.to(mocks[i - 1], { autoAlpha: 0, y: -50, scale: 0.96, duration: 0.5 })
            .to(items[i - 1], { opacity: 0.3, duration: 0.3 }, '<')
            .to(mock, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }, '<0.15')
            .to(items[i], { opacity: 1, duration: 0.3 }, '<')
            .to(bodies[i - 1], { autoAlpha: 0, y: -8, duration: 0.25 }, '<')
            .to(bodies[i], { autoAlpha: 1, y: 0, duration: 0.3 }, '<0.1')
            .to(mock.querySelectorAll('[data-in]'), { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.3 }, '<0.2')
        }
        const stamp = mock.querySelector('[data-stamp]')
        if (stamp) tl.to(stamp, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2.5)' })
        tl.to('[data-progress]', { scaleY: (i + 1) / steps.length, duration: 0.4, ease: 'none' }, '<')
        tl.to({}, { duration: 0.6 })
      })
    },
    { scope: root, dependencies: [cinematic], revertOnUpdate: true }
  )

  if (!cinematic) {
    return (
      <Section id="process">
        <SectionHeader eyebrow="Process" title="How We Work" lead={lead} />
        <ol className="space-y-14">
          {steps.map(({ when, title, body, Mock }, i) => (
            <motion.li
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="grid items-center gap-8 md:grid-cols-2"
            >
              <div className="text-left">
                <p className="font-mono text-xs uppercase tracking-widest text-primary">
                  {String(i + 1).padStart(2, '0')} · {when}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{body}</p>
              </div>
              <div className="flex justify-center" aria-hidden="true">
                <Mock />
              </div>
            </motion.li>
          ))}
        </ol>
      </Section>
    )
  }

  return (
    <section ref={root} id="process" className="relative">
      <div data-pin className="flex h-screen items-center pt-20">
        <div className="container grid grid-cols-[1fr_1.05fr] items-center gap-16">
          <div className="text-left">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Process</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tightest text-gray-900 dark:text-gray-100">
              How We Work
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-gray-600 dark:text-gray-400">{lead}</p>

            <div className="relative mt-8 pl-8">
              <div className="absolute bottom-1 left-0 top-1 w-px bg-gray-200 dark:bg-white/10" aria-hidden="true">
                <div data-progress className="h-full w-full origin-top scale-y-[0.2] bg-primary"></div>
              </div>
              <ol className="space-y-3">
                {steps.map(({ when, title }, i) => (
                  <li key={title} data-step>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                      {String(i + 1).padStart(2, '0')} · {when}
                    </p>
                    <h3 className="mt-0.5 font-display text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                  </li>
                ))}
              </ol>
            </div>

            {/* Detail for the active step; every body stays in the DOM for screen readers. */}
            <div className="relative mt-8 min-h-[8rem] max-w-md rounded-xl border border-gray-200 bg-gray-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">
              {steps.map(({ title, body }) => (
                <p key={title} data-body className="absolute inset-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {body}
                </p>
              ))}
            </div>
          </div>

          <div className="relative h-[30rem]" aria-hidden="true">
            <div
              className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-3xl"
            ></div>
            {steps.map(({ title, Mock }) => (
              <div key={title} data-mock className="absolute inset-0 flex items-center justify-center">
                <Mock />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessStory
