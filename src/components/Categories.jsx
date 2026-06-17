import { CATEGORIES } from '../data'

export default function Categories() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-ink mb-2">
          קנה לפי קטגוריה
        </h2>
        <p className="font-body text-light text-lg" dir="ltr">Shop by Category</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible scrollbar-hide snap-x snap-mandatory">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href="#catalog"
            className="group flex-shrink-0 snap-start w-52 md:w-auto bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-200"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="font-display font-bold text-ink text-lg leading-tight">{cat.label}</div>
                <div className="font-body text-xs text-light" dir="ltr">{cat.labelEn}</div>
              </div>
              <span className="text-primary font-bold text-xl group-hover:translate-x-1 transition-transform" dir="ltr">←</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
