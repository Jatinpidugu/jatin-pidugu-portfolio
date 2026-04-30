import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const MagneticButton = ({ children, onClick, className = '', strength = 0.4 }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left - r.width / 2) * strength
    const py = (e.clientY - r.top - r.height / 2) * strength
    x.set(px)
    y.set(py)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      <motion.span style={{ x: sx, y: sy, scale: 1 }} className="inline-flex items-center justify-center gap-2 whitespace-nowrap">
        {children}
      </motion.span>
    </motion.button>
  )
}

export default MagneticButton
