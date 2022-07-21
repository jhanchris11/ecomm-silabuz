import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InfoUserGoogle } from '../../firebase/types'
import { InfoUser } from './auth.types'

const initialState: InfoUser = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<InfoUserGoogle>) => {
      state.status = 'authenticated'
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoURL = payload.photoURL
      state.errorMessage = null
    },
    logout: (state, { payload }) => {
      state.status = 'unauthenticated'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = payload?.errorMessage
    },

    verifyCredentials: (state) => {
      state.status = 'checking'
    }
  }
})
export const { login, logout, verifyCredentials } = authSlice.actions
