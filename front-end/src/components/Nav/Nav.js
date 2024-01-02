import React from "react";
import imageFile from "../../assets/images/whatsapp.png";
import NavItems from "./NavItems";
import {NavLink } from "react-router-dom";
const Nav = () => {

  return (
      <nav className="navigation d-flex flex-column text-center navbar navbar-light hide-scrollbar">
        <NavLink
          href="index.html"
          title="Messenger"
          className="d-none d-xl-block mb-6"
        >
          <img src={imageFile} alt="Logo" className="mb-1" />
        </NavLink>

        <NavItems />
      </nav>
  );
};

export default Nav;
