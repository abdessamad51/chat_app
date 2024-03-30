import axiosConfig from '../../axios/axiosConfig'
import { messagesConversation,addMessage } from "../reducers/messageSlice"


export const  showMessagesConversation =  async (id,dispatch,user=null) => {
  const res = await axiosConfig.get("conversations/"+id,{
    headers : {
     Authorization: `Bearer ${user.token}`
    }
  })
  dispatch(messagesConversation(res.data))
}

export const sendMessage = async (conversation_id,message,dispatch,user=null) => {
  if(message == '') alert('please type message')
  const res = await axiosConfig.post(
    "messages",
    {
      message,
      conversation_id,
    },
    {
      headers : {
       Authorization: `Bearer ${user.token}`
      }
    }
  );
  res['data']['message_user_connect'] =  true;
  dispatch(addMessage(res.data))    
};