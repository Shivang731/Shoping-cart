import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="bg-gray-50 min-h-screen p-6">
      <div className="mx-auto max-w-7xl rounded-2xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">404</h1>
        <p className="mt-2 text-lg text-gray-600">Page not found</p>
        <Link
          to="/products"
          className="mt-4 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Back to products
        </Link>
      </div>
    </main>
  )
}