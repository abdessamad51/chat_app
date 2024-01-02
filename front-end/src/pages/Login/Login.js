import React from "react";
//  import  "./Login.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";
import {useNavigate } from "react-router-dom";
// import  useAuthContext  from "../services/AuthService";
const Login =  () => {
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
        console.log('login success',loginSuccess) 
        navigate('/')
      }
      
    }


    return (
      <div className="body">
        <div className="wrapper">
          <form className="form-signin" onSubmit={(e) => handleLogin(e)}>       
            <h2 className="form-signin-heading">Please login</h2>
            <input type="text" className="form-control in" name="email" placeholder="Email" required="" autofocus="" />
            <input type="password" className="form-control in" name="password" placeholder="Password" required=""/>      
            <NavLink className="sing-in" to="/singUp">Do you have account ?</NavLink> 
            <button className="btn btn-primary btn-block submit" type="submit">Login</button>  
          </form>
      </div>
       <ToastContainer />
      </div>
    );
};
export default Login;
    