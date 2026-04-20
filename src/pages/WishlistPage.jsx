import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useCart()

  if (!wishlist.length) {
    return (
      <main className="bg-gray-50 min-h-screen p-6">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            Your wishlist is empty
          </h1>
          <p className="mt-2 text-gray-500">
            Add products to wishlist to save them for later.
          </p>
          <Link
            to="/products"
            className="mt-4 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Browse products
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">
            Wishlist
          </h1>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((product) => (
              <article
                key={product.id}
                className="space-y-2 rounded-xl border border-gray-200 p-4"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-contain"
                />

                <h2 className="text-sm font-semibold text-gray-800">
                  {product.title}
                </h2>

                <p className="text-sm text-indigo-600">
                  ${product.price.toFixed(2)}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Add Cart
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}