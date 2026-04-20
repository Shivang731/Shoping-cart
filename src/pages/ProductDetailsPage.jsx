import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { toast } from 'react-toastify'
import 'swiper/css'
import { fetchProductById } from '../services/api'
import { useCart } from '../hooks/useCart'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const productId = Number(id)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useCart()

  useEffect(() => {
    if (!productId) {
      setError('Invalid product ID')
      setLoading(false)
      return
    }

    setLoading(true)

    fetchProductById(productId)
      .then((data) => setProduct(data))
      .catch(() => setError('Failed to load product details.'))
      .finally(() => setLoading(false))
  }, [productId])

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-6">Loading product...</div>
  }

  if (error || !product) {
    return (
      <div className="min-h-screen p-6 text-center text-red-500">
        {error || 'Product not found.'}
      </div>
    )
  }

  const wishlistActive = isInWishlist(product.id)

  return (
    <main className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl bg-white p-4 shadow-sm">
            <Swiper
              loop
              className="h-96"
              slidesPerView={1}
              spaceBetween={20}
              onSlideChange={() => {}}
            >
              {[1, 2, 3].map((slide) => (
                <SwiperSlide
                  key={slide}
                  className="flex items-center justify-center bg-gray-100"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-80 object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </article>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">
              {product.title}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {product.category}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>
                  {product.rating.rate >= i + 1 ? '★' : '☆'}
                </span>
              ))}
              <span className="text-gray-500">
                ({product.rating.count})
              </span>
            </div>

            <p className="mt-4 text-xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </p>

            <p className="mt-4 text-gray-600">
              {product.description}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  addToCart(product)
                  toast.success('Added product to cart')
                }}
                className="flex-1 rounded-xl bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  wishlistActive
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)

                  toast.info(
                    wishlistActive
                      ? 'Removed from wishlist'
                      : 'Added to wishlist'
                  )
                }}
                className={`flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium transition ${
                  wishlistActive
                    ? 'bg-red-50 text-red-600'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {wishlistActive
                  ? 'Remove from Wishlist'
                  : 'Add to Wishlist'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}