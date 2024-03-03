import React from "react";
import Home from "./Home/Home";
import { FaArrowRightLong } from "react-icons/fa6";
import Conversation from "./Conversation/Conversation";
import { useSelector } from "react-redux";

const Main = () => { 
   const conversationIn = useSelector(state => state.chat.conversationIn)
   return (
    <main className="main" id="main"> 
      {conversationIn.conversation_id ? <Conversation /> : <Home/> }
    </main>
   );

}

export default Main;