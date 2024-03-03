import axiosConfig from '../../axios/axiosConfig'
import { getConversationClick,chatsData,rechereche } from "../reducers/chatSlice";
import { friendsData,rechercheFriends } from "../reducers/friendSlice";


export const  conversationClick =  (conversation,dispatch) => {
  dispatch(getConversationClick(conversation))
}

export const showConversation = async (id,conversation_name,user,content=null) => {
  const res = await axiosConfig.get("conversations/"+id)
  return res.data;
};

export const getFriendsData = async (dispatch) => {
  try {
    const res = await axiosConfig.get("conversations/friends")
    dispatch(friendsData(res.data));
  } catch(error) {
    console.log(error);
  }
}

export const getRechercheFriends = async (dispatch,search_name) => {
  const data = await axiosConfig.get(`getUsers/${search_name}`)
  dispatch(rechercheFriends(data.data));
}
  
export const chatsRechereche = async (search_name,dispatch) => {
  const data = await axiosConfig.get(`getChats/${search_name}`)
  dispatch(rechereche(data.data))
}
  
export const getChatsData =  async (dispatch) => {
  try {
    const data = await axiosConfig.get("conversations");
    dispatch(chatsData(data.data))
  } catch(error) {
    console.log(error);
  }
}


// const lastMessage = async (user,conversation_id) => {
//   const data = await axiosConfig.get(`conversations/${conversation_id}/lastMessage`,{
//     headers : {
//      Authorization: `Bearer ${user.token}` // Include the token in the request headers
//     }
//   })

//   return data.data;
// }

// const notifaction = async (user) => {
//   const data = await axiosConfig.get(`notifications`)
//   return data.data;
// }