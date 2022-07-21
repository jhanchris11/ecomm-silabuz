import { initializeApp } from 'firebase/app'
import { getAuth, AuthError } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyAFFrUB5ahC9wqrpyiB5DqbMpWGi8nqcpY',
  authDomain: 'ecom-silabuz.firebaseapp.com',
  projectId: 'ecom-silabuz',
  storageBucket: 'ecom-silabuz.appspot.com',
  messagingSenderId: '328922347968',
  appId: '1:328922347968:web:b8b6740571881ba8e73025'
}

export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth()
export const FirebaseDB = getFirestore(FirebaseApp)
