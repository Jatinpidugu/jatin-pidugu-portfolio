import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Computes pupil offset from an eye's center toward the cursor, capped to maxR.
const pupilOffsetFor = (eyeEl, mouseX, mouseY, maxR = 4) => {
  if (!eyeEl) return { x: 0, y: 0 }
  const r = eyeEl.getBoundingClientRect()
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2
  const dx = mouseX - cx
  const dy = mouseY - cy
  const dist = Math.hypot(dx, dy)
  if (dist === 0) return { x: 0, y: 0 }
  const ramp = Math.min(1, dist / 280)
  return {
    x: (dx / dist) * maxR * ramp,
    y: (dy / dist) * maxR * ramp,
  }
}

const RobotMascot = () => {
  const leftEyeRef = useRef(null)
  const rightEyeRef = useRef(null)
  const [pupils, setPupils] = useState({ l: { x: 0, y: 0 }, r: { x: 0, y: 0 } })
  const [blink, setBlink] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const handle = (e) => {
      setPupils({
        l: pupilOffsetFor(leftEyeRef.current, e.clientX, e.clientY, 4),
        r: pupilOffsetFor(rightEyeRef.current, e.clientX, e.clientY, 4),
      })
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  useEffect(() => {
    let stopped = false
    const schedule = () => {
      const wait = 2800 + Math.random() * 3500
      setTimeout(() => {
        if (stopped) return
        setBlink(true)
        setTimeout(() => {
          if (stopped) return
          setBlink(false)
          schedule()
        }, 120)
      }, wait)
    }
    schedule()
    return () => { stopped = true }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed top-4 md:top-5 right-3 md:right-5 z-[60] select-none"
    >
      {/* tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-1 mt-2 whitespace-nowrap pointer-events-none"
          >
            <div className="relative px-2.5 py-1 rounded-md bg-ink text-background text-[10px] font-mono uppercase tracking-[0.2em] shadow-soft">
              <span className="absolute -top-1 right-4 w-1.5 h-1.5 bg-ink rotate-45" />
              i see you
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the bot — pill-shaped face with two big eyes */}
      <motion.div
        animate={hovered ? { y: [-1, -3, -1, 0], rotate: [-1.5, 1.5, -1.5] } : { y: 0, rotate: 0 }}
        transition={hovered
          ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
        }
        className="relative"
      >
        <div
          className="relative w-[64px] h-[44px] md:w-[72px] md:h-[48px] rounded-[14px] bg-gradient-to-b from-white to-[#f0eee5] border border-ink/15"
          style={{
            boxShadow:
              '0 10px 22px -10px rgba(61,57,41,0.35), inset 0 -2px 4px rgba(61,57,41,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          {/* coral status dot, top-left corner */}
          <span className="absolute top-1.5 left-2 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>

          {/* tiny mono label, top-right corner — like a device branding */}
          <span className="absolute top-1.5 right-2 text-[6.5px] font-mono uppercase tracking-[0.2em] text-ink/30">jp.bot</span>

          {/* eyes row */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 pt-2">
            {/* left eye */}
            <div ref={leftEyeRef} className="relative w-[18px] h-[18px] md:w-[20px] md:h-[20px] rounded-full bg-ink overflow-hidden">
              <motion.div
                animate={{ scaleY: blink ? 0.05 : 1 }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
                className="absolute inset-0 bg-ink rounded-full"
              />
              {/* pupil — cream color, tracks mouse */}
              <motion.div
                animate={{ x: pupils.l.x, y: pupils.l.y, scaleY: blink ? 0.05 : 1 }}
                transition={{ type: 'spring', stiffness: 360, damping: 26, mass: 0.4 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] md:w-[11px] md:h-[11px] rounded-full bg-background"
              >
                {/* highlight */}
                <span className="absolute top-[2px] left-[2px] w-[3px] h-[3px] rounded-full bg-white" />
              </motion.div>
            </div>

            {/* right eye */}
            <div ref={rightEyeRef} className="relative w-[18px] h-[18px] md:w-[20px] md:h-[20px] rounded-full bg-ink overflow-hidden">
              <motion.div
                animate={{ scaleY: blink ? 0.05 : 1 }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
                className="absolute inset-0 bg-ink rounded-full"
              />
              <motion.div
                animate={{ x: pupils.r.x, y: pupils.r.y, scaleY: blink ? 0.05 : 1 }}
                transition={{ type: 'spring', stiffness: 360, damping: 26, mass: 0.4 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] md:w-[11px] md:h-[11px] rounded-full bg-background"
              >
                <span className="absolute top-[2px] left-[2px] w-[3px] h-[3px] rounded-full bg-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default RobotMascot
