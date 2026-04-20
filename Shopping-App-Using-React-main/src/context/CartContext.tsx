import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CartItem, Product } from '../types'

type CartContextValue = {
  cart: CartItem[]
  wishlist: Product[]
  totalQuantity: number
  totalPrice: number
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const CART_KEY = 'shopping_app_cart_v1'
const WISHLIST_KEY = 'shopping_app_wishlist_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return []
    const stored = window.localStorage.getItem(CART_KEY)
    return stored ? JSON.parse(stored) : []
  })

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return []
    const stored = window.localStorage.getItem(WISHLIST_KEY)
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = (product: Product) => {
    setCart((current) => {
      const item = current.find((x) => x.product.id === product.id)
      if (item) {
        return current.map((x) =>
          x.product.id === product.id ? { ...x, quantity: x.quantity + 1 } : x,
        )
      }
      return [...current, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((current) => current.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((current) =>
      current.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    )
  }

  const addToWishlist = (product: Product) => {
    setWishlist((current) => {
      if (current.some((item) => item.id === product.id)) return current
      return [...current, product]
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlist((current) => current.filter((item) => item.id !== productId))
  }

  const isInWishlist = (productId: number) => wishlist.some((item) => item.id === productId)

  const clearCart = () => setCart([])

  const totals = useMemo(() => {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    return { totalQuantity, totalPrice }
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        totalQuantity: totals.totalQuantity,
        totalPrice: totals.totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCartContext must be used inside CartProvider')
  }
  return ctx
}
