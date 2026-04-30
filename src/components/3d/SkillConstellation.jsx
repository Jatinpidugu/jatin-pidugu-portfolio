import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

// cluster centers (% of canvas)
const CLUSTER = {
  data_science:     { cx: 26, cy: 32, label: 'data_science' },
  'web devlopment': { cx: 74, cy: 30, label: 'web' },
  tools:            { cx: 72, cy: 70, label: 'tools' },
  'soft-skills':    { cx: 26, cy: 72, label: 'soft' },
  core:             { cx: 50, cy: 50, label: 'core' },
}

const COLOR = {
  data_science:     { hex: '#cc785c', tail: 'rgba(204,120,92,0.35)', text: 'text-primary' },
  'web devlopment': { hex: '#3d3929', tail: 'rgba(61,57,41,0.35)',   text: 'text-ink' },
  tools:            { hex: '#a85b3e', tail: 'rgba(168,91,62,0.35)',  text: 'text-primary' },
  'soft-skills':    { hex: '#e0a08a', tail: 'rgba(224,160,138,0.4)', text: 'text-primary' },
  core:             { hex: '#7a7163', tail: 'rgba(122,113,99,0.3)',  text: 'text-muted' },
}

// stable seeded position within cluster
const positionFor = (skill, idxInCluster, totalInCluster) => {
  const cluster = CLUSTER[skill.type] || CLUSTER.core
  if (totalInCluster === 1) return { x: cluster.cx, y: cluster.cy }
  // arrange around a small ring within the cluster
  const angle = (idxInCluster / totalInCluster) * Math.PI * 2 - Math.PI / 2
  const radius = 11 + (idxInCluster % 2) * 3
  return {
    x: cluster.cx + Math.cos(angle) * radius,
    y: cluster.cy + Math.sin(angle) * radius,
  }
}

const SkillConstellation = ({ skills, selectedId, onSelect, activeTab }) => {
  // compute positioned nodes
  const nodes = useMemo(() => {
    const grouped = {}
    skills.forEach((s) => {
      const k = s.type || 'core'
      ;(grouped[k] ||= []).push(s)
    })
    const out = []
    Object.values(grouped).forEach((group) => {
      group.forEach((s, i) => {
        const pos = positionFor(s, i, group.length)
        out.push({ ...s, x: pos.x, y: pos.y })
      })
    })
    return out
  }, [skills])

  // build edges within each cluster (each node → next in cluster)
  const edges = useMemo(() => {
    const grouped = {}
    nodes.forEach((n) => {
      const k = n.type || 'core'
      ;(grouped[k] ||= []).push(n)
    })
    const list = []
    Object.values(grouped).forEach((group) => {
      if (group.length < 2) return
      // connect each to the next, and the last to the first (closed ring)
      for (let i = 0; i < group.length; i++) {
        const a = group[i]
        const b = group[(i + 1) % group.length]
        list.push({
          id: `${a.id}-${b.id}`,
          x1: a.x, y1: a.y, x2: b.x, y2: b.y,
          type: a.type,
        })
      }
    })
    // a few cross-cluster bridges for the "neural" feel
    const heads = ['01', '02']
      .map((id) => nodes.find((n) => n.id === id))
      .filter(Boolean)
    if (heads.length === 2) {
      list.push({
        id: `bridge-${heads[0].id}-${heads[1].id}`,
        x1: heads[0].x, y1: heads[0].y, x2: heads[1].x, y2: heads[1].y,
        type: 'bridge',
        bridge: true,
      })
    }
    return list
  }, [nodes])

  const isDimmed = (skill) => activeTab !== 'all' && skill.type !== activeTab
  const peakProgress = Math.max(...skills.map((s) => s.progress || 0), 1)

  return (
    <div className="relative w-full h-[460px] md:h-[520px] overflow-hidden">
      {/* dot-grid background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(61,57,41,0.18) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* axis crosshair */}
      <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-ink/30" />
      <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-ink/30" />
      <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-ink/30" />
      <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-ink/30" />

      {/* cluster labels (faint, centered behind nodes) */}
      {Object.entries(CLUSTER).map(([k, c]) => {
        if (k === 'core') return null
        const count = skills.filter((s) => (s.type || 'core') === k).length
        if (!count) return null
        const dim = activeTab !== 'all' && activeTab !== k
        return (
          <div
            key={k}
            className={`absolute -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none transition-opacity ${
              dim ? 'opacity-20' : 'opacity-100'
            }`}
            style={{ left: `${c.cx}%`, top: `${c.cy}%` }}
          >
            <div className="text-[36px] md:text-[60px] font-serif italic text-ink/[0.05] leading-none whitespace-nowrap">
              {c.label}
            </div>
          </div>
        )
      })}

      {/* SVG layer for edges + pulses */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {edges.map((e, i) => {
          const color = COLOR[e.type]?.hex || COLOR.core.hex
          const tail = COLOR[e.type]?.tail || COLOR.core.tail
          return (
            <g key={e.id}>
              <line
                x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                stroke={tail}
                strokeWidth={e.bridge ? 0.15 : 0.25}
                strokeDasharray={e.bridge ? '0.6 0.6' : 'none'}
              />
              {/* traveling pulse */}
              <motion.circle
                r={e.bridge ? 0.35 : 0.5}
                fill={color}
                initial={{ offsetDistance: '0%' }}
                animate={{}}
              >
                <animateMotion
                  dur={`${4 + (i % 5) * 0.6}s`}
                  repeatCount="indefinite"
                  path={`M ${e.x1} ${e.y1} L ${e.x2} ${e.y2}`}
                />
              </motion.circle>
            </g>
          )
        })}
      </svg>

      {/* nodes */}
      {nodes.map((n, i) => {
        const isActive = selectedId === n.id
        const dim = isDimmed(n)
        const color = COLOR[n.type] || COLOR.core
        const size = 36 + (n.progress / peakProgress) * 28 // 36–64px
        const Icon = n.icon
        return (
          <motion.button
            key={n.id}
            onClick={() => onSelect(n.id)}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.7,
              delay: 0.1 + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            animate={{
              y: [0, -3, 0, 3, 0],
              x: [0, 2, 0, -2, 0],
            }}
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color.hex,
              opacity: dim ? 0.18 : 1,
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-white shadow-md cursor-pointer transition-all duration-300 group ${
              isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-white scale-110' : 'hover:scale-110'
            }`}
            title={`${n.skil} · ${n.progress}%`}
            transition-from={{}}
          >
            {/* halo on active */}
            {isActive && (
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: color.hex, opacity: 0.4 }}
              />
            )}

            {Icon ? (
              <Icon className="w-1/2 h-1/2 relative z-10" />
            ) : (
              <span className="font-bold text-sm relative z-10">{n.skil?.[0]}</span>
            )}

            {/* % chip — only on hover or active */}
            <span
              className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-white border border-border text-[9px] font-mono tabular-nums text-ink shadow-sm transition-opacity ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              {n.progress}%
            </span>

            {/* label above on hover */}
            <span
              className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-ink text-background text-[10px] font-mono whitespace-nowrap transition-opacity ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              {n.skil}
            </span>
          </motion.button>
        )
      })}

      {/* corner readout */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur border border-border">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
        </span>
        <span className="text-[9px] uppercase tracking-[0.22em] text-muted font-mono">
          map · {nodes.length} nodes · {edges.length} edges
        </span>
      </div>
    </div>
  )
}

export default SkillConstellation
