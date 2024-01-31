import React from "react";
import { Link } from "react-router-dom";
const CardListFriendChat = ({friendsChat,handleClick}) => {

    return (
        <div className="card-list chat">
        {  friendsChat && friendsChat.map((friend) => (
            <Link onClick={(e) => handleClick(e,friend.conversation_id,friend['participant'].full_name) } className="card border-0 text-reset" key={friend.conversation_id}>
                <div className="card-body" >
                    <div className="row gx-5">
                        <div className="col-auto">
                            <div className="avatar avatar-online">
                                <img  src={require(`../../assets/images/7.png`)} alt="#" className="avatar-img"/>
                            </div>
                        </div>

                        <div className="col">
                            <div className="d-flex align-items-center mb-3">
                                <h5 className="me-auto mb-0">{friend['participant'].full_name}</h5>
                                <span className="text-muted extra-small ms-2">{friend.created_at}</span>
                            </div>

                            <div className="d-flex align-items-center">
                                <div className="line-clamp me-auto">  
                                {friend['conversation']['last_message'].length != 0 ? friend['conversation']['last_message'][0]['message'] : '' }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            ))
        }
        </div> 
    )
}

export default CardListFriendChat;