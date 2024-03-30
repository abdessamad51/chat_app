import React from "react";
 import  "../../pages/Login/LoginBody.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SingUpBody =  ({handleSingUp,setSelectedImage}) => {
    return (
      <div>
      <div className="wrapper">
      <form className="form-signin" onSubmit={(e) => handleSingUp(e)}>       
        <h2 className="form-signin-heading">Please Sign Up</h2>
        <input type="text" className="form-control in" name="full_name" placeholder="Full name" required  />
        <input type="email" className="form-control in" name="email" placeholder="Email" required/>    
        <input type="phone" className="form-control in" name="phone" placeholder="Phone" required/>      
        <input type="file" className="form-control in"  placeholder="Image"  onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }} />      
        <input type="password" className="form-control in" name="password" placeholder="Password" required/>      
        <input type="password" className="form-control in" name="password_confirmation" placeholder="Password confirmation" required/>       
        <button className="btn btn-primary btn-block submit" type="submit">Sign Up</button>  
      </form>
    </div>
     <ToastContainer />;
    </div>
    );
};
export default SingUpBody;
    