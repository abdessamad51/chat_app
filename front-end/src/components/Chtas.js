import React from "react";
import Master from "./Master";
import {GetConversation,ShowConversation} from "../services/ConversationService";


const Chats = () => {
    const content = 'chats';
    return (
        <Master AsideData ={{ GetConversation, ShowConversation,content}}/>    
    );
};

export default Chats;