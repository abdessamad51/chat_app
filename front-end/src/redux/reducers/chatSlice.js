import { createSlice } from '@reduxjs/toolkit';
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatsData:[],
    loadingChats :false,
    conversationIn : {
      conversation_id : null,
      conversation_name : "",
      conversation_image : null
    },
  },
  reducers: {
    getConversationClick : (state,action) => {
      state.conversationIn = action.payload;
    },
    chatsData : (state,action) => {
      state.chatsData = action.payload;
      state.loadingChats = true;
    },
    rechereche : (state,action) => {
      state.chatsData = action.payload;
    }
  }
});

export const {getConversationClick,chatsData,rechereche } = chatSlice.actions;
export default chatSlice.reducer;

