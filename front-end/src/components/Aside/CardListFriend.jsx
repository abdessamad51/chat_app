import React from "react";
import { Link } from "react-router-dom";
import profile from "../../assets/images/7.png";
import addUser from "../../assets/images/addUser.svg";
import waitUser from "../../assets/images/waitUser.svg";
import refuseUser from "../../assets/images/refuseUser.svg";
const CardListFriend = ({friends,handleClick,handleSendingInvitation,image}) => {
    return (
        <div className="card-list friends">
        {  friends && friends.map((friend) => (
            friend.is_friend ?
            <Link href="#" onClick={(e) => handleClick(e,friend.conversation_id,friend['participant'].full_name) } key={friend.id} className="card border-0 text-reset" >
                <div className="card-body">
                    <div className="row gx-5">
                        <div className="col-auto">
                            <div className="avatar avatar-online">
                                <img src={require(`../../assets/images/7.png`)} alt="#" className="avatar-img"/>
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
            :
            <Link href="#"  key={friend.id} className="card border-0 text-reset" >
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
                           
                        {friend.invitation_status === 'waiting' && (
                          <img src={waitUser} alt="#" style={{ width: "40px" }} title="Invitation request Sent" />
                        )}
                        
                        {friend.invitation_status === null && (
                            <img
                                src={addUser}
                                alt="#"
                                style={{ width: "40px" }}
                                onClick={(e) => {
                                    handleSendingInvitation(e,friend['participant'].id,friend['participant'].full_name);
                                }}
                                className="add-img"
                                title="Send Invitation"
                            />
                        )}

                        {friend.invitation_status === "refused" && (
                            <img src={refuseUser} alt="#" style={{ width: "40px" }} title="Invitation request refused" />
                        )}
                          
                          

                    </div>
                </div>
            </Link>
            ))
        }
        </div>
    )
}

export default CardListFriend;