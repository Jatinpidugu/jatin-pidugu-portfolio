import React, { useState, useRef } from 'react'
import { usePortfolioData } from '../context/DataContext'
import axios from 'axios'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiOutlineMail, HiOutlinePhone, HiOutlineDuplicate } from 'react-icons/hi'
import { FaLinkedin } from 'react-icons/fa'
import { HiArrowUpRight, HiCheck } from 'react-icons/hi2'

const ContactMe = () => {
  const { aboutMe } = usePortfolioData()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copiedKey, setCopiedKey] = useState(null)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const blobY = useTransform(scrollYProgress, [0, 1], [60, -60])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim() || !name.trim() || !email.trim()) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
      return
    }
    setStatus('sending')
    try {
      await axios.post(
        'https://api.sheetbest.com/sheets/f1bf133f-9f86-410a-be02-2a8726c910aa',
        { Name: name, Email: email, Message: message }
      )
      setStatus('sent')
      setName(''); setEmail(''); setMessage('')
      setTimeout(() => setStatus('idle'), 3500)
    } catch (err) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2500)
    }
  }

  const copy = (key, value) => {
    if (!navigator.clipboard) return
    navigator.clipboard.writeText(value)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 1400)
  }

  const channels = [
    {
      key: 'email',
      icon: HiOutlineMail,
      label: 'email',
      value: aboutMe.email,
      action: 'copy',
      href: `mailto:${aboutMe.email}`,
    },
    {
      key: 'phone',
      icon: HiOutlinePhone,
      label: 'phone',
      value: aboutMe.phone,
      action: 'copy',
      href: `tel:${(aboutMe.phone || '').replace(/\s+/g, '')}`,
    },
    {
      key: 'linkedin',
      icon: FaLinkedin,
      label: 'linkedin',
      value: aboutMe.LinkedIn,
      action: 'open',
      href: 'https://www.linkedin.com/in/jatin-pidugu-857b82218',
    },
  ]

  return (
    <section
      ref={ref}
      id="contact"
      className="relative bg-sand pt-10 md:pt-14 pb-16 md:pb-20 overflow-hidden"
    >
      <motion.div style={{ y: blobY }} className="absolute -left-40 top-1/4 w-[460px] h-[460px] rounded-full bg-primary/[0.08] blur-3xl pointer-events-none" />

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
          <span className="section-eyebrow">/ 06 — Contact <span className="text-muted/60">--reach-out</span></span>
          <h2 className="section-title text-5xl md:text-6xl">
            Let's start a <span className="italic text-primary">conversation</span>.
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-xl">
            Open to roles, freelance, and collaboration. Pick a channel on the left or send a message directly — typical response within a day.
          </p>
        </motion.div>

        {/* mailbox card */}
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
              <span className="ml-2 text-[10px] uppercase tracking-[0.22em] text-muted font-medium font-mono">mailbox.open()</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted/60 font-mono">
              <span>{channels.length} channels</span>
              <span className="text-muted/30">·</span>
              <span>response &lt; 24h</span>
              <span className="text-muted/30">·</span>
              <span className="text-primary inline-flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                </span>
                accepting
              </span>
            </div>
          </div>

          {/* body — channels + form */}
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr]">
            {/* left — channels */}
            <div className="border-b lg:border-b-0 lg:border-r border-border bg-background/20">
              <div className="px-5 py-2.5 border-b border-border text-[9px] uppercase tracking-[0.22em] text-muted/50 font-mono">
                channels
              </div>
              <div>
                {channels.map((c, i) => {
                  const Icon = c.icon
                  const idx = String(i + 1).padStart(2, '0')
                  const isCopied = copiedKey === c.key
                  return (
                    <div
                      key={c.key}
                      className="flex items-center gap-3 md:gap-4 px-5 py-4 border-b border-border last:border-b-0 hover:bg-white/60 transition-colors group"
                    >
                      <span className="text-[10px] font-mono text-muted/50 tabular-nums w-7 shrink-0">/{idx}</span>
                      <div className="w-9 h-9 rounded-xl bg-gradient-warm text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Icon className="text-base" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[9px] uppercase tracking-[0.22em] text-muted/60 font-mono">{c.label}</div>
                        <div className="text-sm md:text-[15px] text-ink truncate font-medium">{c.value}</div>
                      </div>
                      {c.action === 'copy' ? (
                        <button
                          onClick={() => copy(c.key, c.value)}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                            isCopied
                              ? 'bg-primary border-primary text-white'
                              : 'bg-white border-border text-muted hover:border-primary hover:text-primary'
                          }`}
                          title={isCopied ? 'Copied' : 'Copy'}
                        >
                          {isCopied ? <HiCheck className="text-sm" /> : <HiOutlineDuplicate className="text-sm" />}
                        </button>
                      ) : (
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full border border-border bg-white text-muted hover:border-primary hover:text-primary transition-all flex items-center justify-center shrink-0"
                          title="Open"
                        >
                          <HiArrowUpRight className="text-xs" />
                        </a>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* availability strip */}
              <div className="px-5 py-4 bg-white/40 border-t border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-primary font-mono">currently available</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Open to AI / ML engineering roles, applied-data work, and short-term freelance. Based in Ahmedabad, comfortable with remote.
                </p>
              </div>
            </div>

            {/* right — compose form */}
            <div className="relative">
              <div className="px-5 md:px-6 py-2.5 border-b border-border text-[9px] uppercase tracking-[0.22em] text-muted/50 font-mono flex items-center justify-between">
                <span>compose</span>
                <span className={`flex items-center gap-1.5 ${
                  status === 'sending' ? 'text-muted' :
                  status === 'sent' ? 'text-primary' :
                  status === 'error' ? 'text-secondary' : 'text-muted/50'
                }`}>
                  <span className={`relative flex h-1.5 w-1.5`}>
                    {status === 'sending' && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-muted opacity-60" />
                    )}
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                      status === 'sending' ? 'bg-muted' :
                      status === 'sent' ? 'bg-primary' :
                      status === 'error' ? 'bg-secondary' : 'bg-muted/40'
                    }`} />
                  </span>
                  <span>
                    {status === 'sending' && 'sending…'}
                    {status === 'sent' && 'message sent'}
                    {status === 'error' && 'check fields'}
                    {status === 'idle' && 'draft'}
                  </span>
                </span>
              </div>

              <form className="p-5 md:p-6 space-y-4" autoComplete="off" onSubmit={handleSubmit}>
                {/* name */}
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.22em] text-muted/60 font-mono mb-1.5">
                    / from
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    autoComplete="off"
                    className="w-full bg-background/50 rounded-xl border border-border px-4 py-3 text-ink placeholder:text-muted/60 placeholder:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                  />
                </div>

                {/* email */}
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.22em] text-muted/60 font-mono mb-1.5">
                    / reply-to
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    autoComplete="off"
                    className="w-full bg-background/50 rounded-xl border border-border px-4 py-3 text-ink placeholder:text-muted/60 placeholder:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                  />
                </div>

                {/* message */}
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.22em] text-muted/60 font-mono mb-1.5">
                    / message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="What's on your mind? Project, role, idea, or hello — all welcome."
                    autoComplete="off"
                    className="w-full bg-background/50 rounded-xl border border-border px-4 py-3 text-ink placeholder:text-muted/60 placeholder:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none"
                  />
                </div>

                {/* footer with char count + send */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-muted/50 font-mono">
                    {message.length} chars · {message.trim() ? message.trim().split(/\s+/).length : 0} words
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center justify-center gap-2 h-11 text-sm font-medium leading-none text-white bg-primary hover:bg-secondary px-5 lg:px-7 rounded-full transition-colors shadow-sm whitespace-nowrap disabled:opacity-60"
                  >
                    {status === 'sending' ? 'sending…' : status === 'sent' ? 'sent ✓' : 'send signal'}
                    {status !== 'sending' && status !== 'sent' && <HiArrowUpRight className="text-base" />}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>

          {/* footer strip */}
          <div className="flex items-center justify-between px-5 md:px-6 py-3 border-t border-border bg-background/30 text-[10px] uppercase tracking-[0.22em] text-muted/60 font-mono">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span>inbox · listening</span>
            </div>
            <span>messages route to my email</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactMe
