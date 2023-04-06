import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { setMenu, navbar } = useContext(AppContext);
  const closeMenu = () => {
    navbar.current.classList.remove("active");
    setMenu(false);
  };
  return (
    <>
      <nav ref={navbar}>
        <h1 className="mb-4 mt-2">Server Application</h1>
        <ul className="navlinks">
          <p>Sayba Group</p>
          <li onClick={closeMenu}>
            <NavLink to="/saybagroup/form">Form</NavLink>
          </li>
          <hr />
          <p>Delhi darbar</p>
          <li onClick={closeMenu}>
            <NavLink to="/delhidarbar/form">Form</NavLink>
          </li>
          <hr />
          <p>Kapbros</p>
          <li onClick={closeMenu}>
            <NavLink to="/kapbros/form">Form</NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink to="/kapbros/gallery">Gallery</NavLink>
          </li>
          <hr />
          <p>Farid's closet</p>
          <li onClick={closeMenu}>
            <NavLink to="/faridscloset/products">Products</NavLink>
          </li>
          <hr />
          <p>The Night Suit Co</p>
          <li onClick={closeMenu}>
            <NavLink to="/nightsuit/products">Products</NavLink>
          </li>
          <hr />
          <p>Multistep Form</p>
          <li onClick={closeMenu}>
            <NavLink to="/multistepform/form">Form</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
