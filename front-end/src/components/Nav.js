import React from "react";
import imageFile from "../assets/images/whatsapp.png";
import {NavLink } from "react-router-dom";

const Nav = () => {
  // const showFriends = () => {
  //     ReactDOM.render(<Friends  content='friends'/>,document.getElementById("sidebar"));
  //     ReactDOM.render(<Main />,document.getElementById("main"));
  // }
  // const showChats = () => {
  //     ReactDOM.render(<Chats content='chats' />,document.getElementById("sidebar"));
  //     ReactDOM.render(<Main />,document.getElementById("main"));
  // }
  return (
      <nav className="navigation d-flex flex-column text-center navbar navbar-light hide-scrollbar">
        <NavLink
          href="index.html"
          title="Messenger"
          className="d-none d-xl-block mb-6"
        >
          <img src={imageFile} alt="Logo" className="mb-1" />
        </NavLink>

        <ul
          className="d-flex nav navbar-nav flex-row flex-xl-column flex-grow-1 justify-content-between justify-content-xl-center align-items-center w-100 py-4 py-lg-2 px-lg-3"
          role="tablist"
        >
          <li className="nav-item">
            <NavLink
              className="nav-link py-0 py-lg-8"
              to="/friends"
            >
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
              className="nav-link active py-0 py-lg-8"
              // id="tab-chats"
              // href="#tab-content-chats"
              title="Chats"
              // data-bs-toggle="tab"
              // role="tab"
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
          <li className="nav-item">
            <NavLink
              className="nav-link py-0 py-lg-8"
              id="tab-notifications"
              href="#tab-content-notifications"
              title="Notifications"
              data-bs-toggle="tab"
              role="tab"
            >
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
          <li className="nav-item d-none d-xl-block">
            <NavLink
              className="nav-link py-0 py-lg-8"
              id="tab-settings"
              href="#tab-content-settings"
              title="Settings"
              data-bs-toggle="tab"
              role="tab"
            >
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
                  className="feather feather-settings"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
  );
};

export default Nav;
