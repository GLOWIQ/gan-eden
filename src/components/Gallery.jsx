import { motion } from 'framer-motion'
import { galleryImages } from '../data'

export default function Gallery() {
  const [g1, g2, g3, g4, g5] = galleryImages

  return (
    <section className="bg-canvas py-20 md:py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.h2 className="font-frank font-bold text-text-dark mb-2"
            style={{ fontSize: 'clamp(36px,5.5vw,56px)' }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            גן עדן בבתים שלכם
          </motion.h2>
          <p className="font-fraunces italic text-text-dark/40 text-lg">Gan Eden in your homes</p>
          <p className="font-heebo text-text-dark/50 text-[15px] mt-2">
            צמחים אמיתיים, בתים אמיתיים, אנשים אמיתיים.
          </p>
        </div>

        {/* Row 1: g1 wide (2/3) + g2 narrow (1/3) */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 mb-2 md:mb-3">
          <GImg img={g1} className="col-span-2" style={{ aspectRatio: '4/3' }} />
          <GImg img={g2} className="col-span-1" style={{ aspectRatio: '3/4' }} />
        </div>

        {/* Row 2: g3, g4, g5 equal thirds */}
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          <GImg img={g3} style={{ aspectRatio: '1/1' }} />
          <GImg img={g4} style={{ aspectRatio: '1/1' }} />
          <GImg img={g5} style={{ aspectRatio: '1/1' }} />
        </div>

        <p className="text-center font-heebo text-sage text-sm mt-8">
          שתפו אתנו בתגית @ganeden.co.il
        </p>
      </div>
    </section>
  )
}

function GImg({ img, className = '', style }) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ ...style, background: img.gradient }}>
      <img src={img.image} alt={img.alt}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => e.target.remove()} />
    </div>
  )
}
