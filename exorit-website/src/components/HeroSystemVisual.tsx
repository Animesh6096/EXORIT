import { motion } from 'framer-motion'

const outputs = ['Web', 'Mobile', 'AI']

const HeroSystemVisual = () => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
    className="relative mx-auto w-full max-w-[360px] lg:hidden"
    aria-label="Diagram showing EXORIT turning business workflows and data into web, mobile, and AI products"
  >
    <div className="absolute -inset-8 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#081322]/85 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,123,255,.9)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300">System blueprint</span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400">Live</span>
      </div>

      <div className="relative mt-4 h-44" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 328 176" fill="none">
          <path d="M78 45C113 45 111 88 146 88M78 131C113 131 111 88 146 88" stroke="rgba(148,163,184,.35)" strokeWidth="1.5" />
          <path d="M182 88C216 88 215 34 250 34M182 88H250M182 88C216 88 215 142 250 142" stroke="rgba(0,123,255,.55)" strokeWidth="1.5" />
          <motion.circle
            r="3"
            fill="#38bdf8"
            animate={{ offsetDistance: ['0%', '100%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            style={{ offsetPath: "path('M78 45C113 45 111 88 146 88')" }}
          />
        </svg>

        <div className="absolute left-0 top-4 w-[86px] rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-left">
          <span className="block font-mono text-[8px] uppercase tracking-wider text-slate-500">Input 01</span>
          <span className="mt-1 block text-[11px] font-medium text-white">Workflow</span>
        </div>
        <div className="absolute bottom-4 left-0 w-[86px] rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-left">
          <span className="block font-mono text-[8px] uppercase tracking-wider text-slate-500">Input 02</span>
          <span className="mt-1 block text-[11px] font-medium text-white">Your data</span>
        </div>

        <motion.div
          animate={{ boxShadow: ['0 0 0 0 rgba(0,123,255,.28)', '0 0 0 10px rgba(0,123,255,0)', '0 0 0 0 rgba(0,123,255,0)'] }}
          transition={{ duration: 2.8, repeat: Infinity }}
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-primary/60 bg-primary/15"
        >
          <span className="font-display text-xs font-bold tracking-wider text-white">EXORIT</span>
        </motion.div>

        <div className="absolute right-0 top-0 flex w-[74px] flex-col gap-3">
          {outputs.map((output, index) => (
            <motion.div
              key={output}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.12 }}
              className="flex h-10 items-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-2.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-blue-100">{output}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)

export default HeroSystemVisual
