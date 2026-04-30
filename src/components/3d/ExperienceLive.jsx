import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const fmt = (n) => n.toLocaleString('en-IN')

const calcFrom = (startTs) => {
  const now = Date.now()
  const diff = Math.max(0, now - startTs)
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  const totalMonths = Math.floor(days / 30.4375)
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  return { years, months, days, hours, minutes, seconds }
}

// generate a smooth ascending sparkline path
const sparkPath = (seed = 0) => {
  const w = 80, h = 22, pts = 12
  let d = ''
  for (let i = 0; i < pts; i++) {
    const x = (i / (pts - 1)) * w
    const base = (i / (pts - 1)) * (h - 4)
    const noise = Math.sin(i * 1.3 + seed) * 1.6
    const y = h - 2 - base - noise
    d += i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}

const ExperienceLive = ({ startDate = '2024-01-01' }) => {
  const startTs = useMemo(() => {
    const d = new Date(startDate)
    return isNaN(d.getTime()) ? new Date('2024-01-01').getTime() : d.getTime()
  }, [startDate])

  const [t, setT] = useState(() => calcFrom(startTs))

  useEffect(() => {
    setT(calcFrom(startTs))
    const id = setInterval(() => setT(calcFrom(startTs)), 1000)
    return () => clearInterval(id)
  }, [startTs])

  const startLabel = useMemo(() => {
    const d = new Date(startTs)
    return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
  }, [startTs])

  const metrics = [
    { key: 'in_practice', value: `${t.years}y ${t.months}mo`, delta: '+1d/d', seed: 0.2 },
    { key: 'days',       value: fmt(t.days),     delta: '+1/d',   seed: 1.1 },
    { key: 'hours',      value: fmt(t.hours),    delta: '+1/hr',  seed: 2.4 },
    { key: 'minutes',    value: fmt(t.minutes),  delta: '+1/min', seed: 3.7 },
    { key: 'seconds',    value: fmt(t.seconds),  delta: '+1/s',   seed: 5.1 },
  ]

  return (
    <div className="relative">
      {/* dashboard header — terminal style */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="w-2 h-2 rounded-full bg-secondary/70" />
            <span className="w-2 h-2 rounded-full bg-muted/40" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
            <span className="text-ink">~/portfolio</span>
            <span className="mx-1.5">$</span>
            <span className="text-primary">tail -f</span> model.experience.live
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-primary">
            training · since {startLabel}
          </span>
        </div>
      </div>

      {/* dashboard panel */}
      <div className="relative rounded-2xl border border-border bg-white/60 backdrop-blur-sm p-5 md:p-6 overflow-hidden">
        {/* dot grid background */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(61,57,41,0.15) 1px, transparent 0)',
            backgroundSize: '14px 14px',
          }}
        />

        {/* corner crosshairs (terminal frame) */}
        <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-ink/30" />
        <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-ink/30" />
        <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-ink/30" />
        <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-ink/30" />

        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-7">
          {metrics.map((m, i) => (
            <div key={m.key} className="group relative">
              {/* metric path */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[9px] tracking-[0.18em] uppercase text-muted/70 font-mono">
                  / {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[9px] text-muted/60 font-mono lowercase tracking-wider">
                  exp.{m.key}
                </span>
              </div>

              {/* big value */}
              <motion.div
                key={m.value}
                initial={{ opacity: 0.6, y: -1 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="font-serif text-2xl md:text-3xl lg:text-[34px] font-medium text-ink leading-none tracking-tight tabular-nums"
              >
                {m.value}
              </motion.div>

              {/* sparkline */}
              <svg viewBox="0 0 80 22" className="w-full h-5 mt-3 overflow-visible">
                <motion.path
                  d={sparkPath(m.seed)}
                  fill="none"
                  stroke="#cc785c"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* end-of-curve pulsing dot */}
                <motion.circle
                  cx="80"
                  cy="2"
                  r="2"
                  fill="#cc785c"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                />
              </svg>

              {/* delta + status */}
              <div className="flex items-center justify-between mt-3 text-[9px] font-mono">
                <span className="inline-flex items-center gap-1 text-primary">
                  <span className="text-[10px]">↗</span>
                  <span>{m.delta}</span>
                </span>
                <span className="text-muted/50 uppercase tracking-[0.18em]">live</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExperienceLive
