import React, { useEffect, useState } from "react";
import useAuthContext from "../../contexts/AuthContext";
import useConversationContext from "../../contexts/ConversationContext";
import profile from "../../assets/images/7.png";
import AsideHeader from "../Aside/AsideHeader";
import { Link } from "react-router-dom";
// import useConversationContext from "../../contexts/ConversationContext";


const NotificationBody = () => {
    const {user} = useAuthContext();
    const [notifactionsData,setnotifactionsData] = useState(null);
    const {notifaction,acceptInvitation} = useConversationContext();   

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await notifaction(user);
            setnotifactionsData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    }, []);

    const handleAccepteInvitation = async (e,receiver_id,notification_id) => {
      e.preventDefault();
      const result = await acceptInvitation(user,notification_id);
      console.log(result);
    }
 
    return (
      <div className="sidebar bg-light" id="sidebar">
        <div className="fade h-100 tab-pane show active">
          <div className="d-flex flex-column h-100 position-relative">
            <div className="hide-scrollbar">
              <div className="container py-8">
                <AsideHeader content="notifications" />
                { notifactionsData && notifactionsData.map((notification) => (
                    <div className="card-list mb-3">
                            <div  className="card border-0 text-reset" >
                                <div className="card-body">
                                    <div className="row gx-5 d-flex align-items-center">
                                        <div className="col-2">
                                        <div className="avatar">
                                            <img src={profile} alt="#" className="avatar-img" />
                                        </div>
                                        </div>

                                        <div className="col-10">
                                          {  notification['data']['type_notification'] == 'invitation' ?
                                            <div className="d-flex align-items-center mb-3">
                                                <h5 className="me-auto mb-0">
                                                {notification['data']['sender_fullName']}
                                                </h5>
                                            </div>
                                            :
                                            <div className="d-flex flex-row align-items-center">
                                              <div className="mb-0" style={{marginRight:"40px"}}>
                                              <span  style={{color:"black",fontWeight:"bold"}}> {notification['data']['sender_fullName']}</span> {notification['data']['message']}
                                              </div>
                                  
                                            </div>
                                         }

                                        </div>
                                        { notification['data']['type_notification'] == 'invitation' ?
                                          
                                          <div className="col-10" style={{marginTop:"-12px"}}>
                                            <button className="btn btn-primary  btn-sm" style={{marginRight:"3px"}} onClick={(e) => handleAccepteInvitation(e,notification['data']['sender_id'],notification.id)}>Confirm</button>
                                            <button className="btn btn-primary btn-sm">Delete</button>
                                          </div>
                                          : 
                                         ''
                                        }
                                    </div>
                                </div>
                            </div>
                    </div> 
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default NotificationBody;