import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useSeo } from '../hooks/useSeo'

const routeLines = [
  'route.resolve()',
  '  └─ requested path: unknown',
  '  └─ status: 404_NOT_FOUND',
]

const NotFoundPage = () => {
  useSeo({
    title: 'Page Not Found',
    description: 'This page does not exist.',
    path: typeof window !== 'undefined' ? window.location.pathname : '/404',
    noindex: true,
  })

  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-slate-50 pb-16 pt-28 text-gray-900 sm:pb-20 sm:pt-32 dark:bg-[#071329] dark:text-white">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-100 dark:opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 17% 26%, rgba(0,123,255,.24), transparent 25%), radial-gradient(circle at 83% 68%, rgba(0,123,255,.18), transparent 28%), linear-gradient(rgba(148,163,184,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.06) 1px, transparent 1px)',
          backgroundSize: 'auto, auto, 42px 42px, 42px 42px',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-blue-50 to-transparent dark:from-[#050b18]" aria-hidden="true" />

      <div className="container relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,.72fr)] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-xl text-center lg:text-left"
        >
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-red-600 dark:text-red-400">Error / 404</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tightest text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
            This route leads <span className="text-red-600 dark:text-red-400">nowhere.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0 dark:text-slate-300">
            Looks like this page took an unexpected turn. Our bot is mapping a way back to something useful.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Button to="/" variant="primary" size="lg">
              Back to home
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7 7-7M3 12h18" />
              </svg>
            </Button>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-base font-medium text-gray-800 transition-colors hover:border-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:focus:ring-offset-[#071329]"
            >
              See our work
            </Link>
          </div>

          <div className="mt-10 inline-block rounded-xl border border-blue-100 bg-white/80 px-4 py-3 text-left font-mono text-xs leading-6 text-slate-500 shadow-xl shadow-blue-950/5 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-400 dark:shadow-black/20">
            {routeLines.map((line, index) => (
              <p key={line} className={index === 2 ? 'text-primary' : ''}>{line}</p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: 'easeOut' }}
          className="mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px]"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 1.2, 0, -1.2, 0] }}
              transition={{ duration: 5.6, ease: 'easeInOut', repeat: Infinity }}
            >
              <img
                src="/images/lost-bot-404.png"
                alt="Lost support robot beside a glowing location pin"
                className="relative z-10 mx-auto w-full drop-shadow-[0_22px_38px_rgba(0,0,0,.45)]"
              />
            </motion.div>
            <div className="absolute inset-x-[15%] bottom-[11%] h-10 rounded-[100%] bg-primary/30 blur-2xl" aria-hidden="true" />
            <div className="absolute right-[5%] top-[14%] font-mono text-6xl font-bold tracking-tighter text-red-500/25 sm:text-7xl dark:text-red-400/30" aria-hidden="true">404</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default NotFoundPage
