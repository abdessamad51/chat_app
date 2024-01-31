import React, { useEffect, useState,useRef } from "react";
import useAuthContext from "../../contexts/AuthContext";
import useConversationContext from "../../contexts/ConversationContext";

import CardListFriend from "./CardListFriend";
import CardListFriendChat from "./CardListFriendChat";
import AsideRecherche from "./AsideRecherche";
import AsideHeader from "./AsideHeader";
import waitUser from "../../assets/images/waitUser.svg";
import addUser from "../../assets/images/addUser.svg";


const Aside = ({content}) => {
    const {user,notify} = useAuthContext();
    const {setConversationData,GetConversation,FriendsData,getUsers,sendInvitation,getChats} = useConversationContext();
    const [conversations, setConversations] = useState(null);
    const [RechercheUser, setRechercheUser] = useState(null);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result =
            content == "chats"
              ? await GetConversation(user)
              : await FriendsData(user);
          setConversations(result);
        } catch (error) {
          console.log(error.message)
          alert(`Error fetching data: ${error.message}`);
        }
      };
      fetchData();
     
    
       
    }, []);
    
    const handleClick = (e,conversation_id,conversation_name) => {
      
      e.preventDefault();
      setConversationData({
        conversation_id,
        conversation_name
      })
    }

    const rechercheUser = async (e) => {
      if(e.target.value == '') {
        const data = await FriendsData(user)
        setConversations(data)
      } else {
        const data = await getUsers(user,e.target.value)
        setRechercheUser(e.target.value)
        setConversations(data)
      }
    }

    const rechercheChats = async (e) => {
      if(e.target.value == '') {
        const data = await GetConversation(user)
        setConversations(data)
      } else {
        const data = await getChats(user,e.target.value)
        // setRechercheUser(e.target.value)
        setConversations(data)
      }
    }

    const handleSendingInvitation = async (e,receiver_id,full_name) => {
      e.preventDefault();
      const data = await sendInvitation(user,receiver_id)
      if(data) {
        alert('your request friend sent')
        const data = await getUsers(user,RechercheUser)
        setConversations(data) 
      }
    }
 
    return (
        <div className="sidebar bg-light" id="sidebar" >
            <div className="fade h-100 tab-pane show active">
                <div className="d-flex flex-column h-100 position-relative">
                    <div className="hide-scrollbar">
                        <div className="container py-8">
                           <AsideHeader content={content} />
                        
                           {
                            content !== 'friends' 
                            ?
                            <>
                             <AsideRecherche  recherche={rechercheChats} />
                             <CardListFriendChat friendsChat={conversations} handleClick = {handleClick}  />
                            </>
                            :
                            <>
                             <AsideRecherche recherche={rechercheUser} />
                             <CardListFriend friends={conversations} handleClick = {handleClick} handleSendingInvitation={handleSendingInvitation}  /> 

                            </>
                           }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aside;