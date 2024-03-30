import { getConversationClick,chatsData,rechereche } from "../reducers/chatSlice";
import { friendsData,rechercheFriends } from "../reducers/friendSlice";
import axiosConfig from "../../axios/axiosConfig";



export const  conversationClick =  (conversation,dispatch) => {
  dispatch(getConversationClick(conversation))
}

export const showConversation = async (id,conversation_name,user,content=null) => {
  const res = await axiosConfig.get("conversations/"+id,{
    headers : {
     Authorization: `Bearer ${user.token}` // Include the token in the request headers
  }})
  return res.data;
};

export const getFriendsData = async (dispatch,user) => {
  try {
    const res = await axiosConfig.get("conversations/friends",{
      headers : {
       Authorization: `Bearer ${user.token}` // Include the token in the request headers
    }})
    dispatch(friendsData(res.data));
  } catch(error) {
    console.log(error);
  }
}

export const getRechercheFriends = async (dispatch,search_name,user=null) => {
  const data = await axiosConfig.get(`getUsers/${search_name}`,{
    headers : {
     Authorization: `Bearer ${user.token}` // Include the token in the request headers
  }})
  dispatch(rechercheFriends(data.data));
}
  
export const chatsRechereche = async (search_name,dispatch,user=null) => {
  const data = await axiosConfig.get(`getChats/${search_name}`,{
    headers : {
     Authorization: `Bearer ${user.token}` // Include the token in the request headers
  }})
  dispatch(rechereche(data.data))
}
  
export const getChatsData =  async (dispatch,user) => {
  try {
    const data = await axiosConfig.get("conversations",{
      headers : {
       Authorization: `Bearer ${user.token}` // Include the token in the request headers
    }});
    dispatch(chatsData(data.data))
  } catch(error) {
    console.log(error);
  }
}


