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
import { sendingInvitation } from "../../redux/apis/notificationApi";


const Aside = ({content}) => {
    const disptach = useDispatch();
    const {chatsData,loadingChats} = useSelector((state) => state.chat)
    const {friendsData,loadingFriends} = useSelector((state) => state.friend)
    const user = useSelector(state => state.auth.user)

   
    useEffect(() => {
      if(content !== 'friends') {
        getChatsData(disptach,user)
      } else {
        getFriendsData(disptach,user)
      }  
    }, []);
    
    const handleClick = (e,conversation_id,conversation_name,conversation_image) => {
      e.preventDefault();
      conversationClick({
        conversation_id,
        conversation_name,
        conversation_image
      },disptach)
    }

    const handleRechercheFriends = async (e) => {
      if(e.target.value.trim() == '') {
        getFriendsData(disptach,user) 
      } else {
        await getRechercheFriends(disptach,e.target.value,user)
      }
    }

    const handlerechercheChats = async (e) => {
      await chatsRechereche(e.target.value,disptach,user);
    }

    const handleSendingInvitation = async (e,receiver_id,full_name) => {
      e.preventDefault();
      await sendingInvitation(disptach,receiver_id,user)
     
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