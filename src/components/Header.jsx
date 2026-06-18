import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { label: 'הבית',        href: '/' },
  { label: 'עונת הגידול', href: '#magazine' },
  { label: 'החנות',       href: '#shop' },
  { label: 'אודות',       href: '#' },
  { label: 'צור קשר',     href: '#' },
]

export default function Header({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 70)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500
        ${scrolled ? 'bg-canvas/90 backdrop-blur-md border-b border-sage/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between">

          {/* Logo — first child = rightmost in RTL */}
          <a href="/" className={`flex flex-col items-end transition-colors duration-500
            ${scrolled ? 'text-moss' : 'text-text-dark'}`}>
            <span className="font-frank text-2xl md:text-[26px] font-bold leading-none tracking-tight">גן עדן</span>
            <span className="font-fraunces text-[10px] italic tracking-[0.18em] opacity-40 mt-0.5">Gan Eden</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="ניווט ראשי">
            {NAV.map(({ label, href }) => (
              <a key={label} href={href}
                className={`font-heebo text-sm tracking-wide transition-colors duration-200
                  ${scrolled ? 'text-text-light/70 hover:text-moss' : 'text-text-dark/65 hover:text-text-dark'}`}>
                {label}
              </a>
            ))}
          </nav>

          {/* Cart + hamburger — last child = leftmost in RTL */}
          <div className="flex items-center gap-1">
            <button onClick={onCartClick} className="relative p-2"
              aria-label={`עגלת קניות${cartCount > 0 ? `, ${cartCount} פריטים` : ''}`}>
              <BagIcon className={`w-[22px] h-[22px] transition-colors duration-500
                ${scrolled ? 'text-text-light' : 'text-text-dark'}`} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -left-0.5 min-w-[18px] h-[18px] px-1 bg-moss text-white
                  font-dmsans text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2" onClick={() => setOpen(true)} aria-label="פתח תפריט">
              <MenuIcon className={`w-6 h-6 transition-colors duration-500
                ${scrolled ? 'text-text-light' : 'text-text-dark'}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-50 bg-canvas/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div key="panel"
              initial={{ opacity: 0, y: '-5%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-5%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-0 z-50 bg-forest flex flex-col px-8 pt-8 pb-10">
              <div className="flex items-center justify-between mb-12">
                <span className="font-frank text-2xl text-text-dark font-bold">גן עדן</span>
                <button onClick={() => setOpen(false)} aria-label="סגור תפריט"
                  className="p-2 text-text-dark/40 hover:text-text-dark transition-colors">
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-8 flex-1">
                {NAV.map(({ label, href }) => (
                  <a key={label} href={href} onClick={() => setOpen(false)}
                    className="font-frank text-[38px] leading-none text-text-dark hover:text-sage transition-colors duration-200">
                    {label}
                  </a>
                ))}
              </nav>
              <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 font-heebo text-sm text-sage">
                <WaIcon className="w-5 h-5" />
                שלח לנו הודעה בוואטסאפ
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const BagIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
)
const MenuIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="8" y1="17" x2="21" y2="17"/>
  </svg>
)
const CloseIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const WaIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
