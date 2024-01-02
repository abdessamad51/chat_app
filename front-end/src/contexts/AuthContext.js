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