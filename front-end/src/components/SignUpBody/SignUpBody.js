import React from "react";
import useAuthContext from "../../contexts/AuthContext.js";
import {useNavigate } from "react-router-dom";
import SignUpComponent from "./SignUpBody.jsx";
const SignUpBody =  () => {
  const {SignUp,user} = useAuthContext();
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
     e.preventDefault();
     const full_name = e.target.elements.full_name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const password_confirmation = e.target.elements.password_confirmation.value;
    const SignUpSuccess = await SignUp(full_name,email,password,password_confirmation)
    if(SignUpSuccess) 
    {
      navigate('/login')
    }
    
  }


    return (
       <SignUpComponent handleSignUp={handleSignUp} />
    );
};
export default SignUpBody;
    