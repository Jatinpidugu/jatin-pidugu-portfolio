import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePortfolioData } from '../context/DataContext'
import { HiArrowUp } from 'react-icons/hi2'

const useNowTicker = () => {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

const formatTime = (d) =>
  d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

const Footer = () => {
  const { menuLinks = [], aboutMe } = usePortfolioData()
  const now = useNowTicker()

  const channels = [
    { label: 'email', value: aboutMe?.email, href: `mailto:${aboutMe?.email}` },
    { label: 'phone', value: aboutMe?.phone, href: `tel:${(aboutMe?.phone || '').replace(/\s+/g, '')}` },
    { label: 'linkedin', value: aboutMe?.LinkedIn, href: 'https://www.linkedin.com/in/jatin-pidugu-857b82218' },
    { label: 'github', value: 'Jatinpidugu', href: 'https://github.com/Jatinpidugu' },
  ]

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const year = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-ink text-background/90 overflow-hidden select-none"
    >
      {/* dot grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(245,244,238,0.18) 1px, transparent 0)',
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* terminal top strip */}
      <div className="relative border-b border-background/10 px-5 md:px-8 py-3 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="w-2.5 h-2.5 rounded-full bg-secondary/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-background/30" />
          <span className="ml-2 text-[10px] uppercase tracking-[0.22em] text-background/60 font-mono">portfolio.session</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-background/60 font-mono">
          <span className="tabular-nums">{formatTime(now)}</span>
          <span className="text-background/30">·</span>
          <span>uptime ∞</span>
          <span className="text-background/30">·</span>
          <span className="inline-flex items-center gap-1.5 text-primary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            online
          </span>
        </div>
      </div>

      <div className="relative container mx-auto px-6 md:px-8 py-8 md:py-10">
        {/* sign-off line */}
        <div className="flex items-center gap-3 mb-4 text-[10px] uppercase tracking-[0.22em] text-background/50 font-mono">
          <span>&gt; session ended</span>
          <div className="flex-1 h-px bg-background/15" />
          <span className="hidden md:inline">eof · 0x{Math.floor(now.getTime() / 1000).toString(16).slice(-6)}</span>
        </div>

        {/* big closing statement */}
        <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight max-w-4xl">
          Let's build something <span className="italic text-primary">worth developing</span>.
        </h3>

        <div className="mt-5 h-px w-full bg-background/10" />

        {/* grid: sitemap | channels | signed */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* sitemap */}
          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-background/40 font-mono mb-3">/ index</div>
            <ul className="space-y-1.5">
              {menuLinks.map((m, i) => (
                <li key={m.id}>
                  <button
                    onClick={() => document.getElementById(m.to)?.scrollIntoView({ behavior: 'smooth' })}
                    className="group inline-flex items-center gap-3 text-sm text-background/75 hover:text-primary transition-colors"
                  >
                    <span className="text-[10px] font-mono text-background/40 tabular-nums w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-base group-hover:underline underline-offset-4">
                      {m.label}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-primary">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* channels */}
          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-background/40 font-mono mb-3">/ channels</div>
            <ul className="space-y-1.5">
              {channels.filter((c) => c.value).map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.label === 'email' || c.label === 'phone' ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-baseline gap-3 text-sm text-background/75 hover:text-primary transition-colors"
                  >
                    <span className="text-[10px] uppercase tracking-[0.22em] font-mono text-background/40 w-16 shrink-0">
                      {c.label}
                    </span>
                    <span className="truncate group-hover:underline underline-offset-4">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* signed */}
          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-background/40 font-mono mb-3">/ signed</div>
            <div className="space-y-1">
              <p className="font-serif text-2xl md:text-3xl font-medium text-background leading-tight">
                Jatin Pidugu
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-background/50 font-mono">
                AI / ML Engineer
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-background/40 font-mono">
                iMark 360 LLP · Ahmedabad
              </p>
            </div>

            {/* hand-written signature */}
            <div className="mt-3 inline-block max-w-full">
              {/* visible static text — measures the box */}
              <div className="relative inline-block">
                <span
                  style={{ fontFamily: '"Caveat", "Brush Script MT", cursive' }}
                  className="block text-primary text-[42px] md:text-[52px] leading-[1.1] italic tracking-tight whitespace-nowrap"
                >
                  Pidugu Jatin
                </span>
                {/* sliding curtain that wipes left → right to reveal the name */}
                <motion.span
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  style={{ transformOrigin: '100% 50%' }}
                  className="absolute inset-0 bg-ink pointer-events-none"
                />
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 1.6 }}
                style={{ transformOrigin: '0% 50%' }}
                className="mt-1 h-px w-full bg-primary/60"
              />
            </div>
          </div>
        </div>

        <div className="mt-7 h-px w-full bg-background/10" />

        {/* bottom strip */}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-4 text-[10px] uppercase tracking-[0.22em] text-background/50 font-mono">
          <div className="flex items-center gap-3 flex-wrap">
            <span>© {year}</span>
            <span className="text-background/25">·</span>
            <span>made with <span className="text-primary">care</span></span>
            <span className="text-background/25">·</span>
            <span>react · vite · tailwind</span>
          </div>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-background/20 hover:border-primary hover:bg-primary hover:text-white transition-all"
          >
            <HiArrowUp className="text-sm group-hover:-translate-y-0.5 transition-transform" />
            <span>back to top</span>
          </button>
        </div>
      </div>

      {/* eof marker */}
      <div className="relative border-t border-background/10 px-5 md:px-8 py-2.5 flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-background/35 font-mono">
        <span>// end of file</span>
        <span>{year} · jatinpidugu</span>
      </div>
    </motion.footer>
  )
}

export default Footer
