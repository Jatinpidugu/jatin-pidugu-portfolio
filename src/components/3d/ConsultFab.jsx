import React, { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

const ConsultFab = () => {
  const [show, setShow] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setShow(latest > 320)
  })

  const handleClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={handleClick}
          initial={{ opacity: 0, y: 30, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.85 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 group"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2 bg-ink text-background pl-4 pr-3 py-2.5 rounded-full shadow-[0_12px_30px_-8px_rgba(61,57,41,0.45)] border border-ink/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-serif italic text-sm whitespace-nowrap">
              Consult me on ML
            </span>
            <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:translate-x-0.5">→</span>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ConsultFab
