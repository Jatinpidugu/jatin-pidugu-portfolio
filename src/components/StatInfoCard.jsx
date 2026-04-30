import React from 'react'
import Counter from './3d/Counter'

const StatInfoCard = ({ count, label, index = 0 }) => {
  const num = String(index + 1).padStart(2, '0')

  return (
    <div className="group relative pl-5">
      <div className="absolute left-0 top-2 bottom-2 w-px bg-border group-hover:bg-primary transition-colors duration-500" />

      <div className="text-[10px] tracking-[0.22em] uppercase text-muted/60 font-mono mb-3">
        / {num}
      </div>

      <div className="font-serif text-5xl md:text-6xl font-medium text-ink leading-none tracking-tighter">
        <Counter value={count} duration={2} />
      </div>

      <p className="text-[11px] md:text-xs uppercase tracking-[0.18em] text-muted leading-relaxed whitespace-pre-line mt-3">
        {label}
      </p>

      <div className="mt-5 h-px w-10 bg-primary/40 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
    </div>
  )
}

export default StatInfoCard
