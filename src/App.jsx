import { useState, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import Categories from './components/Categories'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'
import Trust from './components/Trust'
import Payment from './components/Payment'
import Footer from './components/Footer'
import Toast from './components/Toast'

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setToast(product.nameHe)
    setTimeout(() => setToast(null), 2500)
  }, [])

  const updateQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    )
  }, [])

  const removeItem = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div className="min-h-screen bg-bg font-body">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <MarqueeStrip />
        <Categories />
        <ProductGrid onAddToCart={addToCart} />
        <MarqueeStrip />
        <Trust />
        <Payment cart={cart} subtotal={subtotal} />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        subtotal={subtotal}
      />
      {toast && <Toast name={toast} />}
    </div>
  )
}
