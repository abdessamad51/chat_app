import React, { useEffect, useRef, useState } from "react";

import useConversationContext from "../../contexts/ConversationContext.js";
import useAuthContext from '../../contexts/AuthContext.js';
import ConversationHeader from "./ConversationHeader.jsx";
import ConversationBody from "./ConversationBody.jsx";
import ConversationFooter from "./ConversationFooter.jsx";
const Content = () => {

  const {showConversation,conversationData,sendMessage,connectToPusher} = useConversationContext();
  const {user} = useAuthContext();
  const [messagesConversation, setMessagesConversation] = useState(null);
  const {conversation_id,conversation_name} = conversationData;
  const [replay, setReplay] = useState('');
  const containeur = useRef()
  useEffect(() => {
    containeur.current.scrollTop = containeur.current.scrollHeight;
  },[conversationData,messagesConversation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await showConversation(conversation_id,conversation_name,user);
        setMessagesConversation(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [conversationData]);

  useEffect(() => {

    const Echo =  connectToPusher(user);
    // Subscribe to the private channel
    Echo.private(`chat.${user.user_id}`).listen(".message", (event) => {
      event.message_user_connect = false;
      setMessagesConversation((messagesConversation) => [...messagesConversation,event]);
    });
    // Clean up on component unmount
    return () => {
      Echo.leave(`chat.${user.user_id}`);
    };
  },[]);

  const getTime = (date) => {
    let dateTime = new Date(date);
    return dateTime.getHours() + ":" + dateTime.getMinutes();
  };

  const handleChange = (event) => {
    setReplay(event.target.value)
  }

  const handleSendMessages = async (e) => {
    e.preventDefault();
    const data = await sendMessage(conversation_id,replay,user)
    setReplay('')
    setMessagesConversation((messagesConversation) =>[...messagesConversation,data]);
  };

  const handleKeyPress = async (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
        alert('dd');
    }
  }

  return (
    <div className="container h-100">
      <div className="d-flex flex-column h-100 position-relative">
      
        <ConversationHeader conversation_name={conversation_name} />
        <ConversationBody containeur = {containeur} messagesConversation={messagesConversation} getTime={getTime}/>
        <ConversationFooter handleSendMessages={handleSendMessages} handleChange={handleChange} replay={replay} handleKeyPress={handleKeyPress}/>
      </div>
    </div>
  );
};

export default Content;
