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
    // acceptInvitation1 : (state,action) => {
    //   state.notificationsData = action.payload;
    // },
    acceptInvitation1 : (state,action) => {
      const notifictionId = action.payload;
      console.log(notifictionId)
      state.notificationsData = state.notificationsData.filter(notification => notification.id !== notifictionId)
    },
    refuseInvitation1 : (state,action) => {
      const notifictionId = action.payload;
      state.notificationsData = state.notificationsData.filter(notification => notification.id !== notifictionId)
    },
  }
});

export const { notificationsData,acceptInvitation1,refuseInvitation1 } = notifactionSlice.actions;
export default notifactionSlice.reducer;

