import { useMemo, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useDebounce } from '../hooks/useDebounce'
import ProductCard from '../components/ProductCard'

type ProductsPageProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export default function ProductsPage({ searchTerm, onSearchChange }: ProductsPageProps) {
  const { products, loading, error } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState('default')

  const debouncedTerm = useDebounce(searchTerm, 300)

  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category)))
    return ['all', ...list]
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (debouncedTerm) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(debouncedTerm.toLowerCase()),
      )
    }
    if (selectedCategory !== 'all') {
      result = result.filter((product) => product.category === selectedCategory)
    }
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1],
    )

    if (sortBy === 'low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating.rate - a.rating.rate)
    }

    return result
  }, [products, debouncedTerm, selectedCategory, priceRange, sortBy])

  const maxPrice = useMemo(() => Math.max(1000, ...products.map((p) => p.price)), [products])

  const onMinPriceChange = (value: number) => setPriceRange([value, priceRange[1]])
  const onMaxPriceChange = (value: number) => setPriceRange([priceRange[0], value])

  return (
    <main className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500">{filteredProducts.length} items found</p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="hidden flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            <div>
              <label className="text-sm font-medium text-gray-600">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All categories' : category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Price range</label>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <input
                  className="w-20 rounded-lg border border-gray-200 px-2 py-1"
                  type="number"
                  min={0}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => onMinPriceChange(Number(e.target.value))}
                />
                <span className="text-gray-400">-</span>
                <input
                  className="w-20 rounded-lg border border-gray-200 px-2 py-1"
                  type="number"
                  min={0}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm"
              >
                <option value="default">Recommended</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('all')
                setSortBy('default')
                setPriceRange([0, maxPrice])
                onSearchChange('')
              }}
              className="mt-2 rounded-xl bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Reset
            </button>
          </aside>

          <section>
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm md:hidden">
              <div className="flex-1">
                <input
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Search products..."
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All' : category}
                  </option>
                ))}
              </select>
            </div>

            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="h-72 animate-pulse rounded-2xl bg-white shadow-sm" />
                ))}
              </div>
            )}

            {error && <p className="mt-6 text-center text-red-600">{error}</p>}

            {!loading && !error && filteredProducts.length === 0 && (
              <p className="mt-6 text-center text-gray-500">No products match your filters.</p>
            )}

            {!loading && !error && filteredProducts.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
