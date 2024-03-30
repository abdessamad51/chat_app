import React from "react";
import  "./LoginBody.css"


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
const LoginBody =  ({handleLogin}) => {
    return (
        <div className="body">
            <div className="wrapper">
              <form className="form-signin" onSubmit={(e) => handleLogin(e)}>       
                <h2 className="form-signin-heading">Please login</h2>
                <input type="text" className="form-control in" name="email" placeholder="Email" required="" />
                <input type="password" className="form-control in" name="password" placeholder="Password" required=""/>      
                <NavLink className="sing-in" to="/singUp">Do you have account ?</NavLink> 
                <button className="btn btn-primary btn-block submit" type="submit">Login</button>  
              </form>
          </div>
          <ToastContainer />
        </div>
    );
};
export default LoginBody;
    