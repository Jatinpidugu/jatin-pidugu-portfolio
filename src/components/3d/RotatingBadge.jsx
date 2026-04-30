import React from 'react'
import { motion } from 'framer-motion'

const RotatingBadge = ({ text = 'JATIN PIDUGU · DATA · DEVELOPER · DESIGNER · ', size = 96 }) => {
  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {/* center disc */}
      <div
        className="absolute rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_8px_22px_-6px_rgba(204,120,92,0.55)] flex items-center justify-center"
        style={{ width: size * 0.42, height: size * 0.42 }}
      >
        <span
          className="font-serif italic font-semibold text-white leading-none"
          style={{ fontSize: size * 0.22 }}
        >
          jp
        </span>
      </div>

      {/* rotating text */}
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path
            id="rotating-badge-circle"
            d="M 60, 60 m -45, 0 a 45, 45, 0, 1, 1, 90, 0 a 45, 45, 0, 1, 1, -90, 0"
          />
        </defs>
        <text
          fontSize="8"
          letterSpacing="2.5"
          fill="#3d3929"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="500"
        >
          <textPath href="#rotating-badge-circle">{text + text}</textPath>
        </text>
      </motion.svg>

      {/* tiny dot accents */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/60" />
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-secondary/60" />
    </div>
  )
}

export default RotatingBadge
