import React from 'react'

const Logo = ({ className = '', compact = false }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" aria-label="Jatin Pidugu">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cc785c" />
            <stop offset="100%" stopColor="#bd5d3a" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill="url(#logoGrad)" />
        <text
          x="20" y="27"
          textAnchor="middle"
          fontFamily="Fraunces, Georgia, serif"
          fontSize="20"
          fontWeight="600"
          fill="#faf9f5"
          fontStyle="italic"
        >jp</text>
      </svg>
      {!compact && (
        <div className="flex flex-col leading-none min-w-0">
          <span className="font-serif text-sm md:text-[15px] font-medium text-ink tracking-tight whitespace-nowrap">Jatin Pidugu</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-muted mt-0.5 whitespace-nowrap">Data · Dev</span>
        </div>
      )}
    </div>
  )
}

export default Logo
