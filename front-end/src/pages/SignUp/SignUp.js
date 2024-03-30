import React, { useState } from "react";
import { register } from "../../redux/apis/userApi.js";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import SingUpBody from "./SignUpBody.jsx";
const SingUp = () => {

  const navigate = useNavigate();
  const disptach = useDispatch();
  const userData = useSelector(state => state.auth.user)
  const [selectedImage, setSelectedImage] = useState('images/profils/default.png');
  
  useEffect(() => {
    if(userData.token)
    {
      navigate('/')
    }
  },[userData])
  
  
  const handleSingUp = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('full_name', e.target.elements.full_name.value);
    if(selectedImage != 'images/profils/default.png') {
      formData.append('image', selectedImage);
    }
    formData.append('email', e.target.elements.email.value);
    formData.append('phone', e.target.elements.phone.value);
    formData.append('password', e.target.elements.password.value);
    formData.append('password_confirmation', e.target.elements.password_confirmation.value);
   
    register(formData,disptach)
  }

  return (
    <SingUpBody handleSingUp = {handleSingUp} setSelectedImage={setSelectedImage}/>

  );
};
export default SingUp;
    