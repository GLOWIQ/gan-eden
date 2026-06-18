import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

const CARD_STYLE = {
  style: {
    base: {
      color: '#1A1A14',
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '16px',
      '::placeholder': { color: '#7A9E7A' },
    },
    invalid: { color: '#B85C35' },
  },
}

const INITIAL_FORM = { name: '', email: '', phone: '', address: '', city: '' }

export default function Checkout({ cart, subtotal, onClearCart }) {
  const stripe = useStripe()
  const elements = useElements()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const delivery = subtotal > 0 ? (subtotal >= 200 ? 0 : 25) : 0
  const total = subtotal + delivery

  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name)    e.name    = 'שם מלא נדרש'
    if (!form.email || !form.email.includes('@')) e.email = 'אימייל תקני נדרש'
    if (!form.phone)   e.phone   = 'טלפון נדרש'
    if (!form.address) e.address = 'כתובת נדרשת'
    if (!form.city)    e.city    = 'עיר נדרשת'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setSuccess(true)
    setLoading(false)
    onClearCart()
  }

  if (cart.length === 0 && !success) {
    return (
      <div className="bg-cream py-28 px-6 text-center">
        <p className="font-frank text-2xl text-text-light mb-4">העגלה שלך ריקה.</p>
        <a href="#shop" className="font-heebo text-moss underline underline-offset-4 hover:text-forest transition-colors">
          לחנות הצמחים
        </a>
      </div>
    )
  }

  return (
    <div className="bg-cream py-16 md:py-24 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {success ? (
          <SuccessCard />
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
              className="mb-12">
              <h2 className="font-frank font-bold text-forest" style={{ fontSize: 'clamp(36px,5.5vw,56px)' }}>
                השלמת הרכישה
              </h2>
              <p className="font-fraunces italic text-text-light/40 text-lg mt-1">Complete your order</p>
            </motion.div>

            {/* 2-col layout: summary right (first = RTL start), form left */}
            <div className="grid md:grid-cols-[380px_1fr] gap-8 md:gap-12">
              <OrderSummary cart={cart} subtotal={subtotal} delivery={delivery} total={total} />
              <form onSubmit={handleSubmit} noValidate className="space-y-5 order-last md:order-none">
                <Field label="שם מלא" id="name" value={form.name} onChange={set('name')} error={errors.name}
                  placeholder="ישראל ישראלי" />
                <Field label="אימייל" id="email" type="email" value={form.email} onChange={set('email')}
                  error={errors.email} placeholder="you@example.com" />
                <Field label="טלפון" id="phone" type="tel" value={form.phone} onChange={set('phone')}
                  error={errors.phone} placeholder="05X-XXXXXXX" />
                <Field label="כתובת למשלוח" id="address" value={form.address} onChange={set('address')}
                  error={errors.address} placeholder="רחוב, מספר בית" />
                <Field label="עיר" id="city" value={form.city} onChange={set('city')}
                  error={errors.city} placeholder="תל אביב" />

                {/* Stripe card */}
                <div>
                  <label className="block font-heebo text-text-light/75 text-sm mb-2">פרטי כרטיס אשראי</label>
                  {stripe ? (
                    <div className="rounded-xl border border-sage/40 bg-warm-white px-4 py-3.5">
                      <CardElement options={CARD_STYLE} />
                    </div>
                  ) : (
                    <div className="rounded-xl border border-sage/40 bg-warm-white px-4 py-3.5">
                      <p className="font-dmsans text-sage text-sm">4242 4242 4242 4242 &nbsp;·&nbsp; 12/28 &nbsp;·&nbsp; 123</p>
                    </div>
                  )}
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-[14px] bg-moss text-white font-heebo font-medium rounded-full
                    hover:bg-moss/85 transition-colors duration-250 disabled:opacity-60 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <LeafSpinner />
                      <span>מעבד...</span>
                    </>
                  ) : (
                    `לשלם עכשיו ₪${total}`
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Field({ label, id, value, onChange, error, placeholder, type = 'text' }) {
  return (
    <div>
      <label htmlFor={id} className="block font-heebo text-text-light/75 text-sm mb-2">{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full px-4 py-3.5 rounded-xl border bg-warm-white font-heebo text-text-light text-[15px]
          placeholder:text-sage/50 outline-none transition-all duration-200
          ${error ? 'border-terracotta ring-2 ring-terracotta/20' : 'border-sage/40 focus:border-moss focus:ring-2 focus:ring-moss/15'}`} />
      {error && <p className="font-dmsans text-terracotta text-xs mt-1.5">{error}</p>}
    </div>
  )
}

function OrderSummary({ cart, subtotal, delivery, total }) {
  return (
    <div className="bg-warm-white rounded-2xl p-6 space-y-4 h-fit">
      <h3 className="font-frank font-bold text-text-light text-xl">סיכום הזמנה</h3>
      <div className="space-y-3 border-b border-sage/20 pb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center font-heebo text-sm text-text-light/75">
            <span className="font-dmsans text-moss">₪{item.price * item.qty}</span>
            <span>{item.nameHe} × {item.qty}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-heebo text-sm text-text-light/60">
        <span>{delivery === 0 ? 'חינם' : `₪${delivery}`}</span>
        <span>משלוח</span>
      </div>
      <div className="flex justify-between font-frank font-bold text-text-light text-xl border-t border-sage/20 pt-4">
        <span>₪{total}</span>
        <span>סה"כ</span>
      </div>
      <p className="font-dmsans text-sage text-xs text-center">
        ✓ כל הצמחים מובטחים בריאים עם משלוח
      </p>
    </div>
  )
}

function SuccessCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-lg mx-auto bg-canvas rounded-3xl p-12 md:p-16 text-center">
      <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto mb-7 text-moss" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="44" strokeWidth="3" opacity="0.3" />
        <motion.path d="M28 52 L44 68 L73 34" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }} />
      </svg>
      <h2 className="font-frank font-bold text-text-dark text-3xl mb-4">ההזמנה התקבלה!</h2>
      <p className="font-heebo text-text-dark/70 text-[17px] leading-relaxed mb-3">
        הצמח שלך בדרך אליך. תודה שבחרת גן עדן.
      </p>
      <p className="font-fraunces italic text-text-dark/40 text-base">
        Your order is on its way. Thank you for choosing Gan Eden.
      </p>
    </motion.div>
  )
}

function LeafSpinner() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 animate-leafSpin" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10" strokeLinecap="round"/>
    </svg>
  )
}
