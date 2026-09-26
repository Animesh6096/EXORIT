import { ComponentType } from 'react'
import { motion } from 'framer-motion'
import Section, { SectionHeader, fadeUp } from '../Section'
import { AiDemo, AppDemo, DataDemo, DesignDemo, IosDemo, WebDemo } from './serviceDemos'

const services: { title: string; description: string; Demo: ComponentType; span: string; wide?: boolean }[] = [
  {
    title: 'AI Integration',
    description: 'LLM features, retrieval over your own documents, and automation wired into systems you already run.',
    Demo: AiDemo,
    span: 'md:col-span-2 lg:col-span-4',
  },
  {
    title: 'Data Collection & Preprocessing',
    description: 'Sourcing, cleaning, labeling and evaluation pipelines for models and analytics.',
    Demo: DataDemo,
    span: 'lg:col-span-2',
  },
  {
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built to be maintained by whoever comes next.',
    Demo: WebDemo,
    span: 'lg:col-span-2',
  },
  {
    title: 'App Development',
    description: 'Cross-platform mobile applications sharing one codebase and one release process.',
    Demo: AppDemo,
    span: 'lg:col-span-2',
  },
  {
    title: 'iOS Development',
    description: 'Native iPhone and iPad applications for when the platform genuinely calls for it.',
    Demo: IosDemo,
    span: 'lg:col-span-2',
  },
  {
    title: 'Web Design',
    description: 'Interface design done by the people who will build it, so the design survives implementation.',
    Demo: DesignDemo,
    span: 'lg:col-span-6',
    wide: true,
  },
]

/** Capabilities as a bento grid; each cell shows the kind of thing it produces. */
const ServiceBento = () => (
  <Section id="services">
    <SectionHeader
      eyebrow="Capabilities"
      title="What We Offer"
      lead="One team across the whole build, rather than four vendors pointing at each other."
    />
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
      {services.map(({ title, description, Demo, span, wide }, index) => (
        <motion.div
          key={title}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: (index % 3) * 0.06 }}
          className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white text-left transition-colors duration-200 hover:border-primary/40 dark:border-white/10 dark:bg-white/[0.02] ${span} ${
            wide ? 'md:col-span-2 lg:grid lg:grid-cols-[1fr_1.4fr] lg:items-center' : ''
          }`}
        >
          <div
            className={`relative bg-gray-50/80 p-6 dark:bg-white/[0.02] ${wide ? 'lg:order-2 lg:h-full lg:border-l lg:border-gray-200 lg:dark:border-white/10' : 'border-b border-gray-200 dark:border-white/10'}`}
            aria-hidden="true"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(148,163,184,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.12) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            ></div>
            <div className="relative">
              <Demo />
            </div>
          </div>
          <div className="p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 font-display text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </Section>
)

export default ServiceBento
