import React, { useRef } from 'react'
import { usePortfolioData } from '../context/DataContext'
import StatInfoCard from '../components/StatInfoCard'
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { HiArrowDown, HiArrowDownTray } from 'react-icons/hi2'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import MagneticButton from '../components/3d/MagneticButton'
import Highlight from '../components/3d/Highlight'
import NeuralNetwork from '../components/3d/NeuralNetwork'
import TrainingMetrics from '../components/3d/TrainingMetrics'
import TechRotator from '../components/3d/TechRotator'
import ExperienceLive from '../components/3d/ExperienceLive'

const Hero = () => {
  const { stats, certificates, projects, skills, aboutMe } = usePortfolioData()
  const ref = useRef(null)

  // override stat counts with live counts from their actual data sources
  const liveStats = stats.map((s) => {
    if (s.id === '02') return { ...s, count: String(certificates.length) }
    if (s.id === '03') return { ...s, count: String(projects.length) }
    if (s.id === '04') return { ...s, count: String(skills.length) }
    return s
  })

  // hero scroll tracking left intentionally minimal — no opacity fade
  // (was hiding the stats section when scrolling into it)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const mxs = useSpring(mx, { stiffness: 100, damping: 22 })
  const mys = useSpring(my, { stiffness: 100, damping: 22 })
  const photoRotateY = useTransform(mxs, [-0.5, 0.5], [-6, 6])
  const photoRotateX = useTransform(mys, [-0.5, 0.5], [4, -4])

  const handleMouse = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const resetMouse = () => { mx.set(0); my.set(0) }

  const goToprofile = () => { window.location.href = 'https://www.linkedin.com/in/jatin-pidugu-857b82218' }
  const goToresume = () => { window.location.href = 'https://drive.google.com/file/d/1kuKFyorOOM0kMPLPHRlbJKFEpkARPhTu/view?usp=drive_link' }

  return (
    <section ref={ref} id="hero" className="relative overflow-x-clip bg-background min-h-screen select-none">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-1/4 w-[700px] h-[700px] rounded-full bg-primary/[0.06] blur-3xl" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(61,57,41,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(61,57,41,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-16">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-border shadow-soft"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted font-medium">Open to all roles</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 font-serif text-ink leading-[0.96] tracking-[-0.025em] font-medium"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 5.75rem)' }}
            >
              Developing software <br className="hidden md:block" />alongside <span className="italic text-primary">AI</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-7 text-base md:text-lg text-muted leading-relaxed max-w-xl"
            >
              I turn data into useful systems — currently building AI/ML full-time at iMark 360 LLP, Ahmedabad. Recent: a HANA database chatbot, an offline document-processing AI, and a full-stack plant maintenance platform. B.Tech CS, Indore.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-7"
            >
              <TechRotator />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <MagneticButton onClick={goToresume} className="action-btn" strength={0.25}>
                <HiArrowDownTray className="text-[15px] shrink-0" />
                <span>Download Resume</span>
              </MagneticButton>
              <MagneticButton onClick={goToprofile} className="action-btn-outline" strength={0.25}>
                LinkedIn
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-12 flex items-center gap-3 text-sm text-muted"
            >
              <div className="h-px w-10 bg-border" />
              <a href="#contact" className="hover:text-ink transition-colors">Get in touch →</a>
            </motion.div>
          </div>

          <motion.div
            onMouseMove={handleMouse}
            onMouseLeave={resetMouse}
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative mx-auto lg:ml-auto w-full max-w-[440px] select-none"
          >
            {/* sticky consult button — follows scroll within the card area */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: -16, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              style={{ marginBottom: '-3.25rem', marginLeft: '-1rem' }}
              className="sticky top-24 z-30 inline-flex w-fit cursor-pointer group"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-ink text-background px-4 py-2.5 rounded-full shadow-card flex items-center gap-2"
              >
                <span className="font-serif italic text-sm md:text-[15px] whitespace-nowrap">
                  Consult me on how ML works
                </span>
                <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </motion.div>
            </motion.a>

            <motion.div
              style={{ rotateX: photoRotateX, rotateY: photoRotateY, transformStyle: 'preserve-3d', perspective: '1400px' }}
              className="relative h-[460px] md:h-[540px] rounded-[28px] bg-white border border-border shadow-card overflow-hidden"
            >
              {/* header strip */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-3.5 border-b border-border z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted font-medium">model.fit()</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted font-mono">v0.4.2 · main</span>
              </div>

              {/* neural net viz */}
              <div className="absolute inset-0 pt-12 pb-32 px-2">
                <NeuralNetwork />
              </div>

              {/* watermark */}
              <div className="absolute bottom-4 left-5 text-[9px] uppercase tracking-[0.3em] text-muted/70 font-mono">
                · neural.classifier · 4·6·6·3
              </div>
            </motion.div>

            {/* live metrics overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -left-3 md:-left-8 z-20 w-[260px]"
            >
              <TrainingMetrics />
            </motion.div>

            {/* offset frame */}
            <div className="absolute -bottom-3 -right-3 h-[460px] md:h-[540px] left-0 right-0 rounded-[28px] border border-border -z-10 pointer-events-none" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 md:mt-16 pt-8 border-t border-border"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {liveStats.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <StatInfoCard count={item.count} label={item.label} index={index} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-14 pt-10 border-t border-border"
          >
            <ExperienceLive startDate={aboutMe.experienceStartDate || '2024-01-01'} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ delay: 1.2, duration: 1.4, y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' } }}
          className="hidden md:flex justify-center items-center gap-2 mt-20 text-[11px] uppercase tracking-[0.3em] text-muted"
        >
          <HiArrowDown />
          <span>Scroll</span>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
