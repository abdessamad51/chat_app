import React, { useEffect, useState,useRef } from "react";
import CardListFriend from "./CardListFriend";
import CardListFriendChat from "./CardListFriendChat";
import AsideRecherche from "./AsideRecherche";
import AsideHeader from "./AsideHeader";
import waitUser from "../../assets/images/waitUser.svg";
import addUser from "../../assets/images/addUser.svg";
import { useSelector,useDispatch } from "react-redux";
import { conversationClick,chatsRechereche } from "../../redux/apis/converstionApi";

import { getChatsData,getFriendsData,getRechercheFriends } from "../../redux/apis/converstionApi";
import { sendInvitation } from "../../redux/apis/notificationApi";


const Aside = ({content}) => {
    const disptach = useDispatch();
    const {chatsData,loadingChats} = useSelector((state) => state.chat)
    const {friendsData,loadingFriends} = useSelector((state) => state.friend)
    // const [recherche,setRecherche] = useState('');
   
  
    
    useEffect(() => {
      if(content !== 'friends') {
        getChatsData(disptach)
      } else {
        getFriendsData(disptach)
      }  
    }, []);
    
    const handleClick = (e,conversation_id,conversation_name) => {
      e.preventDefault();
      conversationClick({
        conversation_id,
        conversation_name
      },disptach)
    }

    const handleRechercheFriends = async (e) => {
      if(e.target.value.trim() == '') {
        getFriendsData(disptach) 
      } else {
        await getRechercheFriends(disptach,e.target.value)
      }
    }

    const handlerechercheChats = async (e) => {
      await chatsRechereche(e.target.value,disptach);
    }

    const handleSendingInvitation = async (e,receiver_id,full_name) => {
      e.preventDefault();
      const data = await sendInvitation(receiver_id)
      if(data) {
        alert('your request friend sent')
        // need to edit
        await getRechercheFriends(disptach,full_name)
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
                             <AsideRecherche  recherche={handlerechercheChats} />
                             <CardListFriendChat friendsChat={chatsData} loading = {loadingChats} handleClick = {handleClick}  />
                            </>
                            :
                            <>
                             <AsideRecherche recherche={handleRechercheFriends} />
                             <CardListFriend friends={friendsData} handleClick = {handleClick} handleSendingInvitation={handleSendingInvitation} loading = {loadingFriends}  /> 

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