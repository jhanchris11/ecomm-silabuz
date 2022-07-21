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
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1
      } else if (state.cartItems[itemIndex].quantity === 1) {
        state.cartItems.splice(itemIndex, 1)
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        )
        state.cartItems = nextCartItems
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeFromCart: (state, action) => {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          )

          state.cartItems = nextCartItems
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        return state
      })
    },
    clearCart: (state, action) => {
      state.cartItems = []
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    totalCartSum: (state, action) => {}
  }
})
export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseCart,
  totalCartSum
} = cartSlice.actions
