const HERO_GRADIENT = 'radial-gradient(ellipse at 50% 25%,#1a3a1a 0%,#152A15 30%,#081008 80%)'
const OVERLAY = 'linear-gradient(to top,rgba(8,16,8,0.88) 0%,rgba(8,16,8,0.35) 55%,transparent 100%)'

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end pb-16 md:pb-24 overflow-hidden"
      style={{ background: HERO_GRADIENT }}>

      {/* Photography (drops in when image file exists) */}
      <img
        src="/images/hero.jpg"
        alt="צמחי בית טרופיים על משטח ירוק עמוק — מונסטרה, שרך, פותוס — צילום אמנותי"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => e.target.remove()}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: OVERLAY }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <p className="font-dmsans text-sage text-xs tracking-[0.22em] uppercase mb-6">
          Tel Aviv · Jerusalem · גידול מקומי
        </p>
        <h1 className="font-frank font-bold text-text-dark leading-[1.05] mb-5"
          style={{ fontSize: 'clamp(48px,8.5vw,80px)' }}>
          גן עדן<br />בתוך הבית<br />שלך.
        </h1>
        <p className="font-fraunces font-light italic text-text-dark/55 mb-10"
          style={{ fontSize: 'clamp(16px,2vw,22px)' }}>
          A garden inside your home.
        </p>
        <a href="#shop"
          className="inline-flex items-center gap-3 px-8 py-4 bg-moss text-white font-heebo font-medium
            rounded-full hover:bg-moss/85 transition-colors duration-300 text-base">
          גלה את הקולקציה
          <span className="font-dmsans text-sm opacity-75">Discover</span>
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5
        animate-scrollBounce pointer-events-none" aria-hidden="true">
        <span className="font-dmsans text-[10px] tracking-[0.2em] text-text-dark/35 uppercase">scroll</span>
        <ArrowDown />
      </div>
    </section>
  )
}

const ArrowDown = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-text-dark/35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12l7 7 7-7"/>
  </svg>
)
