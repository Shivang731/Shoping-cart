import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { useCart } from '../hooks/useCart'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()
  const inWishlist = isInWishlist(product.id)

  const stars = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <motion.article
      whileHover={{ y: -3 }}
      className="rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-lg"
    >
      <Link to={`/products/${product.id}`} className="block h-48 overflow-hidden rounded-xl bg-gray-100">
        <div className="h-full w-full flex items-center justify-center p-4">
          <img src={product.image} alt={product.title} className="max-h-full object-contain" />
        </div>
      </Link>

      <div className="mt-4 space-y-2">
        <Link to={`/products/${product.id}`} className="block truncate text-base font-semibold text-gray-800 transition-colors hover:text-indigo-600" title={product.title}>
          {product.title}
        </Link>
        <p className="text-sm font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          {stars.map((star) => (
            <span key={star}>{product.rating.rate >= star ? '★' : '☆'}</span>
          ))}
          <span className="text-gray-500">({product.rating.count})</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <button
            className="flex-1 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
          <button
            className={`rounded-xl px-3 py-2 text-sm font-medium transition ${inWishlist ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
            onClick={() => (inWishlist ? removeFromWishlist(product.id) : addToWishlist(product))}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {inWishlist ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </motion.article>
  )
}
