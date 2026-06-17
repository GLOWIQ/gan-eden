const TEXT = '🌿 גן עדן • Gan Eden • צמחים טריים • Fresh Plants • כלי גינון • Garden Tools • זרעים • Seeds • 🪴 '

export default function MarqueeStrip() {
  return (
    <div className="bg-primary overflow-hidden py-3.5 select-none" aria-hidden="true">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="font-body text-sm font-medium text-white/90 tracking-wide px-2 shrink-0"
          >
            {TEXT}
          </span>
        ))}
      </div>
    </div>
  )
}
