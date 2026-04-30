import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Hand-drawn SVG highlight under a word.
 * variant: 'underline' | 'wavy' | 'circle' | 'sweep'
 */
const Highlight = ({ children, variant = 'underline', color = '#cc785c', delay = 0.6, duration = 1.1, className = '' }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <span ref={ref} className={`relative inline-block whitespace-nowrap ${className}`}>
      <span className="relative z-10">{children}</span>

      {variant === 'underline' && (
        <svg
          aria-hidden="true"
          className="absolute left-0 right-0 -bottom-2 md:-bottom-3 w-full"
          viewBox="0 0 300 12"
          preserveAspectRatio="none"
          style={{ height: '0.45em' }}
        >
          <motion.path
            d="M2 8 Q 75 2 150 7 T 298 6"
            fill="transparent"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      )}

      {variant === 'wavy' && (
        <svg
          aria-hidden="true"
          className="absolute left-0 right-0 -bottom-2 md:-bottom-3 w-full"
          viewBox="0 0 300 14"
          preserveAspectRatio="none"
          style={{ height: '0.55em' }}
        >
          <motion.path
            d="M2 8 Q 25 1 50 8 T 100 8 T 150 8 T 200 8 T 250 8 T 298 8"
            fill="transparent"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      )}

      {variant === 'circle' && (
        <svg
          aria-hidden="true"
          className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+1.5rem)] h-[calc(100%+1rem)]"
          viewBox="0 0 320 80"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 30 14 C 110 4, 230 4, 300 22 C 318 36, 305 60, 240 70 C 150 80, 30 70, 12 50 C 0 30, 12 18, 30 14 Z"
            fill="transparent"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay, duration: duration * 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      )}

      {variant === 'sweep' && (
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 right-0 bottom-0 h-[28%] origin-left rounded-sm"
          style={{ background: `${color}33`, zIndex: 0 }}
        />
      )}
    </span>
  )
}

export default Highlight
