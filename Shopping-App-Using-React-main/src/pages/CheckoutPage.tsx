import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../hooks/useCart'

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const tax = totalPrice * 0.08
  const total = totalPrice + tax

  if (!cart.length) {
    return (
      <main className="bg-gray-50 min-h-screen p-6">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">No items to checkout</h1>
          <p className="mt-2 text-gray-500">Your cart is empty, add items before checking out.</p>
        </div>
      </main>
    )
  }

  const onSubmit = () => {
    clearCart()
    toast.success('Order placed successfully!')
    setTimeout(() => navigate('/products'), 900)
  }

  return (
    <main className="bg-gray-50 min-h-screen p-6">
      <div className="mx-auto max-w-7xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>

        <section className="mt-5 grid gap-4 rounded-xl border border-gray-200 p-4">
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-gray-700">{item.quantity} x {item.product.title}</span>
              <span className="font-semibold text-gray-800">${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </section>

        <section className="mt-4 rounded-xl border border-gray-200 p-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="mt-2 flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </section>

        <button
          onClick={onSubmit}
          className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 text-lg font-semibold text-white hover:bg-indigo-700"
        >
          Place Order
        </button>
      </div>
    </main>
  )
}
