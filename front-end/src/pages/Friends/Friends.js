import React from "react";
import Master from "../../components/Master.js";
import Aside from '../../components/Aside/Aside.js';
import Main from '../../components/Main/Main.js';
import { ConversationProvider } from '../../contexts/ConversationContext.js';

const Friends = () => {
    return (
        <div className="App layout overflow-hidden">
         <Master />
         <ConversationProvider>
            <Aside  content = 'friends'/>  
            <Main /> 
         </ConversationProvider>  
       </div> 
    );
};

export default Friends;