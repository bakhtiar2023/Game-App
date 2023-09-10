import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const loginUser = createAsyncThunk(
  'users/login',
  async (credentials, thunkAPI) => {
    // hit API
    return await axios
      .post('https://backend-team-1-five.vercel.app/login', credentials)
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.accessToken
          localStorage.setItem('accessToken', token)
          return token
        }
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue(err.response.data.message)
      })
  }
)
export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: {},
    errMsg: ''
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {})
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = {}
      state.errMsg = action.payload
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.error = ''
    })
  }
})
export const { setLogin, loginSuccess, loginFailure } = loginSlice.actions
export default loginSlice.reducer
