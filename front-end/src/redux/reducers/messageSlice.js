import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messagesData: [],
  },
  reducers: {
    messagesConversation : (state,action) => {
      state.messagesData = action.payload;
    },
    addMessage : (state,action) => {
      state.messagesData = [...state.messagesData, action.payload];
    },
  }
});

export const { messagesConversation,addMessage } = messageSlice.actions;
export default messageSlice.reducer;

