import { motion } from 'framer-motion'

const NAV_LINKS = ['עונת הגידול', 'החנות', 'טיפול בצמחים', 'אודות', 'צור קשר']

export default function Footer() {
  return (
    <footer className="bg-canvas pt-20 pb-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Poetic headline */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <h2 className="font-frank font-bold text-text-dark" style={{ fontSize: 'clamp(32px,5vw,52px)' }}>
            כל בית יכול לפרוח.
          </h2>
          <p className="font-fraunces italic text-sage text-xl mt-3">Every home can bloom.</p>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-sage/15 mb-14" />

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-14">

          {/* Right column — Logo + contact */}
          <div className="text-right">
            <p className="font-frank font-bold text-text-dark text-2xl mb-1">גן עדן</p>
            <p className="font-fraunces italic text-text-dark/40 text-sm mb-5">Gan Eden</p>
            <p className="font-heebo text-text-dark/55 text-sm leading-relaxed mb-5">
              תל אביב · ירושלים<br />
              המשלוח מגיע אליך
            </p>
            <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-heebo text-sage text-sm hover:text-text-dark transition-colors mb-4">
              <WaIcon className="w-4 h-4" />
              שלח הודעה
            </a>
            <br />
            <a href="https://instagram.com/ganeden.co.il" target="_blank" rel="noopener noreferrer"
              aria-label="אינסטגרם גן עדן">
              <IgIcon className="w-5 h-5 text-sage hover:text-text-dark transition-colors" />
            </a>
          </div>

          {/* Center column — Navigation */}
          <div className="text-center">
            <p className="font-dmsans text-sage text-xs tracking-[0.18em] uppercase mb-6">ניווט</p>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((label) => (
                <a key={label} href="#"
                  className="font-heebo text-text-dark/60 hover:text-text-dark text-sm transition-colors duration-200">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Left column — Email + policies */}
          <div className="text-left md:text-left">
            <p className="font-dmsans text-sage text-xs tracking-[0.18em] uppercase mb-6">יצירת קשר</p>
            <a href="mailto:hello@ganeden.co.il"
              className="font-dmsans text-text-dark/60 hover:text-text-dark text-sm transition-colors block mb-4" dir="ltr">
              hello@ganeden.co.il
            </a>
            <a href="#" className="font-heebo text-text-dark/50 hover:text-text-dark text-sm transition-colors block mb-3">
              מדיניות החזרות
            </a>
            <a href="#" className="font-heebo text-text-dark/50 hover:text-text-dark text-sm transition-colors block">
              מידע על משלוחים
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-sage/10 mb-6" />
        <p className="font-dmsans text-text-dark/25 text-xs text-center">
          © 2025 גן עדן | Gan Eden · כל הזכויות שמורות
        </p>
      </div>
    </footer>
  )
}

const WaIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const IgIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
