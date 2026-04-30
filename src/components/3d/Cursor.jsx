import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const Cursor = () => {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 })
  const dotX = useSpring(x, { stiffness: 800, damping: 30, mass: 0.2 })
  const dotY = useSpring(y, { stiffness: 800, damping: 30, mass: 0.2 })
  const [variant, setVariant] = useState('default')

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const enter = (e) => {
      const target = e.target
      if (target.closest && target.closest('a, button, [role="button"], input, textarea, [data-cursor="hover"]')) {
        setVariant('hover')
      } else {
        setVariant('default')
      }
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', enter)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', enter)
    }
  }, [x, y])

  return (
    <>
      <motion.div
        style={{
          x: sx, y: sy,
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{
          width: variant === 'hover' ? 56 : 36,
          height: variant === 'hover' ? 56 : 36,
          borderColor: variant === 'hover' ? '#cc785c' : 'rgba(61,57,41,0.35)',
          borderWidth: variant === 'hover' ? 2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full border hidden md:block mix-blend-difference"
      />
      <motion.div
        style={{
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{ scale: variant === 'hover' ? 0 : 1 }}
        className="pointer-events-none fixed top-0 left-0 z-[100] w-[5px] h-[5px] bg-primary rounded-full hidden md:block"
      />
    </>
  )
}

export default Cursor
