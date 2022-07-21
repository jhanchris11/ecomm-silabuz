import { getCategories, getProductsByCategory } from '../../services/Categories'
import {
  deleteProductById,
  getProducts,
  getProductsById
} from '../../services/Products'
import { AppThunk } from '../store'
import {
  setFilterProductsByCategory,
  setDeleteProduct,
  setAllCategories,
  setProductById
} from './product.slice'

export const startGetProductsByCategory = (title: string): AppThunk => {
  return async (dispatch) => {
    let response = []
    try {
      if (title === 'All') {
        response = await getProducts()
      } else {
        response = await getProductsByCategory(title)
      }
      dispatch(setFilterProductsByCategory(response))
    } catch (error) {
      console.log(error)
    }
  }
}
export const startDeleteProductById = (id: number): AppThunk => {
  return async (dispatch) => {
    try {
      await deleteProductById(id)
      dispatch(setDeleteProduct(id))
    } catch (error) {
      console.log(error)
    }
  }
}
export const startGetAllCategories = (): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await getCategories()
      dispatch(setAllCategories(response))
    } catch (error) {
      console.log(error)
    }
  }
}
export const startGetProductById = (id: number): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await getProductsById(id)
      console.log(response)
      dispatch(setProductById(response))
    } catch (error) {
      console.log(error)
    }
  }
}
