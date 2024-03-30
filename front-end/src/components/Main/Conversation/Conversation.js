import React, { useEffect, useRef, useState } from "react";
// import ConversationHeader from "./ConversationHeader.jsx";
// import ConversationBody from "./ConversationBody.jsx";
// ConversationHeader
// import ConversationFooter from "./ConversationFooter.jsx";


import { useSelector,useDispatch } from "react-redux";
import { conversationClick } from "../../../redux/apis/converstionApi.js";
import { addMessage } from "../../../redux/reducers/messageSlice.js";
import { sendMessage, showMessagesConversation } from "../../../redux/apis/messagesApi.js";
import { connectToPusher } from "../../../redux/apis/pusher.js";
import ConversationHeader from "./ConversationHeader.jsx";
import ConversationBody from "./ConversationBody.jsx";
import ConversationFooter from "./ConversationFooter.jsx";

const Content = () => {

  // const {showConversation,conversationData,sendMessage,connectToPusher} = useConversationContext();
  // const {user} = useAuthContext();
  const messagesConversation = useSelector(state => state.message.messagesData);

  const conversationIn = useSelector((state) => state.chat.conversationIn);
  const {conversation_id,conversation_name,conversation_image} = conversationIn;
  const [replay, setReplay] = useState('');
  const containeur = useRef()
  const disptach = useDispatch();
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    containeur.current.scrollTop = containeur.current.scrollHeight;
  },[conversationIn,messagesConversation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await showMessagesConversation(conversation_id,disptach,user);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [conversationIn]);


  useEffect(() => {

    const Echo =  connectToPusher();
    // Subscribe to the private channel
    Echo.private(`chat.${user.user_id}`).listen(".message", (event) => {
      event.message_user_connect = false;
      disptach(addMessage(event));
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
    await sendMessage(conversation_id,replay,disptach,user)
    setReplay('')
    // setMessagesConversation((messagesConversation) =>[...messagesConversation,data]);
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
      
        <ConversationHeader conversation_name={conversation_name} conversation_image={conversation_image}/>
        <ConversationBody containeur = {containeur} messagesConversation={messagesConversation} getTime={getTime}/>
        <ConversationFooter handleSendMessages={handleSendMessages} handleChange={handleChange} replay={replay} handleKeyPress={handleKeyPress}/>
      </div>
    </div>
  );
};

export default Content;
