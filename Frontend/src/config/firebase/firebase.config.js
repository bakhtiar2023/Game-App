import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAjKDO0Uy34GGbVMhB5hP4Io0U_hCk_KXY',
  authDomain: 'team1-fsw-binar-wave31.firebaseapp.com',
  projectId: 'team1-fsw-binar-wave31',
  storageBucket: 'team1-fsw-binar-wave31.appspot.com',
  messagingSenderId: '623553841283',
  appId: '1:623553841283:web:d318afe63579bec94f33b6'
}

// eslint-disable-next-line no-unused-vars
const base = initializeApp(firebaseConfig)

export const storage = getStorage(base)
