import React from "react";
import Accuiel from "../Accueil/Accueil";
import { FaArrowRightLong } from "react-icons/fa6";
import Conversation from "../Conversation/Conversation";
import useConversationContext from "../../contexts/ConversationContext";

const Main = () => { 
  const {conversationData} = useConversationContext();
   return (
    <main className="main" id="main"> 
      { conversationData ? <Conversation /> : <Accuiel/> }
    </main>
   );

}

export default Main;