import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { toast } from "react-toastify";
const ConversationContext = createContext({});

export const ConversationProvider = ({children}) => {

  // const [showingConversation, setShowingConversation] = useState(false);
  const [conversationData, setConversationData] = useState(null);
  
  const notify = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
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

  const getUsers = async (user,search_name) => {
    const data = await axios.get(`http://localhost:8000/api/getUsers/${search_name}`,{
      headers : {
       Authorization: `Bearer ${user.token}` // Include the token in the request headers
      }
    })

    return data.data;
  }
  
  const getChats = async (user,search_name) => {
    const data = await axios.get(`http://localhost:8000/api/getChats/${search_name}`,{
      headers : {
       Authorization: `Bearer ${user.token}` // Include the token in the request headers
      }
    })

    return data.data;
  }
  const sendInvitation = async (user,receiver_id) => {
    const data = await axios.get(`http://localhost:8000/api/sendInvitation/${receiver_id}`,
    {
      headers : {
       Authorization: `Bearer ${user.token}` // Include the token in the request headers
      }
    })

    return data.data;
  }

  const lastMessage = async (user,conversation_id) => {
    const data = await axios.get(`http://localhost:8000/api/conversations/${conversation_id}/lastMessage`,{
      headers : {
       Authorization: `Bearer ${user.token}` // Include the token in the request headers
      }
    })

    return data.data;
  }

  const notifaction = async (user) => {
    const data = await axios.get(`http://localhost:8000/api/notifications`,{
      headers : {
       Authorization: `Bearer ${user.token}` // Include the token in the request headers
      }
    })

    return data.data;
  }

  const acceptInvitation = async (user,notifaction_id) => {
    // return notifaction_id;
    notify("accepte your friend request")
    const res = await axios.get(
      `http://localhost:8000/api/acceptInvitation/${notifaction_id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}` // Include the token in the request headers
        },
      }
    );
    console.log(res)

    return res;  
    // return data.data;
  }
  return (
    <ConversationContext.Provider value={{showConversation,conversationData, setConversationData,sendMessage,GetConversation,FriendsData,connectToPusher,getUsers,sendInvitation,lastMessage,notifaction,acceptInvitation,getChats}}>
      {children}
    </ConversationContext.Provider>
  );
}

export default function useConversationContext() {
    return useContext(ConversationContext);
}