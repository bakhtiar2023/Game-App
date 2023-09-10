import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../redux/userSlice'
import loginSlice from './loginSlice'
export const store = configureStore({
  reducer: {
    user: userSlice,
    login: loginSlice
  }
})
