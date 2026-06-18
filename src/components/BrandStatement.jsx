import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

export default function BrandStatement() {
  return (
    <section className="bg-cream py-24 md:py-36 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          {...fadeUp} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-frank font-bold text-forest leading-tight mb-8"
          style={{ fontSize: 'clamp(36px,6vw,56px)' }}>
          לא סתם חנות צמחים.
        </motion.h2>

        <motion.p
          {...fadeUp} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          className="font-heebo text-text-light/80 leading-[1.9] text-[17px] mb-6">
          גן עדן נולדה מתוך אמונה שכל בית ראוי לצמיחה —
          לא רק בגינה, אלא בסלון, במטבח, בחדר השינה.
          אנחנו בוחרים כל צמח בעצמנו, גדלים מקומית,
          ומביאים אותו אליכם בשיא חיוניותו.
        </motion.p>

        <motion.p
          {...fadeUp} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          className="font-fraunces font-light italic text-text-light/45 text-lg">
          We believe every home deserves to grow.<br />
          Every plant we carry, we choose ourselves.
        </motion.p>
      </div>
    </section>
  )
}
