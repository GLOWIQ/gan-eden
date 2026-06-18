import { useState } from 'react'

const DEMO_PASSWORD = 'ganeden2025'
const SESSION_KEY = '_gd_auth'
const BG = 'radial-gradient(ellipse at 50% 30%,#1a3a1a 0%,#152A15 30%,#081008 90%)'

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [input, setInput] = useState('')
  const [shake, setShake] = useState(false)
  const [error, setError] = useState(false)

  const attempt = (e) => {
    e.preventDefault()
    if (input === DEMO_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setShake(true)
      setInput('')
      setTimeout(() => setShake(false), 600)
      setTimeout(() => setError(false), 2800)
    }
  }

  if (unlocked) return children

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: BG }}>
      <div className="w-full max-w-xs">
        {/* Logo */}
        <div className="text-center mb-10">
          <LeafMark />
          <h1 className="font-frank font-bold text-text-dark mt-4" style={{ fontSize: 42 }}>גן עדן</h1>
          <p className="font-fraunces italic text-text-dark/40 text-sm mt-1" dir="ltr">Gan Eden — Demo Preview</p>
        </div>

        <div className={`bg-forest/80 backdrop-blur-md border border-sage/15 rounded-2xl p-8
          ${shake ? 'animate-shake' : ''}`}>
          <p className="font-heebo text-text-dark/60 text-sm text-center mb-6">
            דמו זה מוגן בסיסמה
            <br />
            <span dir="ltr" className="text-text-dark/35 text-xs">This preview is password protected</span>
          </p>

          <form onSubmit={attempt} className="space-y-4">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="סיסמה · Password"
              autoFocus
              className={`w-full px-4 py-3.5 rounded-xl border bg-canvas/60 font-dmsans text-sm
                text-center tracking-widest outline-none transition-all duration-200 text-text-dark
                placeholder:text-text-dark/25
                ${error
                  ? 'border-terracotta ring-2 ring-terracotta/20 text-terracotta'
                  : 'border-sage/30 focus:border-moss focus:ring-2 focus:ring-moss/20'}`}
            />
            {error && (
              <p className="font-heebo text-terracotta text-xs text-center animate-fadeIn">
                סיסמה שגויה · Incorrect password
              </p>
            )}
            <button type="submit"
              className="w-full bg-moss hover:bg-moss/85 text-white font-heebo font-medium py-3.5
                rounded-full transition-colors duration-250 text-sm">
              כניסה · Enter
            </button>
          </form>
        </div>

        <p className="font-dmsans text-text-dark/20 text-xs text-center mt-8">
          © 2025 גן עדן | Gan Eden
        </p>
      </div>
    </div>
  )
}

const LeafMark = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12 mx-auto text-sage" fill="currentColor">
    <path d="M24 4C13 4 5 14 5 24c0 4 1 8 3 11 2-6 5-12 10-16-4 4-6 10-7 16 2 2 5 4 8 5-1-5-1-11 3-16-2 5-2 11 0 16h2c0-6 1-12 5-16-3 4-4 10-3 16 3-1 6-3 8-5-1-6-3-12-7-16 5 4 8 10 10 16 2-3 3-7 3-11 0-10-8-20-19-20z"/>
  </svg>
)
