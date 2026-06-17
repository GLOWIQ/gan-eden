import { useState, useEffect } from 'react'

export default function Header({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#catalog', label: 'קטלוג', sub: 'Catalog' },
    { href: '#about', label: 'אודות', sub: 'About' },
    { href: '#contact', label: 'צור קשר', sub: 'Contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-bg/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 select-none">
            <span className="text-2xl">🌿</span>
            <div className="leading-tight">
              <div className="font-display font-bold text-xl text-primary leading-none">גן עדן</div>
              <div className="font-body text-xs text-muted leading-none tracking-wide" dir="ltr">Gan Eden</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" dir="rtl">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group flex flex-col items-center text-ink hover:text-primary transition-colors"
              >
                <span className="font-body text-sm font-medium">{l.label}</span>
                <span className="text-[10px] text-light group-hover:text-muted transition-colors" dir="ltr">{l.sub}</span>
              </a>
            ))}
          </nav>

          {/* Cart + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCartClick}
              className="relative p-2 text-ink hover:text-primary transition-colors"
              aria-label="עגלת קניות"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-fadeIn">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 text-ink"
              onClick={() => setMenuOpen(true)}
              aria-label="תפריט"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex" dir="rtl">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="relative bg-bg w-72 h-full shadow-2xl flex flex-col pt-8 px-6 animate-slideInRight">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 left-4 p-2 text-ink"
              aria-label="סגור"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-2 mb-10">
              <span className="text-2xl">🌿</span>
              <span className="font-display font-bold text-2xl text-primary">גן עדן</span>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-2xl font-bold text-ink hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
