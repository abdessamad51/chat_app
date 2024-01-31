import React from "react";
import useAuthContext from "../../contexts/AuthContext";
import {useNavigate } from "react-router-dom";
import Login from "./LoginBody.jsx";
const LoginBody =  () => {
    const {login,user} = useAuthContext();
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      const loginSuccess = await login(email,password)
      // login(email,password);
      if(loginSuccess) 
      {
        navigate('/')
      }
      
    }


    return (
        <Login handleLogin={handleLogin} />
    );
};
export default LoginBody;
    