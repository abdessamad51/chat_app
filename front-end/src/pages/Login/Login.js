import React, { useEffect } from "react";
import LoginBody from "./LoginBody";
import {useNavigate } from "react-router-dom";
import { login1 } from "../../redux/apis/userApi";
import {useDispatch, useSelector} from 'react-redux'
const Login =  () => {
  const navigate = useNavigate();
  const disptach = useDispatch();
  const userData = useSelector(state => state.auth.user)

   
  useEffect(() => {
    if(userData.token)
    {
      navigate('/')
    }
  },[userData])
  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email : e.target.elements.email.value,
      password : e.target.elements.password.value
    }
    const loginSuccess = await login1(user,disptach)    
  }


    return (
      <LoginBody handleLogin={handleLogin}/>
    );
};
export default Login;
    