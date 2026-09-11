import { motion } from 'framer-motion'
import Section, { SectionHeader, fadeUp } from './Section'
import { testimonials, type Testimonial } from '../config/site'
import { demoTestimonials } from '../config/testimonials.demo'

/**
 * Client testimonials.
 *
 * Renders nothing while `testimonials` is empty — which it is today, because
 * EXORIT has no delivered client work that has produced a quote yet. An empty
 * "What clients say" heading is worse than no section at all, and inventing
 * quotes is not an option (see the note on the config array). Add real entries
 * to `testimonials` in src/config/site.ts and this appears automatically.
 *
 * Deliberately NOT a card grid or a marquee. Both are the default shape for
 * this section on every agency site, and with three or four quotes a marquee
 * reads as padding rather than abundance. This is an editorial spread instead:
 * the strongest quote set large as a pull quote, the rest as a hairline-divided
 * column list. It borrows the page's existing language — the tinted rule from
 * Section, mono eyebrows, display type — so nothing new had to be invented.
 *
 * In `vite dev` only, and only while the real array is empty, this falls back to
 * `demoTestimonials` — lorem-ipsum placeholders, so the layout can be reviewed.
 * `import.meta.env.DEV` is statically false in a production build, so the branch
 * and the data it imports are tree-shaken out: no placeholder can reach the live
 * site. A visible PREVIEW badge marks the fallback so it is never mistaken for
 * real content in a screenshot.
 */
const isPreview = import.meta.env.DEV && testimonials.length === 0
const entries = isPreview ? demoTestimonials : testimonials

const initialsOf = (name: string) =>
  name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')

/** Avatar, or the person's initials when no photo exists. */
const Portrait = ({ testimonial, size }: { testimonial: Testimonial; size: 'sm' | 'lg' }) => {
  const box = size === 'lg' ? 'h-12 w-12 text-sm' : 'h-9 w-9 text-[11px]'

  if (testimonial.avatar) {
    return (
      <img
        src={testimonial.avatar}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={`${box} flex-shrink-0 rounded-full object-cover ring-1 ring-gray-200 dark:ring-white/15`}
      />
    )
  }

  return (
    <span
      className={`${box} flex flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono font-medium text-primary`}
      aria-hidden="true"
    >
      {initialsOf(testimonial.name)}
    </span>
  )
}

const Attribution = ({ testimonial, size }: { testimonial: Testimonial; size: 'sm' | 'lg' }) => (
  <figcaption className="flex items-center gap-3">
    <Portrait testimonial={testimonial} size={size} />
    <div className="min-w-0">
      <p
        className={`truncate font-medium text-gray-900 dark:text-gray-100 ${
          size === 'lg' ? 'text-base' : 'text-sm'
        }`}
      >
        {testimonial.name}
      </p>
      <p className="truncate font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-500">
        {testimonial.role} · {testimonial.company}
      </p>
    </div>
  </figcaption>
)

const Testimonials = () => {
  if (entries.length === 0) return null

  const [lead, ...rest] = entries

  return (
    <Section>
      <SectionHeader
        eyebrow="Clients"
        title="What clients say"
        lead="The short version, from the people who paid for the work."
      />

      {isPreview && (
        <p className="mx-auto -mt-6 mb-10 max-w-full rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-center font-mono text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400 sm:w-fit">
          Preview only · placeholder text, not real testimonials
        </p>
      )}

      {/* Lead quote — set large, no box. The oversized glyph is decorative and
          sits in its own gutter so it never collides with the text. */}
      <motion.figure
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-3xl pt-14 text-center"
      >
        <span
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none font-display text-[6rem] leading-[0.75] text-primary/15 dark:text-primary/20"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <blockquote className="relative">
          <p className="font-display text-2xl font-medium leading-snug tracking-tightest text-gray-900 dark:text-gray-100 md:text-[2rem]">
            {lead.quote}
          </p>
        </blockquote>

        <div className="mt-8 flex justify-center">
          <Attribution testimonial={lead} size="lg" />
        </div>
      </motion.figure>

      {rest.length > 0 && (
        <>
          <div
            className={`mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 ${
              rest.length % 3 === 0 ? 'lg:grid-cols-3' : ''
            }`}
          >
            {rest.map((testimonial, index) => (
              <motion.figure
                key={`${testimonial.name}-${testimonial.company}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex flex-col border-t border-gray-200 pt-5 dark:border-white/10"
              >
                <p className="font-mono text-[11px] tracking-widest text-primary">
                  {String(index + 1).padStart(2, '0')}
                </p>

                <blockquote className="mt-4 flex-grow">
                  <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                    {testimonial.quote}
                  </p>
                </blockquote>

                <div className="mt-6">
                  <Attribution testimonial={testimonial} size="sm" />
                </div>
              </motion.figure>
            ))}
          </div>
        </>
      )}
    </Section>
  )
}

export default Testimonials
