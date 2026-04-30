import React from 'react'
import { motion } from 'framer-motion'
import { HiArrowUpRight } from 'react-icons/hi2'

const ProjectCard = ({ index = 0, imgUrl, title, tags = [], link, type }) => {
  const idx = String(index).padStart(2, '0')
  const cat = (type || 'project').replace(/\s+/g, '_').replace(/-/g, '_').toLowerCase()

  const handleClick = () => {
    if (link) window.open(link, '_blank')
  }

  return (
    <div className="h-full mx-2">
      <div
        className="h-full bg-white rounded-2xl border border-border hover:border-primary/40 hover:shadow-card transition-all duration-500 cursor-pointer group overflow-hidden flex flex-col"
        onClick={handleClick}
      >
        {/* header strip */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background/40 shrink-0">
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted/70 font-mono">/ {idx}</span>
          <span className="text-[10px] tracking-[0.18em] text-muted/50 font-mono lowercase">
            project.{cat}
          </span>
        </div>

        {/* image */}
        <div className="relative overflow-hidden bg-surface aspect-[16/10] shrink-0">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* corner brackets */}
          <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/70" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/70" />
          <span className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/70" />
          <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/70" />
        </div>

        {/* body */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3 className="font-serif text-lg md:text-xl font-medium text-ink leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <span className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors flex-shrink-0">
              <HiArrowUpRight className="text-sm text-ink group-hover:text-white group-hover:rotate-12 transition-all" />
            </span>
          </div>

          {/* tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-mono text-muted bg-background border border-border px-2.5 py-0.5 rounded-full"
              >
                <span className="w-1 h-1 rounded-full bg-primary/60" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
