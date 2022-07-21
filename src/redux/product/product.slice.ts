import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSearchProduts } from '../../helpers'

import { getProducts } from '../../services/Products'
import { ProductItem } from '../../types'

interface ProductsState {
  products: ProductItem[]
  product: ProductItem
  status: 'pending' | 'success' | 'rejected' | null
  categories: string[]
  currentProduct: ProductItem
  isEditProduct: boolean
}

const initialState = {
  products: [],
  currentProduct: {} as ProductItem,
  status: null,
  categories: [],
  product: {} as ProductItem,
  isEditProduct: false
} as ProductsState

export const productsFetch = createAsyncThunk<ProductItem[]>(
  'products/producstFetch',
  async () => {
    try {
      const response = await getProducts()

      return response
    } catch (error) {
      throw error
    }
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilterProductsByCategory: (state, action) => {
      console.log(action.payload)
      state.products = action.payload
    },
    setDeleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      )
    },
    setAllCategories: (state, action) => {
      state.categories = action.payload
    },
    setProductById: (state, action) => {
      state.product = action.payload
    },
    setSearchProducts: (state, action) => {
      state.products = getSearchProduts(state.products, action.payload)
    },
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload
    },
    setIsEditProduct(state, action) {
      state.isEditProduct = action.payload
    },

    setEditProduct: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload
        }
        return product
      })
    },
    setNewProduct: (state, action) => {
      state.products.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = 'success'
        state.products = action.payload
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = 'rejected'
      })
  }
})
export const {
  setFilterProductsByCategory,
  setDeleteProduct,
  setAllCategories,
  setProductById,
  setSearchProducts,
  setProducts,
  setCurrentProduct,
  setIsEditProduct,
  setEditProduct,
  setNewProduct
} = productSlice.actions
