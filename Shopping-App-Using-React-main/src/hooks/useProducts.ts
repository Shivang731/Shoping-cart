import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/api'
import type { Product } from '../types'

let cache: Product[] | null = null

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(cache ?? [])
  const [loading, setLoading] = useState(!cache)
  const [error, setError] = useState<string | null>(null)

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
