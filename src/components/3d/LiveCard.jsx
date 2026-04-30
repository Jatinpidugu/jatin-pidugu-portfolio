import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STATES = [
  { label: 'Currently building', value: 'a portfolio that ships', dot: '#cc785c' },
  { label: 'Listening to', value: 'Bonobo · Migration', dot: '#8a7d65' },
  { label: 'Reading', value: 'Designing Data-Intensive Apps', dot: '#bd5d3a' },
  { label: 'Learning', value: 'PyTorch & Rust', dot: '#cc785c' },
  { label: 'Local time', value: () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }) + ' IST', dot: '#3d3929' },
]

const LiveCard = () => {
  const [idx, setIdx] = useState(0)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const i = setInterval(() => setIdx((p) => (p + 1) % STATES.length), 3800)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setTick((p) => p + 1), 30000)
    return () => clearInterval(t)
  }, [])

  const cur = STATES[idx]
  const value = typeof cur.value === 'function' ? cur.value() : cur.value
  void tick

  return (
    <div className="bg-white/90 backdrop-blur-md border border-border rounded-2xl px-4 py-3 shadow-card min-w-[220px] max-w-[260px]">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ background: cur.dot }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: cur.dot }} />
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted font-medium">{cur.label}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="font-serif text-[15px] text-ink mt-1.5 leading-snug"
        >
          {value}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

export default LiveCard
