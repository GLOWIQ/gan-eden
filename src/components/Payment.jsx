import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_REPLACE_WITH_YOUR_KEY'
)

const CARD_STYLE = {
  style: {
    base: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      color: '#1A1A1A',
      '::placeholder': { color: '#9CA3AF' },
    },
    invalid: { color: '#ef4444' },
  },
}

function CheckoutForm({ cart, subtotal }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })

  const delivery = subtotal >= 200 ? 0 : 25
  const total = subtotal + delivery

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    setError(null)

    // Simulate payment (no real charge in demo)
    await new Promise((r) => setTimeout(r, 1800))

    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 className="font-display font-bold text-3xl text-ink mb-2">הזמנתך התקבלה!</h3>
          <p className="font-body text-light text-lg" dir="ltr">Order received! Thank you. 🌿</p>
          <p className="font-body text-sm text-muted mt-2">אישור יישלח לכתובת המייל שלך</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} dir="rtl" className="grid lg:grid-cols-2 gap-10">
      {/* Order Summary */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-display font-bold text-xl text-ink mb-5">סיכום הזמנה</h3>
        {cart.length === 0 ? (
          <p className="font-body text-light text-sm">העגלה ריקה — הוסף מוצרים כדי לבצע הזמנה</p>
        ) : (
          <ul className="space-y-3 mb-5">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.nameHe} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <div className="font-body font-medium text-sm text-ink">{item.nameHe}</div>
                    <div className="font-body text-xs text-light">× {item.qty}</div>
                  </div>
                </div>
                <span className="font-body font-semibold text-ink text-sm" dir="ltr">₪{item.price * item.qty}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="border-t border-gray-100 pt-4 space-y-2">
          <div className="flex justify-between font-body text-sm text-light">
            <span>ביניים</span>
            <span dir="ltr">₪{subtotal}</span>
          </div>
          <div className="flex justify-between font-body text-sm text-light">
            <span>משלוח</span>
            <span dir="ltr">{delivery === 0 ? 'חינם 🎉' : `₪${delivery}`}</span>
          </div>
          <div className="flex justify-between font-display font-bold text-xl text-ink border-t border-gray-100 pt-2 mt-2">
            <span>סה"כ</span>
            <span dir="ltr">₪{total}</span>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h3 className="font-display font-bold text-xl text-ink mb-5">פרטי תשלום</h3>

        {[
          { key: 'name', label: 'שם מלא', placeholder: 'ישראל ישראלי', type: 'text', en: 'Full Name' },
          { key: 'email', label: 'אימייל', placeholder: 'you@example.com', type: 'email', en: 'Email', ltr: true },
          { key: 'phone', label: 'טלפון', placeholder: '050-000-0000', type: 'tel', en: 'Phone (Israeli)', ltr: true },
          { key: 'address', label: 'כתובת למשלוח', placeholder: 'רחוב הורדים 12, תל אביב', type: 'text', en: 'Delivery Address' },
        ].map((f) => (
          <div key={f.key}>
            <label className="block font-body text-sm font-medium text-ink mb-1.5">
              {f.label} <span className="text-light font-normal text-xs" dir="ltr">· {f.en}</span>
            </label>
            <input
              type={f.type}
              value={form[f.key]}
              onChange={set(f.key)}
              placeholder={f.placeholder}
              dir={f.ltr ? 'ltr' : 'rtl'}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none font-body text-sm text-ink placeholder:text-gray-400 transition"
            />
          </div>
        ))}

        <div>
          <label className="block font-body text-sm font-medium text-ink mb-1.5">
            פרטי כרטיס <span className="text-light font-normal text-xs" dir="ltr">· Card Details</span>
          </label>
          <div className="StripeElement">
            <CardElement options={CARD_STYLE} />
          </div>
        </div>

        {error && (
          <p className="font-body text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || cart.length === 0}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-body font-semibold py-4 rounded-xl transition-all active:scale-[0.97] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>מעבד תשלום...</span>
            </>
          ) : (
            <span>שלם עכשיו ₪{total} · <span dir="ltr" className="text-white/80">Pay Now</span></span>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-light text-xs font-body">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <span>התשלום מאובטח ומוצפן | Secured by Stripe</span>
        </div>
      </div>
    </form>
  )
}

export default function Payment({ cart, subtotal }) {
  return (
    <section id="payment" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-ink mb-2">
          תשלום מאובטח
        </h2>
        <p className="font-body text-light text-lg" dir="ltr">Secure Checkout</p>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} subtotal={subtotal} />
      </Elements>
    </section>
  )
}
