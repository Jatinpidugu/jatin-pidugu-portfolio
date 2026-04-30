import React from 'react'
import { motion } from 'framer-motion'

const HEADLINE = [
  'Transformers',
  'LLMs',
  'RAG Pipelines',
  'AI Agents',
  'Embeddings',
  'Fine-tuning',
  'Vector Search',
  'Generative AI',
  'Computer Vision',
  'NLP',
  'Diffusion',
  'Reinforcement Learning',
  'Neural Networks',
  'Knowledge Graphs',
  'Multimodal AI',
  'Prompt Engineering',
  'Semantic Search',
  'Time Series',
  'Recommender Systems',
  'Anomaly Detection',
  'Speech Recognition',
  'MLOps',
  'Federated Learning',
  'Graph Neural Nets',
  'Chain of Thought',
  'Self-Attention',
  'Tokenization',
  'Quantization',
  'LoRA',
  'AutoML',
  'Data Engineering',
  'Feature Stores',
]

const TELEMETRY = [
  'model.fit()',
  'loss → 0.0023',
  'accuracy 98.7%',
  'epoch 042',
  'lr = 1e-4',
  'batch_size = 32',
  'attention[Q, K, V]',
  '∇L → 0',
  'softmax(z)',
  'forward pass',
  'backprop',
  'val_loss ↓ 0.018',
  'tokens/s 142',
  'GPU 87%',
  'cosine_sim 0.92',
  'F1 = 0.94',
  'AUC 0.987',
  'precision 0.96',
  'recall 0.91',
  'top-k = 5',
  'temperature 0.7',
  'context = 128k',
  'chunks indexed 12,480',
  'kv-cache hit 94%',
  'dropout 0.1',
  'optimizer Adam',
  'warmup 1000',
  'grad_clip 1.0',
  'perplexity 12.4',
  'BLEU 41.2',
  'ROUGE-L 0.58',
  'embedding_dim 1536',
  'vector_db pinecone',
  'pipeline RUNNING',
  'checkpoint saved',
  'inference 38ms',
  'throughput 4.2k req/s',
  'memory 12.8GB',
  'tflops 14.3',
  'eval_passed 247/250',
]

const HeadlineRow = ({ duration = 48 }) => {
  const items = [...HEADLINE, ...HEADLINE]
  return (
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      className="flex gap-14 whitespace-nowrap py-2"
    >
      {items.map((it, i) => (
        <span
          key={i}
          className="font-serif text-6xl md:text-8xl lg:text-[10rem] font-medium leading-none tracking-tight text-ink/90 inline-flex items-center gap-14"
        >
          {it}
          <span className="inline-flex flex-col items-center justify-center translate-y-[-0.4em]">
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-primary" />
          </span>
        </span>
      ))}
    </motion.div>
  )
}

const TelemetryRow = ({ duration = 32 }) => {
  const items = [...TELEMETRY, ...TELEMETRY, ...TELEMETRY]
  return (
    <motion.div
      animate={{ x: ['-33.333%', '0%'] }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      className="flex gap-8 whitespace-nowrap py-2"
    >
      {items.map((it, i) => (
        <span
          key={i}
          className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted/70 inline-flex items-center gap-8"
        >
          <span className="text-primary/80">//</span>
          <span>{it}</span>
        </span>
      ))}
    </motion.div>
  )
}

const Marquee = () => {
  return (
    <section className="relative bg-background border-y border-border overflow-hidden py-10 md:py-14 select-none">
      {/* terminal status header — sits above the scroll */}
      <div className="container mx-auto px-6 md:px-8 mb-5 md:mb-7 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5 font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-muted">
            <span className="text-primary">stream</span>
            <span className="mx-1.5 text-muted/50">·</span>
            <span>focus areas</span>
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted/60 font-mono">
          domain.weights[ ]
        </span>
      </div>

      {/* edge fades so terms dissolve at viewport edges */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* big serif scroll — concepts */}
      <HeadlineRow duration={48} />

      {/* thin divider */}
      <div className="container mx-auto px-6 md:px-8">
        <div className="h-px bg-border my-4 md:my-6" />
      </div>

      {/* mono telemetry scroll — opposite direction */}
      <TelemetryRow duration={32} />
    </section>
  )
}

export default Marquee
