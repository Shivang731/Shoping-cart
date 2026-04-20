import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../hooks/useCart'

export default function CartPage() {
  const { cart, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart()
  const tax = totalPrice * 0.08
  const total = totalPrice + tax

  if (cart.length === 0) {
    return (
      <main className="bg-gray-50 min-h-screen p-6">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
          <p className="mt-2 text-gray-500">Browse products and add items to your cart.</p>
          <Link to="/products" className="mt-4 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            Shop products
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">Cart</h1>
          <div className="mt-4 space-y-4">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="grid grid-cols-8 gap-4 rounded-xl border border-gray-200 p-4">
                <img src={product.image} alt={product.title} className="col-span-1 h-20 w-20 object-contain" />
                <div className="col-span-5">
                  <p className="font-semibold text-gray-800">{product.title}</p>
                  <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="rounded-md border px-2 py-1 text-gray-600">-</button>
                    <span className="text-sm font-medium">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="rounded-md border px-2 py-1 text-gray-600">+</button>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} className="text-sm text-red-500 hover:underline">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/checkout" className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
              Checkout
            </Link>
            <button
              onClick={() => {
                clearCart()
                toast.info('Cart cleared')
              }}
              className="rounded-xl border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Clear Cart
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
