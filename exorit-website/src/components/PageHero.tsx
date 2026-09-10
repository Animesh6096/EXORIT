import { motion } from 'framer-motion'
import { ReactNode } from 'react'

/**
 * Header for inner pages. Uses the same ambient treatment as the 404 page:
 * blue blooms over a faint grid on a slate ground in light mode, deepened to
 * near-navy in dark mode.
 */
const PageHero = ({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string
  title: string
  lead?: string
  children?: ReactNode
}) => (
  <section className="relative isolate overflow-hidden bg-slate-50 pb-20 pt-36 text-gray-900 md:pb-24 md:pt-44 dark:bg-[#071329] dark:text-white">
    <div
      className="pointer-events-none absolute inset-0 -z-10 opacity-100 dark:opacity-70"
      aria-hidden="true"
      style={{
        backgroundImage:
          'radial-gradient(circle at 17% 26%, rgba(0,123,255,.24), transparent 25%), radial-gradient(circle at 83% 68%, rgba(0,123,255,.18), transparent 28%), linear-gradient(rgba(148,163,184,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.06) 1px, transparent 1px)',
        backgroundSize: 'auto, auto, 42px 42px, 42px 42px',
      }}
    />
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-blue-50 to-transparent dark:from-[#050b18]"
      aria-hidden="true"
    />

    <div className="container relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tightest text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          {title}
        </h1>
        <div className="mx-auto mt-7 h-px w-16 bg-primary/60" aria-hidden="true"></div>
        {lead && <p className="mt-7 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{lead}</p>}
        {children && <div className="mt-10 flex flex-wrap justify-center gap-4">{children}</div>}
      </motion.div>
    </div>
  </section>
)

export default PageHero
