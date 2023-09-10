import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  user: ''
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = ''
    }
  }
})
export const { resetUser, setUser } = userSlice.actions
export default userSlice.reducer
