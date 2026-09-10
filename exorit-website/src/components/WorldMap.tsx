import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string }
    end: { lat: number; lng: number; label?: string }
  }>
  lineColor?: string
  showLabels?: boolean
  animationDuration?: number
  loop?: boolean
}

/**
 * Dotted world map with animated arcs between locations.
 *
 * Adapted from the Aceternity component: Next-specific pieces (next/image,
 * next-themes) swapped for a plain <img> and our own ThemeContext, and the
 * canvas left transparent so it sits on the page background rather than a
 * white/black card.
 *
 * The dot field is pre-rendered to static SVG by
 * scripts/generate-world-map.mjs. Calling dotted-map in the browser instead
 * would ship the world geometry in the main bundle — it measured +152 kB
 * gzipped on every page, for a graphic that appears on one.
 */
export function WorldMap({
  dots = [],
  lineColor = '#007BFF',
  showLabels = true,
  animationDuration = 2,
  loop = true,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const { darkMode } = useTheme()

  const dotField = darkMode ? '/images/world-dots-dark.svg' : '/images/world-dots-light.svg'

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360)
    const y = (90 - lat) * (400 / 180)
    return { x, y }
  }

  const createCurvedPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / 2
    const midY = Math.min(start.y, end.y) - 50
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
  }

  const staggerDelay = 0.3
  const totalAnimationTime = dots.length * staggerDelay + animationDuration
  const pauseTime = 2
  const fullCycleDuration = totalAnimationTime + pauseTime

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden font-sans md:aspect-[2.5/1] lg:aspect-[2/1]">
      <img
        src={dotField}
        className="pointer-events-none h-full w-full select-none object-cover [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="World map showing where EXORIT works"
        height="495"
        width="1056"
        draggable={false}
        loading="lazy"
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="pointer-events-auto absolute inset-0 h-full w-full select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>

          <filter id="glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng)
          const endPoint = projectPoint(dot.end.lat, dot.end.lng)

          const startTime = (i * staggerDelay) / fullCycleDuration
          const endTime = (i * staggerDelay + animationDuration) / fullCycleDuration
          const resetTime = totalAnimationTime / fullCycleDuration

          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={loop ? { pathLength: [0, 0, 1, 1, 0] } : { pathLength: 1 }}
                transition={
                  loop
                    ? {
                        duration: fullCycleDuration,
                        times: [0, startTime, endTime, resetTime, 1],
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatDelay: 0,
                      }
                    : {
                        duration: animationDuration,
                        delay: i * staggerDelay,
                        ease: 'easeInOut',
                      }
                }
              />

              {loop && (
                <motion.circle
                  r="4"
                  fill={lineColor}
                  initial={{ offsetDistance: '0%', opacity: 0 }}
                  animate={{
                    offsetDistance: [null, '0%', '100%', '100%', '100%'],
                    opacity: [0, 0, 1, 0, 0],
                  }}
                  transition={{
                    duration: fullCycleDuration,
                    times: [0, startTime, endTime, resetTime, 1],
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 0,
                  }}
                  style={{
                    offsetPath: `path('${createCurvedPath(startPoint, endPoint)}')`,
                  }}
                />
              )}
            </g>
          )
        })}

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng)
          const endPoint = projectPoint(dot.end.lat, dot.end.lng)

          return (
            <g key={`points-group-${i}`}>
              {[
                { point: startPoint, label: dot.start.label, begin: '0s', fallback: `Location ${i}` },
                { point: endPoint, label: dot.end.label, begin: '0.5s', fallback: `Destination ${i}` },
              ].map(marker => (
                <g key={`${marker.fallback}-${marker.point.x}-${marker.point.y}`}>
                  <motion.g
                    onHoverStart={() => setHoveredLocation(marker.label || marker.fallback)}
                    onHoverEnd={() => setHoveredLocation(null)}
                    className="cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <circle cx={marker.point.x} cy={marker.point.y} r="3" fill={lineColor} filter="url(#glow)" />
                    <circle cx={marker.point.x} cy={marker.point.y} r="3" fill={lineColor} opacity="0.5">
                      <animate attributeName="r" from="3" to="12" dur="2s" begin={marker.begin} repeatCount="indefinite" />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2s"
                        begin={marker.begin}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </motion.g>

                  {showLabels && marker.label && (
                    <motion.g
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 * i + 0.3, duration: 0.5 }}
                      className="pointer-events-none"
                    >
                      <foreignObject x={marker.point.x - 50} y={marker.point.y - 34} width="100" height="28">
                        <div className="flex h-full items-center justify-center">
                          <span className="rounded-md border border-gray-200 bg-white/95 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-gray-700 dark:border-white/10 dark:bg-gray-900/95 dark:text-gray-200">
                            {marker.label}
                          </span>
                        </div>
                      </foreignObject>
                    </motion.g>
                  )}
                </g>
              ))}
            </g>
          )
        })}
      </svg>

      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 rounded-lg border border-gray-200 bg-white/90 px-3 py-2 font-mono text-xs uppercase tracking-widest text-gray-700 backdrop-blur-sm sm:hidden dark:border-white/10 dark:bg-gray-900/90 dark:text-gray-200"
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default WorldMap
