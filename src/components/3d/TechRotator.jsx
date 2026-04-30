import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ITEMS = [
  { label: 'PyTorch', dot: '#cc785c' },
  { label: 'LangChain', dot: '#bd5d3a' },
  { label: 'RAG pipelines', dot: '#8a7d65' },
  { label: 'Vector databases', dot: '#cc785c' },
  { label: 'SAP HANA', dot: '#bd5d3a' },
  { label: 'CDS Views', dot: '#3d3929' },
  { label: 'ABAP Cloud', dot: '#cc785c' },
  { label: 'Generative AI', dot: '#bd5d3a' },
  { label: 'Hugging Face', dot: '#8a7d65' },
  { label: 'Qwen LLMs', dot: '#cc785c' },
  { label: 'OCR engines', dot: '#bd5d3a' },
  { label: 'Computer Vision', dot: '#3d3929' },
  { label: 'TensorFlow', dot: '#cc785c' },
  { label: 'MediaPipe', dot: '#bd5d3a' },
  { label: 'OpenCV', dot: '#8a7d65' },
  { label: 'CNN architectures', dot: '#cc785c' },
  { label: 'Transformers', dot: '#bd5d3a' },
  { label: 'Prompt engineering', dot: '#3d3929' },
  { label: 'Fine-tuning LLMs', dot: '#cc785c' },
  { label: 'OData APIs', dot: '#bd5d3a' },
  { label: 'SAP Fiori', dot: '#8a7d65' },
  { label: 'UI5', dot: '#cc785c' },
  { label: 'ABSL scripting', dot: '#bd5d3a' },
  { label: 'PostgreSQL', dot: '#3d3929' },
  { label: 'FastAPI', dot: '#cc785c' },
  { label: 'Pandas', dot: '#bd5d3a' },
  { label: 'scikit-learn', dot: '#8a7d65' },
  { label: 'Jupyter', dot: '#cc785c' },
  { label: 'Docker', dot: '#bd5d3a' },
  { label: 'Streamlit', dot: '#3d3929' },
]

const TechRotator = () => {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % ITEMS.length), 2200)
    return () => clearInterval(id)
  }, [])

  const cur = ITEMS[i]

  return (
    <div className="inline-flex items-center gap-3 text-sm text-muted">
      <span className="text-[10px] uppercase tracking-[0.22em] font-medium">
        Currently exploring
      </span>
      <span className="h-px w-6 bg-border" />
      <div className="relative inline-flex items-center gap-2 min-w-[160px]">
        <motion.span
          key={`dot-${i}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: cur.dot }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={cur.label}
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif italic text-ink text-base whitespace-nowrap"
          >
            {cur.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default TechRotator
