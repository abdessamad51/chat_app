import React from "react";
 import  "../../pages/Login/LoginBody.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SingUpBody =  ({handleSingUp}) => {
    return (
      <div>
      <div className="wrapper">
      <form className="form-signin" onSubmit={(e) => handleSingUp(e)}>       
        <h2 className="form-signin-heading">Please Sign Up</h2>
        <input type="text" className="form-control in" name="full_name" placeholder="Full name" required="" autofocus="" />
        <input type="email" className="form-control in" name="email" placeholder="Email" required=""/>    
        <input type="phone" className="form-control in" name="phone" placeholder="Phone" required=""/>      
        <input type="password" className="form-control in" name="password" placeholder="Password" required=""/>      
        <input type="password" className="form-control in" name="password_confirmation" placeholder="Password confirmation" required=""/>       
        <button className="btn btn-primary btn-block submit" type="submit">Sing Up</button>  
      </form>
    </div>
     <ToastContainer />;
    </div>
    );
};
export default SingUpBody;
    