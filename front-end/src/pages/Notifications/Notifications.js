import React from "react";
import NotificationBody from "../../components/NotificationBody/NotificationBody";
import Master from "../../components/Master";
import { ConversationProvider } from '../../contexts/ConversationContext.js';
import Nav from "../../components/Nav/Nav.js";
const Notifications =  () => {
    return (
        <div className="App layout overflow-hidden">
        <Nav />  
           <ConversationProvider>
              <NotificationBody />
           </ConversationProvider>
        </div>
      
    );
};
export default Notifications;
    