import React, { useEffect, useMemo, useRef, useState } from 'react'
import { usePortfolioData } from '../context/DataContext'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { HiBadgeCheck, HiBookOpen } from 'react-icons/hi'
import { HiArrowUpRight } from 'react-icons/hi2'

// derive issuer + topic from "Issuer: Topic" or "ISSUER NAME Topic"
const parseTitle = (title) => {
  if (!title) return { issuer: 'Certificate', topic: '' }
  const colon = title.match(/^([^:]+):\s*(.+)$/)
  if (colon) return { issuer: colon[1].trim(), topic: colon[2].trim() }
  const words = title.split(/\s+/)
  if (words.length <= 2) return { issuer: title, topic: '' }
  return { issuer: words.slice(0, 2).join(' '), topic: words.slice(2).join(' ') }
}

const Certificate = () => {
  const { certificates } = usePortfolioData()
  const [selectedId, setSelectedId] = useState(null)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const blobY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  useEffect(() => {
    if (!certificates.length) return
    if (!selectedId || !certificates.find((c) => c.id === selectedId)) {
      setSelectedId(certificates[0].id)
    }
  }, [certificates, selectedId])

  const selected = useMemo(
    () => certificates.find((c) => c.id === selectedId) || certificates[0],
    [certificates, selectedId]
  )

  const issuerCount = useMemo(() => {
    const set = new Set(certificates.map((c) => parseTitle(c.title).issuer))
    return set.size
  }, [certificates])

  const totalTags = useMemo(
    () => certificates.reduce((a, c) => a + (c.tag?.length || 0), 0),
    [certificates]
  )

  return (
    <section
      ref={ref}
      id="certificate"
      className="relative bg-surface pt-10 md:pt-14 pb-16 md:pb-20 overflow-hidden select-none"
    >
      <motion.div style={{ y: blobY }} className="absolute -right-32 top-1/3 w-[420px] h-[420px] rounded-full bg-primary/[0.08] blur-3xl pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
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
          <span className="section-eyebrow">/ 05 — Credentials <span className="text-muted/60">--certifications</span></span>
          <h2 className="section-title text-5xl md:text-6xl">
            What I've <span className="italic text-primary">earned</span> along the way.
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-xl">
            Certifications across AI, data science, networking, and analytics — issued by recognized programs and platforms.
          </p>
        </motion.div>

        {/* cert browser card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white rounded-3xl border border-border shadow-card overflow-hidden"
        >
          {/* header strip */}
          <div className="flex items-center justify-between px-5 md:px-6 py-3 border-b border-border bg-background/50 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted/40" />
              <span className="ml-2 text-[10px] uppercase tracking-[0.22em] text-muted font-medium font-mono">credentials.list()</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted/60 font-mono">
              <span>{certificates.length} earned</span>
              <span className="text-muted/30">·</span>
              <span>{issuerCount} issuers</span>
              <span className="text-muted/30">·</span>
              <span>{totalTags} skills tagged</span>
            </div>
          </div>

          {/* body */}
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">
            {/* left — list */}
            <div className="border-b lg:border-b-0 lg:border-r border-border bg-background/20">
              <div className="px-5 py-2.5 border-b border-border text-[9px] uppercase tracking-[0.22em] text-muted/50 font-mono">
                index
              </div>
              <div className="max-h-[720px] overflow-y-auto">
                {certificates.map((c, i) => {
                  const idx = String(i + 1).padStart(2, '0')
                  const isActive = selected?.id === c.id
                  const { issuer, topic } = parseTitle(c.title)
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      className={`relative w-full text-left px-5 py-3 border-b border-border last:border-b-0 transition-colors group ${
                        isActive ? 'bg-white' : 'hover:bg-white/60'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="cert-active-indicator"
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
                        <div className="flex-1 min-w-0">
                          <div className={`text-[9px] uppercase tracking-[0.22em] font-mono truncate transition-colors ${
                            isActive ? 'text-primary' : 'text-muted/60 group-hover:text-muted'
                          }`}>
                            {issuer}
                          </div>
                          <div className={`text-[13px] truncate mt-0.5 transition-colors ${
                            isActive ? 'text-ink font-medium' : 'text-muted group-hover:text-ink'
                          }`}>
                            {topic || c.title}
                          </div>
                        </div>
                        <HiBadgeCheck className={`text-base shrink-0 transition-colors ${
                          isActive ? 'text-primary' : 'text-muted/40 group-hover:text-muted'
                        }`} />
                      </div>
                    </button>
                  )
                })}
                {certificates.length === 0 && (
                  <div className="px-5 py-8 text-[11px] uppercase tracking-[0.22em] text-muted/50 font-mono text-center">
                    no certificates yet
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
                    {/* certificate image — paper feel */}
                    <div className="relative overflow-hidden rounded-2xl bg-surface border border-border shadow-soft">
                      <motion.img
                        src={selected.image}
                        alt={selected.title}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-auto object-contain bg-white"
                      />
                      <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-ink/30" />
                      <span className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-ink/30" />
                      <span className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-ink/30" />
                      <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-ink/30" />
                      {/* verified badge */}
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur border border-border shadow-soft">
                        <HiBadgeCheck className="text-primary text-sm" />
                        <span className="text-[9px] uppercase tracking-[0.22em] font-mono text-ink">verified</span>
                      </div>
                    </div>

                    {/* meta row */}
                    <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted/60 font-mono flex-wrap">
                      <span className="inline-flex items-center gap-1.5">
                        <HiBookOpen className="text-sm" />
                        <span>{parseTitle(selected.title).issuer}</span>
                      </span>
                      <span className="text-muted/30">·</span>
                      <span className="text-primary">selected</span>
                    </div>

                    {/* topic / title */}
                    <h3 className="mt-2 font-serif text-2xl md:text-3xl font-medium text-ink leading-tight tracking-tight">
                      {parseTitle(selected.title).topic || selected.title}
                    </h3>

                    {/* tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {selected.tag?.map((t, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-mono text-muted bg-background border border-border px-2.5 py-1 rounded-full"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary/60" />
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* verification link */}
                    {selected.link && (
                      <a
                        href={selected.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-primary transition-colors group/cta"
                      >
                        <span className="relative">
                          view credential
                          <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-current scale-x-100 origin-left transition-transform duration-300 group-hover/cta:scale-x-0" />
                        </span>
                        <span className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center group-hover/cta:bg-primary group-hover/cta:border-primary group-hover/cta:text-white transition-all">
                          <HiArrowUpRight className="text-xs group-hover/cta:rotate-12 transition-transform" />
                        </span>
                      </a>
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
              <span>credentials · verified</span>
            </div>
            <span>tap a credential on the left</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certificate
