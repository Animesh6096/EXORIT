import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../Section'
import { projects, projectLinkLabel, type Project } from '../../config/projects'
import { CINEMATIC_QUERY, ScrollTrigger, gsap, useGSAP } from '../../lib/motion'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const Arrow = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
)

/** The address bar shows the real address each project lives at. */
const displayUrl = (link: string) => link.replace(/^https?:\/\//, '').replace(/\/$/, '')

const BrowserShot = ({ project, parallax = false }: { project: Project; parallax?: boolean }) => (
  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl shadow-blue-950/10 dark:border-white/10 dark:bg-gray-950">
    <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.03]">
      <span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-white/15"></span>
      <span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-white/15"></span>
      <span className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-white/15"></span>
      <span className="ml-3 truncate rounded-md bg-white px-3 py-1 font-mono text-[11px] text-gray-500 ring-1 ring-gray-200 dark:bg-white/5 dark:text-gray-400 dark:ring-white/10">
        {displayUrl(project.link)}
      </span>
    </div>
    <div className="aspect-[16/10] overflow-hidden bg-gray-950">
      <img
        data-shot
        src={project.image}
        alt={`${project.title} — ${project.kicker}`}
        loading="lazy"
        className={`h-full object-cover object-left-top ${parallax ? 'w-[112%] max-w-none' : 'w-full'}`}
      />
    </div>
  </div>
)

const ProjectText = ({ project, index }: { project: Project; index: number }) => (
  <div className="text-left">
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
      {String(index + 1).padStart(2, '0')} · {project.kicker}
    </p>
    <h3 className="mt-3 font-display text-3xl font-bold tracking-tightest text-gray-900 dark:text-gray-100 lg:text-4xl">
      {project.title}
    </h3>
    <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">{project.description}</p>
    <ul className="mt-5 flex flex-wrap gap-2">
      {project.tags.map(tag => (
        <li key={tag} className="rounded-full border border-gray-200 px-3 py-1 font-mono text-[11px] text-gray-600 dark:border-white/10 dark:text-gray-300">
          {tag}
        </li>
      ))}
    </ul>
    {project.measured && (
      <dl className="mt-6 flex flex-wrap gap-6">
        {project.measured.map(m => (
          <div key={m.label}>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-gray-500">{m.label}</dt>
            <dd className="font-display text-2xl font-bold text-gray-900 dark:text-gray-100">{m.value}</dd>
            <dd className="font-mono text-[10px] text-gray-400">{m.source}</dd>
          </div>
        ))}
      </dl>
    )}
    <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
      {project.client} · {project.year}
    </p>
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary dark:bg-white dark:text-gray-900 dark:hover:bg-primary dark:hover:text-white"
    >
      {projectLinkLabel(project.link)}
      <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  </div>
)

const Intro = () => (
  <div className="text-left">
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Selected work</p>
    <h2 className="mt-4 font-display text-4xl font-bold tracking-tightest text-gray-900 dark:text-gray-100 md:text-5xl">
      Built, shipped, and ready to inspect.
    </h2>
    <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
      No mockups. Every project below is running or public — open it and look for yourself.
    </p>
  </div>
)

/**
 * Selected work. On large screens with motion allowed, the section pins and the
 * projects travel sideways as the page scrolls; everywhere else it is a plain
 * stacked list. Both layouts link to the real product or repository.
 */
const WorkScroller = () => {
  const cinematic = useMediaQuery(CINEMATIC_QUERY)
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!cinematic || !root.current) return
      const pin = root.current.querySelector<HTMLElement>('[data-pin]')!
      const track = root.current.querySelector<HTMLElement>('[data-track]')!
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)

      const travel = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          pin: true,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })

      gsap.utils.toArray<HTMLElement>('[data-panel]').forEach(panel => {
        const shot = panel.querySelector('[data-shot]')
        if (shot) {
          gsap.fromTo(
            shot,
            { xPercent: -8 },
            {
              xPercent: 0,
              ease: 'none',
              scrollTrigger: { trigger: panel, containerAnimation: travel, start: 'left right', end: 'right left', scrub: true },
            }
          )
        }
        gsap.from(panel.querySelector('[data-copy]'), {
          y: 40,
          opacity: 0,
          ease: 'power2.out',
          scrollTrigger: { trigger: panel, containerAnimation: travel, start: 'left 70%', end: 'left 30%', scrub: true },
        })
      })

      gsap.fromTo('[data-progress]', { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, scrub: true },
      })

      // Keyboard users: tabbing to a link in an off-screen panel scrolls the
      // page to the point where that panel is in view.
      const onFocus = (event: FocusEvent) => {
        const panel = (event.target as HTMLElement).closest<HTMLElement>('[data-panel]')
        const st = travel.scrollTrigger
        if (!panel || !st || distance() === 0) return
        const progress = Math.min(1, Math.max(0, (panel.offsetLeft - 80) / distance()))
        window.scrollTo({ top: st.start + progress * (st.end - st.start), behavior: 'auto' })
      }
      track.addEventListener('focusin', onFocus)
      ScrollTrigger.refresh()
      return () => track.removeEventListener('focusin', onFocus)
    },
    { scope: root, dependencies: [cinematic], revertOnUpdate: true }
  )

  if (!cinematic) {
    return (
      <section id="work" className="scroll-mt-20 py-20 md:py-24">
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }} className="mb-12 max-w-xl">
            <Intro />
          </motion.div>
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55 }}
                className="grid items-center gap-8 md:grid-cols-2"
              >
                <BrowserShot project={project} />
                <ProjectText project={project} index={index} />
              </motion.div>
            ))}
          </div>
          <Link to="/projects" className="group mt-12 inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300">
            View all projects <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section ref={root} id="work" className="relative">
      <div data-pin className="relative flex h-screen items-center overflow-hidden">
        <div
          data-track
          className="flex h-full items-center gap-[6vw] pl-[max(2rem,calc((100vw-1200px)/2+2rem))] pr-[8vw] will-change-transform"
        >
          <div className="w-[26rem] flex-shrink-0">
            <Intro />
            <p className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-gray-400">
              Scroll <Arrow className="h-4 w-4" />
            </p>
          </div>

          {projects.map((project, index) => (
            <article
              key={project.id}
              data-panel
              className="grid w-[min(78vw,68rem)] flex-shrink-0 grid-cols-[1.35fr_1fr] items-center gap-12"
            >
              <BrowserShot project={project} parallax />
              <div data-copy>
                <ProjectText project={project} index={index} />
              </div>
            </article>
          ))}

          <div data-panel className="flex w-[22rem] flex-shrink-0 flex-col items-start">
            <p className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Details, stacks and write-ups for each project.
            </p>
            <Link
              to="/projects"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:border-primary hover:text-primary dark:border-white/15 dark:text-gray-200"
            >
              View all projects <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-10">
          <div className="container">
            <div className="h-px overflow-hidden bg-gray-200 dark:bg-white/10">
              <div data-progress className="h-full origin-left bg-primary"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkScroller
