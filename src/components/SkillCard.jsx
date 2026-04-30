import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORY_LABEL = {
  data_science: 'data_science',
  sap: 'sap',
  'web devlopment': 'web',
  tools: 'tools',
  'soft-skills': 'soft',
  core: 'core',
}

const CATEGORY_DOT = {
  data_science: 'bg-primary',
  sap: 'bg-[#5e4a36]',
  'web devlopment': 'bg-ink',
  tools: 'bg-[#a85b3e]',
  'soft-skills': 'bg-primary/40',
  core: 'bg-muted',
}

export const getCategoryDot = (type) => CATEGORY_DOT[type] || CATEGORY_DOT.core
export const getCategoryLabel = (type) => CATEGORY_LABEL[type] || type

const SkillCard = ({
  index = 0,
  icon: Icon,
  skillName,
  description,
  progress = 0,
  type,
  expanded = false,
  onToggle = () => {},
}) => {
  const idx = String(index).padStart(2, '0')

  return (
    <div
      className={`group border-b border-border last:border-b-0 transition-colors ${
        expanded ? 'bg-background/70' : 'hover:bg-background/40'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3.5 md:py-4 text-left"
      >
        {/* index */}
        <span className="text-[10px] font-mono text-muted/50 tabular-nums w-7 shrink-0">/{idx}</span>

        {/* icon */}
        <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-gradient-warm rounded-lg text-white shadow-sm">
          {Icon ? <Icon className="w-4 h-4" /> : <span className="text-[11px] font-bold">{skillName?.[0]}</span>}
        </div>

        {/* name */}
        <span className="font-serif text-[15px] md:text-base text-ink truncate w-[34%] md:w-[24%] shrink-0">
          {skillName}
        </span>

        {/* category */}
        <span className="hidden md:flex items-center gap-2 w-[16%] shrink-0">
          <span className={`w-1.5 h-1.5 rounded-full ${getCategoryDot(type)}`} />
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted/70 font-mono truncate">
            {getCategoryLabel(type)}
          </span>
        </span>

        {/* proficiency bar */}
        <div className="flex-1 relative h-[6px] bg-border/60 rounded-full overflow-hidden min-w-[60px]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/70 to-primary rounded-full"
          />
          {/* tick marks */}
          {[25, 50, 75].map((t) => (
            <span
              key={t}
              className="absolute top-0 bottom-0 w-px bg-white/60"
              style={{ left: `${t}%` }}
            />
          ))}
        </div>

        {/* % */}
        <span className="text-[11px] md:text-xs font-mono text-primary tabular-nums w-9 text-right shrink-0">
          {progress}%
        </span>

        {/* chevron */}
        <span
          className={`text-muted/50 group-hover:text-ink transition-transform duration-300 w-4 text-center shrink-0 text-xs ${
            expanded ? 'rotate-180' : ''
          }`}
        >
          ⌄
        </span>
      </button>

      {/* expanded description */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-[78px] md:pl-[88px] pr-6 pb-4 md:pb-5 -mt-1">
              <p className="text-sm text-muted leading-relaxed max-w-2xl">{description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SkillCard
