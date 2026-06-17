import { useState } from 'react'
import { PRODUCTS, CATEGORY_FILTERS } from '../data'
import ProductCard from './ProductCard'

export default function ProductGrid({ onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeFilter)

  return (
    <section id="catalog" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-ink mb-2">
          המוצרים שלנו
        </h2>
        <p className="font-body text-light text-lg" dir="ltr">Our Products</p>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-hide snap-x">
        {CATEGORY_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`flex-shrink-0 snap-start font-body text-sm font-medium px-5 py-2 rounded-full whitespace-nowrap transition-all ${
              activeFilter === f.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-ink hover:bg-primary/10 border border-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}
