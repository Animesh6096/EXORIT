import { trustSignals } from '../config/site'

/**
 * Thin marquee pinned to the bottom of the hero. Every line here must be
 * literally true today — see PLAN-2026.md decision #3.
 *
 * The track holds two identical copies of the list and slides from -50% to 0,
 * so the seam never shows and the motion reads left to right. The second copy is
 * hidden from assistive tech. Motion stops on hover and under
 * prefers-reduced-motion (see index.css).
 */
const TrustStrip = () => {
  const items = trustSignals.map(signal => (
    <li key={signal} className="flex flex-shrink-0 items-center gap-2.5 px-7">
      <svg
        className="h-3 w-3 flex-shrink-0 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="3"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="whitespace-nowrap text-xs text-gray-600 dark:text-gray-300">{signal}</span>
    </li>
  ))

  return (
    <div className="relative overflow-hidden border-t border-gray-200 bg-white/70 py-2.5 backdrop-blur-sm dark:border-white/10 dark:bg-gray-950/60">
      {/* Edge fades so items enter and leave rather than clipping. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent dark:from-gray-950"
        aria-hidden="true"
      ></div>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent dark:from-gray-950"
        aria-hidden="true"
      ></div>

      <ul className="marquee-track flex w-max items-center">
        {items}
        <li className="contents" aria-hidden="true">
          {items}
        </li>
      </ul>
    </div>
  )
}

export default TrustStrip
