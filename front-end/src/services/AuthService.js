import axios from "axios";
import {  createContext,useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext({})
export const AuthService = ({children}) => {
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    if (!email) {
      notify("The email is required");
    }
    if (!password) {
      notify("The password is required");
    }
    if (email && password) {
      axios
        .post("http://localhost:8000/api/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          alert('ss')
          const auth = {
            id:res.data.data.user.id,
            token: res.data.data.token,
            full_name: res.data.data.user.full_name,
          };
          console.log(auth);
          if (auth) {
            localStorage.setItem("auth", JSON.stringify(auth));
            notify("You are logged in");
            navigate('/')
          }
        })
        .catch((error) => {
          notify(error.response.data.data);
          
        });
    }
  };

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
  return  <AuthContext.Provider value={{ login }}>
             {children}
  </AuthContext.Provider>
};

export default function useAuthContext() {
  
}


