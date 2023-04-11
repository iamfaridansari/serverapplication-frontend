import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { setMenu, navbar } = useContext(AppContext);
  const closeMenu = () => {
    navbar.current.classList.remove("active");
    setMenu(false);
  };
  //
  const login = () => {
    navigate("/login", { replace: true });
  };
  return (
    <>
      <nav ref={navbar}>
        <Link to="/" onDoubleClick={login} style={{ cursor: "pointer" }}>
          <h1 className="mb-4 mt-2 fw-bold">Server Application</h1>
        </Link>
        <ul className="navlinks">
          <p>Sayba Group</p>
          <li onClick={closeMenu}>
            <NavLink to="/saybagroup/form">Form</NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink to="/saybagroup/properties">Properties</NavLink>
          </li>
          <hr />
          <p>Delhi darbar</p>
          <li onClick={closeMenu}>
            <NavLink to="/delhidarbar/form">Form</NavLink>
          </li>
          <hr />
          <p>Kapbros</p>
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
          <li onClick={closeMenu}>
            <NavLink to="/nightsuit/coupon">Coupon</NavLink>
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
