import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Section3D = ({ children, className = '', id }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [22, 0, 0, -10])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.88, 1, 1, 0.96])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.4, 1, 1, 0.5])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -40])

  return (
    <section id={id} ref={ref} className={className} style={{ perspective: '1500px' }}>
      <motion.div
        style={{ rotateX, scale, opacity, y, transformStyle: 'preserve-3d', transformOrigin: 'center top' }}
      >
        {children}
      </motion.div>
    </section>
  )
}

export default Section3D
