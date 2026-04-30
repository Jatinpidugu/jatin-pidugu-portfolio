import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ParallaxLayer = ({ children, speed = 0.3, className = '' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

export default ParallaxLayer
