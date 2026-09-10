import { motion } from 'framer-motion'
import { forwardRef, ReactNode } from 'react'

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

/**
 * Shared section shell. Pages share one background; sections are separated by a
 * tinted rule that spans only the content column and fades at both ends.
 */
const Section = forwardRef<HTMLElement, { id?: string; className?: string; divider?: boolean; children: ReactNode }>(
  ({ id, className = '', divider = true, children }, ref) => (
    <section id={id} ref={ref} className={`py-20 md:py-24 ${className}`}>
      <div className="container">
        {divider && (
          <div
            className="mb-20 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:mb-24 dark:via-primary/50"
            aria-hidden="true"
          ></div>
        )}
        {children}
      </div>
    </section>
  )
)
Section.displayName = 'Section'

export const SectionHeader = ({
  eyebrow,
  title,
  lead,
  align = 'center',
}: {
  eyebrow: string
  title: string
  lead?: string
  align?: 'center' | 'left'
}) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6 }}
    className={align === 'center' ? 'mx-auto mb-14 max-w-2xl text-center' : 'mb-14 max-w-2xl text-left'}
  >
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
    <h2 className="mt-4 font-display text-3xl font-bold tracking-tightest text-gray-900 dark:text-gray-100 md:text-4xl">
      {title}
    </h2>
    <div
      className={`mt-6 h-px w-16 bg-primary/50 ${align === 'center' ? 'mx-auto' : ''}`}
      aria-hidden="true"
    ></div>
    {lead && <p className="mt-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">{lead}</p>}
  </motion.div>
)

/** Card treatment used across the site: bordered, unshadowed, border warms on hover. */
export const cardClass =
  'rounded-2xl border border-gray-200 p-8 text-left transition-colors duration-200 hover:border-primary/40 dark:border-white/10'

export default Section
