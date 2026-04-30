import React from 'react'
import { motion } from 'framer-motion'
import { useTilt3D } from '../../hooks/useTilt3D'

const Tilt3D = ({ children, className = '', max = 10, scale = 1.02, glare = true }) => {
  const tilt = useTilt3D({ max, scale })

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={tilt.style}
      className={className}
    >
      <motion.div
        style={tilt.innerStyle}
        className="relative h-full w-full"
      >
        {children}
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-40 mix-blend-overlay"
            style={{
              background: 'radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.6), transparent 50%)',
              '--gx': tilt.glareStyle.x,
              '--gy': tilt.glareStyle.y,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default Tilt3D
