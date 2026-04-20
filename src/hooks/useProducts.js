import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/api'

let cache = null

export function useProducts() {
  const [products, setProducts] = useState(cache ?? [])
  const [loading, setLoading] = useState(!cache)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (cache) return

    setLoading(true)

    fetchProducts()
      .then((data) => {
        cache = data
        setProducts(data)
      })
      .catch((err) => {
        setError(err?.message || 'Unable to fetch products, please try again.')
      })
      .finally(() => setLoading(false))
  }, [])

  return { products, setProducts, loading, error }
}