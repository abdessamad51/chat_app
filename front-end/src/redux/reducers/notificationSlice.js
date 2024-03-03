import { createSlice } from '@reduxjs/toolkit';
const notifactionSlice = createSlice({
  name: "notification",
  initialState: {
    notificationsData: [],
    loading : false
  },
  reducers: {
    notificationsData : (state,action) => {
      state.notificationsData = action.payload;
      state.loading = true;
    },
    acceptInvitation1 : (state,action) => {
      state.notificationsData = action.payload;
    },
  }
});

export const { notificationsData,acceptInvitation1 } = notifactionSlice.actions;
export default notifactionSlice.reducer;

