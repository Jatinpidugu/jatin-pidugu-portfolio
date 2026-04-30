import React from 'react'
import Tilt3D from './3d/Tilt3D'

const CERTCard = ({imgUrl, title, tags}) => {
  return (
    <Tilt3D className="h-full mx-2" max={8} scale={1.02}>
      <div className="h-full bg-white rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-card transition-all duration-500">
        <div className="overflow-hidden bg-surface">
          <img src={imgUrl} alt={title} className="w-full h-64 md:h-72 object-cover" />
        </div>
        <div className="p-5">
          <h3 className="font-serif text-lg font-medium text-ink leading-snug line-clamp-2">{title}</h3>
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-[11px] uppercase tracking-wider font-medium text-muted bg-surface border border-border px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Tilt3D>
  )
}

export default CERTCard
