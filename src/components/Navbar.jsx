import React, { useEffect, useState } from 'react'
import RotatingBadge from './3d/RotatingBadge'
import { usePortfolioData } from '../context/DataContext'
import { Link } from 'react-scroll'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'

const Navbar = () => {
  const { menuLinks } = usePortfolioData()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
  })

  useEffect(() => {
    const ids = menuLinks.map((m) => m.to)

    const computeActive = () => {
      // section is "active" once its top has crossed a line ~120px below viewport top
      // (just below the fixed navbar). pick the LAST section whose top is past that line.
      const probe = window.scrollY + 120
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.offsetTop <= probe) current = id
      }
      // bottom-of-page fallback — if user has scrolled to the very bottom,
      // force the last section active even if its top is below the probe.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1]
      }
      setActive(current)
    }

    computeActive()
    window.addEventListener('scroll', computeActive, { passive: true })
    window.addEventListener('resize', computeActive)
    return () => {
      window.removeEventListener('scroll', computeActive)
      window.removeEventListener('resize', computeActive)
    }
  }, [menuLinks])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleHire = () => {
    setIsOpen(false)
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-3 md:pt-4 select-none"
      >
        <motion.nav
          animate={{
            paddingTop: scrolled ? 6 : 10,
            paddingBottom: scrolled ? 6 : 10,
          }}
          transition={{ duration: 0.3 }}
          className={`mx-auto max-w-7xl flex items-center justify-between gap-4 rounded-full border px-3 md:pl-4 md:pr-1.5 transition-all duration-300 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-xl border-ink/10 shadow-[0_8px_30px_-12px_rgba(61,57,41,0.18)]'
              : 'bg-white/55 backdrop-blur-md border-ink/8'
          }`}
        >
          {/* logo */}
          <Link to="hero" smooth duration={450} offset={-100} className="cursor-pointer flex items-center gap-2.5">
            <RotatingBadge size={44} />
            <div className="flex flex-col leading-none min-w-0">
              <span className="font-serif text-sm md:text-[15px] font-medium text-ink tracking-tight whitespace-nowrap">Jatin Pidugu</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted mt-0.5 whitespace-nowrap">Data · Dev</span>
            </div>
          </Link>

          {/* desktop menu — sliding pill */}
          <ul className="hidden lg:flex items-center gap-1 relative">
            {menuLinks.map((item) => (
              <li key={item.id} className="relative">
                <Link
                  to={item.to}
                  smooth
                  duration={450}
                  offset={item.offset}
                  className="relative px-4 py-2 text-[13px] font-medium text-ink/65 hover:text-ink transition-colors cursor-pointer block"
                >
                  {active === item.to && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-ink rounded-full -z-0 shadow-[0_4px_12px_-4px_rgba(61,57,41,0.4)]"
                    />
                  )}
                  <span className={`relative z-10 transition-colors ${active === item.to ? 'text-white font-semibold' : ''}`}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleHire}
              className="hidden md:inline-flex h-10 items-center gap-1.5 text-[13px] font-medium text-white bg-gradient-to-br from-primary to-secondary hover:shadow-[0_8px_20px_-6px_rgba(204,120,92,0.55)] rounded-full pl-5 pr-4 transition-all duration-300"
            >
              <span>Hire Me</span>
              <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </motion.button>
            <button
              aria-label="Toggle menu"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-ink text-white border border-ink shadow-[0_4px_12px_-4px_rgba(61,57,41,0.4)]"
            >
              {isOpen ? <HiX className="text-xl" /> : <HiMenuAlt4 className="text-xl" />}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 select-none"
          >
            <ul className="flex flex-col gap-1">
              {menuLinks.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.04, duration: 0.3 }}
                  className="border-b border-border"
                >
                  <Link
                    to={item.to}
                    smooth
                    duration={450}
                    offset={item.offset}
                    onClick={() => setIsOpen(false)}
                    className="flex items-baseline justify-between py-5 cursor-pointer"
                  >
                    <span className="font-serif text-3xl text-ink">{item.label}</span>
                    <span className="text-xs text-muted tracking-[0.2em]">{item.id}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={handleHire}
              className="w-full mt-8 h-12 text-sm font-medium text-white bg-ink rounded-full"
            >
              Hire Me →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
