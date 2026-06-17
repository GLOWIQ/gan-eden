import { useEffect, useRef, useState } from 'react'

export default function ProductCard({ product, onAddToCart }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s ease' }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.nameHe}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.isNew && (
          <span className="absolute top-3 right-3 bg-accent text-white text-xs font-body font-bold px-2.5 py-1 rounded-full">
            חדש
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="font-display font-bold text-ink text-lg leading-snug mb-0.5">
          {product.nameHe}
        </div>
        <div className="font-body text-xs text-light mb-3" dir="ltr">{product.nameEn}</div>
        <div className="flex items-center justify-between">
          <span className="font-body font-bold text-primary text-lg">₪{product.price}</span>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-3 w-full bg-primary hover:bg-primary/90 text-white font-body font-semibold py-2.5 rounded-xl transition-all active:scale-[0.97] text-sm"
        >
          הוסף לעגלה
        </button>
      </div>
    </div>
  )
}
