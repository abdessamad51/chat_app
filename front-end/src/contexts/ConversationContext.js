import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

const ConversationContext = createContext({});

export const ConversationProvider = ({children}) => {

  // const [showingConversation, setShowingConversation] = useState(false);
  const [conversationData, setConversationData] = useState(null);
  
  const sendMessage = async (conversation_id,message,user) => {

      const res = await axios.post(
        "http://localhost:8000/api/messages",
        {
          message,
          conversation_id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include the token in the request headers
          },
        }
      );
      const data = {
        'message' : res.data.message,
        'created_at' : res.data.created_at,
        'message_user_connect' : true,
      }
      return data;  
  };

  const showConversation = async (id,conversation_name,user,content=null) => {
      // alert('hy')
      // const {user} = useAuthContext();
    
         const res = await axios.get("http://localhost:8000/api/conversations/"+id,{
              headers : {
               Authorization: `Bearer ${user.token}` // Include the token in the request headers
              }
          })
          return res.data;
  };

  const connectToPusher = (user) => {
    return  window.Echo = new Echo({
         broadcaster: "pusher",
         key: "e21011e5365a09fdaabf",
         cluster: "ap1",
         encrypted: true,
         // authEndpoint: 'http://localhost:8000/broadcasting/auth',
         auth: {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
         },
      });
  }
  
  const GetConversation = async (user) => {
    const data = await axios.get("http://localhost:8000/api/conversations/", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data.data;
  };

  const FriendsData = async (user) => {

    const data = await axios.get("http://localhost:8000/api/conversations/friends",{
            headers : {
             Authorization: `Bearer ${user.token}` // Include the token in the request headers
            }
    })
      
    return data.data;
  }

  return (
    <ConversationContext.Provider value={{showConversation,conversationData, setConversationData,sendMessage,GetConversation,FriendsData,connectToPusher}}>
      {children}
    </ConversationContext.Provider>
  );
}

export default function useConversationContext() {
    return useContext(ConversationContext);
}