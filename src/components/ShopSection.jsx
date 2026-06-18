import { useState } from 'react'
import { motion } from 'framer-motion'
import { products } from '../data'

const FILTERS = ['הכל', 'צמחי בית', 'עמידים', 'תלויים', 'ענקים', 'קטנים']

export default function ShopSection({ onAddToCart }) {
  const [active, setActive] = useState('הכל')

  const visible = active === 'הכל' ? products : products.filter((p) => p.tags.includes(active))

  return (
    <div className="bg-cream py-20 md:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <motion.p className="font-dmsans text-sage text-xs tracking-[0.2em] uppercase mb-3"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            The full collection
          </motion.p>
          <motion.h2 className="font-frank font-bold text-forest mb-4"
            style={{ fontSize: 'clamp(36px,5.5vw,56px)' }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            כל הצמחים שלנו
          </motion.h2>
          <p className="font-heebo text-text-light/60 text-[15px]">כולם נבחרו בקפידה. כולם מגיעים בריאים.</p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full font-heebo text-sm transition-all duration-200
                ${active === f
                  ? 'bg-moss text-white'
                  : 'border border-sage/50 text-text-light/60 hover:border-sage hover:text-text-light'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {visible.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onAdd={onAddToCart} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product, index, onAdd }) {
  const [hover, setHover] = useState(false)
  const dots = { 1: '●○○', 2: '●●○', 3: '●●●' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08 }}
      className="flex flex-col bg-warm-white rounded-2xl overflow-hidden group">

      {/* Image area — 3:4 portrait */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: product.gradient }}>
        <img src={product.image} alt={`${product.nameHe} — ${product.nameEn}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          onError={(e) => e.target.remove()} />
        {product.isNew && (
          <span className="absolute top-3 left-3 w-2.5 h-2.5 bg-terracotta rounded-full" aria-label="חדש" />
        )}

        {/* Add button */}
        <div className="absolute bottom-3 left-3">
          <button
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            onClick={() => onAdd(product)}
            aria-label={`הוסף ${product.nameHe} לעגלה`}
            className="flex items-center gap-2 bg-moss text-white rounded-full font-heebo font-medium
              text-sm transition-all duration-300 overflow-hidden h-9"
            style={{ width: hover ? 'auto' : '36px', padding: hover ? '0 14px' : '0', minWidth: '36px' }}>
            <span className="text-lg leading-none flex-shrink-0" style={{ marginRight: hover ? 0 : 'auto', marginLeft: hover ? 0 : 'auto' }}>+</span>
            {hover && <span className="whitespace-nowrap">הוסף לעגלה</span>}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col gap-1">
        <p className="font-frank font-bold text-text-light text-[17px] leading-tight">{product.nameHe}</p>
        <p className="font-dmsans text-sage text-[12px]">{product.nameEn}</p>
        <p className="font-dmsans text-sage/70 text-[12px] tracking-widest">{dots[product.care]}</p>
        <p className="font-dmsans font-bold text-moss text-base mt-1">₪{product.price}</p>
      </div>
    </motion.div>
  )
}
