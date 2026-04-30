import React from 'react'

const ContactInfoCard = ({icon, text}) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl border border-border px-5 py-4 mb-4 shadow-soft hover:shadow-card hover:border-primary/30 transition-all duration-300">
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-warm text-white text-lg flex-shrink-0">{icon}</div>
      <p className="text-ink text-sm md:text-base font-medium break-all">{text}</p>
    </div>
  )
}

export default ContactInfoCard;
