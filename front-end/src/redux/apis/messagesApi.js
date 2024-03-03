import axiosConfig from '../../axios/axiosConfig'
import { messagesConversation,addMessage } from "../reducers/messageSlice"


export const  showMessagesConversation =  async (id,dispatch) => {
  const res = await axiosConfig.get("conversations/"+id)
  dispatch(messagesConversation(res.data))
}

export const sendMessage = async (conversation_id,message,dispatch) => {
  if(message == '') alert('please type message')
  const res = await axiosConfig.post(
    "messages",
    {
      message,
      conversation_id,
    }
  );
  res['data']['message_user_connect'] =  true;
  dispatch(addMessage(res.data))    
};