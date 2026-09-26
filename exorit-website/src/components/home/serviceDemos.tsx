/**
 * Small looping illustrations for each service. Decorative (aria-hidden by the
 * caller), generic content, and they only run while on screen.
 */
import { ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/** Ticks while the element is in view; stops off-screen and under reduced motion. */
const useLoop = (length: number, interval: number) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-40px' })
  const reduced = useReducedMotion()
  const [step, setStep] = useState(reduced ? length - 1 : 0)

  useEffect(() => {
    if (!inView || reduced) return
    const id = window.setInterval(() => setStep(s => (s + 1) % length), interval)
    return () => window.clearInterval(id)
  }, [inView, reduced, length, interval])

  return { ref, step }
}

const ANSWER =
  'Annual plans can be refunded within 30 days of purchase. After that, the remaining months convert to account credit.'

export const AiDemo = () => {
  const { ref, step } = useLoop(ANSWER.length + 40, 38)
  const shown = ANSWER.slice(0, Math.min(step, ANSWER.length))
  const done = step >= ANSWER.length

  return (
    <div ref={ref} className="space-y-3 text-left text-[13px]">
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-white">
        What is our refund window for annual plans?
      </div>
      <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-gray-200 bg-white px-4 py-3 text-gray-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300">
        {shown}
        {!done && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-primary"></span>}
        <motion.div
          initial={false}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 6 }}
          className="mt-3 flex flex-wrap gap-2"
        >
          <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[10px] text-gray-500 dark:bg-white/[0.06] dark:text-gray-400">
            billing-policy.pdf · p.4
          </span>
          <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[10px] text-gray-500 dark:bg-white/[0.06] dark:text-gray-400">
            terms-2026.docx · §7
          </span>
        </motion.div>
      </div>
    </div>
  )
}

const messy = [
  [' ACME ltd ', '2024/3/1', 'n/a'],
  ['acme LTD.', '01-03-2024', '1,200'],
  ['Northwind', 'Mar 4 24', '  860 '],
]
const clean = [
  ['Acme Ltd', '2024-03-01', '1200'],
  ['Northwind', '2024-03-04', '860'],
]

export const DataDemo = () => {
  const { ref, step } = useLoop(2, 2600)
  const rows = step === 0 ? messy : clean

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-gray-200 font-mono text-[11px] dark:border-white/10">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-2 text-gray-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400">
        <span>orders.csv</span>
        <span className={step === 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}>
          {step === 0 ? '3 rows · 4 issues' : '2 rows · clean'}
        </span>
      </div>
      <table className="w-full">
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={`${step}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="border-t border-gray-100 first:border-t-0 dark:border-white/5"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`whitespace-pre px-3 py-2 ${
                    step === 0 && (cell !== cell.trim() || cell === 'n/a' || /[/.,]| \d/.test(cell))
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const WebDemo = () => {
  const { ref, step } = useLoop(2, 2400)
  const narrow = step === 1

  return (
    <div ref={ref} className="flex h-40 items-center justify-center">
      <motion.div
        animate={{ width: narrow ? 92 : 230 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="overflow-hidden rounded-lg border border-gray-200 bg-white p-2 dark:border-white/10 dark:bg-white/[0.04]"
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="h-2 w-8 rounded bg-primary/70"></div>
          <motion.div layout className={narrow ? 'h-2 w-3 rounded bg-gray-300 dark:bg-white/20' : 'flex gap-1'}>
            {!narrow && [0, 1, 2].map(i => <div key={i} className="h-2 w-6 rounded bg-gray-200 dark:bg-white/10"></div>)}
          </motion.div>
        </div>
        <div className="mb-2 h-10 rounded bg-gradient-to-r from-primary/25 to-primary/5"></div>
        <motion.div layout className={`grid gap-1.5 ${narrow ? 'grid-cols-1' : 'grid-cols-3'}`}>
          {[0, 1, 2].map(i => (
            <motion.div layout key={i} className="h-8 rounded bg-gray-100 dark:bg-white/[0.06]"></motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

const Phone = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto h-44 w-24 overflow-hidden rounded-[1.1rem] border border-gray-300 bg-white p-1.5 dark:border-white/15 dark:bg-[#0b1324]">
    <div className="relative h-full overflow-hidden rounded-[0.8rem] bg-gray-50 dark:bg-white/[0.03]">{children}</div>
  </div>
)

export const AppDemo = () => {
  const { ref, step } = useLoop(3, 1800)
  const tints = ['from-primary/40', 'from-emerald-400/40', 'from-amber-400/40']

  return (
    <div ref={ref} className="flex h-44 items-center justify-center gap-4">
      {['iOS', 'Android'].map(platform => (
        <div key={platform} className="text-center">
          <Phone>
            <motion.div
              key={step}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              className="absolute inset-0 space-y-1.5 p-2"
            >
              <div className={`h-12 rounded-md bg-gradient-to-br ${tints[step]} to-transparent`}></div>
              <div className="h-2 w-3/4 rounded bg-gray-200 dark:bg-white/10"></div>
              <div className="h-2 w-1/2 rounded bg-gray-200 dark:bg-white/10"></div>
              <div className="h-6 rounded bg-gray-100 dark:bg-white/[0.06]"></div>
            </motion.div>
          </Phone>
          <p className="mt-1.5 font-mono text-[9px] uppercase tracking-widest text-gray-400">{platform}</p>
        </div>
      ))}
    </div>
  )
}

export const IosDemo = () => {
  const { ref, step } = useLoop(2, 1600)
  const on = step === 1

  return (
    <div ref={ref} className="flex h-44 items-center justify-center">
      <Phone>
        <div className="p-2 text-left">
          <p className="font-display text-[11px] font-bold text-gray-900 dark:text-gray-100">Settings</p>
          <div className="mt-2 space-y-1 rounded-md bg-white p-1.5 dark:bg-white/[0.05]">
            {['Face ID', 'Widgets', 'Offline'].map((label, i) => {
              const active = i === 1 ? on : i === 0
              return (
                <div key={label} className="flex items-center justify-between py-0.5">
                  <span className="text-[8px] text-gray-600 dark:text-gray-300">{label}</span>
                  <span className={`flex h-2.5 w-4 items-center rounded-full p-px transition-colors ${active ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-white/20'}`}>
                    <motion.span layout className={`h-2 w-2 rounded-full bg-white ${active ? 'ml-auto' : ''}`}></motion.span>
                  </span>
                </div>
              )
            })}
          </div>
          <motion.div
            animate={{ opacity: on ? 1 : 0, y: on ? 0 : 6 }}
            className="mt-2 rounded-md bg-primary/15 p-1.5"
          >
            <div className="h-1.5 w-3/4 rounded bg-primary/60"></div>
            <div className="mt-1 h-1.5 w-1/2 rounded bg-primary/30"></div>
          </motion.div>
        </div>
      </Phone>
    </div>
  )
}

export const DesignDemo = () => {
  const { ref, step } = useLoop(2, 2400)
  const final = step === 1

  return (
    <div ref={ref} className="grid h-40 grid-cols-[1fr_2fr] gap-3">
      <motion.div animate={{ backgroundColor: final ? 'rgba(0,123,255,0.9)' : 'rgba(148,163,184,0.25)' }} className="rounded-lg p-3">
        <motion.div animate={{ opacity: final ? 1 : 0.5 }} className="space-y-2">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`h-2 rounded ${final ? 'bg-white/70' : 'bg-gray-400/40'}`} style={{ width: `${80 - i * 12}%` }}></div>
          ))}
        </motion.div>
      </motion.div>
      <div className="grid grid-rows-[auto_1fr] gap-3">
        <motion.div
          animate={{
            borderRadius: final ? 12 : 4,
            backgroundImage: final
              ? 'linear-gradient(90deg, rgba(0,123,255,0.35), rgba(16,185,129,0.25))'
              : 'linear-gradient(90deg, rgba(148,163,184,0.25), rgba(148,163,184,0.25))',
          }}
          className="h-14 border border-dashed border-gray-300 dark:border-white/15"
        ></motion.div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{
                borderRadius: final ? 10 : 3,
                backgroundColor: final ? ['#ffffff', '#eff6ff', '#ecfdf5'][i] : 'rgba(148,163,184,0.2)',
                boxShadow: final ? '0 8px 20px -12px rgba(0,60,140,0.45)' : '0 0 0 0 rgba(0,0,0,0)',
              }}
              transition={{ delay: i * 0.08 }}
              className="border border-dashed border-gray-300 dark:border-white/15 dark:!bg-white/[0.06]"
            ></motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
