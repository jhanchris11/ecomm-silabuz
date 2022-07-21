import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getProducts } from '../../services/Products'
import { ProductItem } from '../../types'

interface ProductsState {
  products: ProductItem[]
  product: ProductItem
  status: 'pending' | 'success' | 'rejected' | null
  categories: string[]
}

const initialState = {
  products: [],
  status: null,
  categories: [],
  product: {} as ProductItem
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
      console.log(action)
      state.product = action.payload
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
  setProductById
} = productSlice.actions
