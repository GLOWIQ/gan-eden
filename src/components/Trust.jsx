const PILLARS = [
  {
    icon: '🌱',
    titleHe: 'צמחים בריאים מובטחים',
    titleEn: 'Healthy Plants, Guaranteed',
    body: 'We grow and source locally from trusted Israeli growers. Every plant ships with a 30-day health guarantee.',
  },
  {
    icon: '🚚',
    titleHe: 'משלוח עד הבית',
    titleEn: 'Fast Delivery Across Israel',
    body: 'Plants arrive safely packed in eco-friendly boxes, delivered within 2–3 business days nationwide.',
  },
  {
    icon: '💬',
    titleHe: 'תמיכה אישית ב-WhatsApp',
    titleEn: 'Real People, Real Advice',
    body: 'Message us any time on WhatsApp. Our gardening experts answer questions about care, soil, and more.',
  },
]

export default function Trust() {
  return (
    <section className="py-20 bg-white" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Image + Heading row */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="rounded-2xl overflow-hidden shadow-md aspect-video lg:aspect-auto lg:h-80">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
              alt="גינון ביתי"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div dir="rtl">
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-ink mb-3">
              למה גן עדן?
            </h2>
            <p className="font-body text-light text-lg mb-4" dir="ltr">Why shop with us</p>
            <p className="font-body text-ink/70 text-base leading-relaxed">
              אנחנו מאמינים שכל מי שרוצה לגדל משהו — יכול. אנחנו כאן בשביל להפוך את הגינה שלך לחלום שתמיד רצית.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-3 gap-8" dir="rtl">
          {PILLARS.map((p) => (
            <div key={p.titleHe} className="flex flex-col items-start gap-4">
              <span className="text-4xl">{p.icon}</span>
              <div>
                <h3 className="font-display font-bold text-xl text-ink mb-1">{p.titleHe}</h3>
                <p className="font-body text-xs text-light mb-2" dir="ltr">{p.titleEn}</p>
                <p className="font-body text-ink/70 text-sm leading-relaxed" dir="ltr">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
