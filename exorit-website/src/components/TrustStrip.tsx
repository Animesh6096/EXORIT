import { trustSignals } from '../config/site'

/**
 * Every line here must be literally true today — see PLAN-2026.md decision #3.
 * The stronger "Australian-registered" wording is unlocked by the ABN, not by copywriting.
 */
const TrustStrip = () => (
  <div className="border-y border-white/10 bg-gray-950/60 backdrop-blur-sm">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5">
        {trustSignals.map(signal => (
          <li key={signal} className="flex items-center gap-2 text-sm text-gray-300">
            <svg className="h-4 w-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            {signal}
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default TrustStrip
