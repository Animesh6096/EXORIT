import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import PageHero from '../components/PageHero'
import Section, { SectionHeader, fadeUp } from '../components/Section'
import { useSeo } from '../hooks/useSeo'
import { site } from '../config/site'

interface TeamMember {
  name: string;
  role: string;
  /** One line on what this person actually owns. Keeps the C-title concrete. */
  owns: string;
  /** Country only — no city claimed until confirmed. */
  location: string;
  image: string;
  bio: string;
  socials: {
    facebook?: string;
    linkedin: string;
    github: string;
  };
}

// Team member data
const teamMembers: TeamMember[] = [
  {
    name: "Animesh Bhattacharjee",
    role: "Co-Founder & CEO",
    owns: "Client relationships, scope and delivery",
    location: "Dhaka, Bangladesh",
    image: "/team/animesh.webp",
    bio: "Software engineer, and the person you talk to first. Built the Hire Me recruiting platform and SecureBlogVault, both of which you can open from our projects page.",
    socials: {
      facebook: "https://www.facebook.com/animesh.bhattacharjee.6096",
      linkedin: "https://www.linkedin.com/in/animesh-bhattacharjee-jhalok/",
      github: "https://github.com/Animesh6096"
    }
  },
  {
    name: "Golam Tawhid Fahad",
    role: "Co-Founder & CTO",
    owns: "Architecture, code quality and technical decisions",
    location: "Dhaka, Bangladesh",
    image: "/team/tawhid.webp",
    bio: "Full-stack engineer. Sets the architecture every project is built on and the standard every commit has to meet before it ships.",
    socials: {
      linkedin: "https://www.linkedin.com/in/g-t-fahad/",
      github: "https://github.com/Golam-Tawhid"
    }
  },
  {
    name: "Maisha Iffat Chowdhury",
    role: "Co-Founder & Chief Design Officer",
    owns: "Product design and user experience",
    location: "Adelaide, Australia",
    image: "/team/maisha.webp",
    bio: "Software engineer and designer. Designs the interfaces and then builds them, which is why the design survives contact with the code. Currently reading for a Master of Information Technology in Cyber Security at Adelaide University.",
    socials: {
      linkedin: "https://www.linkedin.com/in/maisha-iffat-chowdhury",
      github: "https://github.com/maishahaha"
    }
  }
];

const TeamPage = () => {
  useSeo({
    title: 'Our Team',
    description:
      'Meet the three co-founders of EXORIT: CEO, CTO and Chief Design Officer, working from Dhaka, Bangladesh and Adelaide, Australia.',
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <>
      <PageHero
        eyebrow="The team"
        title="Our Team"
        lead="The people who design and build every project. No account managers between you and the engineering."
      />

      {/* Team Members Section */}
      <Section divider={false}>
        <SectionHeader
          eyebrow="Founders"
          title="Co-Founding Team"
          lead="Our co-founders combine strengths in software development, design, and product execution to guide EXORIT toward continued excellence and innovation."
        />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 transition-colors duration-200 hover:border-primary/40 dark:border-white/10"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.socials.facebook && (
                      <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                        </svg>
                      </a>
                    )}
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-900">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="p-6 text-left">
                  <h3 className="mb-1 font-display text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-primary dark:text-gray-100">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">{member.role}</p>
                  <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-500">
                    <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {member.location}
                  </p>
                  <p className="mt-3 border-l-2 border-primary/30 pl-3 text-sm text-gray-700 dark:text-gray-300">
                    Owns {member.owns.charAt(0).toLowerCase() + member.owns.slice(1)}.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
      </Section>

      <Section>
        <div className="flex flex-col items-start gap-12 lg:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">Culture</p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tightest text-gray-900 dark:text-gray-100 md:text-4xl">
                Our Company Culture
              </h2>
              <div className="mb-8 mt-6 h-px w-16 bg-primary/50" aria-hidden="true"></div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                At EXORIT, we believe that great products come from great teams. We foster a culture of 
                collaboration, innovation, and continuous learning that empowers our team members to do 
                their best work and grow professionally.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                We value diversity of thought and background, knowing that different perspectives 
                lead to more creative solutions. Our work environment balances autonomy with accountability, 
                giving team members the freedom to explore ideas while maintaining high standards of quality.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Collaborative and supportive environment</p>
                </div>
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Remote-friendly with flexible work options</p>
                </div>
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Continuous learning and professional development</p>
                </div>
              </div>
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
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Remote-first', body: 'Distributed across Australia and Bangladesh since day one. No commute, no theatre.' },
                  { label: 'Weekly demos', body: 'Every project shows working software on Friday. Internal work included.' },
                  { label: 'Engineers talk to clients', body: 'No account managers. The people building it are in the call.' },
                  { label: 'Ship your own things', body: 'Side projects stay yours. Several of ours became company products.' },
                ].map(card => (
                  <div
                    key={card.label}
                    className="rounded-2xl border border-gray-200 p-6 transition-colors duration-200 hover:border-primary/40 dark:border-white/10"
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
