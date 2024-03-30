import { createSlice } from '@reduxjs/toolkit';

const friendSlice = createSlice({
    name: "friend",
    initialState: {
      friendsData: [],
      loadingFriends:false,
    },
    reducers: {
      friendsData : (state,action) => {
        state.friendsData = action.payload;
        state.loadingFriends = true;
      },
      rechercheFriends : (state,action) => {
        state.friendsData = action.payload;
      },
      sendInvitation : (state,action) => {
        const friendId = action.payload;
        const friendToUpdate = state.friendsData.find(friend => friend.id == friendId);
        if (friendToUpdate) {
          friendToUpdate.invitation_status = 'waiting';
        }
      },
    }
  });
  export const {rechercheFriends,friendsData,sendInvitation } = friendSlice.actions;
  export default friendSlice.reducer

