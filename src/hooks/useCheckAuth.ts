import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { FirebaseAuth } from '../firebase/config'
import { InfoUserGoogle } from '../firebase/types'
import { login, logout } from '../redux/auth/auth.slice'
import { useAppDispatch, useAppSelector } from './redux'

export const useCheckAuth = (): string => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.auth)
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      console.log(user)
      if (!user) return dispatch(logout({ errorMessage: '' }))

      const { uid, email, displayName, photoURL } = user
      dispatch(login({ uid, email, displayName, photoURL } as InfoUserGoogle))
      // dispatch( startLoadingNotes() );
    })
  }, [])
  return status
}
