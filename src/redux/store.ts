import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { authSlice } from './auth/auth.slice'
import { cartSlice } from './cart/cart.slice'
import { productSlice, productsFetch } from './product/product.slice'
import { startGetAllCategories } from './product/thunks'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productSlice.reducer,
    cart: cartSlice.reducer
  }
})
store.dispatch(productsFetch())
store.dispatch(startGetAllCategories())

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
