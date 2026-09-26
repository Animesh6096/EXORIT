import { motion } from 'framer-motion'
import { ReactNode } from 'react'

/**
 * Page intro for inner pages. Deliberately not a hero: no tinted band, no
 * glow, no full-width block — just the page's title set on the page itself,
 * left-aligned, with a hairline rule underneath. It stays compact on phones,
 * where a big header pushed all the content below the fold.
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
  <header className="pt-28 md:pt-36">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl text-left"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tightest text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">{lead}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
      </motion.div>
      <div
        className="mt-10 h-px bg-gradient-to-r from-primary/50 via-gray-200 to-transparent dark:via-white/10 md:mt-14"
        aria-hidden="true"
      ></div>
    </div>
  </header>
)

export default PageHero
