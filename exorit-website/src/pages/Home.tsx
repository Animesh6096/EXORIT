import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import BookingButton from '../components/BookingButton'
import TrustStrip from '../components/TrustStrip'
import { engagements, faqs, icps, positioning, process } from '../config/site'
import WebAnimation from '../components/WebAnimation'
import CodingWindow from '../components/CodingWindow'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useRef } from 'react'
import Section, { SectionHeader, fadeUp } from '../components/Section'

const icon = (path: string) => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
)

const services = [
  {
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built to be maintained by whoever comes next.',
    icon: icon('M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'),
  },
  {
    title: 'App Development',
    description: 'Cross-platform mobile applications sharing one codebase and one release process.',
    icon: icon('M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'),
  },
  {
    title: 'iOS Development',
    description: 'Native iPhone and iPad applications for when the platform genuinely calls for it.',
    icon: icon('M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'),
  },
  {
    title: 'Web Design',
    description: 'Interface design done by the people who will build it, so the design survives implementation.',
    icon: icon('M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'),
  },
  {
    title: 'AI Integration',
    description: 'LLM features, retrieval over your own documents, and automation wired into systems you already run.',
    icon: icon('M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'),
  },
  {
    title: 'Data Collection & Preprocessing',
    description: 'Sourcing, cleaning, labeling and evaluation pipelines for models and analytics.',
    icon: icon('M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'),
  },
]

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for hero background
  const [backgroundRef, backgroundY] = useScrollAnimation({
    offset: [0, 1],
    outputRange: [0, 100]
  });

  // Fade effect for services
  const [servicesRef, servicesOpacity] = useScrollAnimation({
    offset: [-0.5, 0.5],
    outputRange: [0, 1]
  });

  // Scale effect for CTA
  const [ctaRef, ctaScale] = useScrollAnimation({
    offset: [-0.3, 0.3],
    outputRange: [0.95, 1]
  });

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        <motion.div 
          ref={backgroundRef}
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-r from-gray-900 to-blue-900 opacity-80 z-0 dark:from-gray-800 dark:to-gray-700"
        ></motion.div>
        <motion.div 
          ref={backgroundRef}
          className="absolute inset-0 z-10 opacity-20 dark:opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: backgroundY
          }}
        ></motion.div>
        {/* Scrim: the hero photograph is busy, and the headline has to win. */}
        <div
          className="absolute inset-0 z-10 bg-gradient-to-b from-gray-900/85 via-gray-900/70 to-gray-900/90 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/95"
          aria-hidden="true"
        ></div>
        {/* Same ambient treatment as the inner-page and 404 heroes: blue blooms over a fine grid. */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-90"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 17% 26%, rgba(0,123,255,.24), transparent 25%), radial-gradient(circle at 83% 68%, rgba(0,123,255,.18), transparent 28%), linear-gradient(rgba(148,163,184,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.08) 1px, transparent 1px)',
            backgroundSize: 'auto, auto, 42px 42px, 42px 42px',
          }}
        ></div>
        <div className="absolute inset-0 z-20 pointer-events-auto">
          <WebAnimation />
        </div>
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 dark:text-gray-100"
              >
                {positioning.headline}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg text-gray-300 mb-8 dark:text-gray-400"
              >
                {positioning.subhead}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <BookingButton location="hero">{positioning.primaryCta}</BookingButton>
                <Button to="/projects" variant="outline" size="lg">
                  {positioning.secondaryCta}
                </Button>
              </motion.div>
            </div>
            <CodingWindow />
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30"
        >
          <a 
            href="#about" 
            className="flex flex-col items-center text-white dark:text-gray-300"
            aria-label="Scroll down"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <svg className="animate-bounce w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 z-30">
          <TrustStrip />
        </div>
      </section>

      {/* About */}
      <Section id="about">
        <SectionHeader
          eyebrow="Who we are"
          title="About EXORIT"
          lead="A small senior team building software that fits the business it belongs to."
        />
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400 md:text-left">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            EXORIT is a software studio building custom web platforms, mobile applications and AI systems for
            businesses that need software shaped around how they actually work. We cover the whole build — design,
            web and iOS development, AI integration, and the data pipelines underneath it.
          </motion.p>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            We work with clients across Australia, Europe, North America and Bangladesh, and we run every project
            the same way: a written scope before anything starts, a working demo every week, and code that belongs
            to you from the first commit.
          </motion.p>
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-800 transition-colors duration-200 hover:border-primary hover:text-primary dark:border-white/15 dark:text-gray-200"
          >
            Learn more about us
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7M3 12h18" />
            </svg>
          </Link>
        </div>
      </Section>

      {/* Services */}
      <Section ref={servicesRef}>
        <motion.div style={{ opacity: servicesOpacity }}>
          <SectionHeader
            eyebrow="Capabilities"
            title="What We Offer"
            lead="One team across the whole build, rather than four vendors pointing at each other."
          />
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 dark:border-white/10 dark:bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group bg-white p-8 text-left transition-colors duration-200 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-white/[0.03]"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {service.icon}
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Who We Work With */}
      <Section>
        <SectionHeader
          eyebrow="Fit"
          title="Who We Work With"
          lead="If your project is not one of these, we will say so on the first call and point you somewhere better."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {icps.map((icp, index) => (
            <motion.div
              key={icp.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-gray-200 p-8 text-left transition-colors duration-200 hover:border-primary/40 dark:border-white/10"
            >
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">{icp.fit}</p>
              <h3 className="mb-3 font-display text-lg font-semibold text-gray-900 dark:text-gray-100">{icp.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{icp.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* How We Work */}
      <Section>
        <SectionHeader
          eyebrow="Process"
          title="How We Work"
          lead="The risk in hiring a remote team is not skill. It is silence. Here is what removes it."
        />
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/60 dark:border-white/10 dark:bg-white/[0.02]">
          {process.map((item, index) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={`flex flex-col gap-4 p-8 text-left sm:flex-row sm:gap-8 sm:p-10 ${
                index > 0 ? 'border-t border-gray-200 dark:border-white/10' : ''
              }`}
            >
              <span className="font-mono text-sm text-primary sm:w-16 sm:flex-shrink-0 sm:pt-1">{item.step}</span>
              <div className="sm:max-w-2xl">
                <h3 className="mb-2 font-display text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Engagements */}
      <Section>
        <SectionHeader
          eyebrow="Engagements"
          title="Ways to Work Together"
          lead="Every project is custom, so every project is quoted on its own — usually within a couple of days of the first call."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {engagements.map((engagement, index) => (
            <motion.div
              key={engagement.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col rounded-2xl border border-gray-200 p-8 text-left transition-colors duration-200 hover:border-primary/40 dark:border-white/10"
            >
              <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-gray-100">{engagement.name}</h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-primary">{engagement.duration}</p>
              <p className="mt-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{engagement.summary}</p>
              <ul className="mt-6 mb-8 flex-grow space-y-3">
                {engagement.deliverables.map(item => (
                  <li key={item} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <BookingButton location={`engagement_${engagement.id}`} size="md" className="w-full">
                Get a quote
              </BookingButton>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader eyebrow="Questions" title="Questions Clients Ask First" />
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-200 text-left dark:border-white/10">
          {faqs.map((faq, index) => (
            <details
              key={faq.q}
              className={`group px-6 py-5 sm:px-8 ${index > 0 ? 'border-t border-gray-200 dark:border-white/10' : ''}`}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-base font-medium text-gray-900 dark:text-gray-100">
                {faq.q}
                <svg
                  className="mt-1 h-4 w-4 flex-shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Closing CTA — a contained panel, not a full-bleed colour band */}
      <section ref={ctaRef} className="overflow-hidden pb-24 pt-4">
        <div className="container">
          <motion.div
            style={{ scale: ctaScale }}
            className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-16 text-center sm:px-16 dark:bg-white/[0.04] dark:ring-1 dark:ring-white/10"
          >
            <div
              className="absolute inset-0 opacity-90"
              style={{
                backgroundImage:
                  'radial-gradient(40rem 20rem at 15% -20%, rgba(0,123,255,0.45) 0%, transparent 60%), radial-gradient(30rem 18rem at 90% 120%, rgba(0,123,255,0.28) 0%, transparent 55%)',
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tightest text-white md:text-4xl">
                Tell us what you are trying to build
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-300">
                Twenty minutes. You leave with an honest answer on whether it is buildable, roughly what it
                involves, and whether we are the right team for it.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <BookingButton location="footer_cta" variant="light">
                  {positioning.primaryCta}
                </BookingButton>
                <Button
                  to="/contact"
                  variant="outline"
                  size="lg"
                  className="!border-white/30 !text-white hover:!border-white hover:!bg-white/10 hover:!text-white"
                >
                  Send a message instead
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home
