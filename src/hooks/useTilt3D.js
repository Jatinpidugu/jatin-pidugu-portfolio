import { useRef } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

export function useTilt3D({ max = 12, perspective = 1000, scale = 1.02 } = {}) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xs = useSpring(x, { stiffness: 200, damping: 20, mass: 0.4 })
  const ys = useSpring(y, { stiffness: 200, damping: 20, mass: 0.4 })

  const rotateX = useTransform(ys, [-0.5, 0.5], [max, -max])
  const rotateY = useTransform(xs, [-0.5, 0.5], [-max, max])
  const glareX = useTransform(xs, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(ys, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return {
    ref,
    style: { perspective, transformStyle: 'preserve-3d' },
    innerStyle: { rotateX, rotateY, scale, transformStyle: 'preserve-3d' },
    glareStyle: { x: glareX, y: glareY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }
}
