import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TrainingMetrics = () => {
  const [epoch, setEpoch] = useState(42)
  const [loss, setLoss] = useState(0.087)
  const [acc, setAcc] = useState(96.4)

  useEffect(() => {
    const id = setInterval(() => {
      setEpoch((e) => (e >= 100 ? 1 : e + 1))
      setLoss((l) => Math.max(0.01, +(l - 0.0008 + (Math.random() - 0.5) * 0.004).toFixed(3)))
      setAcc((a) => Math.min(99.9, +(a + 0.05 + (Math.random() - 0.4) * 0.15).toFixed(2)))
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-white/95 backdrop-blur-md border border-border rounded-2xl p-4 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted font-medium">Training</span>
        </div>
        <span className="text-[10px] tracking-[0.12em] text-muted font-mono">epoch {epoch}/100</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Loss</p>
          <motion.p
            key={loss}
            initial={{ opacity: 0.6, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-xl text-ink mt-0.5 tabular-nums"
          >
            {loss.toFixed(3)}
          </motion.p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted">Accuracy</p>
          <motion.p
            key={acc}
            initial={{ opacity: 0.6, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-xl text-primary mt-0.5 tabular-nums"
          >
            {acc.toFixed(1)}%
          </motion.p>
        </div>
      </div>

      <div className="mt-3 h-1 bg-surface rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          animate={{ width: `${epoch}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default TrainingMetrics
