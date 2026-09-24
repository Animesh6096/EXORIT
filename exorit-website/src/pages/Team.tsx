import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import PageHero from '../components/PageHero'
import Section, { fadeUp } from '../components/Section'
import { useSeo } from '../hooks/useSeo'
import { site } from '../config/site'

interface TeamMember {
  name: string
  /** Full title used in schema and under the name. */
  role: string
  /** One line on what this person actually owns. Keeps the C-title concrete. */
  owns: string
  location: string
  /** Rectangular portrait, used for Person schema and social previews. */
  image: string
  /** Transparent-background cut-out for the panel treatment. See scripts/generate-team-cutouts.py. */
  cutout: string
  /**
   * First-person statement. DRAFT — written to match each founder's real role
   * and background, but these are words attributed to a named real person, so
   * each founder should read their own and rewrite it in their actual voice
   * before this goes live.
   */
  statement: string
  socials: {
    facebook?: string
    linkedin: string
    github: string
  }
}

const teamMembers: TeamMember[] = [
  {
    name: 'Maisha Iffat Chowdhury',
    role: 'Co-Founder & CEO',
    owns: 'Company direction, partnerships and product vision',
    location: 'Adelaide, Australia',
    image: '/team/maisha.webp',
    cutout: '/team/maisha-cutout.webp',
    statement:
      'A studio earns trust by being plain about three things: what it will build, what it will cost, and what it will not do. My job is to keep EXORIT honest on all three. I came to this from design, and I still build what I design, so the product a client pictured is the one that ships. Studying cyber security has shaped how I run the company too: your code and your data are yours from the first commit, not something we hand over at the end.',
    socials: {
      facebook: 'https://www.facebook.com/maishahahaha',
      linkedin: 'https://www.linkedin.com/in/maisha-iffat-chowdhury',
      github: 'https://github.com/maishahaha',
    },
  },
  {
    name: 'Golam Tawhid Fahad',
    role: 'Co-Founder & CTO',
    owns: 'Architecture, code quality and technical decisions',
    location: 'Dhaka, Bangladesh',
    image: '/team/tawhid.webp',
    cutout: '/team/tawhid-cutout.webp',
    statement:
      'The measure of a codebase is not whether it works on launch day. It is whether someone who has never seen it can safely change it a year later. That is what I am protecting when I review a commit. We hand over repositories people can actually keep building on, not ones they have to work around.',
    socials: {
      facebook: 'https://www.facebook.com/gt.fahad',
      linkedin: 'https://www.linkedin.com/in/g-t-fahad/',
      github: 'https://github.com/Golam-Tawhid',
    },
  },
  {
    name: 'Animesh Bhattacharjee',
    role: 'Co-Founder & COO',
    owns: 'Operations, scope and delivery',
    location: 'Dhaka, Bangladesh',
    image: '/team/animesh.webp',
    cutout: '/team/animesh-cutout.webp',
    statement:
      'Most people who have been burned by a development agency were not burned by bad code. They were burned by a vague scope and a month of silence. So I write the scope down before anyone starts, and you see working software every week. If a project is not a fit for us, I would rather tell you that on the first call than take the money and find out together.',
    socials: {
      facebook: 'https://www.facebook.com/animesh.bhattacharjee.6096',
      linkedin: 'https://www.linkedin.com/in/animesh-bhattacharjee-jhalok/',
      github: 'https://github.com/Animesh6096',
    },
  },
]

const socialIcons: Record<string, string> = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
  github:
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.805 5.625-5.478 5.921.43.372.814 1.102.814 2.222 0 1.604-.015 2.898-.015 3.293 0 .322.216.695.825.577C20.565 22.092 24 17.595 24 12.297c0-6.627-5.373-12-12-12',
  facebook:
    'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
}

const cultureCards = [
  { label: 'Remote-first', body: 'Distributed across Australia and Bangladesh since day one. No commute, no theatre.' },
  { label: 'Weekly demos', body: 'Every project shows working software on Friday. Internal work included.' },
  { label: 'Engineers talk to clients', body: 'No account managers. The people building it are in the call.' },
  { label: 'Ship your own things', body: 'Side projects stay yours. Several of ours became company products.' },
]

/**
 * One founder, as an editorial row: role, name, then their statement, with the
 * portrait alongside in a fixed card.
 *
 * Rows alternate sides — image left, then right, then left — collapsing on
 * mobile to a single column with the portrait always above the words, so
 * reading order stays consistent regardless of the desktop side.
 */
const FounderRow = ({ member, index }: { member: TeamMember; index: number }) => {
  const imageOnRight = index % 2 === 1

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
    >
      {/* Portrait card */}
      <div className={`lg:col-span-5 ${imageOnRight ? 'lg:order-2' : 'lg:order-1'}`}>
        {/*
          Fixed 4:5 card, identical for all three. The cut-outs have different
          aspect ratios — Maisha's is portrait, Animesh's is nearly square — so
          sizing by width made her portrait render noticeably larger than the
          others. Sizing by *height* against a fixed card height instead means
          every founder appears at the same scale; a wider subject is simply
          cropped at the shoulders by the card, which is what `overflow-hidden`
          is doing here.
        */}
        <div className="group relative mx-auto aspect-[4/5] w-full max-w-[19rem] overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#0E3157] via-[#08203D] to-[#040E1C] shadow-2xl shadow-black/50 ring-1 ring-inset ring-white/10">
          {/* Same fine grid as the hero, so the card reads as part of the system. */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
              backgroundSize: '26px 26px',
            }}
            aria-hidden="true"
          ></div>
          {/* Light pooling behind the head lifts the subject off the card. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(11rem 8rem at 50% 12%, rgba(96,165,250,0.20) 0%, transparent 72%)',
            }}
            aria-hidden="true"
          ></div>

          <img
            src={member.cutout}
            alt={`${member.name}, ${member.role} of EXORIT`}
            loading="lazy"
            className="absolute bottom-0 left-1/2 h-[94%] w-auto max-w-none -translate-x-1/2 drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)]"
          />

          {/*
            Socials reveal on hover over the card. Hover alone would strand
            touch and keyboard users, so: always visible below `lg` (no hover on
            touch), and `group-focus-within` brings them up when a keyboard user
            tabs into one, since the links stay in the tab order either way.
          */}
          <ul className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-5 bg-gradient-to-t from-black/85 via-black/45 to-transparent pb-5 pt-16 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
            {(Object.keys(member.socials) as Array<keyof typeof member.socials>).map(key => {
              const href = member.socials[key]
              if (!href) return null
              return (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-300 transition-colors hover:text-primary focus-visible:text-primary"
                  >
                    <span className="sr-only">{`${member.name} on ${key}`}</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={socialIcons[key]} />
                    </svg>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Words */}
      <div className={`text-left lg:col-span-7 ${imageOnRight ? 'lg:order-1' : 'lg:order-2'}`}>
        <h2 className="font-display text-3xl font-bold tracking-tightest text-gray-900 dark:text-gray-100 md:text-4xl">
          {member.name}
        </h2>
        {/* Role sits directly under the name, where a reader expects it. */}
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">{member.role}</p>

        {/* The statement carries the row — set larger than body copy, with a quote mark to frame it as speech. */}
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-500">
          In their own words
        </p>
        <blockquote className="relative mt-4 pl-10">
          <span
            className="absolute left-0 top-[-0.75rem] font-display text-6xl leading-none text-primary/30"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="font-display text-lg font-medium leading-relaxed text-gray-800 dark:text-gray-200 md:text-xl md:leading-relaxed">
            {member.statement}
          </p>
        </blockquote>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-gray-200 pt-6 dark:border-white/10">
          <p className="font-mono text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-500">
            Owns {member.owns.charAt(0).toLowerCase() + member.owns.slice(1)}
          </p>
          {/* Kept off the card but still on the page — the Australia/Bangladesh
              split is the trust signal the whole positioning rests on. */}
          <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-500">
            <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {member.location}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

const TeamPage = () => {
  useSeo({
    title: 'Our Team',
    description:
      'Meet the three co-founders of EXORIT: CEO, CTO and COO, working from Dhaka, Bangladesh and Adelaide, Australia.',
    path: '/team',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: teamMembers.map((member, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Person',
            name: member.name,
            jobTitle: member.role,
            image: `${site.url}${member.image}`,
            sameAs: [member.socials.linkedin, member.socials.github, member.socials.facebook].filter(Boolean),
          },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Team', item: `${site.url}/team` },
        ],
      },
    ],
  })

  return (
    <>
      <PageHero
        eyebrow="The team"
        title="Three founders, in their own words"
        lead="No account managers between you and the engineering. These are the people who scope, build and ship your project — and what each of them is actually responsible for."
      />

      {/* Founders */}
      <Section divider={false}>
        <div className="space-y-24 md:space-y-32">
          {teamMembers.map((member, index) => (
            <FounderRow key={member.name} member={member} index={index} />
          ))}
        </div>
      </Section>

      {/* Culture */}
      <Section>
        <div className="flex flex-col items-start gap-12 lg:flex-row">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-left lg:w-1/2"
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Culture</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tightest text-gray-900 dark:text-gray-100 md:text-4xl">
              How we work together
            </h2>
            <div className="mb-8 mt-6 h-px w-16 bg-primary/50" aria-hidden="true"></div>
            <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              We are three people who would rather ship something small and real every week than present a
              polished plan for something that does not exist yet. That shapes everything else: short
              feedback loops, direct conversations, and no layer of management between the client and the
              person writing the code.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              We are deliberately small, distributed across two countries, and we intend to stay that way
              until growing makes the work better rather than just bigger.
            </p>
            <Link
              to="/careers"
              className="group inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-800 transition-colors duration-200 hover:border-primary hover:text-primary dark:border-white/15 dark:text-gray-200"
            >
              Join our team
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7-7 7M3 12h18" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cultureCards.map(card => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-gray-200 p-6 text-left transition-colors duration-200 hover:border-primary/40 dark:border-white/10"
                >
                  <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">{card.label}</p>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{card.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
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
                Join our team
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-300">
                We are always looking for people who are good at building things and honest about what they do
                not know. Check the current openings, or send your CV for future ones.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button
                  to="/careers"
                  variant="outline"
                  size="lg"
                  className="!border-white/30 !text-white hover:!border-white hover:!bg-white/10 hover:!text-white"
                >
                  View open positions
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default TeamPage
