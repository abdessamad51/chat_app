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
      }
    }
  });
  export const {rechercheFriends,friendsData } = friendSlice.actions;
  export default friendSlice.reducer

