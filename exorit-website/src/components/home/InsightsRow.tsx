import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Section, { fadeUp } from '../Section'
import { blogPosts } from '../../config/blog'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

/** Latest three posts. Shows how we think before anyone books a call. */
const InsightsRow = () => {
  const latest = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)

  return (
    <Section id="insights">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-10 flex flex-col items-start justify-between gap-5 text-left sm:flex-row sm:items-end"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Insights</p>
          <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tightest text-gray-900 dark:text-gray-100 md:text-4xl">
            How we think about the work.
          </h2>
        </div>
        <Link
          to="/blog"
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-primary dark:text-gray-300"
        >
          All articles
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </Link>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {latest.map((post, index) => (
          <motion.article
            key={post.slug}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative flex flex-col rounded-2xl border border-gray-200 p-7 text-left transition-colors duration-200 hover:border-primary/40 dark:border-white/10"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{post.tag}</p>
            <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-gray-900 dark:text-gray-100">
              <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                {post.title}
              </Link>
            </h3>
            <p className="mt-3 line-clamp-3 flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {post.description}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 font-mono text-[11px] text-gray-500 dark:border-white/10 dark:text-gray-400">
              <span>
                {formatDate(post.date)} · {post.readingTime}
              </span>
              <svg className="h-4 w-4 text-primary transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}

export default InsightsRow
