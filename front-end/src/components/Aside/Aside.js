import React, { useEffect, useState } from "react";
import useAuthContext from "../../contexts/AuthContext";
import useConversationContext from "../../contexts/ConversationContext";
import profile from "../../assets/images/7.png";
import { Link } from "react-router-dom";

const Aside = ({content}) => {
    const {user} = useAuthContext();
    const {setConversationData,GetConversation,FriendsData} = useConversationContext();
    const [conversations, setConversations] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result =
            content == "chats"
              ? await GetConversation(user)
              : await FriendsData(user);
          setConversations(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, [GetConversation]);

    const handleClick = (e,conversation_id,conversation_name) => {
        e.preventDefault();
        setConversationData({
            conversation_id,
            conversation_name
        })
    }
    return (
        <div className="sidebar bg-light" id="sidebar" >
            <div className="fade h-100 tab-pane show active">
                <div className="d-flex flex-column h-100 position-relative">
                    <div className="hide-scrollbar">
                        <div className="container py-8">
                            <div className="mb-8">  
                                <h2 className="fw-bold m-0">{content}</h2>
                            </div>
                            <div className="mb-6">
                                <form action="#">
                                    <div className="input-group">
                                        <div className="input-group-text">
                                            <div className="icon icon-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                            </div>
                                        </div>

                                        <input type="text" className="form-control form-control-lg ps-0" placeholder="Search messages or users" aria-label="Search for messages or users..." />
                                    </div>
                                </form>
                            </div>
                           {
                            content !== 'friends' 
                            ?
                            <div className="card-list chat">
                            {  conversations && conversations.map((conversation) => (
                                <Link onClick={(e) => handleClick(e,conversation.conversation_id,conversation['participant'].full_name) } className="card border-0 text-reset" key={conversation.conversation_id}>
                                    <div className="card-body" >
                                        <div className="row gx-5">
                                            <div className="col-auto">
                                                <div className="avatar avatar-online">
                                                    <img src={profile} alt="#" className="avatar-img"/>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <div className="d-flex align-items-center mb-3">
                                                    <h5 className="me-auto mb-0">{conversation['participant'].full_name}</h5>
                                                    <span className="text-muted extra-small ms-2">{conversation.created_at}</span>
                                                </div>

                                                <div className="d-flex align-items-center">
                                                    <div className="line-clamp me-auto">
                                                        Hello! Yeah, I'm going to meet my friend of mine at the departments stores now.
                                                    </div>

                                                    <div className="badge badge-circle bg-primary ms-5">
                                                        <span>3</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                ))
                            }
                            </div> 
                            :
                            <div className="card-list friends">
                            {  conversations && conversations.map((friend) => (
                                <Link href="#" onClick={(e) => handleClick(e,friend.conversation_id,friend['participant'].full_name) } key={friend.id} className="card border-0 text-reset" key={friend.conversation_id}>
                                    <div className="card-body">
                                        <div className="row gx-5">
                                            <div className="col-auto">
                                                <div className="avatar avatar-online">
                                                    <img src={profile} alt="#" className="avatar-img"/>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <div className="d-flex align-items-center mb-1">
                                                    <h5 className="me-auto mb-0">{friend['participant'].full_name}</h5>
                                                    {/* <span className="text-muted extra-small ms-2">12:245 PM</span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                ))
                            }
                            </div> 
                           }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aside;