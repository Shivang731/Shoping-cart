import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 12000,
})

export const fetchProducts = async () => {
  const { data } = await api.get('/products')
  return data
}

export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`)
  return data
}