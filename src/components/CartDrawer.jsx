export default function CartDrawer({ open, onClose, cart, onUpdateQty, onRemove, subtotal }) {
  const delivery = subtotal > 0 ? (subtotal >= 200 ? 0 : 25) : 0

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        dir="rtl"
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-bg z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h2 className="font-display font-bold text-2xl text-ink">עגלת קניות</h2>
          <button onClick={onClose} className="p-2 text-light hover:text-ink transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-light">
              <span className="text-5xl">🛒</span>
              <p className="font-body text-lg">העגלה ריקה</p>
              <p className="font-body text-sm" dir="ltr">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white rounded-2xl p-3 shadow-sm">
                <img
                  src={item.image}
                  alt={item.nameHe}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-ink text-base leading-snug truncate">
                    {item.nameHe}
                  </div>
                  <div className="font-body text-primary font-semibold text-sm mt-0.5">₪{item.price}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-colors flex items-center justify-center font-bold text-ink"
                    >−</button>
                    <span className="font-body font-semibold w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-primary hover:text-white transition-colors flex items-center justify-center font-bold text-ink"
                    >+</button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="mr-auto text-light hover:text-red-500 transition-colors p-1"
                      aria-label="הסר"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-200 space-y-3">
            <div className="flex justify-between font-body text-sm text-light">
              <span>משלוח</span>
              <span dir="ltr">{delivery === 0 ? '✓ חינם' : `₪${delivery}`}</span>
            </div>
            {subtotal < 200 && (
              <p className="font-body text-xs text-muted">קנה עוד ₪{200 - subtotal} למשלוח חינם!</p>
            )}
            <div className="flex justify-between font-display font-bold text-xl text-ink">
              <span>סה"כ</span>
              <span dir="ltr">₪{subtotal + delivery}</span>
            </div>
            <a
              href="#payment"
              onClick={onClose}
              className="block w-full bg-primary hover:bg-primary/90 text-white text-center font-body font-semibold py-3.5 rounded-xl transition-all active:scale-[0.97]"
            >
              המשך לתשלום →
            </a>
          </div>
        )}
      </div>
    </>
  )
}
