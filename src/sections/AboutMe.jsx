import React, { useRef } from 'react'
import { usePortfolioData } from '../context/DataContext'
import { motion, useScroll, useTransform } from 'framer-motion'

const FACTS = [
  { k: 'role',       v: 'AI / ML Engineer' },
  { k: 'company',    v: 'iMark 360 LLP' },
  { k: 'employment', v: 'Full-time' },
  { k: 'location',   v: 'Ahmedabad, India' },
  { k: 'degree',     v: 'B.Tech, Computer Science' },
  { k: 'university', v: 'Shri Vaishnav Vidyapeeth' },
  { k: 'graduated',  v: '2024' },
  { k: 'languages',  v: 'EN · HI · TE' },
]

const FOCUS = [
  'LLM Engineering',
  'Retrieval-Augmented Generation',
  'Conversational Databases',
  'Document Intelligence',
  'Production ML Systems',
]

const PROFILE_JSON = [
  { k: '"name"',       v: '"Jatin Pidugu"' },
  { k: '"role"',       v: '"AI / ML Engineer"' },
  { k: '"company"',    v: '"iMark 360 LLP"' },
  { k: '"type"',       v: '"full-time"' },
  { k: '"degree"',     v: '"B.Tech CS · SVVV"' },
  { k: '"location"',   v: '"Ahmedabad, India"' },
  { k: '"focus"',      v: '["LLMs", "RAG", "Doc AI"]' },
  { k: '"available"',  v: 'true' },
]

const AboutMe = () => {
  const { aboutMe } = usePortfolioData()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const blob = useTransform(scrollYProgress, [0, 1], [-100, 100])

  return (
    <section ref={ref} id="about" className="relative bg-surface pt-12 md:pt-16 pb-24 md:pb-32 overflow-hidden select-none">
      <motion.div style={{ y: blob }} className="absolute -left-32 top-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.07] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 relative">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <span className="section-eyebrow">/ 02 — About</span>
          <h2 className="section-title text-5xl md:text-6xl">
            A short <span className="italic text-primary">README.md</span> on me.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* left — profile.json code card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <div className="relative h-full flex flex-col rounded-3xl bg-white border border-border shadow-card overflow-hidden">
              {/* card header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-background/60 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-muted/40" />
                  <span className="ml-2 text-[10px] uppercase tracking-[0.22em] text-muted font-medium">profile.json</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted font-mono">v1.0 · stable</span>
              </div>

              {/* JSON body */}
              <div className="relative shrink-0 px-6 md:px-7 py-7 md:py-8 font-mono text-[13.5px] md:text-sm leading-[2] text-ink/90 bg-white">
                {/* dot grid bg */}
                <div
                  className="absolute inset-0 opacity-[0.18] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(61,57,41,0.18) 1px, transparent 0)',
                    backgroundSize: '14px 14px',
                  }}
                />
                <div className="relative">
                  <div className="text-muted/70">{'{'}</div>
                  {PROFILE_JSON.map((row, i) => (
                    <motion.div
                      key={row.k}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                      className="pl-5 truncate"
                    >
                      <span className="text-primary">{row.k}</span>
                      <span className="text-muted/60">: </span>
                      <span className="text-ink">{row.v}</span>
                      {i < PROFILE_JSON.length - 1 && <span className="text-muted/60">,</span>}
                    </motion.div>
                  ))}
                  <div className="text-muted/70">{'}'}</div>
                </div>
                {/* live caret */}
                <div className="relative mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-muted">parsed · ok</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted/60">8 keys</span>
                </div>
              </div>

              {/* meta — configuration printout: index + key + dotted leader + value */}
              <div className="border-t border-border flex-1 flex flex-col">
                <div className="px-5 md:px-6 py-2.5 border-b border-border bg-background/40 flex items-center justify-between shrink-0">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted/70 font-mono">// model.config</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted/50 font-mono">{FACTS.length} keys</span>
                </div>
                <div className="grid grid-cols-1 auto-rows-fr divide-y divide-border flex-1">
                  {FACTS.map((f, i) => (
                    <motion.div
                      key={f.k}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                      className="group flex items-center gap-3 md:gap-4 px-5 md:px-6 hover:bg-background/60 transition-colors"
                    >
                      <span className="text-[9px] font-mono text-muted/50 tabular-nums w-5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-muted/80 font-mono shrink-0 group-hover:text-primary transition-colors">
                        {f.k}
                      </span>
                      <span className="flex-1 min-w-[20px] border-b border-dotted border-border/70 group-hover:border-primary/50 transition-colors" />
                      <span className="font-serif text-base md:text-[17px] text-ink leading-tight text-right truncate">
                        {f.v}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* right — bio + focus + connect */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pt-2"
          >
            {/* bio */}
            <p className="font-serif text-xl md:text-2xl lg:text-[26px] leading-relaxed text-ink whitespace-pre-line tracking-tight">
              {aboutMe.content}
            </p>

            {/* currently focused on */}
            <div className="mt-10 md:mt-12 pt-8 border-t border-border">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted/70 font-mono">// currently focused on</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex flex-wrap gap-2">
                {FOCUS.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-xs text-ink"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* connect */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted/70 font-mono">// connect</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex gap-2.5 items-center flex-wrap">
                {aboutMe.socialLinks.map((item, index) => (
                  <motion.a
                    key={item.label}
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.06 }}
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border hover:border-primary hover:bg-primary hover:text-white transition-colors text-ink text-xs"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.label}
                  >
                    {item.icon && <item.icon className="text-sm" />}
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted/60 group-hover:text-white/80 transition-colors">↗</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
