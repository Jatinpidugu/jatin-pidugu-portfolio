import React, { useEffect, useMemo, useRef, useState } from 'react'
import { usePortfolioData } from '../context/DataContext'
import Tabs from '../components/Tabs'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { HiArrowUpRight, HiLockClosed } from 'react-icons/hi2'

const MyProjects = () => {
  const { projects, projectTabs } = usePortfolioData()
  const [selectedTab, setSelectedTab] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const blobY = useTransform(scrollYProgress, [0, 1], [60, -60])

  const filteredProjects = useMemo(
    () => (selectedTab === 'all' ? projects : projects.filter((p) => p.type === selectedTab)),
    [projects, selectedTab]
  )

  // keep a valid selection within the current filter
  useEffect(() => {
    if (filteredProjects.length === 0) return
    if (!selectedId || !filteredProjects.find((p) => p.id === selectedId)) {
      setSelectedId(filteredProjects[0].id)
    }
  }, [filteredProjects, selectedId])

  const selected = useMemo(
    () => filteredProjects.find((p) => p.id === selectedId) || filteredProjects[0],
    [filteredProjects, selectedId]
  )

  const handleOpen = () => selected?.link && window.open(selected.link, '_blank')
  const isPrivate = (p) => !p?.link

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-background pt-10 md:pt-14 pb-16 md:pb-20 overflow-hidden select-none"
    >
      <motion.div style={{ y: blobY }} className="absolute -left-32 bottom-20 w-[480px] h-[480px] rounded-full bg-primary/[0.07] blur-3xl pointer-events-none" />
      <motion.div style={{ y: blobY }} className="absolute -right-32 top-20 w-[400px] h-[400px] rounded-full bg-secondary/[0.07] blur-3xl pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.45]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(61,57,41,0.07) 1px, transparent 0)',
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-6 md:mb-10"
        >
          <span className="section-eyebrow">/ 04 — Selected Work <span className="text-muted/60">--projects</span></span>
          <h2 className="section-title text-5xl md:text-6xl">
            Where ideas met <span className="italic text-primary">execution</span>.
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-xl">
            Real problems solved — from ML pipelines to plant-floor systems. Pick a repo on the left to inspect.
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
          <Tabs tabList={projectTabs} activeTab={selectedTab} onChange={setSelectedTab} />
        </div>

        {/* repo browser card */}
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
              <span className="ml-2 text-[10px] uppercase tracking-[0.22em] text-muted font-medium font-mono">projects.repo()</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted/60 font-mono">
              <span>{filteredProjects.length} / {projects.length} repos</span>
              {selected && (
                <>
                  <span className="text-muted/30">·</span>
                  <span>open <span className="text-primary">/{String(filteredProjects.findIndex((p) => p.id === selected.id) + 1).padStart(2, '0')}</span></span>
                </>
              )}
            </div>
          </div>

          {/* body — list + detail */}
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">
            {/* left — repo list */}
            <div className="border-b lg:border-b-0 lg:border-r border-border bg-background/20">
              <div className="px-5 py-2.5 border-b border-border text-[9px] uppercase tracking-[0.22em] text-muted/50 font-mono">
                index
              </div>
              <div className="max-h-[720px] overflow-y-auto">
                {filteredProjects.map((p, i) => {
                  const idx = String(i + 1).padStart(2, '0')
                  const isActive = selected?.id === p.id
                  const cat = (p.type || 'project').replace(/\s+/g, '_').replace(/-/g, '_').toLowerCase()
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedId(p.id)}
                      className={`relative w-full text-left px-5 py-3.5 border-b border-border last:border-b-0 transition-colors group ${
                        isActive ? 'bg-white' : 'hover:bg-white/60'
                      }`}
                    >
                      {/* active indicator bar */}
                      {isActive && (
                        <motion.span
                          layoutId="repo-active-indicator"
                          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-primary"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-mono tabular-nums shrink-0 transition-colors ${
                          isActive ? 'text-primary' : 'text-muted/50 group-hover:text-muted'
                        }`}>
                          /{idx}
                        </span>
                        <span className={`text-sm truncate flex-1 transition-colors ${
                          isActive ? 'text-ink font-medium' : 'text-muted group-hover:text-ink'
                        }`}>
                          {p.title}
                        </span>
                        {isPrivate(p) ? (
                          <HiLockClosed className={`text-[11px] shrink-0 transition-colors ${
                            isActive ? 'text-primary' : 'text-muted/50 group-hover:text-muted'
                          }`} />
                        ) : (
                          <HiArrowUpRight className={`text-xs shrink-0 transition-all ${
                            isActive ? 'text-primary opacity-100' : 'text-muted/40 opacity-0 group-hover:opacity-100'
                          }`} />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 ml-7">
                        <span className="text-[9px] uppercase tracking-[0.22em] text-muted/40 font-mono">
                          project.{cat}
                        </span>
                        {isPrivate(p) && (
                          <>
                            <span className="text-muted/30 text-[9px]">·</span>
                            <span className="text-[9px] uppercase tracking-[0.22em] text-primary/70 font-mono">private</span>
                          </>
                        )}
                      </div>
                    </button>
                  )
                })}
                {filteredProjects.length === 0 && (
                  <div className="px-5 py-8 text-[11px] uppercase tracking-[0.22em] text-muted/50 font-mono text-center">
                    no repos in this filter
                  </div>
                )}
              </div>
            </div>

            {/* right — detail */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {selected && (
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="p-5 md:p-7"
                  >
                    {/* preview image */}
                    <div
                      onClick={selected.link ? handleOpen : undefined}
                      className={`relative overflow-hidden rounded-2xl bg-surface aspect-[16/9] border border-border group ${
                        selected.link ? 'cursor-pointer' : ''
                      }`}
                    >
                      <motion.img
                        src={selected.image}
                        alt={selected.title}
                        whileHover={selected.link ? { scale: 1.04 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className={`w-full h-full object-cover ${!selected.link ? 'blur-[2px]' : ''}`}
                      />
                      <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-white/70" />
                      <span className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-white/70" />
                      <span className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-white/70" />
                      <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-white/70" />
                      {selected.link && (
                        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors duration-500" />
                      )}
                      {/* confidential overlay */}
                      {!selected.link && (
                        <div className="absolute inset-0 bg-ink/40 backdrop-blur-[1px] flex items-center justify-center">
                          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur border border-border shadow-soft">
                            <HiLockClosed className="text-primary text-sm" />
                            <span className="text-[10px] uppercase tracking-[0.22em] font-mono text-ink">
                              client · confidential
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* meta row */}
                    <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted/60 font-mono flex-wrap">
                      <span>project.{(selected.type || 'project').replace(/\s+/g, '_').replace(/-/g, '_').toLowerCase()}</span>
                      <span className="text-muted/30">·</span>
                      <span className="text-primary">selected</span>
                    </div>

                    {/* title */}
                    <h3 className="mt-2 font-serif text-2xl md:text-3xl font-medium text-ink leading-tight tracking-tight">
                      {selected.title}
                    </h3>

                    {/* tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {selected.tag.map((t, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-mono text-muted bg-background border border-border px-2.5 py-1 rounded-full"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary/60" />
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* CTA — public repo OR confidentiality notice */}
                    {selected.link ? (
                      <button
                        onClick={handleOpen}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-primary transition-colors group/cta"
                      >
                        <span className="relative">
                          open repo
                          <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-current scale-x-100 origin-left transition-transform duration-300 group-hover/cta:scale-x-0" />
                        </span>
                        <span className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center group-hover/cta:bg-primary group-hover/cta:border-primary group-hover/cta:text-white transition-all">
                          <HiArrowUpRight className="text-xs group-hover/cta:rotate-12 transition-transform" />
                        </span>
                      </button>
                    ) : (
                      <div className="mt-6 inline-flex items-start gap-3 px-4 py-3 rounded-2xl bg-background/60 border border-border max-w-md">
                        <span className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                          <HiLockClosed className="text-primary text-xs" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-[10px] uppercase tracking-[0.22em] text-primary font-mono mb-0.5">
                            under client confidentiality
                          </div>
                          <p className="text-xs text-muted leading-relaxed">
                            Source code unavailable — built for production use under client NDA. Available for walkthrough on request.
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* footer strip */}
          <div className="flex items-center justify-between px-5 md:px-6 py-3 border-t border-border bg-background/30 text-[10px] uppercase tracking-[0.22em] text-muted/60 font-mono">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span>repo · synced</span>
            </div>
            <span>tap a repo on the left</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MyProjects
