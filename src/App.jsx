import { useState, useCallback } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Header from './components/Header'
import Hero from './components/Hero'
import BrandStatement from './components/BrandStatement'
import MagazineStrip from './components/MagazineStrip'
import EditorialFeatures from './components/EditorialFeatures'
import ShopSection from './components/ShopSection'
import CareStrip from './components/CareStrip'
import Gallery from './components/Gallery'
import CartDrawer from './components/CartDrawer'
import Checkout from './components/Checkout'
import Footer from './components/Footer'

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }, [])

  const updateQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i).filter((i) => i.qty > 0)
    )
  }, [])

  const removeItem = useCallback((id) => setCart((prev) => prev.filter((i) => i.id !== id)), [])
  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const subtotal   = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <Elements stripe={stripePromise}>
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <BrandStatement />
        <MagazineStrip />
        <EditorialFeatures onAddToCart={addToCart} />
        <section id="shop">
          <ShopSection onAddToCart={addToCart} />
        </section>
        <CareStrip />
        <Gallery />
        <section id="checkout">
          <Checkout cart={cart} subtotal={subtotal} onClearCart={clearCart} />
        </section>
      </main>
      <CartDrawer
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        subtotal={subtotal}
      />
      <Footer />
    </Elements>
  )
}
