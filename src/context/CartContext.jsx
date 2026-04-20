import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(undefined)

const CART_KEY = 'shopping_app_cart_v1'
const WISHLIST_KEY = 'shopping_app_wishlist_v1'

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    if (typeof window === 'undefined') return []
    const stored = window.localStorage.getItem(CART_KEY)
    return stored ? JSON.parse(stored) : []
  })

  const [wishlist, setWishlist] = useState(() => {
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

  const addToCart = (product) => {
    setCart((current) => {
      const item = current.find((x) => x.product.id === product.id)
      if (item) {
        return current.map((x) =>
          x.product.id === product.id
            ? { ...x, quantity: x.quantity + 1 }
            : x
        )
      }
      return [...current, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((current) =>
      current.filter((item) => item.product.id !== productId)
    )
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((current) =>
      current.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const addToWishlist = (product) => {
    setWishlist((current) => {
      if (current.some((item) => item.id === product.id)) return current
      return [...current, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist((current) =>
      current.filter((item) => item.id !== productId)
    )
  }

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.id === productId)

  const clearCart = () => setCart([])

  const totals = useMemo(() => {
    const totalQuantity = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
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