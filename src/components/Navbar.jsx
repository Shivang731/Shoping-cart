import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../hooks/useCart'

export default function Navbar({ searchTerm, onSearchChange }) {
  const { totalQuantity, wishlist } = useCart()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-gray-50/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/products" className="text-2xl font-bold text-indigo-600">
          <span className="text-gray-800">Store</span>Hub
        </Link>

        <div className="flex-1 hidden md:block">
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
            placeholder="Search products (e.g. sneakers, electronics)"
            aria-label="Search products"
          />
        </div>

        <nav className="flex items-center gap-4">
          <Link
            to="/products"
            className={`text-sm font-medium ${
              location.pathname === '/products'
                ? 'text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Products
          </Link>

          <Link
            to="/wishlist"
            className="relative text-gray-600 hover:text-indigo-600"
            aria-label="Wishlist"
          >
            ♥
            <span className="sr-only">Wishlist</span>
            <motion.span
              className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-xs font-semibold text-white"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              {wishlist.length}
            </motion.span>
          </Link>

          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-indigo-600"
            aria-label="Cart"
          >
            🛒
            <span className="sr-only">Cart</span>
            <motion.span
              className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-xs font-semibold text-white"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              {totalQuantity}
            </motion.span>
          </Link>
        </nav>
      </div>

      <div className="md:hidden px-4 pb-3">
        <input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
          placeholder="Search products"
          aria-label="Search products mobile"
        />
      </div>
    </header>
  )
}