import React from 'react'
import { motion } from 'framer-motion'

const Tabs = ({ tabList, activeTab, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tabList.map((tab) => {
        const active = activeTab === tab.value
        return (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(tab.value)}
            className={`relative inline-flex items-center gap-2 font-mono text-[11px] md:text-xs uppercase tracking-[0.16em] px-4 py-2 rounded-full border transition-colors ${
              active
                ? 'bg-ink text-background border-ink'
                : 'bg-white border-border text-muted hover:text-ink hover:border-ink/40'
            }`}
          >
            <span className={active ? 'text-primary' : 'text-muted/40'}>
              {active ? '●' : '○'}
            </span>
            <span>{tab.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

export default Tabs
