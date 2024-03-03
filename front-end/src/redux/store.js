import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import chatReducer from './reducers/chatSlice';
import messsageReducer from  './reducers/messageSlice'
import notificationReducer from  './reducers/notificationSlice'
import friendReducer from './reducers/friendSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat:chatReducer,
    message:messsageReducer,
    notification:notificationReducer,
    friend:friendReducer
    // Add other slices here if needed
  },
});