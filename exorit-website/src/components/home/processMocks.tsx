/**
 * Illustrations of what a client receives at each step of an engagement. They
 * show the shape of the artifact, not real client material — every one carries
 * an "Example" label, and names are generic ("Your product"). Elements marked
 * `data-in` are revealed in sequence by the process timeline.
 */
import { ReactNode } from 'react'

const Frame = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-2xl shadow-blue-950/10 dark:border-white/10 dark:bg-[#0b1324]">
    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3 dark:border-white/10">
      <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400">{title}</span>
      <span className="rounded-full bg-amber-100 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
        Example
      </span>
    </div>
    <div className="p-5">{children}</div>
  </div>
)

const Check = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const Bar = ({ w, strong = false }: { w: string; strong?: boolean }) => (
  <div className={`h-2 rounded-full ${strong ? 'bg-gray-300 dark:bg-white/20' : 'bg-gray-200 dark:bg-white/10'}`} style={{ width: w }}></div>
)

export const CallMock = () => (
  <Frame title="Calendar invite">
    <p data-in className="font-display text-lg font-semibold text-gray-900 dark:text-gray-100">Intro call · 20 min</p>
    <p data-in className="mt-1 text-sm text-gray-500 dark:text-gray-400">Video call, booked in your time zone</p>
    <div data-in className="mt-5 grid grid-cols-5 gap-2">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => (
        <div key={d} className="text-center font-mono text-[10px] uppercase text-gray-400">
          {d}
        </div>
      ))}
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          className={`h-7 rounded-md ${
            i === 7 ? 'bg-primary text-white ring-2 ring-primary/30' : 'bg-gray-100 dark:bg-white/[0.05]'
          } flex items-center justify-center font-mono text-[10px]`}
        >
          {i === 7 ? '10:00' : ''}
        </div>
      ))}
    </div>
    <div data-in className="mt-5 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
      <Check /> Confirmed — an honest answer on fit, either way
    </div>
  </Frame>
)

export const ScopeMock = () => (
  <Frame title="Scope & quote">
    <div className="relative">
      <p data-in className="font-display text-lg font-semibold text-gray-900 dark:text-gray-100">Your product — written scope</p>
      <div data-in className="mt-3 space-y-2">
        <Bar w="92%" />
        <Bar w="78%" />
        <Bar w="84%" />
      </div>
      <table className="mt-5 w-full text-sm">
        <tbody>
          {['Prototype & staging', 'Core features', 'Launch & handover'].map((m, i) => (
            <tr data-in key={m} className="border-t border-gray-200 dark:border-white/10">
              <td className="py-2.5 pr-3 font-mono text-[11px] text-primary">M{i + 1}</td>
              <td className="py-2.5 text-gray-700 dark:text-gray-300">{m}</td>
              <td className="py-2.5 text-right font-mono text-[11px] text-gray-400">Quoted</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div data-in className="mt-4 flex items-center justify-between border-t border-dashed border-gray-300 pt-4 dark:border-white/15">
        <span className="text-xs text-gray-500 dark:text-gray-400">Approved by you, before any work starts</span>
        <span className="font-[cursive] text-lg text-gray-700 dark:text-gray-300">You</span>
      </div>
      <div
        data-stamp
        className="absolute -right-3 top-6 rotate-[-12deg] rounded-lg border-2 border-emerald-500/80 bg-white/80 px-3 py-1.5 text-center font-mono text-[10px] font-bold uppercase leading-tight tracking-[0.18em] text-emerald-600 backdrop-blur-sm dark:bg-[#0b1324]/80 dark:text-emerald-400"
      >
        M1 is
        <br />
        money-back
      </div>
    </div>
  </Frame>
)

export const StagingMock = () => (
  <Frame title="Week one">
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-3 py-2 dark:border-white/10 dark:bg-white/[0.03]">
        <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/15"></span>
        <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/15"></span>
        <span className="ml-2 flex-1 rounded bg-white px-2 py-1 font-mono text-[11px] text-gray-500 ring-1 ring-gray-200 dark:bg-white/5 dark:text-gray-400 dark:ring-white/10">
          <span data-in>staging.your-product.dev</span>
        </span>
        <span data-in className="flex items-center gap-1 font-mono text-[10px] uppercase text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>Live
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div data-in className="flex items-center justify-between">
          <div className="h-3 w-20 rounded bg-primary/70"></div>
          <div className="flex gap-2">
            <Bar w="2.5rem" />
            <Bar w="2.5rem" />
          </div>
        </div>
        <div data-in className="h-16 rounded-lg bg-gradient-to-r from-primary/20 to-primary/5"></div>
        <div data-in className="grid grid-cols-3 gap-2">
          <div className="h-12 rounded-md bg-gray-100 dark:bg-white/[0.05]"></div>
          <div className="h-12 rounded-md bg-gray-100 dark:bg-white/[0.05]"></div>
          <div className="h-12 rounded-md bg-gray-100 dark:bg-white/[0.05]"></div>
        </div>
      </div>
    </div>
    <p data-in className="mt-4 font-mono text-[11px] text-gray-500 dark:text-gray-400">
      <span className="text-emerald-600 dark:text-emerald-400">✓</span> deployed · you have the link from day one
    </p>
  </Frame>
)

export const DemoMock = () => (
  <Frame title="# your-product">
    <div className="space-y-4 text-sm">
      <div data-in className="flex gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary font-mono text-[10px] font-bold text-white">EX</div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100">EXORIT</p>
          <p className="text-gray-600 dark:text-gray-400">This week's demo is up — sign-up flow and the admin dashboard are on staging.</p>
          <div className="mt-2 flex items-center gap-3 rounded-lg border border-gray-200 p-2 dark:border-white/10">
            <div className="flex h-10 w-16 items-center justify-center rounded bg-gray-900 dark:bg-white/10">
              <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="font-mono text-[11px] text-gray-500 dark:text-gray-400">Weekly demo · recording</span>
          </div>
        </div>
      </div>
      <div data-in className="flex gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200 font-mono text-[10px] font-bold text-gray-700 dark:bg-white/10 dark:text-gray-200">YOU</div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100">You</p>
          <p className="text-gray-600 dark:text-gray-400">Looks right. Can exports move up to the next milestone?</p>
        </div>
      </div>
      <div data-in className="flex gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary font-mono text-[10px] font-bold text-white">EX</div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100">EXORIT</p>
          <p className="text-gray-600 dark:text-gray-400">Yes — scope change priced and attached for your OK.</p>
        </div>
      </div>
    </div>
  </Frame>
)

export const HandoverMock = () => (
  <Frame title="Handover">
    <div data-in className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-white/10">
      <div className="flex items-center gap-3">
        <svg className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
        <span className="font-mono text-sm text-gray-800 dark:text-gray-200">your-org/your-product</span>
      </div>
      <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">Owner: you</span>
    </div>
    <ul className="mt-5 space-y-3">
      {['Repository — yours from the first commit', 'Cloud accounts and infrastructure', 'Handover documentation', 'Support after launch'].map(item => (
        <li data-in key={item} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check />
          </span>
          {item}
        </li>
      ))}
    </ul>
  </Frame>
)
