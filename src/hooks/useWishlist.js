import { useCartContext } from '../context/CartContext'

export function useWishlist() {
  return useCartContext()
}