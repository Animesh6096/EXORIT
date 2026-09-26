import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Section, { SectionHeader, fadeUp } from '../Section'
import { clientLogos, faqs, registrations, thirdPartyProfiles, trustSignals } from '../../config/site'
import { projects, shippedStack } from '../../config/projects'
import { lighthouse, type LighthouseScores } from '../../config/lighthouse.generated'

const ScoreRing = ({ label, value }: { label: string; value: number }) => {
  const r = 26
  const c = 2 * Math.PI * r
  const color = value >= 90 ? 'text-emerald-500' : value >= 50 ? 'text-amber-500' : 'text-rose-500'
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
          <circle cx="32" cy="32" r={r} className="fill-none stroke-gray-200 dark:stroke-white/10" strokeWidth="5" />
          <motion.circle
            cx="32"
            cy="32"
            r={r}
            className={`fill-none stroke-current ${color}`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold text-gray-900 dark:text-gray-100">
          {value}
        </span>
      </div>
      <span className="text-center font-mono text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  )
}

const labels: [keyof LighthouseScores, string][] = [
  ['performance', 'Performance'],
  ['accessibility', 'Accessibility'],
  ['best-practices', 'Best practices'],
  ['seo', 'SEO'],
]

const nda = faqs.find(f => f.q.includes('NDA'))
const payments = faqs.find(f => f.q.includes('payments'))

/** Commitments that are written into how we work — each one sourced from site.ts. */
const commitments = [
  trustSignals[1],
  trustSignals[2],
  nda ? 'NDA signed before any technical detail is discussed' : null,
  payments ? 'Billed against milestones, with the total agreed in advance' : null,
].filter(Boolean) as string[]


const Card = ({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5 }}
    className={`rounded-2xl border border-gray-200 p-7 text-left dark:border-white/10 ${className}`}
  >
    <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">{title}</p>
    {children}
  </motion.div>
)

/**
 * The substitute for testimonials: things a buyer can verify without asking
 * anyone. Scores come from a real Lighthouse run (scripts/measure-lighthouse.mjs);
 * links go to real, public work. Third-party profiles, registrations and client
 * logos appear here automatically once they exist in site.ts.
 */
const AuditPanel = () => {
  // Four copies so half the track is always wider than the container.
  const lh = lighthouse
  const stack = [...shippedStack, ...shippedStack, ...shippedStack, ...shippedStack]

  return (
    <Section id="audit">
      <SectionHeader
        eyebrow="Verify it"
        title="Don't take our word for it. Check the work."
        lead="Everything on this panel can be checked without talking to us — open the apps and use them yourself."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Live apps" className="lg:col-span-1">
          <ul className="space-y-3">
            {projects.map(p => (
              <li key={p.id}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-4 py-3 transition-colors hover:border-primary/50 dark:border-white/10"
                >
                  <span>
                    <span className="block font-display text-sm font-semibold text-gray-900 dark:text-gray-100">{p.title}</span>
                    <span className="block font-mono text-[11px] text-gray-500 dark:text-gray-400">
                      {p.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                  </span>
                  <svg className="h-4 w-4 flex-shrink-0 text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </Card>

        {lh && (
          <Card title="This website, measured" className="lg:col-span-1">
            {(['mobile', 'desktop'] as const).map(device => (
              <div key={device} className="mb-6 last:mb-0">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-gray-400">{device}</p>
                <div className="grid grid-cols-4 gap-2">
                  {labels.map(([key, label]) => (
                    <ScoreRing key={key} label={label} value={lh[device][key]} />
                  ))}
                </div>
              </div>
            ))}
            <p className="mt-5 font-mono text-[10px] text-gray-400">
              {lh.tool} · production build · median of 3 runs · {lh.measuredAt}
            </p>
          </Card>
        )}

        <Card title="In writing, every project" className={lh ? 'lg:col-span-1' : 'lg:col-span-2'}>
          <ul className="space-y-4">
            {commitments.map(c => (
              <li key={c} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {c}
              </li>
            ))}
          </ul>
        </Card>

        {(thirdPartyProfiles.length > 0 || registrations.length > 0) && (
          <Card title="Independently listed" className="lg:col-span-3">
            <ul className="flex flex-wrap gap-3">
              {thirdPartyProfiles.map(p => (
                <li key={p.name}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:border-primary/50 dark:border-white/10">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{p.name}</span>
                    {p.rating && <span className="text-gray-600 dark:text-gray-400">★ {p.rating}</span>}
                    {p.reviews != null && <span className="text-gray-500">({p.reviews} reviews)</span>}
                  </a>
                </li>
              ))}
              {registrations.map(r => (
                <li key={r.label} className="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 dark:border-white/10 dark:text-gray-300">
                  {r.href ? (
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      {r.label}
                    </a>
                  ) : (
                    r.label
                  )}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {clientLogos.length > 0 && (
          <Card title="Clients" className="lg:col-span-3">
            <ul className="flex flex-wrap items-center gap-10">
              {clientLogos.map(l => (
                <li key={l.name}>
                  <img src={l.src} alt={l.name} className="h-8 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" loading="lazy" />
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      {/* Only technologies that appear in shipped work. */}
      <div className="relative mt-10 overflow-hidden" aria-label="Technologies in our shipped work">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent dark:from-gray-900" aria-hidden="true"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent dark:from-gray-900" aria-hidden="true"></div>
        <ul className="marquee-track flex w-max items-center gap-3 [animation-duration:30s]">
          {stack.map((tech, i) => (
            <li
              key={`${tech}-${i}`}
              aria-hidden={i >= shippedStack.length}
              className="whitespace-nowrap rounded-full border border-gray-200 px-4 py-1.5 font-mono text-xs text-gray-600 dark:border-white/10 dark:text-gray-300"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export default AuditPanel
