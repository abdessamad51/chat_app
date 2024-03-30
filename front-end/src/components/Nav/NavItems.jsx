
import React from "react";
import {NavLink } from "react-router-dom";

const NavItems = ({notificationCount,user,logOut}) => {
  return (
    <ul
      className="d-flex nav navbar-nav flex-row flex-xl-column flex-grow-1 justify-content-between justify-content-xl-center align-items-center w-100 py-4 py-lg-2 px-lg-3"
      role="tablist"
    >
      <li className="nav-item">
        <NavLink className="nav-link py-0 py-lg-8" title="Friends" to="/friends">
          <div className="icon icon-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-users"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className="nav-link   py-0 py-lg-8"
          title="Chats"
          to="/"
        >
          <div className="icon icon-xl icon-badged">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-message-square"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <div className="badge badge-circle bg-primary">
              <span>4</span>
            </div>
          </div>
        </NavLink>
      </li>
      { notificationCount ?
      <li className="nav-item">
        <NavLink
          className="nav-link   py-0 py-lg-8"
          title="Notifications" to="/notifications"
        >
          <div className="icon icon-xl icon-badged">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-bell"
            >
             <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          
            <div className="badge badge-circle bg-primary">
              <span>{notificationCount}</span>
            </div>
          </div>
        </NavLink>
      </li>
      :
       <li className="nav-item">
        <NavLink className="nav-link py-0 py-lg-8" title="Notifications" to="/notifications">
        <div className="icon icon-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-bell"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
        </NavLink>
      </li>  
        }
      <li className="nav-item">
        
      <div class="btn-group dropright">
        <NavLink className="nav-link py-0 py-lg-8 dropdown-toggle" data-bs-toggle="dropdown" title={user.full_name} aria-haspopup="true" aria-expanded="false">
          <img src={"http://localhost:8000/storage/" + user.image_path} alt="Logo" className="mb-1 rounded-circle" width="30" height="30" />
        </NavLink>
        <div className="dropdown-menu" style={{position:"absolute",left:"40px",top:"42px"}}>
          <a className="dropdown-item" href="#">Profil</a>
          <a className="dropdown-item" href="#" onClick={logOut}>Log out</a>
        </div>
      </div>
       
      </li>
   
    </ul>
  );
};

export default NavItems;