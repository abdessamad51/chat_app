import React,{useEffect,useState} from "react";
import imageFile from "../../assets/images/whatsapp.png";
import NavItems from "./NavItems";
import {NavLink } from "react-router-dom";
import Echo from "laravel-echo";
import { useDispatch,useSelector } from "react-redux";
import { auth } from "../../redux/apis/userApi.js";


const Nav = () => {

  const disptach = useDispatch();
  const user = useSelector(state => state.auth.user)
  const [notificationCount,setnotificationCount] = useState(null);
 
  useEffect(() => {
    if (user && user.token && user.user_id) {
        window.Echo = new Echo({
          broadcaster: "pusher",
          key: "e21011e5365a09fdaabf",
          cluster: "ap1",
          encrypted: true,
          // authEndpoint: 'http://localhost:8000/broadcasting/auth',
          auth: {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          },
          });
        // Subscribe to the private channel
        window.Echo.private(`App.Models.User.${user.user_id}`).notification((event) => {
          setnotificationCount(1)
        });
          // Clean up on component unmount
        return () => {
          window.Echo.leave(`App.Models.User.${user.user_id}`);
        };
    }
  }, [user]);
        

  return (
      <nav className="navigation d-flex flex-column text-center navbar navbar-light hide-scrollbar">
        <NavLink
          href="index.html"
          title="Messenger"
          className="d-none d-xl-block mb-6"
        >
          <img src={imageFile} alt="Logo" className="mb-1" />
        </NavLink>

        <NavItems notificationCount={notificationCount} user={user}/>
      </nav>
  );
};

export default Nav;
