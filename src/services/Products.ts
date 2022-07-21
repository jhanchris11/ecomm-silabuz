import { API } from '../config'
import { ProductItem } from '../types'

export const getProducts = async (): Promise<ProductItem[]> => {
  return await API.get('/products').then((res) => res.data)
}

export const deleteProductById = async (id: number): Promise<any> => {
  return await API.delete(`/products/${id}`).then((res) => res.data)
}
export const getProductsById = async (id: number): Promise<ProductItem> => {
  return await API.get(`/products/${id}`).then((res) => res.data)
}
