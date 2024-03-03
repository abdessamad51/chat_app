import { createSlice } from '@reduxjs/toolkit';
import authState from '../authState';


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: authState(),
  },
  reducers: {
    login : (state,action) => {
      state.user = action.payload;
    },
  }
});

export const { login } = authSlice.actions;
export default authSlice.reducer;

