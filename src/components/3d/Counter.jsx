import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'

const Counter = ({ value, duration = 2, className = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  const numeric = parseInt(String(value).replace(/\D/g, ''), 10) || 0
  const suffix = String(value).replace(/[\d\s]/g, '')

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, numeric, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.floor(latest).toString()),
    })
    return controls.stop
  }, [inView, numeric, duration, mv])

  return (
    <motion.span ref={ref} className={className}>
      {display}{suffix}
    </motion.span>
  )
}

export default Counter
