import { motion } from 'framer-motion'
import Button from '../components/Button'
import BookingButton from '../components/BookingButton'
import PageHero from '../components/PageHero'
import Section, { SectionHeader, cardClass, fadeUp } from '../components/Section'

const facts = [
  { k: 'Founded', v: '2025' },
  { k: 'Where we are', v: 'Australia and Dhaka, Bangladesh' },
  { k: 'Who we serve', v: 'Australia, USA, Canada, Europe and Bangladesh' },
  { k: 'How we price', v: 'Quoted per project against a written scope' },
]

const pillars = [
  {
    title: 'Our Vision',
    body: 'To be at the forefront of technological innovation, creating software solutions that empower businesses to reach their full potential in the digital era.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </>
    ),
  },
  {
    title: 'Our Mission',
    body: 'To deliver innovative, high-quality software solutions that solve complex challenges, drive growth, and create meaningful value for our clients and their customers.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    ),
  },
  {
    title: 'Our Values',
    body: 'Excellence, integrity, innovation, collaboration, and client-centricity guide everything we do at EXORIT, shaping how we approach our work and build relationships.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
  },
]

const values = [
  {
    value: 'Excellence',
    description:
      'We strive for excellence in everything we do, setting high standards and constantly improving our work.',
  },
  {
    value: 'Integrity',
    description: 'We act with honesty and transparency, building trust with our clients and within our team.',
  },
  {
    value: 'Innovation',
    description:
      'We embrace creative thinking and stay at the cutting edge of technology to deliver forward-thinking solutions.',
  },
  {
    value: 'Collaboration',
    description:
      'We believe that the best results come from teamwork, open communication, and diverse perspectives.',
  },
  {
    value: 'Client-centricity',
    description:
      "We put our clients' needs first, focusing on building solutions that create real value for their businesses.",
  },
  {
    value: 'Continuous Learning',
    description:
      'We foster a culture of growth and development, staying ahead through continuous learning and skill enhancement.',
  },
]

const AboutPage = () => (
  <>
    <PageHero
      eyebrow="Who we are"
      title="About EXORIT"
      lead="Building web and mobile products, AI integrations, and data pipelines that elevate digital experiences."
    />

    {/* Our Story */}
    <Section divider={false}>
      <div className="flex flex-col items-start gap-12 lg:flex-row">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-left lg:w-3/5"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Our story</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tightest text-gray-900 dark:text-gray-100 md:text-4xl">
            How EXORIT started
          </h2>
          <div className="mt-6 h-px w-16 bg-primary/50" aria-hidden="true"></div>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            <p>
              EXORIT was founded in 2025 around a straightforward observation: plenty of businesses have a clear
              idea of the software they need, and very few have a reliable way to get it built without either
              hiring a full team or handing the work to someone who disappears for a month at a time.
            </p>
            <p>
              We started by building our own products — a recruiting platform, an encrypted publishing tool and a
              book community app — because shipping real software teaches more about delivery than any amount of
              planning. Those systems are still running, and you can open every one of them from our projects
              page.
            </p>
            <p>
              Today we build custom web platforms, mobile applications and AI systems for clients in Australia,
              Europe, North America and Bangladesh. Every project is scoped and quoted on its own, and every
              project shows a working demo each week. Our people work across Australia and Bangladesh, so clients
              get real working overlap rather than an inbox that answers overnight.
            </p>
            <p>
              We are deliberately small. Every project is run by the people who write the code — there is no
              account manager sitting between you and the engineering.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full lg:w-2/5"
        >
          <dl className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10">
            {facts.map((row, index) => (
              <div
                key={row.k}
                className={`flex flex-col gap-1 p-6 text-left ${
                  index > 0 ? 'border-t border-gray-200 dark:border-white/10' : ''
                }`}
              >
                <dt className="font-mono text-xs uppercase tracking-widest text-primary">{row.k}</dt>
                <dd className="text-gray-800 dark:text-gray-200">{row.v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </Section>

    {/* Vision, Mission, Values */}
    <Section>
      <SectionHeader
        eyebrow="What guides us"
        title="Vision, Mission & Core Values"
        lead="The short version of how we decide what to build and how to behave while building it."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={cardClass}
          >
            <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                {pillar.icon}
              </svg>
            </div>
            <h3 className="mb-3 font-display text-xl font-semibold text-gray-900 dark:text-gray-100">
              {pillar.title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{pillar.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-4xl">
        <h3 className="mb-10 text-center font-display text-2xl font-bold text-gray-900 dark:text-gray-100">
          Core values that drive us
        </h3>
        <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 sm:grid sm:grid-cols-2">
          {values.map((item, index) => (
            <motion.div
              key={item.value}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`flex gap-4 p-6 text-left ${index > 0 ? 'border-t border-gray-200 dark:border-white/10' : ''} ${
                index === 1 ? 'sm:border-t-0' : ''
              } ${index % 2 === 1 ? 'sm:border-l sm:border-gray-200 sm:dark:border-white/10' : ''}`}
            >
              <span className="font-mono text-sm text-primary">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h4 className="mb-1 font-display text-base font-semibold text-gray-900 dark:text-gray-100">
                  {item.value}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>

    {/* CTA */}
    <section className="overflow-hidden pb-24 pt-4">
      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-16 text-center sm:px-16 dark:bg-white/[0.04] dark:ring-1 dark:ring-white/10"
        >
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage:
                'radial-gradient(40rem 20rem at 15% -20%, rgba(0,123,255,0.45) 0%, transparent 60%), radial-gradient(30rem 18rem at 90% 120%, rgba(0,123,255,0.28) 0%, transparent 55%)',
            }}
            aria-hidden="true"
          ></div>
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tightest text-white md:text-4xl">
              Join us in building the future
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-300">
              Whether you are looking to work with us or join our team, we would like to hear from you.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <BookingButton location="about_cta" variant="light" />
              <Button
                to="/careers"
                variant="outline"
                size="lg"
                className="!border-white/30 !text-white hover:!border-white hover:!bg-white/10 hover:!text-white"
              >
                View careers
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  </>
)

export default AboutPage
