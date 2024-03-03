import axiosConfig from '../../axios/axiosConfig'
import {notificationsData } from "../reducers/notificationSlice";

export const sendInvitation = async (receiver_id) => {
  const data = await axiosConfig.get(`sendInvitation/${receiver_id}`)
  return data.data;
}

export const acceptInvitation = async (notifaction_id) => {
  const res = await axiosConfig.get(`acceptInvitation/${notifaction_id}`);
  return res; 
}

export const refuseInvitation = async (notifaction_id) => {
  const res = await axiosConfig.get(`refuseInvitation/${notifaction_id}`
  );
  return res;  
}

export const getNotificationsData = async (dispatch) => {
  const data = await axiosConfig.get(`notifications`);
  dispatch(notificationsData(data.data))
}