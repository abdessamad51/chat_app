
import axiosConfig from '../../axios/axiosConfig'
import {notificationsData } from "../reducers/notificationSlice";
import { sendInvitation } from '../reducers/friendSlice';
import { acceptInvitation1,refuseInvitation1 } from '../reducers/notificationSlice';

export const sendingInvitation = async (dispatch,receiver_id,user) => {
  const res = await axiosConfig.get(`sendInvitation/${receiver_id}`,{
    headers : {
     Authorization: `Bearer ${user.token}`
    }
  })
  if(res) {
    alert('invitation sending')
    dispatch(sendInvitation(res.data.data.receiver_id));
  } else {
    alert('error')
  }
}

export const acceptInvitation = async (dispatch,notifaction_id,user=null) => {
  const res = await axiosConfig.get(`acceptInvitation/${notifaction_id}`,{
    headers : {
     Authorization: `Bearer ${user.token}`
    }
  });
  if(res) {
    alert('you accepte invitation')
    dispatch(acceptInvitation1(res.data.data.notification_id));
  } else {
    alert('error')
  }
}

export const refuseInvitation = async (dispatch,notifaction_id,user=null) => {
  const res = await axiosConfig.get(`refuseInvitation/${notifaction_id}`,{
    headers : {
     Authorization: `Bearer ${user.token}`
    }
  });
  if(res) {
    alert('you refuse invitation')
    dispatch(refuseInvitation1(res.data.data.notification_id));
  } else {
    alert('error')
  } 
}

export const getNotificationsData = async (dispatch,user) => {
  const data = await axiosConfig.get(`notifications`,{
    headers : {
     Authorization: `Bearer ${user.token}`
    }
  });
  dispatch(notificationsData(data.data))
}