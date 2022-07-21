import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { FirebaseAuth } from './config'
import { FirebaseError } from '@firebase/util'
import { ItemsLoginUser, ItemsRegisterUser } from './types'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider)
    const { displayName, email, photoURL, uid } = result.user

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return {
        ok: false,
        errorMessage: error.message
      }
    }
  }
}
export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName
}: ItemsRegisterUser) => {
  try {
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    )

    const { uid, photoURL } = result.user
    if (FirebaseAuth.currentUser) {
      await updateProfile(FirebaseAuth.currentUser, { displayName })
    }

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return {
        ok: false,
        errorMessage: error.message
      }
    }
  }
}
export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}

export const loginWithEmailPassword = async ({
  email,
  password
}: ItemsLoginUser) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL, displayName } = resp.user

    return {
      ok: true,
      uid,
      photoURL,
      displayName
    }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return {
        ok: false,
        errorMessage: error.message
      }
    }
  }
}
