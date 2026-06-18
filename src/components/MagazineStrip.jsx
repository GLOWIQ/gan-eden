import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { magazinePanels } from '../data'

export default function MagazineStrip() {
  const x = useMotionValue(0)
  const [current, setCurrent] = useState(0)
  const [pw, setPw] = useState(0)
  const isMobile = useRef(false)

  useEffect(() => {
    const update = () => {
      setPw(window.innerWidth)
      isMobile.current = window.innerWidth < 768
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const goTo = (i) => {
    setCurrent(i)
    animate(x, -i * pw, { type: 'spring', stiffness: 280, damping: 32 })
  }

  const handleDragEnd = (_, info) => {
    const cur = x.get()
    const velocity = info.velocity.x
    let target = Math.round((-cur + (velocity < -200 ? pw * 0.4 : velocity > 200 ? -pw * 0.4 : 0)) / pw)
    target = Math.max(0, Math.min(magazinePanels.length - 1, target))
    goTo(target)
  }

  return (
    <section id="magazine" className="bg-canvas">
      {/* Section header */}
      <div className="py-16 md:py-20 px-6 text-center bg-cream">
        <motion.p className="font-dmsans text-sage text-xs tracking-[0.2em] uppercase mb-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
          In Season Now
        </motion.p>
        <motion.h2 className="font-frank font-bold text-forest" style={{ fontSize: 'clamp(36px,5.5vw,56px)' }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          עונת הגידול
        </motion.h2>
      </div>

      {/* Horizontal strip — LTR so drag direction is standard */}
      <div className="overflow-hidden" dir="ltr">
        <motion.div className="flex"
          style={{ x, width: `${magazinePanels.length * 100}vw`, cursor: 'grab', touchAction: 'none' }}
          drag="x"
          dragConstraints={{ left: -(magazinePanels.length - 1) * pw, right: 0 }}
          dragElastic={0.04}
          onDragEnd={handleDragEnd}>
          {magazinePanels.map((panel) => (
            <Panel key={panel.id} panel={panel} />
          ))}
        </motion.div>
      </div>

      {/* Dot navigation */}
      <div className="bg-canvas py-6 flex justify-center gap-3" aria-label="ניווט פאנל">
        {magazinePanels.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`פאנל ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-400
              ${i === current ? 'bg-sage w-8' : 'bg-sage/25 w-1.5'}`} />
        ))}
      </div>
    </section>
  )
}

function Panel({ panel }) {
  return (
    <div className="relative flex-shrink-0 overflow-hidden select-none"
      style={{ width: '100vw', height: '90vh', background: panel.gradient }}>

      <img src={panel.image}
        alt={`${panel.nameHe} — ${panel.headlineHe}`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable="false"
        onError={(e) => e.target.remove()} />

      {/* Dark gradient on text side */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top,rgba(8,16,8,0.75) 0%,rgba(8,16,8,0.2) 55%,transparent 100%)' }} />

      {/* Content — bottom-right in RTL */}
      <div className="absolute bottom-0 right-0 p-8 md:p-14 max-w-md" dir="rtl">
        {panel.badge && (
          <span className="inline-block mb-4 px-3 py-1 bg-terracotta text-white font-dmsans text-xs rounded-full">
            {panel.badge}
          </span>
        )}
        <h3 className="font-frank font-bold text-text-dark leading-tight mb-2"
          style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
          {panel.headlineHe}
        </h3>
        <p className="font-fraunces italic text-text-dark/60 text-base mb-5">
          {panel.headlineEn}
        </p>
        <a href="#shop" className="font-heebo text-sm text-sage hover:text-text-dark transition-colors">
          לרכישה ←
        </a>
      </div>
    </div>
  )
}
