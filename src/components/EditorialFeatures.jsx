import { motion } from 'framer-motion'
import { editorialFeatures, products } from '../data'

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
}

export default function EditorialFeatures({ onAddToCart }) {
  const [f1, f2, f3] = editorialFeatures

  const getProduct = (id) => products.find((p) => p.id === id)

  return (
    <section className="bg-cream py-16 md:py-28">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 md:mb-24">
        <motion.p {...fadeUp} className="font-dmsans text-sage text-xs tracking-[0.2em] uppercase mb-3">
          What we're loving this season
        </motion.p>
        <motion.h2 {...fadeUp} transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay: 0.08 }}
          className="font-frank font-bold text-forest" style={{ fontSize: 'clamp(36px,5.5vw,56px)' }}>
          הצמחים שאנחנו אוהבים עכשיו
        </motion.h2>
      </div>

      {/* Feature 1: image left (60%), text right (40%) */}
      <FeatureRow feature={f1} product={getProduct(f1.productId)} onAdd={onAddToCart} imageLeft />

      {/* Feature 2: text left (40%), image right (60%) */}
      <FeatureRow feature={f2} product={getProduct(f2.productId)} onAdd={onAddToCart} />

      {/* Feature 3: full-width with overlay */}
      <FeatureFull feature={f3} product={getProduct(f3.productId)} onAdd={onAddToCart} />
    </section>
  )
}

function FeatureRow({ feature, product, onAdd, imageLeft }) {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20 md:mb-32">
      <div className={`flex flex-col ${imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-0`}>
        {/* Image — 60% */}
        <motion.div className="md:w-[60%] aspect-[4/3] md:aspect-auto md:min-h-[520px] relative overflow-hidden rounded-2xl"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: feature.gradient }}>
          <img src={feature.image} alt={`${feature.nameHe} — ${feature.nameEn}`}
            className="absolute inset-0 w-full h-full object-cover" onError={(e) => e.target.remove()} />
        </motion.div>

        {/* Text — 40% */}
        <motion.div {...fadeUp} className={`md:w-[40%] flex flex-col justify-center
          ${imageLeft ? 'md:pr-14 lg:pr-20' : 'md:pl-14 lg:pl-20'}`}>
          <span className="font-dmsans text-sage text-[11px] tracking-[0.2em] uppercase mb-5">
            {feature.label}
          </span>
          <h3 className="font-frank font-bold text-text-light leading-tight mb-2"
            style={{ fontSize: 'clamp(24px,3vw,34px)' }}>
            {feature.nameHe}
          </h3>
          <p className="font-fraunces italic text-text-light/45 text-base mb-6">{feature.nameEn}</p>
          <p className="font-heebo text-text-light/75 text-[17px] leading-[1.85] mb-8">{feature.bodyHe}</p>
          <div className="flex items-center gap-5">
            <span className="font-dmsans font-bold text-terracotta text-xl">₪{feature.price}</span>
            <button onClick={() => onAdd(product)}
              className="px-6 py-3 bg-moss text-white font-heebo font-medium text-sm rounded-full
                hover:bg-moss/85 transition-colors duration-250">
              להוסיף לעגלה
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function FeatureFull({ feature, product, onAdd }) {
  return (
    <div className="relative w-full min-h-[70vh] md:min-h-screen overflow-hidden"
      style={{ background: feature.gradient }}>
      <img src={feature.image} alt={`${feature.nameHe} — ${feature.nameEn}`}
        className="absolute inset-0 w-full h-full object-cover" onError={(e) => e.target.remove()} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top,rgba(8,16,8,0.82) 0%,rgba(8,16,8,0.15) 70%,transparent 100%)' }} />

      <motion.div {...fadeUp}
        className="absolute bottom-0 right-0 p-8 md:p-16 max-w-[480px]" dir="rtl">
        <span className="font-dmsans text-sage text-[11px] tracking-[0.2em] uppercase mb-5 block">
          {feature.label}
        </span>
        <h3 className="font-frank font-bold text-text-dark leading-tight mb-3"
          style={{ fontSize: 'clamp(32px,4.5vw,52px)' }}>
          {feature.nameHe}
        </h3>
        <p className="font-fraunces italic text-text-dark/60 text-lg mb-6">{feature.nameEn}</p>
        <p className="font-heebo text-text-dark/80 text-[17px] leading-[1.85] mb-8 max-w-[400px]">
          {feature.bodyHe}
        </p>
        <div className="flex items-center gap-5">
          <span className="font-dmsans font-bold text-terracotta text-xl">₪{feature.price}</span>
          <button onClick={() => onAdd(product)}
            className="px-6 py-3 bg-moss text-white font-heebo font-medium text-sm rounded-full
              hover:bg-moss/85 transition-colors duration-250">
            להוסיף לעגלה
          </button>
        </div>
      </motion.div>
    </div>
  )
}
