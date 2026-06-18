import { motion, AnimatePresence } from 'framer-motion'

export default function CartDrawer({ cart, isOpen, onClose, onUpdateQty, onRemove, subtotal }) {
  const delivery = subtotal > 0 ? (subtotal >= 200 ? 0 : 25) : 0
  const total = subtotal + delivery

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-canvas/60 backdrop-blur-sm"
            onClick={onClose} />

          {/* Drawer — slides from LEFT (RTL end side) */}
          <motion.aside key="drawer"
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-sm bg-forest flex flex-col shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-sage/15">
              <button onClick={onClose} aria-label="סגור עגלה"
                className="p-1 text-text-dark/40 hover:text-text-dark transition-colors">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
              <div className="text-right">
                <h2 className="font-frank text-xl text-text-dark font-bold">העגלה שלך</h2>
                <p className="font-fraunces italic text-text-dark/40 text-xs">Your cart</p>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <p className="font-heebo text-text-dark/40 text-center py-16">העגלה ריקה</p>
              ) : (
                cart.map((item) => (
                  <motion.div key={item.id}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="w-[50px] h-[65px] rounded-lg flex-shrink-0 overflow-hidden"
                      style={{ background: item.gradient }}>
                      <img src={item.image} alt={item.nameHe}
                        className="w-full h-full object-cover" onError={(e) => e.target.remove()} />
                    </div>
                    {/* Details */}
                    <div className="flex-1 text-right">
                      <p className="font-frank text-text-dark font-bold text-base leading-tight">{item.nameHe}</p>
                      <p className="font-dmsans text-moss font-bold text-sm mt-0.5">₪{item.price}</p>
                    </div>
                    {/* Qty controls */}
                    <div className="flex items-center gap-2 text-sage">
                      <button onClick={() => onRemove(item.id)} aria-label="הסר פריט"
                        className="text-sage/50 hover:text-terracotta transition-colors text-sm px-1">✕</button>
                      <button onClick={() => onUpdateQty(item.id, -1)} aria-label="הפחת כמות"
                        className="w-6 h-6 flex items-center justify-center hover:text-text-dark transition-colors text-lg leading-none">−</button>
                      <span className="font-dmsans text-text-dark text-sm w-4 text-center">{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} aria-label="הוסף כמות"
                        className="w-6 h-6 flex items-center justify-center hover:text-text-dark transition-colors text-lg leading-none">+</button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-sage/15 space-y-3">
                <div className="flex justify-between font-heebo text-text-dark/60 text-sm">
                  <span>{delivery === 0 ? 'חינם' : `₪${delivery}`}</span>
                  <span>משלוח</span>
                </div>
                <div className="flex justify-between font-frank font-bold text-text-dark text-xl">
                  <span>₪{total}</span>
                  <span>סה"כ</span>
                </div>
                <p className="font-dmsans text-sage text-xs text-center">
                  {subtotal >= 200 ? '✓ משלוח חינם!' : `משלוח חינם מעל ₪200 | Free delivery over ₪200`}
                </p>
                <a href="#checkout" onClick={onClose}
                  className="block w-full py-4 bg-moss text-white text-center font-heebo font-medium
                    rounded-full hover:bg-moss/85 transition-colors duration-250 mt-2">
                  לתשלום
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
