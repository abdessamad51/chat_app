import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
;


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const [user,setUser] = useState();
    // const  valueshowingConversation = {}
    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem("user")));
    },[])

    // const navigate = useNavigate();

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

    const login = async (email, password) => {
     

      if (!email || !password) {
        notify("error");
      } else {
        try {
          const res = await axios.post("http://localhost:8000/api/login", {
            email,
            password,
          });
          const user_id = res.data.data.user.id ?? null;
          const token = res.data.data.token ?? null;
          const full_name = res.data.data.user.full_name ?? null;

          
          const user = {
            user_id,
            token,
            full_name,
          };
          notify('welcome'); 
          setUser({
            user_id: user_id,
            token: token,
            full_name: full_name,
          });
          // alert(user.token)
          // await connectToPusher(user.token);

          localStorage.setItem("user", JSON.stringify(user));
          return true;
        } catch (error) {
          notify(error.response.data.data); // Reject the promise with false on error
          return false;
        }
      }
    };
    
    const SignUp = async (full_name,email,password,password_confirmation) => {
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

      if (password !== password_confirmation) {
        information_complete = false;
        notify("The password confirmation need like passoword");
      }
      if (information_complete) {
        try {
          const res = await axios.post("http://localhost:8000/api/register", {
            full_name: full_name,
            email: email,
            password: password,
          });
          return true;
        } catch (error) {
          notify(error.response.data.message); // Reject the promise with false on error
          return false;
        }
      }
    };
    return (
      <AuthContext.Provider value={{login,SignUp, user,notify}}>
        {children}
      </AuthContext.Provider>
    );
}

export default function useAuthContext() {
    return useContext(AuthContext);
}