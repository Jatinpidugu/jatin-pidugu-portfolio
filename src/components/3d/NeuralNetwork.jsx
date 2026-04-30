import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const NeuralNetwork = ({ width = 400, height = 460 }) => {
  const layers = [4, 6, 6, 3]
  const padX = 50
  const padY = 60

  const nodes = useMemo(() => {
    const out = []
    const colW = (width - padX * 2) / (layers.length - 1)
    layers.forEach((count, ci) => {
      const cx = padX + colW * ci
      const colH = height - padY * 2
      const step = colH / (count - 1 || 1)
      const startY = count === 1 ? height / 2 : padY
      for (let i = 0; i < count; i++) {
        out.push({ cx, cy: startY + step * i, layer: ci, idx: i, id: `${ci}-${i}` })
      }
    })
    return out
  }, [width, height])

  const connections = useMemo(() => {
    const out = []
    for (let l = 0; l < layers.length - 1; l++) {
      const from = nodes.filter((n) => n.layer === l)
      const to = nodes.filter((n) => n.layer === l + 1)
      from.forEach((a) => {
        to.forEach((b) => {
          out.push({ from: a, to: b, id: `${a.id}-${b.id}` })
        })
      })
    }
    return out
  }, [nodes])

  // pulses — pick a sparse subset so it doesn't look like spaghetti
  const pulses = useMemo(() => connections.filter((_, i) => i % 4 === 0), [connections])

  const layerLabels = ['INPUT', 'HIDDEN', 'HIDDEN', 'OUTPUT']

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <defs>
        <radialGradient id="node-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#cc785c" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#cc785c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* layer labels */}
      {layers.map((_, ci) => {
        const colW = (width - padX * 2) / (layers.length - 1)
        return (
          <text
            key={ci}
            x={padX + colW * ci}
            y={26}
            textAnchor="middle"
            fontSize="9"
            letterSpacing="2"
            fill="#6b6657"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
          >
            {layerLabels[ci]}
          </text>
        )
      })}

      {/* connections — base lines */}
      {connections.map((c) => (
        <line
          key={c.id}
          x1={c.from.cx}
          y1={c.from.cy}
          x2={c.to.cx}
          y2={c.to.cy}
          stroke="rgba(61,57,41,0.08)"
          strokeWidth="1"
        />
      ))}

      {/* travelling pulses */}
      {pulses.map((c, i) => (
        <motion.circle
          key={`p-${c.id}`}
          r="2.5"
          fill="#cc785c"
          initial={{ cx: c.from.cx, cy: c.from.cy, opacity: 0 }}
          animate={{
            cx: [c.from.cx, c.to.cx],
            cy: [c.from.cy, c.to.cy],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay: (i % 8) * 0.18,
            ease: 'easeOut',
            repeatDelay: 0.4,
          }}
        />
      ))}

      {/* nodes */}
      {nodes.map((n) => {
        const isOutput = n.layer === layers.length - 1
        return (
          <g key={n.id}>
            {/* glow halo */}
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r={14}
              fill="url(#node-glow)"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: n.layer * 0.25 + n.idx * 0.08 }}
            />
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r="6.5"
              fill={isOutput ? '#cc785c' : '#faf9f5'}
              stroke={isOutput ? '#cc785c' : '#3d3929'}
              strokeWidth="1.5"
              animate={{ scale: [1, 1.18, 1] }}
              style={{ originX: `${n.cx}px`, originY: `${n.cy}px` }}
              transition={{ duration: 2, repeat: Infinity, delay: n.layer * 0.2 + n.idx * 0.05 }}
            />
          </g>
        )
      })}
    </svg>
  )
}

export default NeuralNetwork
