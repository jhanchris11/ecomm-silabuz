import { API } from '../config'
import { ProductItem } from '../types'

export const getCategories = async (): Promise<string[]> => {
  return await API.get('/products/categories').then((res) => res.data)
}

export const getProductsByCategory = async (
  title: string
): Promise<ProductItem[]> => {
  return await API.get(`/products/category/${title}`).then((res) => res.data)
}
