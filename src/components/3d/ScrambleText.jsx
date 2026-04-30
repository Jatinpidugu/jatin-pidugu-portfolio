import React, { useEffect, useState, useRef } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const ScrambleText = ({ text, className = '', duration = 1400, delay = 0 }) => {
  const [display, setDisplay] = useState(text)
  const startedRef = useRef(false)
  const ref = useRef(null)

  useEffect(() => {
    if (startedRef.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true
          setTimeout(() => runScramble(), delay)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [delay])

  const runScramble = () => {
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const revealUpTo = Math.floor(progress * text.length)
      const out = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < revealUpTo) return ch
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')
      setDisplay(out)
      if (progress < 1) requestAnimationFrame(tick)
      else setDisplay(text)
    }
    requestAnimationFrame(tick)
  }

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

export default ScrambleText
