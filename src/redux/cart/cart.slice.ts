import { createSlice } from '@reduxjs/toolkit'
import { ProductItem } from '../../types'

interface ProductCartState {
  cartItems: ProductItem[]
  cartTotalQuantity: number
  cartTotalAmount: number
}
const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')!)
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
} as ProductCartState

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )

      if (existingIndex >= 0) {
        console.log('uno')

        state.cartItems[existingIndex].quantity += 1
        console.log(state.cartItems)
      } else {
        let tempProductItem = { ...action.payload, quantity: 1 }
        state.cartItems.push(tempProductItem)
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeFromCart: (state, action) => {
      const cartItemsFiltered = state.cartItems.filter(
        (cartItem) => cartItem !== action.payload
      )
      state.cartItems = cartItemsFiltered
    },
    clearCart: (state, action) => {
      state.cartItems = []
    },
    totalCartSum: (state, action) => {}
  }
})
export const { addToCart, removeFromCart, clearCart, totalCartSum } =
  cartSlice.actions
