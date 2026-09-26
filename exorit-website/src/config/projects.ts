/**
 * Shipped work. Shared by the Projects page and the homepage case-study
 * scroller so the two can never disagree.
 *
 * `measured` holds numbers we actually measured, with the date and tool. Leave
 * it out rather than estimate — a project with no measurement shows none.
 */
export interface ProjectMeasurement {
  label: string
  value: string
  /** How and when it was measured, shown next to the number. */
  source: string
}

export interface Project {
  id: number
  title: string
  category: 'SaaS' | 'Security'
  kicker: string
  tags: string[]
  image: string
  description: string
  client: string
  year: string
  link: string
  measured?: ProjectMeasurement[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Hire Me',
    category: 'SaaS',
    kicker: 'Recruiting platform',
    tags: ['Flask', 'React', 'Recruiting', 'Realtime'],
    image: '/images/covers/hire-me.webp',
    description: 'Full-stack recruiting platform with job posting, search, application tracking, and real-time messaging for candidates and recruiters.',
    client: 'Internal Product',
    year: '2025',
    link: 'https://github.com/Animesh6096/Hire_me',
  },
  {
    id: 2,
    title: 'SecureBlogVault',
    category: 'Security',
    kicker: 'Encrypted publishing',
    tags: ['React', 'TypeScript', 'Express', 'AES'],
    image: '/images/secureblogvault.webp',
    description: 'Secure blog platform with AES encryption, Scrypt hashing, and hardened authentication flows for protected content.',
    client: 'Internal Product',
    year: '2025',
    link: 'https://secureblogvault.vercel.app/',
  },
  {
    id: 3,
    title: 'ReadVenture',
    category: 'SaaS',
    kicker: 'Book community',
    tags: ['Next.js 15', 'TypeScript', 'MongoDB', 'Tailwind'],
    image: '/images/readventure.webp',
    description: 'Book community platform with exchange matching, marketplace, writing tools, and community features built on a full-stack Next.js + Express architecture.',
    client: 'ReadVenture',
    year: '2025',
    link: 'https://readventure001.vercel.app/',
  },
]

/** Public GitHub repositories get "View the code"; everything else is a live app. */
export const projectLinkLabel = (link: string) =>
  link.includes('github.com') ? 'View the code' : 'Open the live app'

/** Every distinct technology across shipped work — the only source for the stack marquee. */
export const shippedStack = Array.from(
  new Set(projects.flatMap(p => p.tags).filter(t => !['Recruiting', 'Realtime'].includes(t)))
)
