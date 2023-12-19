import React from "react";
//  import  "./Login.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
// import  useAuthContext  from "../services/AuthService";
const SingUp = () => {
    // const {login} = useAuthContext();

    const notify = (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };
    const navigate = useNavigate();
    const handleSingUp = (e) => {
      e.preventDefault();
      const full_name = e.target.elements.full_name.value;
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      const password_confirmation = e.target.elements.password_confirmation.value;
      let information_complete = true;

   
      if (!full_name) {
        information_complete = false;
        notify("The full name is required");
      }
      if (!email) {
        information_complete = false;
        notify("The email is required");
      }
      if (!password) {
        information_complete = false;
        notify("The password is required");
      }
      if (!password_confirmation) {
        information_complete = false;
        notify("The password confirmation is required");
      }

      if(password !== password_confirmation) {
        information_complete = false;
        notify("The password confirmation need like passoword");
      }
      if (information_complete) {
        axios
          .post("http://localhost:8000/api/register", {
            full_name:full_name,
            email: email,
            password: password,
          })
          .then((res) => {
              const token = res.data.data.token ?? null;
              const full_name =  res.data.data.user.full_name ?? null;
          
              localStorage.setItem("token", JSON.stringify(token));
              localStorage.setItem("full_name", JSON.stringify(full_name));
              notify("You are logged in");
              navigate('/home')
          })
          .catch((error) => {
            notify(error.response.data.data);
          });
      }
    }


    return (
      <div>
        <div className="wrapper">
        <form className="form-signin" onSubmit={(e) => handleSingUp(e)}>       
          <h2 className="form-signin-heading">Please Sing Up</h2>
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
export default SingUp;
    