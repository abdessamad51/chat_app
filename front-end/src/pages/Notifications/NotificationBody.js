import React, { useEffect, useState } from "react";
import profile from "../../assets/images/7.png";
import AsideHeader from "../../components/Aside/AsideHeader";
import { useSelector,useDispatch } from "react-redux";
import { getNotificationsData,acceptInvitation,refuseInvitation } from "../../redux/apis/notificationApi";


const NotificationBody = () => {
    const disptach = useDispatch(); 

    const {notificationsData,loading} = useSelector(state => state.notification);


    useEffect(() => {
        const fetchData = async () => {
          try {
             await getNotificationsData(disptach);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
    }, []);

    const handleAccepteInvitation = async (e,notification_id) => {
      e.preventDefault();
      const result = await acceptInvitation(notification_id);
      if(result) {
        console.log(result);
        await getNotificationsData(disptach);
        alert('invitation accepted')
      }
    }
    const handleRefuseInvitation = async (e,notification_id) => {
      e.preventDefault();
      const result = await refuseInvitation(notification_id);
      if(result) {
        await getNotificationsData(disptach);
        alert('invitation refused')
      }
    }
 
    return (
      <div className="sidebar bg-light" id="sidebar">
        <div className="fade h-100 tab-pane show active">
          <div className="d-flex flex-column h-100 position-relative">
            <div className="hide-scrollbar">
              <div className="container py-8">
                <AsideHeader content="notifications" />
                { loading && notificationsData.map((notification) => (
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
                                            <button className="btn btn-primary  btn-sm" style={{marginRight:"3px"}} onClick={(e) => handleAccepteInvitation(e,notification.id)}>Confirm</button>
                                            <button className="btn btn-primary btn-sm" onClick={(e) => handleRefuseInvitation(e,notification.id)}>Delete</button>
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