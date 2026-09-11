import type { Testimonial } from './site'

/**
 * PLACEHOLDER DATA — LAYOUT PREVIEW ONLY. NEVER SHIPS.
 *
 * These are not testimonials. The text is filler (lorem ipsum and a pangram),
 * the names are obvious placeholders, and none of it refers to EXORIT or to any
 * real person or company. It exists so the Testimonials layout can be seen while
 * the real `testimonials` array in site.ts is still empty.
 *
 * Testimonials.tsx only reads this behind `import.meta.env.DEV`, so `vite build`
 * tree-shakes it out of the production bundle and the section stays hidden on
 * the live site until a real quote exists.
 */
export const demoTestimonials: Testimonial[] = [
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    name: 'Placeholder One',
    role: 'Sample Role',
    company: 'Example Co',
  },
  {
    quote: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.',
    name: 'Placeholder Two',
    role: 'Sample Role',
    company: 'Test Industries',
  },
  {
    quote:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
    name: 'Placeholder Three',
    role: 'Sample Role',
    company: 'Demo Systems',
  },
  {
    quote: 'Sphinx of black quartz, judge my vow. How vexingly quick daft zebras jump.',
    name: 'Placeholder Four',
    role: 'Sample Role',
    company: 'Filler Group',
  },
]
