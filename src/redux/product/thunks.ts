import { getCategories, getProductsByCategory } from '../../services/Categories'
import {
  deleteProductById,
  editProduct,
  getProducts,
  getProductsById
} from '../../services/Products'
import { ProductItem } from '../../types'
import { AppThunk } from '../store'
import {
  setFilterProductsByCategory,
  setDeleteProduct,
  setAllCategories,
  setProductById,
  setSearchProducts,
  setProducts,
  setEditProduct,
  setNewProduct
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

      dispatch(setProductById(response))
    } catch (error) {
      console.log(error)
    }
  }
}

export const starSearchProductByTitle = (title: string): AppThunk => {
  return async (dispatch) => {
    try {
      if (title === '') {
        const response = await getProducts()

        dispatch(setProducts(response))
      } else {
        dispatch(setSearchProducts(title))
      }
    } catch (error) {
      console.log(error)
    }
  }
}
export const startEditProduct = (
  id: number,
  product: ProductItem
): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await editProduct(id, product)
      dispatch(setEditProduct(response))
    } catch (error) {
      console.log(error)
    }
  }
}
export const startNewProduct = (product: ProductItem): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setNewProduct(product))
    } catch (error) {
      console.log(error)
    }
  }
}
