import { motion } from 'framer-motion'
import { careCards } from '../data'

export default function CareStrip() {
  return (
    <section className="bg-forest py-20 md:py-28 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <motion.p className="font-dmsans text-sage text-xs tracking-[0.2em] uppercase mb-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            Grow it right
          </motion.p>
          <motion.h2 className="font-frank font-bold text-text-dark"
            style={{ fontSize: 'clamp(36px,5.5vw,56px)' }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            איך לגדל כמו שצריך
          </motion.h2>
        </div>

        {/* Cards — horizontal scroll on mobile, row on desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 md:overflow-visible md:grid md:grid-cols-3 md:gap-8
          snap-x-mandatory md:snap-none -mx-6 px-6 md:mx-0 md:px-0">
          {careCards.map((card, i) => (
            <CareCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CareCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="flex-shrink-0 w-[80vw] md:w-auto snap-align-start bg-warm-white rounded-2xl overflow-hidden">

      {/* Image */}
      <div className="relative h-52 overflow-hidden" style={{ background: card.gradient }}>
        <img src={card.image} alt={card.headlineHe}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => e.target.remove()} />
        {/* Title badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-canvas/70 backdrop-blur-sm rounded-full">
          <span className="font-frank text-text-dark font-bold text-base">{card.title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-frank font-bold text-text-light text-xl mb-3">{card.headlineHe}</h3>
        <p className="font-heebo text-text-light/65 text-[15px] leading-[1.8]">{card.bodyHe}</p>
      </div>
    </motion.div>
  )
}
