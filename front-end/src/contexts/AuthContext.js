import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Pusher from "pusher-js";
import Echo from "laravel-echo";


const AuthContext = createContext({});

// const connectToPusher = async (token) => {
 
//   window.Echo = new Echo({
//     broadcaster: "pusher",
//     key: "9f0e4582c5ef80603463",
//     cluster: "ap1",
//     encrypted: true,
//     // authEndpoint: 'http://localhost:8000/broadcasting/auth',
//     auth: {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   });
//   alert('ss')
//   // localStorage.setItem("Echo", JSON.stringify(Echo));
//   return true;
// }
export const AuthProvider = ({children}) => {

    const [user,setUser] = useState();
    // const user = 
    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem("user")));
    },[])

    // const navigate = useNavigate();
    const login = async (email, password) => {
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

    return (
      <AuthContext.Provider value={{login, user}}>
        {children}
      </AuthContext.Provider>
    );
}

export default function useAuthContext() {
    return useContext(AuthContext);
}