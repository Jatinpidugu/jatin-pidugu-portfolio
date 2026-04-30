import React, { useMemo, useRef, useState } from 'react'
import { usePortfolioData } from '../context/DataContext'
import Tabs from '../components/Tabs'
import SkillCard, { getCategoryDot, getCategoryLabel } from '../components/SkillCard'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const TechnicalProficiency = () => {
  const { skills, skillTabs } = usePortfolioData()
  const [activeTab, setActiveTab] = useState('data_science')
  const [expandedId, setExpandedId] = useState(null)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const blobY = useTransform(scrollYProgress, [0, 1], [-80, 80])

  const tabData = useMemo(() => {
    if (activeTab === 'all') return skills
    return skills.filter((s) => s.type === activeTab)
  }, [skills, activeTab])

  const handleTabValueChange = (value) => {
    setActiveTab(value)
    setExpandedId(null)
  }

  const avgProf = skills.length
    ? Math.round(skills.reduce((a, s) => a + (s.progress || 0), 0) / skills.length)
    : 0

  const peak = useMemo(
    () => skills.reduce((m, s) => (s.progress > (m?.progress || 0) ? s : m), null),
    [skills]
  )

  const breakdown = useMemo(() => {
    const map = {}
    skills.forEach((s) => {
      const k = s.type || 'core'
      map[k] = (map[k] || 0) + 1
    })
    return Object.entries(map).map(([k, v]) => ({ type: k, count: v }))
  }, [skills])

  return (
    <section ref={ref} id="skills" className="relative bg-sand pt-16 md:pt-20 pb-24 md:pb-32 overflow-hidden select-none">
      <motion.div style={{ y: blobY }} className="absolute -right-40 top-20 w-[480px] h-[480px] rounded-full bg-primary/[0.08] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-10 md:mb-14"
        >
          <span className="section-eyebrow">/ 03 — My Tech Stack <span className="text-muted/60">--skill</span></span>
          <h2 className="section-title text-5xl md:text-6xl">
            The <span className="italic text-primary">layers</span> I work with.
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-xl">
            From data ingestion to interface — the working stack, ranked by depth. Tap any row to read more.
          </p>
        </motion.div>

        {/* filter row */}
        <div className="flex items-start md:items-center gap-3 md:gap-5 mb-6 flex-col md:flex-row">
          <div className="flex items-center gap-3 shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted/70 font-mono">// filter</span>
          </div>
          <Tabs tabList={skillTabs} activeTab={activeTab} onChange={handleTabValueChange} />
        </div>

        {/* matrix card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white rounded-3xl border border-border shadow-card overflow-hidden"
        >
          {/* card header */}
          <div className="flex items-center justify-between px-5 md:px-6 py-3 border-b border-border bg-background/50 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted/40" />
              <span className="ml-2 text-[10px] uppercase tracking-[0.22em] text-muted font-medium font-mono">stack.matrix()</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted/60 font-mono">
              <span>{tabData.length} / {skills.length} modules</span>
              <span className="text-muted/30">·</span>
              <span>avg {avgProf}%</span>
              {peak && (
                <>
                  <span className="text-muted/30">·</span>
                  <span>peak <span className="text-primary">{peak.skil}</span></span>
                </>
              )}
            </div>
          </div>

          {/* column headers (desktop) */}
          <div className="hidden md:flex items-center gap-4 px-6 py-2.5 border-b border-border text-[9px] uppercase tracking-[0.22em] text-muted/50 font-mono">
            <span className="w-7 shrink-0">id</span>
            <span className="w-9 shrink-0" />
            <span className="w-[24%] shrink-0">module</span>
            <span className="w-[16%] shrink-0">category</span>
            <span className="flex-1">proficiency</span>
            <span className="w-9 text-right shrink-0">level</span>
            <span className="w-4 shrink-0" />
          </div>

          {/* rows */}
          <motion.div layout className="min-h-[320px]">
            <AnimatePresence initial={false} mode="popLayout">
              {tabData.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <SkillCard
                    index={i + 1}
                    icon={skill.icon}
                    skillName={skill.skil}
                    description={skill.description}
                    progress={skill.progress}
                    type={skill.type}
                    expanded={expandedId === skill.id}
                    onToggle={() =>
                      setExpandedId((cur) => (cur === skill.id ? null : skill.id))
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* legend / footer */}
          <div className="flex items-center justify-between px-5 md:px-6 py-3 border-t border-border bg-background/40 flex-wrap gap-3">
            <div className="flex items-center gap-3 md:gap-5 flex-wrap">
              <span className="text-[9px] uppercase tracking-[0.22em] text-muted/50 font-mono">categories</span>
              {breakdown.map((b) => (
                <button
                  key={b.type}
                  onClick={() => handleTabValueChange(activeTab === b.type ? 'all' : b.type)}
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted/70 font-mono hover:text-ink transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full ${getCategoryDot(b.type)}`} />
                  <span>{getCategoryLabel(b.type)} · {b.count}</span>
                </button>
              ))}
            </div>
            <span className="text-[9px] uppercase tracking-[0.22em] text-muted/50 font-mono">tap any row to expand</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechnicalProficiency
