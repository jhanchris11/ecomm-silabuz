import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle
} from '../../firebase/provider'
import {
  InfoUserGoogle,
  ItemsLoginUser,
  ItemsRegisterUser
} from '../../firebase/types'
import { AppThunk } from '../store'
import { verifyCredentials, logout, login } from './auth.slice'

export const checkingAuth = (): AppThunk => {
  return async (dispatch) => {
    dispatch(verifyCredentials())
  }
}
export const startSignInByGoogle = (): AppThunk => {
  return async (dispatch) => {
    dispatch(checkingAuth())
    const result = await signInWithGoogle()

    if (!result?.ok) return dispatch(logout(result?.errorMessage))

    dispatch(login(result as InfoUserGoogle))
  }
}

export const startCreatingUserByEmailPassword = ({
  email,
  password,
  displayName
}: ItemsRegisterUser): AppThunk => {
  return async (dispatch) => {
    dispatch(checkingAuth())
    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName
    })

    if (!result?.ok) return dispatch(logout(result))
    dispatch(login(result as InfoUserGoogle))
  }
}
export const startLoginByEmailPassword = ({
  email,
  password
}: ItemsLoginUser): AppThunk => {
  return async (dispatch) => {
    dispatch(checkingAuth())
    const result = await loginWithEmailPassword({ email, password })
    if (!result?.ok) return dispatch(logout(result))
    dispatch(login(result as InfoUserGoogle))
  }
}
export const startLogout = (): AppThunk => {
  return async (dispatch) => {
    await logoutFirebase()
    dispatch(logout(null))
  }
}
