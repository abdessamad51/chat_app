import React from "react";
import Master from "../../components/Master.js";
import { ConversationProvider } from '../../contexts/ConversationContext.js';
import Aside from '../../components/Aside/Aside.js';
import Main from '../../components/Main/Main.js';


const Chats = () => {
    return (
        <div className="App layout overflow-hidden">
         <Master />
         <ConversationProvider>
          <Aside  content = 'chats'/>      {/* persan has conversation with him */}
            <Main />    {/* conversation */}
         </ConversationProvider>  
       </div> 
    );
};

export default Chats;