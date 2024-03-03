import React from "react";
import { register } from "../../redux/apis/userApi.js";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import SingUpBody from "./SingUpBody.jsx";
const SingUp = () => {

  const navigate = useNavigate();
  const disptach = useDispatch();
  const userData = useSelector(state => state.auth.user)
   
  useEffect(() => {
    if(userData.token)
    {
      navigate('/')
    }
  },[userData])


  const handleSingUp = async (e) => {
    e.preventDefault();
    const user = {
      full_name : e.target.elements.full_name.value,
      email : e.target.elements.email.value,
      password : e.target.elements.password.value,
      phone : e.target.elements.phone.value,
      password_confirmation : e.target.elements.password_confirmation.value,
    }
    register(user,disptach)
  }

  return (
    <SingUpBody handleSingUp = {handleSingUp}/>

  );
};
export default SingUp;
    