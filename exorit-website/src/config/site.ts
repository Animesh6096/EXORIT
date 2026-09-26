/**
 * Single source of truth for site-wide content and commercial claims.
 *
 * Rules for this file:
 *  - Every claim here must be literally true today. No aspirational trust
 *    signals. See PLAN-2026.md, decision #3.
 *  - We quote per project. Nothing here should imply a fixed price list.
 */

export const site = {
  domain: 'exorit.dev',
  url: 'https://exorit.dev',
  name: 'EXORIT',
  email: 'hello@exorit.dev',
  // Fallback while the custom domain mailbox is being set up.
  fallbackEmail: 'exorit.official@gmail.com',
  phone: '+880-178-183-6541',
  // Set VITE_BOOKING_URL in the environment to swap the booking tool without a
  // code change. Cal.com is the chosen default (PLAN-2026.md, decision #4).
  bookingUrl: import.meta.env.VITE_BOOKING_URL || 'https://cal.com/exorit/intro',
} as const

export const positioning = {
  headline: 'Software Built Around Your Business, Not a Template',
  subhead:
    'We design and build custom web platforms, mobile apps and AI systems — scoped to what your business actually needs, with a working demo in your hands every week.',
  /** Phone-width version of `subhead`: same claims, fewer words. */
  subheadShort: 'Custom web platforms, mobile apps and AI systems — with a working demo in your hands every week.',
  primaryCta: 'Book a 20-min call',
  secondaryCta: 'View our work',
} as const

/**
 * Trust strip. Only verifiable facts, and nothing that implies a price list.
 */
export const trustSignals = [
  'Working across Australia, Europe and North America',
  'A written scope and quote before any work starts',
  'You own the repository from commit one',
  'A working demo every week, not a status report',
] as const

export const icps = [
  {
    title: 'Founders who need a product built',
    body: 'You have the domain knowledge, the customers and the idea. You need a team that can turn it into something people can actually use, without hiring for a year first.',
    fit: 'Startups and new ventures',
  },
  {
    title: 'Businesses running on manual work',
    body: 'Your team copies data between systems, reads documents by hand and answers the same questions all day. Much of that is now automatable, and we automate it against your real data.',
    fit: 'SMB and mid-market',
  },
  {
    title: 'Agencies and studios with overflow',
    body: 'You have won the work and have no engineering bench. We deliver under your brand, to your standards, on your timeline — white-label, NDA first.',
    fit: 'Design and marketing studios',
  },
] as const

/**
 * How engagements are shaped. Deliberately no prices: every project is custom
 * and quoted after a call.
 */
export const engagements = [
  {
    id: 'discovery-sprint',
    name: 'Discovery Sprint',
    duration: 'About two weeks',
    summary: 'For when the idea is clear but the shape of the build is not. Prove it works before anyone commits a budget to it.',
    deliverables: [
      'A working prototype you can put in front of users',
      'Architecture and technology recommendation, with running costs',
      'An honest read on what is hard, and what will not work',
      'A scoped plan and quote for the full build',
    ],
  },
  {
    id: 'product-build',
    name: 'Product Build',
    duration: 'Scoped per project',
    summary: 'The full build — web platform, mobile app, AI system, or all three — taken from scope to production.',
    deliverables: [
      'Production application, deployed and monitored',
      'Your infrastructure, your accounts, your repository',
      'A demo every week, and scope decisions made with you',
      'Handover documentation and post-launch support',
    ],
  },
  {
    id: 'ongoing-partner',
    name: 'Ongoing Partner',
    duration: 'Monthly',
    summary: 'For teams who need engineering capacity continuously — new features, data pipelines, model evaluation, maintenance.',
    deliverables: [
      'A reserved share of the team each month',
      'Data collection, cleaning and evaluation pipelines',
      'Continuous improvement rather than one-off delivery',
      'A monthly report on what shipped and what it cost',
    ],
  },
] as const

export const process = [
  {
    step: '01',
    title: 'A 20-minute call, not a discovery phase',
    body: 'We work out whether this is a fit and roughly what it involves. If we are not the right team we say so on the call and point you somewhere better.',
  },
  {
    step: '02',
    title: 'A written scope and quote',
    body: 'Every project is quoted individually — the work is custom, so the price is too. You see the scope and the number before any money moves, and changes are priced explicitly.',
  },
  {
    step: '03',
    title: 'A staging URL in the first week',
    body: 'You watch the product exist as it is built. A shared channel, a live environment, and a working demo every week.',
  },
  {
    step: '04',
    title: 'Handover, then support',
    body: 'You own the repository, the infrastructure and the accounts throughout. We hand over documentation and stay available after launch.',
  },
] as const

export const faqs = [
  {
    q: 'How do you price a project?',
    a: 'Individually. Custom software is not a product on a shelf, so we do not publish a price list that would be wrong for most of the people reading it. After a short call we send a written scope with a number attached, broken into milestones, and you decide before anything starts.',
  },
  {
    q: 'How much timezone overlap do we get?',
    a: 'We work from Bangladesh with people in Australia, which gives a full working overlap with Australian hours, a solid morning overlap with Europe, and scheduled overlap with US mornings. Calls get booked in your timezone, not ours.',
  },
  {
    q: 'Who owns the code and the IP?',
    a: 'You do, from the first commit. We work in your repository and your cloud accounts wherever possible. If we start in ours, it transfers to you at handover, and that is written into the contract.',
  },
  {
    q: 'How do payments work across countries?',
    a: 'We invoice in USD by default and accept Wise, Payoneer and direct bank transfer. Work is billed against milestones rather than hours, so the total is agreed in advance.',
  },
  {
    q: 'Will you sign an NDA?',
    a: 'Yes, before any technical detail is discussed. Send yours, or ask us for a mutual one.',
  },
  {
    q: 'What if the first milestone is not what we wanted?',
    a: 'The first milestone is money-back. If what we deliver does not match the written scope, you do not pay for it and we part on good terms.',
  },
] as const

export const riskReversal = {
  title: 'The first milestone is money-back',
  body: 'You should not have to wire money to a team on another continent and hope. If the first milestone does not match what we agreed in writing, you do not pay for it — no negotiation, no retention clause.',
} as const

/**
 * Client testimonials.
 *
 * DELIBERATELY EMPTY. EXORIT has not delivered client work that has produced a
 * quote yet, and inventing one would be a fabricated endorsement — the kind of
 * thing the FTC (US) and ACCC (Australia) both treat as deceptive, in two of
 * the markets this site targets. The section that renders these hides itself
 * while the array is empty, so nothing fake ships and the section appears the
 * moment a real quote exists.
 *
 * To add one, you need: the person's real name, their real role and company,
 * and their permission to publish the quote. Keep `quote` to a sentence or two.
 * `avatar` is optional — a path under /public, or omit it for initials.
 */
export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  avatar?: string
  /** Optional link to the work referenced, e.g. a project page. */
  projectUrl?: string
}

export const testimonials: Testimonial[] = []

/**
 * True only when a real booking link has been configured. The default in
 * `site.bookingUrl` is a placeholder, so nothing embeds it inline until then.
 */
export const bookingEmbeddable = Boolean(import.meta.env.VITE_BOOKING_URL)

/**
 * Where the team is, and the client regions we overlap with. Drives the hero
 * globe arcs and the live overlap clocks — the same geography as the contact
 * page map. `team: true` marks a place someone on the team actually works from.
 */
export interface Location {
  city: string
  timeZone: string
  lat: number
  lng: number
  team: boolean
}

export const locations: Location[] = [
  { city: 'Dhaka', timeZone: 'Asia/Dhaka', lat: 23.8103, lng: 90.4125, team: true },
  { city: 'Adelaide', timeZone: 'Australia/Adelaide', lat: -34.9285, lng: 138.6007, team: true },
  { city: 'London', timeZone: 'Europe/London', lat: 51.5074, lng: -0.1278, team: false },
  { city: 'New York', timeZone: 'America/New_York', lat: 40.7128, lng: -74.006, team: false },
]

/**
 * Trust slots that do not exist yet. Same rule as `testimonials`: each renders
 * nothing while empty, and appears the moment a real entry is added.
 */
export interface ClientLogo {
  name: string
  /** Path under /public. Needs the client's permission to display. */
  src: string
  href?: string
}
export const clientLogos: ClientLogo[] = []

/** Independent review profiles (Clutch, GoodFirms, Upwork). Add once live with at least one real review. */
export interface ThirdPartyProfile {
  name: string
  href: string
  /** Exactly as the platform shows it, e.g. '4.9'. */
  rating?: string
  reviews?: number
}
export const thirdPartyProfiles: ThirdPartyProfile[] = []

/**
 * Registrations and memberships that can be checked independently — an ABN,
 * BASIS membership. Empty until they exist (PLAN-2026.md, decision #3).
 */
export const registrations: { label: string; href?: string }[] = []
