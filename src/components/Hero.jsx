export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=85"
          alt="גינה ירוקה ומלאת חיים"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-28 w-full">
        <div className="max-w-2xl animate-fadeSlideUp">
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-4">
            הגינה שחלמת עליה
            <br />
            מתחילה כאן
          </h1>
          <p className="font-body text-lg text-white/80 mb-8" dir="ltr">
            Everything you need to grow something beautiful
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="#catalog"
              className="bg-accent hover:bg-accent/90 text-white font-body font-semibold px-8 py-3.5 rounded-xl transition-all active:scale-[0.97] shadow-lg"
            >
              לקנות עכשיו
              <span className="text-white/70 text-sm mr-1.5" dir="ltr">Shop Now</span>
            </a>
            <a
              href="#catalog"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-body font-semibold px-8 py-3.5 rounded-xl transition-all active:scale-[0.97]"
            >
              גלה את הקטלוג
              <span className="text-white/70 text-sm mr-1.5" dir="ltr">Browse Catalog</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              { icon: '🚚', he: 'משלוח מהיר לכל הארץ', en: 'Fast nationwide delivery' },
              { icon: '🌱', he: 'צמחים בריאים בלבד', en: 'Healthy plants guaranteed' },
              { icon: '💬', he: 'תמיכה ב-WhatsApp', en: 'WhatsApp support' },
            ].map((b) => (
              <div key={b.he} className="flex items-center gap-2 text-white/90">
                <span>{b.icon}</span>
                <span className="font-body text-sm font-medium">{b.he}</span>
                <span className="text-white/50 text-xs hidden sm:inline" dir="ltr">· {b.en}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
