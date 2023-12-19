import React from "react";
import Master from "./Master";
import {ShowConversation,FriendsData} from "../services/ConversationService";

const Friends = () => {
    const content = 'friends';
    const GetConversation = FriendsData;
    // console.log(GetConversation)
    return (
        <Master AsideData ={{ GetConversation, ShowConversation,content}}/>    
    );
};

export default Friends;