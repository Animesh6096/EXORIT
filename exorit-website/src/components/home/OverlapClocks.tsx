import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Section, { SectionHeader, fadeUp } from '../Section'
import { locations } from '../../config/site'

/**
 * Live working-hours ribbons for the team and the regions we sell into, drawn in
 * the visitor's own time zone. Every value is computed from the real clock and
 * real zone offsets (DST included), so nothing here can drift out of date.
 *
 * Business hours are taken as 09:00–18:00 local, Monday to Friday — the hours
 * stated on the contact page.
 */
const START = 9
const LENGTH = 9
const STEP = 0.25

/** Hours ahead of UTC for a zone at a given instant, from the Intl database. */
const zoneOffset = (timeZone: string, at: Date) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(at)
  const get = (type: string) => Number(parts.find(p => p.type === type)?.value)
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'))
  return (asUtc - Math.floor(at.getTime() / 60000) * 60000) / 3_600_000
}

const mod24 = (h: number) => ((h % 24) + 24) % 24

/** Start of a zone's working day, expressed in the viewer's hours (0–24). */
const workStartInViewer = (offset: number, viewerOffset: number) => mod24(START - offset + viewerOffset)

const within = (h: number, start: number) => mod24(h - start) < LENGTH

const isWorkingNow = (timeZone: string, at: Date) => {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short', hour: 'numeric', hourCycle: 'h23' }).formatToParts(at)
  const weekday = parts.find(p => p.type === 'weekday')?.value
  const hour = Number(parts.find(p => p.type === 'hour')?.value)
  return weekday !== 'Sat' && weekday !== 'Sun' && hour >= START && hour < START + LENGTH
}

const formatTime = (timeZone: string, at: Date) =>
  new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' }).format(at)

/** Ribbon segments for a working day that may wrap past midnight. */
const segments = (start: number) =>
  start + LENGTH <= 24
    ? [{ left: start, width: LENGTH }]
    : [
        { left: start, width: 24 - start },
        { left: 0, width: start + LENGTH - 24 },
      ]

const pct = (h: number) => `${(h / 24) * 100}%`

const OverlapClocks = () => {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  const viewerZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const viewerOffset = -now.getTimezoneOffset() / 60
  const nowHour = now.getHours() + now.getMinutes() / 60

  const rows = useMemo(() => {
    const teamStarts = locations
      .filter(l => l.team)
      .map(l => workStartInViewer(zoneOffset(l.timeZone, now), viewerOffset))

    const sharedHours = (start: number) => {
      let shared = 0
      for (let h = 0; h < 24; h += STEP) {
        if (within(h, start) && teamStarts.some(t => within(h, t))) shared += STEP
      }
      return shared
    }

    const you = {
      key: 'you',
      label: 'You',
      detail: viewerZone.replace(/_/g, ' '),
      timeZone: viewerZone,
      team: false,
      start: workStartInViewer(viewerOffset, viewerOffset),
    }

    const places = locations.map(l => ({
      key: l.city,
      label: l.city,
      detail: l.team ? 'EXORIT team' : 'Client hours',
      timeZone: l.timeZone,
      team: l.team,
      start: workStartInViewer(zoneOffset(l.timeZone, now), viewerOffset),
    }))

    return [you, ...places].map(row => ({ ...row, shared: row.team ? null : sharedHours(row.start) }))
  }, [now, viewerOffset, viewerZone])

  const youShared = rows[0].shared ?? 0

  return (
    <Section id="overlap">
      <SectionHeader
        eyebrow="Time zones"
        title="Your working day, next to ours"
        lead="Live, and drawn in your own time zone. Blue is when our team is at work; the highlight is the time we share with each region."
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-gray-200 p-5 dark:border-white/10 sm:p-8"
      >
        <p className="mb-8 font-display text-lg text-gray-900 dark:text-gray-100 sm:text-xl">
          {youShared > 0 ? (
            <>
              You share <span className="text-primary">{youShared} working hours</span> a day with our team.
            </>
          ) : (
            <>
              No shared office hours with your zone, so we book calls at the start of <span className="text-primary">your</span> day.
            </>
          )}
        </p>

        <div className="relative">
          {/* Hour scale, in the viewer's time */}
          <div className="mb-3 hidden grid-cols-[9rem_1fr] gap-4 sm:grid">
            <span></span>
            <div className="relative h-4 font-mono text-[10px] text-gray-400">
              {[0, 6, 12, 18, 24].map(h => (
                <span key={h} className="absolute -translate-x-1/2" style={{ left: pct(h) }}>
                  {String(h % 24).padStart(2, '0')}:00
                </span>
              ))}
            </div>
          </div>

          <ul className="space-y-4">
            {rows.map(row => {
              const working = isWorkingNow(row.timeZone, now)
              return (
                <li key={row.key} className="grid grid-cols-1 gap-2 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-4">
                  <div className="flex items-baseline justify-between gap-3 sm:block">
                    <p className="font-display text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {row.label}
                      <span className="ml-2 font-mono text-sm font-normal text-gray-500 dark:text-gray-400">
                        {formatTime(row.timeZone, now)}
                      </span>
                    </p>
                    <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${working ? 'bg-emerald-500' : 'bg-gray-400/60'}`}
                        aria-hidden="true"
                      ></span>
                      {row.detail}
                    </p>
                  </div>

                  <div className="relative h-7 overflow-hidden rounded-md bg-gray-100 dark:bg-white/[0.04]">
                    {segments(row.start).map(seg => (
                      <div
                        key={seg.left}
                        className={`absolute inset-y-1 rounded ${
                          row.team ? 'bg-primary/80' : 'bg-gray-300 dark:bg-white/15'
                        }`}
                        style={{ left: pct(seg.left), width: pct(seg.width) }}
                      ></div>
                    ))}
                    {/* Shared hours with the team, sampled at 15-minute resolution. */}
                    {!row.team &&
                      Array.from({ length: 96 }, (_, i) => i * STEP)
                        .filter(h => within(h, row.start) && rows.some(r => r.team && within(h, r.start)))
                        .map(h => (
                          <div
                            key={h}
                            className="absolute inset-y-1 bg-primary/70"
                            style={{ left: pct(h), width: pct(STEP) }}
                          ></div>
                        ))}
                    {/* Now */}
                    <div className="absolute inset-y-0 w-px bg-rose-500" style={{ left: pct(nowHour) }} aria-hidden="true"></div>
                  </div>

                  {!row.team && (
                    <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 sm:col-start-2">
                      {row.shared
                        ? `${row.shared} h shared with our team`
                        : 'No shared office hours · calls booked in your morning'}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-4 rounded-sm bg-primary/80" aria-hidden="true"></span> Team hours
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-4 rounded-sm bg-gray-300 dark:bg-white/15" aria-hidden="true"></span> Your region's hours
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-px bg-rose-500" aria-hidden="true"></span> Now
          </span>
          <span>Business hours taken as 09:00–18:00 local, Mon–Fri</span>
        </p>
      </motion.div>
    </Section>
  )
}

export default OverlapClocks
