import { useState } from 'react'

const DEMO_PASSWORD = 'ganeden2025'
const SESSION_KEY = '_gd_auth'

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  )
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
      setTimeout(() => setError(false), 2500)
    }
  }

  if (unlocked) return children

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-bg flex items-center justify-center px-4"
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <span className="text-5xl mb-3">🌿</span>
          <h1 className="font-display font-bold text-3xl text-primary">גן עדן</h1>
          <p className="font-body text-sm text-light mt-1" dir="ltr">Gan Eden — Demo Preview</p>
        </div>

        <div
          className={`bg-white rounded-2xl shadow-md p-8 ${shake ? 'animate-[shake_0.5s_ease]' : ''}`}
          style={shake ? { animation: 'shake 0.5s ease' } : {}}
        >
          <p className="font-body text-sm text-ink/70 mb-5 text-center">
            דמו זה מוגן בסיסמה
            <br />
            <span dir="ltr" className="text-light text-xs">This preview is password protected</span>
          </p>

          <form onSubmit={attempt} className="space-y-4">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="סיסמה · Password"
              autoFocus
              className={`w-full px-4 py-3 rounded-xl border font-body text-sm text-center tracking-widest outline-none transition ${
                error
                  ? 'border-red-400 bg-red-50 text-red-600 placeholder:text-red-300'
                  : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10'
              }`}
            />
            {error && (
              <p className="font-body text-xs text-red-500 text-center">
                סיסמה שגויה · Incorrect password
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-body font-semibold py-3 rounded-xl transition-all active:scale-[0.97]"
            >
              כניסה · Enter
            </button>
          </form>
        </div>

        <p className="font-body text-xs text-light text-center mt-6">
          © 2025 גן עדן | Gan Eden
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-8px); }
          30%       { transform: translateX(8px); }
          45%       { transform: translateX(-6px); }
          60%       { transform: translateX(6px); }
          75%       { transform: translateX(-3px); }
          90%       { transform: translateX(3px); }
        }
      `}</style>
    </div>
  )
}
